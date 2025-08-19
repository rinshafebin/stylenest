#!/bin/bash
set -e

# Git repository URL
GIT_REPO_URL="https://github.com/rinshafebin/stylenest.git"
# For private repos, use: https://<your_username>:<your_PAT>@github.com/rinshafebin/stylenest.git

# Project directory name
PROJECT_MAIN_DIR_NAME="stylenest"
BACKEND_DIR="backend"
PROJECT_PATH="/home/ubuntu/$PROJECT_MAIN_DIR_NAME"

# Check if repo already exists
if [ -d "$PROJECT_PATH/.git" ]; then
    echo "Repository already exists. Pulling latest changes..."
    cd "$PROJECT_PATH"
    git reset --hard
    git clean -fd
    git pull origin main
else
    echo "Cloning repository..."
    git clone "$GIT_REPO_URL" "$PROJECT_PATH"
fi

# Go into backend (Django project folder)
cd "$PROJECT_PATH/$BACKEND_DIR"

# Make all .sh files executable (if you have them in scripts/)
chmod +x scripts/*.sh || true

# Execute scripts if they exist
[ -f ./scripts/instance_os_dependencies.sh ] && ./scripts/instance_os_dependencies.sh
[ -f ./scripts/python_dependencies.sh ] && ./scripts/python_dependencies.sh
[ -f ./scripts/gunicorn.sh ] && ./scripts/gunicorn.sh
[ -f ./scripts/start_app.sh ] && ./scripts/start_app.sh
