# ♻️ Smart Waste Segregation System  

An AI-powered web application that automatically classifies waste as **biodegradable** or **non-biodegradable** using **Deep Learning** and **Computer Vision**.  

Users can upload waste images through a modern web interface, and the system uses a trained **EfficientNet-based TensorFlow model** to classify the waste in real-time — making waste identification fast, accurate, and accessible from anywhere.

---

## 🚀 Features  
- 🔍 **AI-Powered Classification**: Deep learning model trained on waste datasets
- 🌐 **Web-Based Interface**: Modern Next.js frontend with responsive design
- ⚡ **Fast API Backend**: FastAPI-powered REST API for real-time predictions
- ☁️ **Cloud-Ready**: Containerized with Docker and deployable to Google Cloud Run
- 📊 **Confidence Scores**: Get prediction confidence for each classification
- 🎨 **Modern UI**: Built with React, TailwindCSS, and Shadcn components

---

## 🧠 Tech Stack  

**Frontend:**  
- Next.js 15.5 (React 19)
- TailwindCSS 4
- TypeScript
- Shadcn UI Components
- Lucide Icons

**Backend:**  
- FastAPI
- TensorFlow 2.16 / Keras
- EfficientNet (Transfer Learning)
- OpenCV
- Pillow (PIL)
- Uvicorn

**Machine Learning:**  
- TensorFlow/Keras with Apple Metal optimization
- EfficientNet architecture
- Image preprocessing and augmentation
- Model training in Jupyter notebooks

**DevOps & Deployment:**  
- Docker & Docker Compose
- Google Cloud Platform (Cloud Run, Container Registry)
- Cloud Build for CI/CD
- Nginx for production frontend serving

---

## 📁 Project Structure

\`\`\`
Smart-Waste-Segregation-System/
├── backend/                    # FastAPI backend service
│   ├── api.py                 # Main API with /predict endpoint
│   ├── waste_model.h5         # Trained TensorFlow model
│   ├── waste_model.tflite     # Optimized TFLite model
│   ├── train_model.ipynb      # Model training notebook
│   ├── Dockerfile             # Backend container
│   └── requirements-prod.txt  # Production dependencies
├── frontend/                   # Next.js frontend application
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   └── components/       # React components
│   ├── Dockerfile            # Frontend container
│   └── package.json          # Node.js dependencies
├── docker-compose.yml         # Local development orchestration
├── cloudbuild.yaml           # GCP Cloud Build configuration
├── deploy.sh                 # Automated deployment script
├── test-local.sh             # Local testing script
├── DEPLOYMENT.md             # Comprehensive deployment guide
└── QUICKSTART.md             # Quick start instructions
\`\`\`

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** 20+ and npm/pnpm
- **Python** 3.10+
- **Docker Desktop** (for containerized deployment)
- **Google Cloud SDK** (for cloud deployment)

### Local Development

**Option 1: Development Mode (Hot Reload)**

\`\`\`bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python api.py
# Backend runs on http://localhost:8080

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
\`\`\`

**Option 2: Docker (Production-like)**

\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
\`\`\`

### Quick Testing

\`\`\`bash
# Run automated local tests
./test-local.sh
\`\`\`

---

## ☁️ Deployment

### Deploy to Google Cloud Run

\`\`\`bash
# 1. Login to GCP
gcloud auth login

# 2. Set your project
gcloud config set project YOUR_PROJECT_ID

# 3. Deploy using Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# OR use the automated script
./deploy.sh
\`\`\`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 API Endpoints

### POST \`/predict\`
Upload an image to classify waste type

**Request:**
\`\`\`bash
curl -X POST "http://localhost:8080/predict" \\
  -F "file=@waste_image.jpg"
\`\`\`

**Response:**
\`\`\`json
{
  "prediction": "bio-degradable",
  "confidence": 0.9542
}
\`\`\`

---

## 🧪 Model Details

- **Architecture**: EfficientNet (Transfer Learning)
- **Input Size**: 224x224 RGB images
- **Classes**: 
  - \`bio-degradable\`: Organic waste (food, leaves, paper)
  - \`non-biodegradable\`: Plastic, metal, glass
- **Framework**: TensorFlow 2.16 with Keras
- **Optimization**: Apple Metal acceleration for M-series Macs
- **Format**: Keras H5 model + TFLite for edge deployment

---

## 🌍 Goal  
To build a smarter, more sustainable way of handling waste through accessible AI technology that anyone can use from their web browser.

---

## 🔧 Environment Configuration

**Local Development:**
- Frontend: Set \`NEXT_PUBLIC_API_URL=http://localhost:8080\` in \`frontend/.env.local\`
- Backend: Runs on port 8080 by default

**Production (GCP):**
- Environment variables set automatically during Cloud Build
- CORS configured for cross-origin requests
- Health checks enabled for both services

---

## 📚 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - Fast setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md) - Deployment overview

---

## 🧩 Future Enhancements  
- Multi-class classification (recyclable, e-waste, hazardous)
- Mobile app integration (React Native)
- Real-time camera classification
- User authentication and history tracking
- Analytics dashboard for waste statistics
- IoT integration for smart bin hardware
- Multi-language support

---

## 👨‍💻 Team

Developed by **Aditya Sharma**, **Suryansh Agarwal**, and **Yash Jain**

> Built with 💚 using AI, Deep Learning, and sustainable innovation.

---

## 📄 License

This project is developed for educational and environmental purposes.
