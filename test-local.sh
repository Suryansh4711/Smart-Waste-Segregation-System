#!/bin/bash

# Local Testing Script with Docker Compose
# This script helps you test the entire application stack locally before deploying to GCP

set -e

echo "🧪 Starting local testing with Docker Compose..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Desktop."
    exit 1
fi

# Clean up any previous containers
echo "🧹 Cleaning up previous containers..."
docker-compose down -v 2>/dev/null || true

# Build and start services
echo "🏗️  Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check backend health
echo "🔍 Checking backend health..."
for i in {1..30}; do
    if curl -sf http://localhost:8080/ > /dev/null 2>&1; then
        echo "✅ Backend is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend health check failed"
        docker-compose logs backend
        exit 1
    fi
    sleep 2
done

# Check frontend health
echo "🔍 Checking frontend health..."
for i in {1..30}; do
    if curl -sf http://localhost:3000/ > /dev/null 2>&1; then
        echo "✅ Frontend is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Frontend health check failed"
        docker-compose logs frontend
        exit 1
    fi
    sleep 2
done

echo ""
echo "🎉 All services are running!"
echo ""
echo "📍 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo ""
echo "📋 Useful commands:"
echo "   View logs:        docker-compose logs -f"
echo "   Backend logs:     docker-compose logs -f backend"
echo "   Frontend logs:    docker-compose logs -f frontend"
echo "   Stop services:    docker-compose down"
echo "   Restart services: docker-compose restart"
echo ""
echo "Press Ctrl+C to stop monitoring..."
echo ""

# Follow logs
docker-compose logs -f
