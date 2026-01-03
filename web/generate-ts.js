const yaml = require("yaml");
const fs = require("fs");
const path = require("path");
const { compile } = require("json-schema-to-typescript");
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const Ajv = require("ajv");

const repoRoot = path.join(__dirname, "..");
const mcpDir = path.join(repoRoot, "api");
const schemaPath = path.join(__dirname, "..", "api", "robots.yaml");
const outputDir = path.join(__dirname, "..", "web", "src", "api");
const outputPathTs = path.join(outputDir, "robot-tools-schema.ts");
const outputPathJson = path.join(outputDir, "robot-tools-schema.json");

async function generate() {
  // Load original schema with $refs intact for TypeScript generation
  const schema = yaml.parse(fs.readFileSync(schemaPath, "utf8"));

  // Extract tool names from definitions that have a 'title' field (these are the actual tools)
  const toolNames = Object.entries(schema.definitions)
    .filter(([_, def]) => def.title)
    .map(([_, def]) => def.title);

  // Create a wrapper schema that references all definitions
  const wrapperSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: schema.definitions,
    type: "object",
    properties: Object.fromEntries(
      Object.keys(schema.definitions).map((k) => [
        k,
        { $ref: "#/definitions/" + k },
      ]),
    ),
  };

  const types = await compile(wrapperSchema, "MCPTools", {
    cwd: mcpDir,
    bannerComment: `/* eslint-disable */
/**
 * This file was automatically generated from mcp/schema.yaml
 * DO NOT MODIFY IT BY HAND. Run: node mcp/generate-ts.js
 */`,
  });

  // Generate tool name union type
  const toolNameUnion = `export type ToolName = ${toolNames
    .map((n) => `"${n}"`)
    .join(" | ")};

export const TOOL_NAMES = [${toolNames
    .map((n) => `"${n}"`)
    .join(", ")}] as const;

`;

  // Generate tool input/output type mappings
  const toolMappings = Object.entries(schema.definitions)
    .filter(
      ([_, def]) =>
        def.title && def.properties?.input && def.properties?.output,
    )
    .map(([key, def]) => {
      const inputRef = def.properties.input.$ref?.split("/").pop();
      const outputRef = def.properties.output.$ref?.split("/").pop();
      return { name: def.title, inputType: inputRef, outputType: outputRef };
    });

  const toolInputMap = `export type ToolInputMap = {
${toolMappings.map((t) => `  "${t.name}": ${t.inputType};`).join("\n")}
};

`;

  const toolOutputMap = `export type ToolOutputMap = {
${toolMappings.map((t) => `  "${t.name}": ${t.outputType};`).join("\n")}
};
`;

  const output = types + "\n" + toolNameUnion + toolInputMap + toolOutputMap;

  fs.writeFileSync(outputPathTs, output);

  // Generate fully dereferenced JSON schema for runtime validation
  const dereferencedSchema = await $RefParser.dereference(schemaPath, {
    dereference: {
      circular: "ignore",
    },
  });

  // Validate the dereferenced schema with AJV to ensure it's valid JSON Schema
  const ajv = new Ajv({
    strict: false,
    validateSchema: true,
  });

  try {
    // Compile the schema - this validates it's a valid JSON Schema
    ajv.compile(dereferencedSchema);
    console.log("✓ Schema is valid JSON Schema Draft 7");
  } catch (error) {
    console.error("✗ Schema validation failed:");
    console.error(error.message);
    if (error.errors) {
      console.error(JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }

  fs.writeFileSync(outputPathJson, JSON.stringify(dereferencedSchema, null, 2));

  console.log(`Generated: ${outputPathTs}`);
  console.log(`Generated: ${outputPathJson}`);
  console.log(`Tool names: ${toolNames.join(", ")}`);
}

generate().catch(console.error);
