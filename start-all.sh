#!/bin/zsh
# Script to install dependencies and start both services sequentially

# Backend setup
cd transaction-api
echo "[INFO] Installing backend server dependencies..."
npm install
echo "[INFO] Starting backend server..."
npm run start &
API_PID=$!
cd ..

echo "[INFO] Installing frontend app dependencies and starting it..."
# Frontend setup
cd transaction-ui
echo "[INFO] Installing frontend app dependencies..."
npm install
echo "[INFO] Starting frontend app..."
npm run start &
UI_PID=$!
cd ..

# Wait for both processes to finish
echo "[INFO] Waiting for both services to finish..."
wait $API_PID $UI_PID
