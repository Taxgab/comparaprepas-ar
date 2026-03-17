#!/usr/bin/env python3
"""Helper script for Google Drive operations via gws CLI."""

import subprocess
import json
import sys
from pathlib import Path

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

def list_files(query=None, page_size=100):
    """List files in Google Drive."""
    args = ["drive", "files", "list", "--pageSize", str(page_size)]
    if query:
        args.extend(["--q", query])
    return run_gws(args)

def upload_file(filepath, name=None, folder_id=None):
    """Upload a file to Google Drive."""
    path = Path(filepath)
    if not path.exists():
        print(f"File not found: {filepath}", file=sys.stderr)
        sys.exit(1)
    
    args = ["drive", "files", "upload", str(filepath)]
    if name:
        args.extend(["--name", name])
    if folder_id:
        args.extend(["--parents", folder_id])
    return run_gws(args)

def download_file(file_id, destination):
    """Download a file from Google Drive."""
    args = ["drive", "files", "get", file_id, "--download", "--destination", destination]
    return run_gws(args)

def delete_file(file_id):
    """Delete a file from Google Drive."""
    args = ["drive", "files", "delete", file_id]
    return run_gws(args)

def main():
    if len(sys.argv) < 2:
        print("Usage: drive_helper.py <command> [args...]")
        print("Commands: list, upload, download, delete")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list":
        query = sys.argv[2] if len(sys.argv) > 2 else None
        result = list_files(query)
        print(json.dumps(result, indent=2))
    
    elif command == "upload":
        if len(sys.argv) < 3:
            print("Usage: upload <filepath> [name] [folder_id]")
            sys.exit(1)
        filepath = sys.argv[2]
        name = sys.argv[3] if len(sys.argv) > 3 else None
        folder_id = sys.argv[4] if len(sys.argv) > 4 else None
        result = upload_file(filepath, name, folder_id)
        print(json.dumps(result, indent=2))
    
    elif command == "download":
        if len(sys.argv) < 4:
            print("Usage: download <file_id> <destination>")
            sys.exit(1)
        result = download_file(sys.argv[2], sys.argv[3])
        print(json.dumps(result, indent=2))
    
    elif command == "delete":
        if len(sys.argv) < 3:
            print("Usage: delete <file_id>")
            sys.exit(1)
        result = delete_file(sys.argv[2])
        print(json.dumps(result, indent=2))
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()
