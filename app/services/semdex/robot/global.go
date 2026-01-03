package robot

import (
	"fmt"
	"strings"
	"time"

	"github.com/Southclaws/storyden/mcp"
	"google.golang.org/adk/agent"
)

func (s *Agent) globalInstructionProvider(chatContext *mcp.RobotChatContext) func(ctx agent.ReadonlyContext) (string, error) {
	return func(ctx agent.ReadonlyContext) (string, error) {
		var b strings.Builder

		// from global.md file embed - this is a hard coded Storyden bootstrap.
		b.WriteString(globalInstruction)

		b.WriteString("\n\n## Current Context\n\n")
		b.WriteString(fmt.Sprintf("Current date and time: %s\n\n", time.Now().UTC().Format(time.RFC3339)))

		if chatContext != nil {
			if chatContext.DatagraphItem != nil {
				item := chatContext.DatagraphItem
				b.WriteString("The user is currently viewing:\n")
				b.WriteString(fmt.Sprintf("- Type: %s\n", item.Kind))
				b.WriteString(fmt.Sprintf("- ID: %s\n", item.Id))
				b.WriteString(fmt.Sprintf("- Slug: %s\n", item.Slug))
				b.WriteString("\nThis is the primary context of the conversation. When the user refers to \"this\", \"here\", or similar demonstratives, they likely mean this item.\n")
			} else if chatContext.PageType != nil && *chatContext.PageType != "" {
				b.WriteString(fmt.Sprintf("The user is currently on: %s\n", *chatContext.PageType))
			}
		}

		return b.String(), nil
	}
}
