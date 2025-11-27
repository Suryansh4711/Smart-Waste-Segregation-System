#!/bin/bash

# Quick Deploy to GCP - Interactive Script
# This script guides you through the deployment process

set -e

echo "🚀 Smart Waste Segregation System - GCP Deployment"
echo "════════════════════════════════════════════════════"
echo ""

# Check prerequisites
echo "Step 1: Checking prerequisites..."
./verify-setup.sh || exit 1

echo ""
echo "════════════════════════════════════════════════════"
echo ""

# Get project info
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "Please enter your GCP Project ID:"
    read -r PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo "Deploying to project: $PROJECT_ID"
echo ""

# Choose region
echo "Select deployment region:"
echo "  1) us-central1 (Iowa) - Recommended"
echo "  2) us-east1 (South Carolina)"
echo "  3) europe-west1 (Belgium)"
echo "  4) asia-southeast1 (Singapore)"
echo "  5) Custom region"
echo ""
read -p "Enter choice [1-5]: " region_choice

case $region_choice in
    1) REGION="us-central1" ;;
    2) REGION="us-east1" ;;
    3) REGION="europe-west1" ;;
    4) REGION="asia-southeast1" ;;
    5)
        echo "Enter custom region:"
        read -r REGION
        ;;
    *) REGION="us-central1" ;;
esac

echo "Using region: $REGION"
echo ""

# Deployment method
echo "Choose deployment method:"
echo "  1) Automated (Cloud Build) - Recommended"
echo "  2) Manual (Step by step)"
echo ""
read -p "Enter choice [1-2]: " deploy_choice

echo ""
echo "════════════════════════════════════════════════════"
echo ""

if [ "$deploy_choice" = "1" ]; then
    echo "🏗️  Starting automated deployment with Cloud Build..."
    echo ""
    
    # Update cloudbuild.yaml with region
    sed -i.bak "s/_REGION: '.*'/_REGION: '$REGION'/" cloudbuild.yaml
    
    echo "Submitting build to Cloud Build..."
    gcloud builds submit --config=cloudbuild.yaml --project="$PROJECT_ID"
    
    echo ""
    echo "✅ Deployment complete!"
    
else
    echo "🏗️  Starting manual deployment..."
    echo ""
    
    # Enable APIs
    echo "Enabling required GCP APIs..."
    gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com --project="$PROJECT_ID"
    
    # Deploy backend
    echo ""
    echo "Step 2: Building and deploying backend..."
    cd backend
    gcloud builds submit --tag "gcr.io/$PROJECT_ID/waste-backend" --project="$PROJECT_ID"
    
    gcloud run deploy waste-backend \
        --image "gcr.io/$PROJECT_ID/waste-backend" \
        --platform managed \
        --region "$REGION" \
        --allow-unauthenticated \
        --memory 2Gi \
        --cpu 2 \
        --max-instances 10 \
        --port 8080 \
        --project="$PROJECT_ID"
    
    BACKEND_URL=$(gcloud run services describe waste-backend --platform managed --region "$REGION" --project="$PROJECT_ID" --format 'value(status.url)')
    echo "✅ Backend deployed: $BACKEND_URL"
    
    # Deploy frontend
    echo ""
    echo "Step 3: Building and deploying frontend..."
    cd ../frontend
    
    gcloud builds submit --tag "gcr.io/$PROJECT_ID/waste-frontend" --project="$PROJECT_ID"
    
    gcloud run deploy waste-frontend \
        --image "gcr.io/$PROJECT_ID/waste-frontend" \
        --platform managed \
        --region "$REGION" \
        --allow-unauthenticated \
        --memory 512Mi \
        --cpu 1 \
        --max-instances 10 \
        --port 3000 \
        --set-env-vars "NEXT_PUBLIC_API_URL=$BACKEND_URL" \
        --project="$PROJECT_ID"
    
    cd ..
    
    echo ""
    echo "✅ Deployment complete!"
fi

# Get final URLs
echo ""
echo "════════════════════════════════════════════════════"
echo ""
BACKEND_URL=$(gcloud run services describe waste-backend --platform managed --region "$REGION" --project="$PROJECT_ID" --format 'value(status.url)')
FRONTEND_URL=$(gcloud run services describe waste-frontend --platform managed --region "$REGION" --project="$PROJECT_ID" --format 'value(status.url)')

echo "🎉 Your application is live!"
echo ""
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""
echo "Visit your application: $FRONTEND_URL"
echo ""
echo "════════════════════════════════════════════════════"
echo ""
echo "Useful commands:"
echo "  View logs:   gcloud run services logs read waste-frontend --region $REGION"
echo "  Update app:  gcloud builds submit --config=cloudbuild.yaml"
echo "  Monitor:     https://console.cloud.google.com/run"
echo ""
