#!/usr/bin/env bash
set -euo pipefail

# Default extra args for biome
extra_args=""

# Parse args
for arg in "$@"; do
  case $arg in
    -u|--unsafe)
      extra_args="--unsafe"
      shift
      ;;
  esac
done

# Get both staged and unstaged changed files
changed_files=$(git diff --name-only HEAD && git diff --cached --name-only)

# Remove duplicates
changed_files=$(echo "$changed_files" | sort -u)

# Loop through each file and run biome if it matches extensions
for file in $changed_files; do
  if [[ -f "$file" && "$file" =~ \.(js|jsx|ts|tsx)$ ]]; then
    echo "Running: npx @biomejs/biome check --write $extra_args "$file""
    npx @biomejs/biome check --write $extra_args "$file"
  fi
done
