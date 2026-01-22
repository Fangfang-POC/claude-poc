# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server implementation in Go. It's a minimal "hello world" style server that demonstrates the MCP protocol by providing a simple greeting tool. The server communicates via JSON-RPC 2.0 over stdin/stdout.

## Build and Run

```bash
# Build the server
go build hello-mcp-server.go

# Run the server (communicates via stdin/stdout)
./hello-mcp-server
```

No external dependencies - uses only Go standard library.

## Architecture

The MCP server follows the JSON-RPC 2.0 protocol with these key components:

### Request/Response Flow
1. Server reads JSON-RPC requests from stdin (one per line)
2. Requests are routed by `method` field to handler functions
3. Responses are written to stdout as JSON with newline terminators

### MCP Methods Implemented
- `initialize` - Server handshake, returns protocol version, capabilities, and server info
- `tools/list` - Returns available tools with their JSON schemas
- `tools/call` - Executes a tool with provided arguments
- `notifications/initialized` - Client notification (no response needed)

### Adding a New Tool

1. Add the tool definition in `handleToolsList()` with name, description, and inputSchema
2. Add a case in `handleToolCall()` to handle the tool name
3. Parse `arguments` from params and implement the tool logic
4. Return results in the format: `{"content": [{"type": "text", "text": "..."}]}`

### Protocol Version

This server implements MCP protocol version `2024-11-05`. The protocol specifies the JSON-RPC format, tool schemas, and response structures.
