#!/bin/bash

# Kill existing processes
pkill -9 -f "node server" 2>/dev/null || true
pkill -9 -f "vite" 2>/dev/null || true
sleep 2

# Start Express
cd /Users/nikkoolagarnier/Downloads/ATLAS-master
echo "▶️  Starting Express server..."
npm run dev:server &
EXPRESS_PID=$!
sleep 3

# Start Vite
echo "▶️  Starting Vite server..."
npm run dev:vite &
VITE_PID=$!
sleep 3

echo ""
echo "✅ Both servers started!"
echo "📍 Express: http://localhost:3001"
echo "📍 Vite: http://localhost:5173"
echo ""
echo "Press any key to stop..."
read -n 1

# Kill both
kill $EXPRESS_PID $VITE_PID 2>/dev/null
