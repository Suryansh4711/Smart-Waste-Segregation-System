# 📦 Deployment Files Summary

This document provides an overview of all deployment-related files created for deploying to GCP.

## 🗂️ Files Created

### 1. Docker Configuration

#### `/backend/Dockerfile`
- **Purpose**: Production-ready Docker image for FastAPI backend
- **Features**:
  - Multi-stage build for optimized image size
  - Uses `requirements-prod.txt` (Linux-compatible dependencies)
  - Includes TensorFlow model (`waste_model.h5`)
  - Health check endpoint
  - Runs on port 8080

#### `/backend/requirements-prod.txt`
- **Purpose**: Linux-compatible Python dependencies (removed macOS-specific packages)
- **Key Changes**:
  - Removed `tensorflow-macos` and `tensorflow-metal`
  - Uses standard `tensorflow==2.16.1`

#### `/frontend/Dockerfile`
- **Purpose**: Production-ready Docker image for Next.js frontend
- **Features**:
  - Multi-stage build with optimizations
  - Standalone output mode
  - Uses pnpm for dependency management
  - Health check endpoint
  - Runs on port 3000
  - Accepts `NEXT_PUBLIC_API_URL` environment variable

#### `/docker-compose.yml`
- **Purpose**: Local testing with Docker
- **Features**:
  - Orchestrates both backend and frontend
  - Internal networking between services
  - Health checks
  - Volume mounts for development

---

### 2. GCP Deployment

#### `/cloudbuild.yaml`
- **Purpose**: Automated GCP Cloud Build configuration
- **Features**:
  - Builds both backend and frontend images
  - Pushes to Google Container Registry
  - Deploys to Cloud Run
  - Configures environment variables
  - Sets resource limits (memory, CPU)

#### `/deploy.sh`
- **Purpose**: Manual deployment script
- **Features**:
  - Step-by-step deployment process
  - Verifies prerequisites
  - Enables required GCP APIs
  - Deploys backend first, then frontend
  - Outputs deployment URLs

---

### 3. Environment Configuration

#### `/frontend/.env.local`
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```
- **Purpose**: Local development environment variables
- **Usage**: Automatically loaded by Next.js in development

#### `/frontend/.env.example`
```bash
# Template for environment variables
NEXT_PUBLIC_API_URL=http://localhost:8080
# NEXT_PUBLIC_API_URL=https://your-backend-url.run.app  # Production
```
- **Purpose**: Template for other developers

---

### 4. Docker Ignore Files

#### `/backend/.dockerignore`
- Excludes: `__pycache__`, `.venv`, `dataset/`, training files
- **Purpose**: Reduces image size by excluding unnecessary files

#### `/frontend/.dockerignore`
- Excludes: `node_modules/`, `.next/`, `.env` files
- **Purpose**: Reduces build time and image size

---

### 5. Testing Scripts

#### `/test-local.sh`
- **Purpose**: Automated local testing with Docker Compose
- **Features**:
  - Checks Docker availability
  - Builds and starts all services
  - Performs health checks
  - Displays service URLs
  - Follows logs

---

### 6. Documentation

#### `/DEPLOYMENT.md`
- **Purpose**: Comprehensive deployment guide
- **Sections**:
  - Prerequisites and setup
  - Local testing instructions
  - Three deployment options (automated, script, manual)
  - Environment configuration
  - Troubleshooting guide
  - Cost optimization tips
  - Monitoring and logs
  - Security best practices

#### `/QUICKSTART.md`
- **Purpose**: Quick reference for common tasks
- **Sections**:
  - Running locally
  - Quick deploy commands
  - Project structure
  - Environment variables
  - Next steps

---

## 🚀 Deployment Workflow

### Option 1: Cloud Build (Recommended)
```bash
gcloud builds submit --config=cloudbuild.yaml
```

### Option 2: Deployment Script
```bash
./deploy.sh
```

### Option 3: Docker Compose (Local Testing)
```bash
./test-local.sh
```

---

## 📝 Code Changes Made

### `/frontend/src/app/classifier/page.tsx`
**Line 73-74**: Updated to use environment variable
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const response = await fetch(`${apiUrl}/predict`, {
```

### `/frontend/next.config.ts`
**Added**: Standalone output for Docker
```typescript
output: 'standalone',
```

---

## ✅ Pre-Deployment Checklist

- [ ] Docker Desktop installed and running
- [ ] gcloud CLI installed
- [ ] GCP account created with billing enabled
- [ ] Project ID set in `deploy.sh` or `cloudbuild.yaml`
- [ ] Local testing passed: `./test-local.sh`
- [ ] Environment variables configured

---

## 🎯 Deployment Commands Summary

```bash
# 1. Test locally
./test-local.sh

# 2. Login to GCP
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 3. Enable APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 4. Deploy
gcloud builds submit --config=cloudbuild.yaml

# 5. Get URLs
gcloud run services describe waste-backend --region us-central1
gcloud run services describe waste-frontend --region us-central1
```

---

## 📊 Resource Allocation

### Backend (waste-backend)
- **Memory**: 2Gi (TensorFlow model requires more memory)
- **CPU**: 2 vCPUs
- **Port**: 8080
- **Max Instances**: 10

### Frontend (waste-frontend)
- **Memory**: 512Mi
- **CPU**: 1 vCPU
- **Port**: 3000
- **Max Instances**: 10

---

## 🔍 Verification Steps

After deployment:

1. **Check Backend Health**
   ```bash
   curl https://waste-backend-REGION-PROJECT_ID.run.app/
   ```

2. **Check Frontend**
   ```bash
   curl https://waste-frontend-REGION-PROJECT_ID.run.app/
   ```

3. **Test Classification**
   - Visit frontend URL
   - Upload an image
   - Verify prediction works

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to fetch" error | Restart dev server: `npm run dev` |
| CORS errors | Already configured in `backend/api.py` |
| Build timeout | Increase timeout in `cloudbuild.yaml` |
| Out of memory | Increase memory in Cloud Run settings |
| Cold start slow | Consider min-instances=1 (costs more) |

---

## 📚 Additional Resources

- Full Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Quick Start: [QUICKSTART.md](./QUICKSTART.md)
- GCP Cloud Run: https://cloud.google.com/run/docs
- Next.js Docker: https://nextjs.org/docs/deployment#docker-image

---

**Ready to deploy? Follow the steps in [DEPLOYMENT.md](./DEPLOYMENT.md)! 🚀**
