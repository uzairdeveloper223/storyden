package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/oasdiff/yaml"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	var inputFile, outputFile string
	var baseDir string

	if len(os.Args) >= 3 {
		inputFile = os.Args[1]
		outputFile = os.Args[2]
		baseDir = filepath.Dir(inputFile)
	} else {
		cwd, err := os.Getwd()
		if err != nil {
			return fmt.Errorf("get working directory: %w", err)
		}

		baseDir = "api"
		if filepath.Base(cwd) == "api" {
			baseDir = "."
		}

		inputFile = filepath.Join(baseDir, "robots.yaml")
		outputFile = filepath.Join(baseDir, "robots.json")
	}

	fmt.Printf("Dereferencing %s -> %s\n", inputFile, outputFile)

	yamlData, err := os.ReadFile(inputFile)
	if err != nil {
		return fmt.Errorf("read input file: %w", err)
	}

	var data map[string]any
	if err := yaml.Unmarshal(yamlData, &data); err != nil {
		return fmt.Errorf("unmarshal YAML: %w", err)
	}

	if err := dereferenceSchema(data, baseDir); err != nil {
		return fmt.Errorf("dereference schema: %w", err)
	}

	output, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal output: %w", err)
	}

	if err := os.WriteFile(outputFile, output, 0644); err != nil {
		return fmt.Errorf("write output file: %w", err)
	}

	fmt.Printf("✓ Successfully dereferenced schema to %s\n", outputFile)
	return nil
}

func dereferenceSchema(data any, baseDir string) error {
	switch v := data.(type) {
	case map[string]any:
		if ref, ok := v["$ref"].(string); ok {
			if strings.HasPrefix(ref, "./") || strings.HasPrefix(ref, "../") {
				refPath := strings.TrimPrefix(ref, "./")
				fullPath := filepath.Join(baseDir, refPath)

				refData, err := os.ReadFile(fullPath)
				if err != nil {
					return fmt.Errorf("read ref %s: %w", ref, err)
				}

				var refSchema map[string]any
				if err := yaml.Unmarshal(refData, &refSchema); err != nil {
					return fmt.Errorf("unmarshal ref %s: %w", ref, err)
				}

				if err := dereferenceSchema(refSchema, baseDir); err != nil {
					return err
				}

				delete(v, "$ref")
				for k, val := range refSchema {
					if k != "$schema" {
						v[k] = val
					}
				}
			}
		} else {
			for _, val := range v {
				if err := dereferenceSchema(val, baseDir); err != nil {
					return err
				}
			}
		}
	case []any:
		for _, item := range v {
			if err := dereferenceSchema(item, baseDir); err != nil {
				return err
			}
		}
	}
	return nil
}
