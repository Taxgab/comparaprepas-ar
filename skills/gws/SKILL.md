---
name: gws
description: Google Workspace CLI integration for Drive, Gmail, Calendar, Sheets, Docs, and Chat. Use when interfacing with Google Workspace APIs via the gws CLI tool. Handles authentication, file operations, email, calendar events, and spreadsheet tasks. Alternative to direct API calls when structured CLI output is preferred.
---

# GWS - Google Workspace CLI

## Overview

Wrapper for the official Google Workspace CLI (`gws`) that provides structured JSON output for all Google Workspace operations.

## Prerequisites

1. Install gws: `npm install -g @googleworkspace/cli`
2. Run setup: `gws auth setup` (requires Google Cloud project)
3. Login: `gws auth login`

## Authentication

**First-time setup:**
```bash
gws auth setup  # Creates/configures Google Cloud project
gws auth login  # OAuth flow
```

**Check auth status:**
```bash
gws auth status
```

## Core Commands

### Drive

**List files:**
```bash
gws drive files list --json
```

**Upload file:**
```bash
gws drive files upload ./local-file.txt --name "Remote Name" --json
```

**Download file:**
```bash
gws drive files get <file-id> --download --destination ./local-path
```

### Gmail

**List messages:**
```bash
gws gmail users.messages list --userId me --json
```

**Get message:**
```bash
gws gmail users.messages get --userId me --id <message-id> --json
```

**Send message:**
```bash
gws gmail users.messages send --userId me --json << 'EOF'
{
  "raw": "BASE64_ENCODED_MESSAGE"
}
EOF
```

### Calendar

**List events:**
```bash
gws calendar events list --calendarId primary --json
```

**Create event:**
```bash
gws calendar events insert --calendarId primary --json << 'EOF'
{
  "summary": "Meeting",
  "start": {"dateTime": "2024-01-01T10:00:00", "timeZone": "America/Argentina/Buenos_Aires"},
  "end": {"dateTime": "2024-01-01T11:00:00", "timeZone": "America/Argentina/Buenos_Aires"}
}
EOF
```

### Sheets

**Get values:**
```bash
gws sheets spreadsheets.values.get --spreadsheetId <id> --range "Sheet1!A1:D10" --json
```

**Update values:**
```bash
gws sheets spreadsheets.values.update --spreadsheetId <id> --range "Sheet1!A1" --valueInputOption RAW --json << 'EOF'
{
  "values": [["A1", "B1"], ["A2", "B2"]]
}
EOF
```

## Using Helper Scripts

### Drive Helper
```bash
python3 ~/.openclaw/workspace/skills/gws/scripts/drive_helper.py list
python3 ~/.openclaw/workspace/skills/gws/scripts/drive_helper.py upload ./file.txt "Folder ID"
```

### Calendar Helper
```bash
python3 ~/.openclaw/workspace/skills/gws/scripts/calendar_helper.py list
python3 ~/.openclaw/workspace/skills/gws/scripts/calendar_helper.py create "Meeting Title" "2024-01-01T10:00:00" "2024-01-01T11:00:00"
```

## Output Format

Always use `--json` flag for structured output that can be parsed programmatically.

## References

- See [references/api_reference.md](references/api_reference.md) for detailed API documentation
- See [references/auth_setup.md](references/auth_setup.md) for step-by-step authentication guide
