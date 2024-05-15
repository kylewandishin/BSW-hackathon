#!/bin/bash

# Function to check the exit status of the last executed command
check_status() {
  if [ $? -ne 0 ]; then
    echo "Error: $1 failed"
    exit 1
  fi
}

echo "Running npm run build..."
npm run build
check_status "npm run build"

echo "Running yarn build..."
yarn build
check_status "yarn build"

echo "Running yarn preview..."
yarn preview
check_status "yarn preview"

echo "All commands executed successfully!"
