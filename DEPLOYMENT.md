# 🚀 Deployment Guide for Smart Waste Segregation System

This guide will walk you through deploying your Smart Waste Segregation System to Google Cloud Platform (GCP) using Cloud Run.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Testing with Docker](#local-testing-with-docker)
3. [GCP Setup](#gcp-setup)
4. [Deployment Options](#deployment-options)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)
7. [Cost Optimization](#cost-optimization)

---

## Prerequisites

### Required Tools

1. **Google Cloud SDK (gcloud CLI)**
   ```bash
   # Install gcloud CLI
   # macOS
   brew install --cask google-cloud-sdk
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   
   # Verify installation
   gcloud --version
   ```

2. **Docker Desktop**
   ```bash
   # macOS
   brew install --cask docker
   
   # Or download from: https://www.docker.com/products/docker-desktop
   
   # Verify installation
   docker --version
   docker-compose --version
   ```

3. **GCP Account**
   - Create a GCP account at https://cloud.google.com
   - Enable billing for your project
   - You get $300 free credits for 90 days

---

## 🐳 Local Testing with Docker

Before deploying to GCP, test your containerized application locally:

### Step 1: Build and Run with Docker Compose

```bash
# Navigate to project root
cd /Users/suryanshagarwal/Smart-Waste-Segregation-System

# Build and start all services
docker-compose up --build

# The application will be available at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8080
```

### Step 2: Test the Application

1. Open http://localhost:3000 in your browser
2. Navigate to the Classifier page
3. Upload a waste image
4. Verify the classification works

### Step 3: Stop the Services

```bash
# Stop and remove containers
docker-compose down

# Remove images (optional)
docker-compose down --rmi all
```

---

## ☁️ GCP Setup

### Step 1: Initialize GCP CLI

```bash
# Login to your GCP account
gcloud auth login

# List your projects
gcloud projects list

# Create a new project (or use existing)
gcloud projects create waste-segregation-app --name="Waste Segregation System"

# Set the project
gcloud config set project waste-segregation-app

# Check current project
gcloud config get-value project
```

### Step 2: Enable Required APIs

```bash
# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com

# Enable Artifact Registry API (recommended over Container Registry)
gcloud services enable artifactregistry.googleapis.com

# Verify enabled services
gcloud services list --enabled
```

### Step 3: Set Up Billing

⚠️ **Important**: Cloud Run requires billing to be enabled.

1. Go to https://console.cloud.google.com/billing
2. Link a billing account to your project
3. You'll use free tier credits first

---

## 🚀 Deployment Options

### Option A: Automated Deployment with Cloud Build (Recommended)

This method uses GCP Cloud Build to automatically build and deploy both services.

#### Step 1: Update cloudbuild.yaml

Edit `cloudbuild.yaml` and replace the substitution variables if needed:

```yaml
substitutions:
  _REGION: 'us-central1'  # Change to your preferred region
```

Available regions:
- `us-central1` (Iowa)
- `us-east1` (South Carolina)
- `europe-west1` (Belgium)
- `asia-southeast1` (Singapore)

#### Step 2: Submit Build

```bash
# From project root
gcloud builds submit --config=cloudbuild.yaml

# This will:
# 1. Build backend Docker image
# 2. Build frontend Docker image
# 3. Push images to Container Registry
# 4. Deploy backend to Cloud Run
# 5. Deploy frontend to Cloud Run
# 6. Configure frontend to use backend URL
```

#### Step 3: Get Your URLs

```bash
# Get backend URL
gcloud run services describe waste-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'

# Get frontend URL
gcloud run services describe waste-frontend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)'
```

---

### Option B: Manual Deployment with Script

Use the provided deployment script for step-by-step deployment.

#### Step 1: Update deploy.sh

Edit `deploy.sh` and update the configuration:

```bash
# Configuration
PROJECT_ID="your-gcp-project-id"  # Replace with your project ID
REGION="us-central1"               # Change to your preferred region
```

#### Step 2: Run Deployment Script

```bash
# Make script executable (already done)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
1. ✅ Verify gcloud CLI is installed
2. ✅ Enable required APIs
3. ✅ Build and push backend image
4. ✅ Deploy backend to Cloud Run
5. ✅ Build and push frontend image with backend URL
6. ✅ Deploy frontend to Cloud Run
7. ✅ Display deployment URLs

---

### Option C: Manual Step-by-Step Deployment

For full control, deploy each service manually.

#### Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Build and submit to Cloud Build
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/waste-backend

# Deploy to Cloud Run
gcloud run deploy waste-backend \
  --image gcr.io/YOUR_PROJECT_ID/waste-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --max-instances 10 \
  --port 8080

# Get backend URL
BACKEND_URL=$(gcloud run services describe waste-backend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)')

echo "Backend URL: $BACKEND_URL"
```

#### Deploy Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Create production .env file with backend URL
echo "NEXT_PUBLIC_API_URL=$BACKEND_URL" > .env.production

# Build and submit to Cloud Build
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/waste-frontend

# Deploy to Cloud Run
gcloud run deploy waste-frontend \
  --image gcr.io/YOUR_PROJECT_ID/waste-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 3000 \
  --set-env-vars NEXT_PUBLIC_API_URL=$BACKEND_URL

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe waste-frontend \
  --platform managed \
  --region us-central1 \
  --format 'value(status.url)')

echo "Frontend URL: $FRONTEND_URL"
echo "Visit your app at: $FRONTEND_URL"
```

---

## ⚙️ Environment Configuration

### Local Development (.env.local)

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Production (Cloud Run)

The environment variables are set automatically during deployment:

```bash
# Backend
PORT=8080

# Frontend
NEXT_PUBLIC_API_URL=https://waste-backend-REGION-PROJECT_ID.run.app
PORT=3000
```

### Updating Environment Variables

```bash
# Update frontend with new backend URL
gcloud run services update waste-frontend \
  --region us-central1 \
  --set-env-vars NEXT_PUBLIC_API_URL=https://your-new-backend-url.run.app
```

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" error in frontend

**Solution**: Restart the dev server to pick up environment variables

```bash
# Stop the dev server
# Press Ctrl+C in the terminal

# Start it again
cd frontend
npm run dev
```

### Issue: CORS errors in production

**Solution**: The backend already has CORS configured for all origins. If issues persist:

```python
# backend/api.py - already configured
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Container Registry quota exceeded

**Solution**: Clean up old images

```bash
# List images
gcloud container images list

# Delete old image versions
gcloud container images delete gcr.io/PROJECT_ID/waste-backend:OLD_TAG

# Or use Artifact Registry instead
gcloud artifacts docker images delete \
  REGION-docker.pkg.dev/PROJECT_ID/REPO/IMAGE:TAG
```

### Issue: Backend cold start takes too long

**Solution**: Increase minimum instances

```bash
gcloud run services update waste-backend \
  --region us-central1 \
  --min-instances 1
```

⚠️ **Note**: This will increase costs as you'll always have 1 instance running.

### Issue: Out of memory errors

**Solution**: Increase memory allocation

```bash
# Backend (TensorFlow model is memory-intensive)
gcloud run services update waste-backend \
  --region us-central1 \
  --memory 4Gi

# Frontend
gcloud run services update waste-frontend \
  --region us-central1 \
  --memory 1Gi
```

### Issue: Build fails with "requirements.txt not found"

**Solution**: Use `requirements-prod.txt` for Linux deployment

```bash
# Update Dockerfile to use requirements-prod.txt
COPY requirements-prod.txt .
RUN pip install --no-cache-dir -r requirements-prod.txt
```

This is already configured in the provided Dockerfile.

---

## 💰 Cost Optimization

### Free Tier Limits (per month)

- **Cloud Run**: 2 million requests, 360,000 GB-seconds memory, 180,000 vCPU-seconds
- **Cloud Build**: 120 build-minutes per day
- **Container Registry**: 5 GB storage (free forever)

### Optimization Tips

1. **Use minimum instances = 0** (default)
   - Only pay when traffic comes in
   - Accept cold start latency

2. **Set maximum instances**
   ```bash
   gcloud run services update waste-backend \
     --max-instances 5
   ```

3. **Enable concurrency**
   ```bash
   gcloud run services update waste-backend \
     --concurrency 80
   ```

4. **Use smaller memory where possible**
   - Frontend: 512Mi is sufficient
   - Backend: 2Gi for TensorFlow model

5. **Monitor usage**
   ```bash
   # View Cloud Run metrics
   gcloud monitoring dashboards list
   
   # Or use GCP Console
   # https://console.cloud.google.com/run
   ```

### Estimated Monthly Costs

With moderate usage (1000 requests/day):
- **Cloud Run**: ~$0-5/month (mostly free tier)
- **Container Registry**: ~$0.26/month (5GB storage)
- **Total**: ~$0-10/month

---

## 📊 Monitoring and Logs

### View Logs

```bash
# Backend logs
gcloud run services logs read waste-backend \
  --region us-central1 \
  --limit 50

# Frontend logs
gcloud run services logs read waste-frontend \
  --region us-central1 \
  --limit 50

# Follow logs in real-time
gcloud run services logs tail waste-backend --region us-central1
```

### View Metrics

```bash
# Open Cloud Run dashboard
gcloud run services describe waste-backend \
  --region us-central1 \
  --format 'value(status.url)' | \
  xargs -I {} open "https://console.cloud.google.com/run"
```

---

## 🔄 Updating Your Deployment

### Quick Update

```bash
# Just run the Cloud Build again
gcloud builds submit --config=cloudbuild.yaml
```

### Update Single Service

```bash
# Update backend only
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/waste-backend
gcloud run deploy waste-backend \
  --image gcr.io/PROJECT_ID/waste-backend \
  --region us-central1
```

---

## 🔒 Security Best Practices

1. **Restrict CORS in production**
   ```python
   # backend/api.py
   allow_origins=[
       "https://your-frontend-domain.run.app",
       "https://your-custom-domain.com"
   ]
   ```

2. **Enable authentication** (if needed)
   ```bash
   # Remove --allow-unauthenticated
   gcloud run services update waste-backend \
     --region us-central1 \
     --no-allow-unauthenticated
   ```

3. **Use secrets for sensitive data**
   ```bash
   # Create secret
   echo -n "secret-value" | gcloud secrets create MY_SECRET --data-file=-
   
   # Use in Cloud Run
   gcloud run services update waste-backend \
     --update-secrets=ENV_VAR=MY_SECRET:latest
   ```

---

## 🎉 Success!

After deployment, your application will be live at:
- **Frontend**: `https://waste-frontend-REGION-PROJECT_ID.run.app`
- **Backend**: `https://waste-backend-REGION-PROJECT_ID.run.app`

### Custom Domain (Optional)

To use your own domain:

1. **Map domain to Cloud Run**
   ```bash
   gcloud run domain-mappings create \
     --service waste-frontend \
     --domain your-domain.com \
     --region us-central1
   ```

2. **Update DNS records** (GCP will provide instructions)

3. **SSL certificate** is automatically provisioned

---

## 📚 Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 🆘 Need Help?

If you encounter issues:

1. Check the logs: `gcloud run services logs read SERVICE_NAME`
2. Verify environment variables: `gcloud run services describe SERVICE_NAME`
3. Test locally with Docker first: `docker-compose up`
4. Check GCP Status: https://status.cloud.google.com/

---

**Happy Deploying! 🚀**
