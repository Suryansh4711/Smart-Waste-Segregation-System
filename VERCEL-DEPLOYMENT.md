# Vercel Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- Backend deployed (Render/Railway recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your repository: `Smart-Waste-Segregation-System`
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `pnpm install && pnpm build`
   
5. Add Environment Variable:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your backend URL (e.g., `https://waste-backend.onrender.com`)

6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: smart-waste-segregation
# - Directory: ./
# - Override settings? No

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL

# Deploy to production
vercel --prod
```

## Backend Deployment Options

### Option A: Render.com (Recommended - Free Tier)

1. Sign up at https://render.com
2. Connect GitHub repository
3. Create New Web Service
4. Select repository and `backend` folder
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
6. Deploy (free tier available)

### Option B: Railway.app (Alternative - Free Tier)

1. Sign up at https://railway.app
2. Create New Project from GitHub
3. Select repository
4. Add Python service pointing to `backend` folder
5. Railway auto-detects Python and deploys

### Option C: Fly.io (Alternative)

```bash
# Install flyctl
brew install flyctl

# Navigate to backend
cd backend

# Login and launch
fly auth login
fly launch

# Deploy
fly deploy
```

## Complete Deployment Flow

1. ✅ Deploy Backend to Render/Railway
2. ✅ Copy backend URL
3. ✅ Deploy Frontend to Vercel with backend URL
4. ✅ Test your application

## Vercel Deployment Features

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Generous free tier

## Environment Variables

Make sure to set in Vercel:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```
