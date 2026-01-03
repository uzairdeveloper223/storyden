package tools

import (
	"context"
	"fmt"
	"log/slog"
	"strings"

	"github.com/rs/xid"
	"google.golang.org/adk/tool"
	"google.golang.org/adk/tool/functiontool"

	"github.com/Southclaws/storyden/app/services/authentication/session"
	"github.com/Southclaws/storyden/internal/ent"
	"github.com/Southclaws/storyden/internal/ent/robot"
	"github.com/Southclaws/storyden/mcp"
)

type robotTools struct {
	logger   *slog.Logger
	db       *ent.Client
	registry *Registry
}

func newRobotTools(
	logger *slog.Logger,
	registry *Registry,
	db *ent.Client,
) *robotTools {
	t := &robotTools{
		logger:   logger,
		db:       db,
		registry: registry,
	}

	registry.Register(t.newRobotSwitchTool())
	registry.Register(t.newRobotGetAllToolNamesTool())
	registry.Register(t.newRobotCreateTool())
	registry.Register(t.newRobotListTool())
	registry.Register(t.newRobotGetTool())
	registry.Register(t.newRobotUpdateTool())
	registry.Register(t.newRobotDeleteTool())

	return t
}

func (rt *robotTools) newRobotSwitchTool() *Tool {
	toolDef := mcp.GetRobotSwitchTool()

	return &Tool{
		Definition:   toolDef,
		IsClientTool: true,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			robots, err := rt.db.Robot.Query().
				Order(robot.ByCreatedAt()).
				All(ctx)
			if err != nil {
				return nil, err
			}

			robotIDs := make([]any, len(robots))
			for i, r := range robots {
				robotIDs[i] = r.ID.String()
			}

			inputSchema := toolDef.InputSchema
			if inputSchema.Properties != nil {
				if robotIDProp, ok := inputSchema.Properties["robot_id"]; ok {
					robotIDProp.Enum = robotIDs
				}
			}

			return functiontool.New(
				functiontool.Config{
					Name:          toolDef.Name,
					Description:   toolDef.Description,
					InputSchema:   inputSchema,
					IsLongRunning: true,
				},
				rt.ExecuteRobotSwitch,
			)
		},
	}
}

func (rt *robotTools) ExecuteRobotSwitch(ctx tool.Context, args mcp.ToolRobotSwitchInput) (*mcp.ToolRobotSwitchOutput, error) {
	robotID, err := xid.FromString(args.RobotId)
	if err != nil {
		return nil, fmt.Errorf("invalid robot ID: " + args.RobotId)
	}

	exists, err := rt.db.Robot.Query().Where(robot.IDEQ(robotID)).Exist(ctx)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, fmt.Errorf("robot not found: " + args.RobotId)
	}

	return &(mcp.ToolRobotSwitchOutput{
		Success: true,
		RobotId: args.RobotId,
	}), nil
}

func (rt *robotTools) newRobotGetAllToolNamesTool() *Tool {
	toolDef := mcp.GetRobotGetAllToolNamesTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: toolDef.InputSchema,
				},
				rt.ExecuteGetAllToolNames,
			)
		},
	}
}

func (rt *robotTools) ExecuteGetAllToolNames(ctx tool.Context, args map[string]any) (*mcp.ToolRobotGetAllToolNamesOutput, error) {
	allTools, err := rt.registry.GetTools(ctx)
	if err != nil {
		return nil, err
	}

	tools := make(mcp.ToolRobotGetAllToolNamesOutput, 0, len(allTools))
	for _, t := range allTools {
		tools = append(tools, mcp.ToolInfo{
			Name:        t.Definition.Name,
			Description: t.Definition.Description,
		})
	}

	return &(tools), nil
}

func (rt *robotTools) newRobotCreateTool() *Tool {
	toolDef := mcp.GetRobotCreateTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			inputSchema := toolDef.InputSchema
			mcp.InjectToolNamesEnum(inputSchema, "tools")

			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: inputSchema,
				},
				rt.ExecuteCreateRobot,
			)
		},
	}
}

func (rt *robotTools) ExecuteCreateRobot(ctx tool.Context, args mcp.ToolRobotCreateInput) (*mcp.ToolRobotCreateOutput, error) {
	accountID, err := session.GetAccountID(ctx)
	if err != nil {
		return nil, err
	}

	var validationErrors []string

	if len(args.Tools) > 0 {
		allToolNames := mcp.AllToolNames()
		toolNameSet := make(map[string]bool)
		for _, name := range allToolNames {
			toolNameSet[name] = true
		}

		var invalidTools []string
		for _, t := range args.Tools {
			if !toolNameSet[t] {
				invalidTools = append(invalidTools, t)
			}
		}
		if len(invalidTools) > 0 {
			validationErrors = append(validationErrors, "invalid tool names: "+strings.Join(invalidTools, ", "))
		}
	}

	if len(validationErrors) > 0 {
		return nil, fmt.Errorf(strings.Join(validationErrors, "; "))
	}

	create := rt.db.Robot.Create().
		SetName(args.Name).
		SetPlaybook(args.Playbook).
		SetAuthorID(xid.ID(accountID))

	create.SetDescription(args.Description)

	if len(args.Tools) > 0 {
		create.SetTools(args.Tools)
	}

	robot, err := create.Save(ctx)
	if err != nil {
		return nil, err
	}

	return &(mcp.ToolRobotCreateOutput{
		Id:   robot.ID.String(),
		Name: robot.Name,
	}), nil
}

func (rt *robotTools) newRobotListTool() *Tool {
	toolDef := mcp.GetRobotListTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: toolDef.InputSchema,
				},
				rt.ExecuteListRobots,
			)
		},
	}
}

func (rt *robotTools) ExecuteListRobots(ctx tool.Context, args mcp.ToolRobotListInput) (*mcp.ToolRobotListOutput, error) {
	limit := 20
	if args.Limit != nil {
		limit = *args.Limit
	}

	robots, err := rt.db.Robot.Query().
		Order(robot.ByCreatedAt()).
		Limit(limit).
		All(ctx)
	if err != nil {
		return nil, err
	}

	items := make([]mcp.RobotItem, 0, len(robots))
	for _, r := range robots {
		desc := r.Description
		items = append(items, mcp.RobotItem{
			Id:          r.ID.String(),
			Name:        r.Name,
			Description: &desc,
		})
	}

	return &(mcp.ToolRobotListOutput{
		Robots: items,
		Total:  len(items),
	}), nil
}

func (rt *robotTools) newRobotGetTool() *Tool {
	toolDef := mcp.GetRobotGetTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: toolDef.InputSchema,
				},
				rt.ExecuteGetRobot,
			)
		},
	}
}

func (rt *robotTools) ExecuteGetRobot(ctx tool.Context, args mcp.ToolRobotGetInput) (*mcp.ToolRobotGetOutput, error) {
	robotID, err := xid.FromString(args.Id)
	if err != nil {
		return nil, fmt.Errorf("invalid robot ID: " + args.Id)
	}

	robot, err := rt.db.Robot.Get(ctx, robotID)
	if err != nil {
		return nil, err
	}

	desc := robot.Description
	return &(mcp.ToolRobotGetOutput{
		Id:          robot.ID.String(),
		Name:        robot.Name,
		Description: &desc,
		Playbook:    robot.Playbook,
		Tools:       robot.Tools,
	}), nil
}

func (rt *robotTools) newRobotUpdateTool() *Tool {
	toolDef := mcp.GetRobotUpdateTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			inputSchema := toolDef.InputSchema
			mcp.InjectToolNamesEnum(inputSchema, "tools")

			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: inputSchema,
				},
				rt.ExecuteUpdateRobot,
			)
		},
	}
}

func (rt *robotTools) ExecuteUpdateRobot(ctx tool.Context, args mcp.ToolRobotUpdateInput) (*mcp.ToolRobotUpdateOutput, error) {
	robotID, err := xid.FromString(args.Id)
	if err != nil {
		return nil, fmt.Errorf("invalid robot ID: " + args.Id)
	}

	var validationErrors []string

	if len(args.Tools) > 0 {
		allToolNames := mcp.AllToolNames()
		toolNameSet := make(map[string]bool)
		for _, name := range allToolNames {
			toolNameSet[name] = true
		}

		var invalidTools []string
		for _, t := range args.Tools {
			if !toolNameSet[t] {
				invalidTools = append(invalidTools, t)
			}
		}
		if len(invalidTools) > 0 {
			validationErrors = append(validationErrors, "invalid tool names: "+strings.Join(invalidTools, ", "))
		}
	}

	if len(validationErrors) > 0 {
		return nil, fmt.Errorf(strings.Join(validationErrors, "; "))
	}

	update := rt.db.Robot.UpdateOneID(robotID)

	if args.Name != nil {
		update.SetName(*args.Name)
	}
	if args.Description != nil {
		update.SetDescription(*args.Description)
	}
	if args.Playbook != nil {
		update.SetPlaybook(*args.Playbook)
	}
	if len(args.Tools) > 0 {
		update.SetTools(args.Tools)
	}

	robot, err := update.Save(ctx)
	if err != nil {
		return nil, err
	}

	return &(mcp.ToolRobotUpdateOutput{
		Id:   robot.ID.String(),
		Name: robot.Name,
	}), nil
}

func (rt *robotTools) newRobotDeleteTool() *Tool {
	toolDef := mcp.GetRobotDeleteTool()

	return &Tool{
		Definition: toolDef,
		Builder: func(ctx context.Context) (tool.Tool, error) {
			return functiontool.New(
				functiontool.Config{
					Name:        toolDef.Name,
					Description: toolDef.Description,
					InputSchema: toolDef.InputSchema,
				},
				rt.ExecuteDeleteRobot,
			)
		},
	}
}

func (rt *robotTools) ExecuteDeleteRobot(ctx tool.Context, args mcp.ToolRobotDeleteInput) (*mcp.ToolRobotDeleteOutput, error) {
	robotID, err := xid.FromString(args.Id)
	if err != nil {
		return nil, fmt.Errorf("invalid robot ID: " + args.Id)
	}

	err = rt.db.Robot.DeleteOneID(robotID).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return &(mcp.ToolRobotDeleteOutput{Success: true, Id: args.Id}), nil
}
