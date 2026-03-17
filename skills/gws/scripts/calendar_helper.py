#!/usr/bin/env python3
"""Helper script for Google Calendar operations via gws CLI."""

import subprocess
import json
import sys
from datetime import datetime

def run_gws(args):
    """Execute gws command and return parsed JSON output."""
    cmd = ["gws"] + args + ["--json"]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}", file=sys.stderr)
        sys.exit(1)

def list_events(calendar_id="primary", max_results=100):
    """List events from a calendar."""
    args = [
        "calendar", "events", "list",
        "--calendarId", calendar_id,
        "--maxResults", str(max_results)
    ]
    return run_gws(args)

def create_event(summary, start_time, end_time, calendar_id="primary", description=None):
    """Create a calendar event."""
    # Expect ISO format: 2024-01-01T10:00:00
    event_data = {
        "summary": summary,
        "start": {
            "dateTime": start_time,
            "timeZone": "America/Argentina/Buenos_Aires"
        },
        "end": {
            "dateTime": end_time,
            "timeZone": "America/Argentina/Buenos_Aires"
        }
    }
    if description:
        event_data["description"] = description
    
    args = [
        "calendar", "events", "insert",
        "--calendarId", calendar_id,
        "--json"
    ]
    
    cmd = ["gws"] + args
    try:
        result = subprocess.run(
            cmd,
            input=json.dumps(event_data),
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}", file=sys.stderr)
        sys.exit(1)

def delete_event(event_id, calendar_id="primary"):
    """Delete a calendar event."""
    args = ["calendar", "events", "delete", "--calendarId", calendar_id, event_id]
    return run_gws(args)

def main():
    if len(sys.argv) < 2:
        print("Usage: calendar_helper.py <command> [args...]")
        print("Commands: list, create, delete")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list":
        calendar_id = sys.argv[2] if len(sys.argv) > 2 else "primary"
        result = list_events(calendar_id)
        print(json.dumps(result, indent=2))
    
    elif command == "create":
        if len(sys.argv) < 5:
            print("Usage: create <summary> <start_time> <end_time> [description]")
            print("Time format: 2024-01-01T10:00:00")
            sys.exit(1)
        summary = sys.argv[2]
        start_time = sys.argv[3]
        end_time = sys.argv[4]
        description = sys.argv[5] if len(sys.argv) > 5 else None
        result = create_event(summary, start_time, end_time, description=description)
        print(json.dumps(result, indent=2))
    
    elif command == "delete":
        if len(sys.argv) < 3:
            print("Usage: delete <event_id> [calendar_id]")
            sys.exit(1)
        event_id = sys.argv[2]
        calendar_id = sys.argv[3] if len(sys.argv) > 3 else "primary"
        result = delete_event(event_id, calendar_id)
        print(json.dumps(result, indent=2))
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()
