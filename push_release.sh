#!/bin/bash
# Push release v1.1.0 to GitHub

git add .
git commit -m "feat: release v1.1.0 - Filesystem Mutation, Aliases, Persistence

- Added mkdir, touch, rm, cp, mv commands
- Implemented Alias support
- Added on:change event for persistence
- Fixed ls -la support
- Updated demo page and documentation"

git push origin main
