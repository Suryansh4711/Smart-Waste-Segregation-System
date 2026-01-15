# ♻️ Smart Waste Segregation System  

<div align="center">

An AI-powered web application that automatically classifies waste as **biodegradable** or **non-biodegradable** using Deep Learning and Computer Vision.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=netlify)](https://waste-frontend.netlify.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://waste-frontend.netlify.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)

</div>

---

## 📖 About

This project provides an accessible, web-based solution for waste classification. Simply upload an image of waste through the intuitive interface, and our trained **EfficientNet model** instantly identifies whether it's biodegradable or non-biodegradable — helping promote better recycling habits and environmental awareness.

**Perfect for:**
- 🏫 Educational institutions teaching environmental science
- ♻️ Recycling centers and waste management facilities  
- 🏘️ Community awareness programs
- 🌱 Anyone wanting to learn about proper waste segregation

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#️-deployment)
- [API Documentation](#-api-documentation)
- [Model Information](#-model-information)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributors](#-contributors)

---

## 🌐 Live Demo

<div align="center">

### **[🚀 Try it Now →](https://waste-frontend.netlify.app/)**

**Deployed on:**  
Frontend: Netlify | Backend: Render

_No installation required — just upload an image and get instant results!_ ✨

</div>

---

## ⚡ Quick Start

**Want to run locally?**

```bash
# Clone the repository
git clone https://github.com/Suryansh4711/Smart-Waste-Segregation-System.git
cd Smart-Waste-Segregation-System

# Start Backend (Terminal 1)
cd backend
pip install -r requirements.txt
python api.py

# Start Frontend (Terminal 2)
cd frontend
npm install
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 🚀 Features  
- 🔍 **AI-Powered Classification**: Deep learning model trained on waste datasets
- 🌐 **Modern Web Interface**: Built with Next.js 15 and React 19
- ⚡ **Fast API Backend**: FastAPI-powered REST API for real-time predictions
- 📊 **Confidence Scores**: Get prediction confidence for each classification
- 🎨 **Beautiful UI**: TailwindCSS 4 with Shadcn/UI components
- 📱 **Fully Responsive**: Works seamlessly on desktop and mobile devices

---

## 🔄 How It Works

1. **Upload Image**: User uploads a photo of waste through the web interface
2. **Preprocessing**: Image is resized and normalized (224×224 pixels)
3. **AI Classification**: EfficientNet model analyzes the image
4. **Results**: System returns classification (biodegradable/non-biodegradable) with confidence score
5. **Action**: User gets instant feedback to properly segregate waste

---

## 🛠️ Tech Stack  

<table>
<tr>
<td valign="top" width="33%">

### Frontend
- Next.js 15.5
- React 19
- TypeScript
- TailwindCSS 4
- Shadcn/UI
- Lucide Icons

</td>
<td valign="top" width="33%">

### Backend
- FastAPI
- TensorFlow 2.16
- EfficientNet
- OpenCV
- Pillow
- Uvicorn

</td>
<td valign="top" width="33%">

### Deployment
- Netlify
- Render
- Docker
- Docker Compose

</td>
</tr>
</table>

---

## 📁 Project Structure

```
Smart-Waste-Segregation-System/
├── backend/                      # FastAPI backend service
│   ├── api.py                   # Main API with /predict endpoint
│   ├── waste_model.h5           # Trained TensorFlow model
│   ├── waste_model.tflite       # Optimized TFLite model
│   ├── train_model.ipynb        # Model training notebook
│   ├── convert_to_tflite.py     # TFLite conversion script
│   ├── requirements.txt         # Development dependencies
│   ├── requirements-prod.txt    # Production dependencies
│   ├── runtime.txt              # Python version for Render
│   ├── Dockerfile               # Docker configuration
│   └── dataset/                 # Training dataset
│       ├── bio-degradable/
│       └── non-biodegradable/
├── frontend/                     # Next.js frontend application
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   ├── components/          # React components
│   │   └── lib/                 # Utility functions
│   ├── public/                  # Static assets
│   ├── package.json             # Dependencies
│   └── Dockerfile               # Docker configuration
├── docker-compose.yml           # Local Docker development
├── netlify.toml                 # Netlify config
├── render.yaml                  # Render config
└── README.md                    # Documentation
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** 20+ and npm/pnpm
- **Python** 3.10+
- **Docker** (optional, for containerized development)

### Local Development

**Option 1: Development Mode (Recommended)**

```bash
# Terminal 1 - Start Backend
cd backend
pip install -r requirements.txt
python api.py
# Backend runs on http://localhost:8080

# Terminal 2 - Start Frontend
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

**Option 2: Using Docker Compose**

```bash
# Build and start both services
docker-compose up --build

# Access the application:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

---

## ☁️ Deployment

### 🌐 Live Application
**Visit:** [https://waste-frontend.netlify.app/](https://waste-frontend.netlify.app/)

**Hosting:**
- **Frontend**: Netlify (Automatic deployments from GitHub)
- **Backend**: Render (Web Service)

### Deploy Your Own Instance

<details>
<summary><b>Deploy Frontend to Netlify</b></summary>

1. Fork this repository to your GitHub account
2. Log in to [Netlify](https://netlify.com) and click "Add new site"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
6. Deploy!

</details>

<details>
<summary><b>Deploy Backend to Render</b></summary>

1. Log in to [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: Your service name
   - **Root directory**: `backend`
   - **Runtime**: Python 3
   - **Build command**: `pip install -r requirements-prod.txt`
   - **Start command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (if needed)
6. Deploy!

</details>

---

## 🎯 API Documentation

### Health Check
```bash
GET /
```
Returns API status and version information.

### Predict Waste Type
```bash
POST /predict
```

Upload an image to classify waste as biodegradable or non-biodegradable.

**Example Request:**
```bash
curl -X POST "https://your-backend.onrender.com/predict" \
  -F "file=@waste_image.jpg"
```

**Example Response:**
```json
{
  "prediction": "bio-degradable",
  "confidence": 0.9542
}
```

**Supported Image Formats:** JPEG, PNG, JPG  
**Max File Size:** 10MB

---

## 🧪 Model Information

| Property | Details |
|----------|---------|
| **Architecture** | EfficientNet (Transfer Learning) |
| **Input Size** | 224×224 RGB images |
| **Framework** | TensorFlow 2.16 / Keras |
| **Classes** | `bio-degradable`, `non-biodegradable` |
| **Model Files** | H5 (full model), TFLite (optimized) |

**Classification Examples:**
- **Biodegradable**: Food scraps, leaves, paper, cardboard, wood
- **Non-biodegradable**: Plastic, metal, glass, rubber, synthetic materials

---

## 🔧 Configuration

### Local Development
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Production (Netlify)
Set environment variable in Netlify dashboard:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### Backend CORS
The backend automatically allows requests from:
- `http://localhost:3000` (local development)
- Your Netlify frontend URL (production)

---

## 🌍 Project Vision

Building a smarter, more sustainable way to handle waste through accessible AI technology. This system helps individuals and organizations quickly identify waste types, promoting better recycling habits and environmental responsibility.

---

## ❓ Troubleshooting

<details>
<summary><b>Backend API not responding</b></summary>

- Check if backend is running: `http://localhost:8080`
- Verify Python dependencies: `pip install -r requirements.txt`
- Check CORS settings in `api.py`
- Ensure model files exist in `backend/` directory

</details>

<details>
<summary><b>Frontend can't connect to backend</b></summary>

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check if backend URL is correct (should be `http://localhost:8080` for local)
- Clear browser cache and reload
- Check browser console for CORS errors

</details>

<details>
<summary><b>Model prediction errors</b></summary>

- Ensure image is in JPEG/PNG format
- Check image file size (should be < 10MB)
- Verify model file `waste_model.h5` exists
- Check TensorFlow installation: `pip show tensorflow`

</details>

---

## 🚀 Future Enhancements  
- [ ] Multi-class classification (recyclable, e-waste, hazardous, compostable)
- [ ] Real-time camera/webcam classification
- [ ] Mobile app (React Native or Flutter)
- [ ] User authentication and classification history
- [ ] Analytics dashboard with waste statistics
- [ ] Batch image processing
- [ ] Multi-language support (i18n)
- [ ] IoT integration for smart waste bins

---

## 👥 Contributors

Built with 💚 by **Aditya Sharma**, **Suryansh Agarwal**, and **Yash Jain**

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is developed for educational and environmental purposes.

---

<div align="center">

**[⬆ Back to Top](#-smart-waste-segregation-system)**

Made with passion for a sustainable future 🌱

</div>
