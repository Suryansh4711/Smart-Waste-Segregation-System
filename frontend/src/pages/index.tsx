import React, { useState, useRef } from "react";
import styles from "../styles/WasteClassifier.module.css";

const WasteClassifier: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setClassificationResult("");
        setConfidence(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageDataUrl = canvasRef.current.toDataURL("image/png");
        setImagePreview(imageDataUrl);
        stopCamera();
        setClassificationResult("");
        setConfidence(0);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Classify image - Replace with actual ML model API call
  const classifyImage = async () => {
    if (!imagePreview) {
      alert("Please upload or capture an image first!");
      return;
    }

    setIsClassifying(true);
    
    try {
      // TODO: Replace this with your actual ML model API endpoint
      // Example API call structure:
      /*
      const formData = new FormData();
      formData.append('image', imagePreview);
      
      const response = await fetch('YOUR_ML_API_ENDPOINT', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      setClassificationResult(data.category); // Should be: Paper, Plastic, Metal, or Other
      setConfidence(data.confidence); // Should be percentage (0-100)
      */
      
      // Mock classification for testing - Remove this when integrating ML model
      setTimeout(() => {
        const wasteTypes = [
          { type: "Paper", confidence: 92 },
          { type: "Plastic", confidence: 88 },
          { type: "Metal", confidence: 85 },
          { type: "Other", confidence: 79 }
        ];
        
        const randomResult = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
        setClassificationResult(randomResult.type);
        setConfidence(randomResult.confidence);
        setIsClassifying(false);
      }, 2000);
    } catch (error) {
      console.error("Classification error:", error);
      alert("Error classifying image. Please try again.");
      setIsClassifying(false);
    }
  };

  // Reset all
  const resetAll = () => {
    setImagePreview(null);
    setClassificationResult("");
    setConfidence(0);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get classification color
  const getClassificationColor = () => {
    const colors: { [key: string]: string } = {
      Paper: "#f39c12",
      Plastic: "#3498db",
      Metal: "#95a5a6",
      Other: "#e74c3c"
    };
    return colors[classificationResult] || "#333";
  };

  return (
    <div className={styles.wasteClassifierContainer}>
      <header className={styles.header}>
        <h1>♻️ Smart Waste Segregation System</h1>
        <p>Upload or capture waste image for automatic classification</p>
      </header>

      <div className={styles.mainContent}>
        {/* Image Capture/Preview Section */}
        <div className={styles.imageSection}>
          <div className={styles.imagePreviewBox}>
            {!isCameraActive && !imagePreview && (
              <div className={styles.placeholder}>
                <span className={styles.icon}>📷</span>
                <p>No image selected</p>
                <p className={styles.hint}>Upload or capture an image to begin</p>
              </div>
            )}

            {isCameraActive && (
              <div className={styles.cameraView}>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className={styles.videoElement}
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div className={styles.cameraControls}>
                  <button className={`${styles.btn} ${styles.btnCapture}`} onClick={captureImage}>
                    📸 Capture
                  </button>
                  <button className={`${styles.btn} ${styles.btnCancel}`} onClick={stopCamera}>
                    ❌ Cancel
                  </button>
                </div>
              </div>
            )}

            {imagePreview && !isCameraActive && (
              <div className={styles.previewImage}>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnUpload}`} onClick={() => fileInputRef.current?.click()}>
              📁 Upload Image
            </button>
            <button className={`${styles.btn} ${styles.btnCamera}`} onClick={startCamera}>
              📷 Open Camera
            </button>
            <button 
              className={`${styles.btn} ${styles.btnClassify}`}
              onClick={classifyImage}
              disabled={!imagePreview || isClassifying}
            >
              {isClassifying ? "⏳ Classifying..." : "🔍 Classify"}
            </button>
            <button className={`${styles.btn} ${styles.btnReset}`} onClick={resetAll}>
              🔄 Reset
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        {/* Classification Results Section */}
        <div className={styles.classificationSection}>
          <h2>Classification Results</h2>
          
          <div className={styles.resultCard}>
            {!classificationResult ? (
              <div className={styles.noResult}>
                <span className={styles.icon}>🤖</span>
                <p>Awaiting classification...</p>
                <p className={styles.hint}>Click "Classify" button to analyze the image</p>
              </div>
            ) : (
              <div className={styles.resultDetails}>
                <div 
                  className={styles.wasteType}
                  style={{ borderColor: getClassificationColor() }}
                >
                  <h3 style={{ color: getClassificationColor() }}>
                    {classificationResult}
                  </h3>
                </div>

                <div className={styles.confidenceMeter}>
                  <label>Confidence Level</label>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${confidence}%`,
                        backgroundColor: getClassificationColor()
                      }}
                    />
                  </div>
                  <span className={styles.confidenceValue}>{confidence}%</span>
                </div>

                <div className={styles.disposalGuide}>
                  <h4>Disposal Instructions:</h4>
                  <div className={styles.guideContent}>
                    {classificationResult === "Paper" && (
                      <ul>
                        <li>📄 Remove any plastic coating or tape</li>
                        <li>🗑️ Place in blue recycling bin</li>
                        <li>✂️ Flatten boxes to save space</li>
                        <li>🚫 Keep dry - wet paper is not recyclable</li>
                      </ul>
                    )}
                    {classificationResult === "Plastic" && (
                      <ul>
                        <li>♻️ Rinse and clean the plastic item</li>
                        <li>🗑️ Place in designated plastic recycling bin</li>
                        <li>⚠️ Check recycling symbol (1-7) for proper type</li>
                        <li>🧴 Remove caps and labels if possible</li>
                      </ul>
                    )}
                    {classificationResult === "Metal" && (
                      <ul>
                        <li>🔧 Clean and dry metal items</li>
                        <li>🗑️ Place in metal recycling bin</li>
                        <li>💰 Consider scrap metal collection for large items</li>
                        <li>🥫 Aluminum cans should be crushed to save space</li>
                      </ul>
                    )}
                    {classificationResult === "Other" && (
                      <ul>
                        <li>🗑️ Place in general waste bin</li>
                        <li>⚠️ Check if item can be repaired or donated</li>
                        <li>🏢 Consider special disposal for hazardous items</li>
                        <li>🚫 Do not mix with recyclable materials</li>
                      </ul>
                    )}
                  </div>
                </div>

                <div className={styles.binIndicator}>
                  <span className={styles.binIcon}>🗑️</span>
                  <p>
                    Dispose in: <strong style={{ color: getClassificationColor() }}>
                      {classificationResult} Waste Bin
                    </strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.wasteCategories}>
            <h3>Waste Categories</h3>
            <div className={styles.categoryGrid}>
              <div className={styles.categoryItem} style={{ borderLeftColor: "#f39c12" }}>
                <span>📄 Paper</span>
              </div>
              <div className={styles.categoryItem} style={{ borderLeftColor: "#3498db" }}>
                <span>♻️ Plastic</span>
              </div>
              <div className={styles.categoryItem} style={{ borderLeftColor: "#95a5a6" }}>
                <span>🔧 Metal</span>
              </div>
              <div className={styles.categoryItem} style={{ borderLeftColor: "#e74c3c" }}>
                <span>🗑️ Other</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteClassifier;
