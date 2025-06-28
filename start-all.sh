#!/bin/zsh
# Script to install dependencies and start both services sequentially

# Go to transaction-api, install dependencies and start
cd transaction-api
npm install
npm run start &
API_PID=$!
cd ..

# Go to transaction-ui, install dependencies and start
cd transaction-ui
npm install
npm run start &
UI_PID=$!
cd ..

# Wait for both processes to finish
wait $API_PID $UI_PID
