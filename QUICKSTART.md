# 🌟 Quick Start Guide

## Running Locally

### Option 1: Development Mode (Hot Reload)

**Terminal 1 - Backend:**
```bash
cd backend
python api.py
# Backend runs on http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### Option 2: Docker (Production-like)

```bash
# Test with Docker Compose
./test-local.sh

# Or manually:
docker-compose up --build
```

---

## Deploying to GCP

### Quick Deploy (Automated)

```bash
# 1. Login to GCP
gcloud auth login

# 2. Set your project
gcloud config set project YOUR_PROJECT_ID

# 3. Deploy everything
gcloud builds submit --config=cloudbuild.yaml
```

### Manual Deploy (Step by Step)

```bash
# 1. Edit and run the deploy script
nano deploy.sh  # Update PROJECT_ID
chmod +x deploy.sh
./deploy.sh
```

### Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

---

## 📁 Project Structure

```
Smart-Waste-Segregation-System/
├── backend/                 # FastAPI backend
│   ├── api.py              # Main API file
│   ├── waste_model.h5      # TensorFlow model
│   ├── Dockerfile          # Backend container
│   └── requirements-prod.txt
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   └── components/    # React components
│   ├── Dockerfile         # Frontend container
│   └── .env.local         # Local env vars
├── docker-compose.yml      # Local testing
├── cloudbuild.yaml        # GCP deployment
├── deploy.sh              # Manual deployment script
├── test-local.sh          # Local testing script
└── DEPLOYMENT.md          # Full deployment guide
```

---

## 🔧 Environment Variables

**Local Development:**
- Frontend uses: `http://localhost:8080`
- Set in `frontend/.env.local`

**Production (GCP):**
- Frontend uses: Your Cloud Run backend URL
- Set automatically during deployment

---

## 🎯 Next Steps

1. ✅ Test locally: `./test-local.sh`
2. ✅ Set up GCP project
3. ✅ Deploy: `./deploy.sh`
4. ✅ Visit your live app!

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md)
