#!/bin/bash

echo "🔍 Verifying deployment setup..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Run: npm install"
    exit 1
fi
echo "✅ Dependencies installed"

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ dist folder not found. Run: npm run build"
    exit 1
fi
echo "✅ Build files present"

# Check if dist/spa exists
if [ ! -d "dist/spa" ]; then
    echo "❌ Frontend build not found. Run: npm run build:client"
    exit 1
fi
echo "✅ Frontend build ready"

# Check if dist/server exists
if [ ! -d "dist/server" ]; then
    echo "❌ Server build not found. Run: npm run build:server"
    exit 1
fi
echo "✅ Server build ready"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found (optional)"
else
    echo "✅ Environment file present"
fi

echo ""
echo "🎉 All checks passed! Ready to deploy."
echo ""
echo "To start the server:"
echo "  npm start"
echo ""
echo "Or deploy using Docker:"
echo "  docker build -t website-builder ."
echo "  docker run -p 3000:3000 website-builder"
