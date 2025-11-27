#!/bin/bash

# Pre-Deployment Verification Script
# Checks if everything is ready for deployment

set -e

echo "🔍 Verifying deployment readiness..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check Docker
echo -n "Checking Docker... "
if command -v docker &> /dev/null; then
    if docker info > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Docker is running${NC}"
    else
        echo -e "${RED}✗ Docker is installed but not running${NC}"
        echo "  Please start Docker Desktop"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo "  Install from: https://www.docker.com/products/docker-desktop"
    ERRORS=$((ERRORS+1))
fi

# Check docker-compose
echo -n "Checking docker-compose... "
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ docker-compose is available${NC}"
else
    echo -e "${YELLOW}⚠ docker-compose not found (optional)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

# Check gcloud
echo -n "Checking gcloud CLI... "
if command -v gcloud &> /dev/null; then
    GCLOUD_VERSION=$(gcloud --version | head -n1)
    echo -e "${GREEN}✓ ${GCLOUD_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠ gcloud CLI not installed${NC}"
    echo "  Install from: https://cloud.google.com/sdk/docs/install"
    WARNINGS=$((WARNINGS+1))
fi

# Check if gcloud is authenticated
if command -v gcloud &> /dev/null; then
    echo -n "Checking gcloud authentication... "
    if gcloud auth list --filter=status:ACTIVE --format="value(account)" > /dev/null 2>&1; then
        ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n1)
        echo -e "${GREEN}✓ Authenticated as ${ACCOUNT}${NC}"
    else
        echo -e "${YELLOW}⚠ Not authenticated${NC}"
        echo "  Run: gcloud auth login"
        WARNINGS=$((WARNINGS+1))
    fi
fi

# Check GCP project
if command -v gcloud &> /dev/null; then
    echo -n "Checking GCP project... "
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    if [ -n "$PROJECT_ID" ]; then
        echo -e "${GREEN}✓ Project: ${PROJECT_ID}${NC}"
    else
        echo -e "${YELLOW}⚠ No project set${NC}"
        echo "  Run: gcloud config set project YOUR_PROJECT_ID"
        WARNINGS=$((WARNINGS+1))
    fi
fi

echo ""
echo "📁 Checking required files..."

# Check backend files
echo -n "Backend Dockerfile... "
if [ -f "backend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Missing${NC}"
    ERRORS=$((ERRORS+1))
fi

echo -n "Backend requirements-prod.txt... "
if [ -f "backend/requirements-prod.txt" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Missing${NC}"
    ERRORS=$((ERRORS+1))
fi

echo -n "Backend model (waste_model.h5)... "
if [ -f "backend/waste_model.h5" ]; then
    SIZE=$(du -h "backend/waste_model.h5" | cut -f1)
    echo -e "${GREEN}✓ (${SIZE})${NC}"
else
    echo -e "${RED}✗ Missing${NC}"
    ERRORS=$((ERRORS+1))
fi

# Check frontend files
echo -n "Frontend Dockerfile... "
if [ -f "frontend/Dockerfile" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Missing${NC}"
    ERRORS=$((ERRORS+1))
fi

echo -n "Frontend .env.local... "
if [ -f "frontend/.env.local" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Missing (optional for local dev)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

# Check deployment files
echo -n "docker-compose.yml... "
if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗ Missing${NC}"
    ERRORS=$((ERRORS+1))
fi

echo -n "cloudbuild.yaml... "
if [ -f "cloudbuild.yaml" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Missing (needed for Cloud Build)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

echo -n "deploy.sh... "
if [ -f "deploy.sh" ]; then
    if [ -x "deploy.sh" ]; then
        echo -e "${GREEN}✓ (executable)${NC}"
    else
        echo -e "${YELLOW}⚠ Not executable${NC}"
        echo "  Run: chmod +x deploy.sh"
        WARNINGS=$((WARNINGS+1))
    fi
else
    echo -e "${YELLOW}⚠ Missing (optional)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

echo ""
echo "🔧 Checking environment configuration..."

# Check if API URL is configured in code
echo -n "Frontend API configuration... "
if grep -q "process.env.NEXT_PUBLIC_API_URL" "frontend/src/app/classifier/page.tsx" 2>/dev/null; then
    echo -e "${GREEN}✓ Using environment variable${NC}"
else
    echo -e "${RED}✗ Hardcoded URL found${NC}"
    ERRORS=$((ERRORS+1))
fi

# Check Next.js config
echo -n "Next.js standalone output... "
if grep -q "output.*standalone" "frontend/next.config.ts" 2>/dev/null; then
    echo -e "${GREEN}✓ Configured${NC}"
else
    echo -e "${YELLOW}⚠ Not configured (needed for Docker)${NC}"
    WARNINGS=$((WARNINGS+1))
fi

echo ""
echo "═══════════════════════════════════════"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready to deploy.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Test locally:  ./test-local.sh"
    echo "  2. Deploy to GCP: ./deploy.sh"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ ${WARNINGS} warning(s) found${NC}"
    echo "You can proceed, but review warnings above."
else
    echo -e "${RED}✗ ${ERRORS} error(s) and ${WARNINGS} warning(s) found${NC}"
    echo "Please fix errors before deploying."
    exit 1
fi

echo "═══════════════════════════════════════"
