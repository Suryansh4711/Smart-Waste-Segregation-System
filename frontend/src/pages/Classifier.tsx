import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileImage, ArrowLeft, Sparkles, Leaf, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Classifier = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [prediction, setPrediction] = useState<{
    category: "Biodegradable" | "Non-Biodegradable";
    confidence: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setFileName(file.name);
      setPrediction(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handlePredict = () => {
    setIsAnalyzing(true);
    // Simulated prediction - in real app, this would call an ML API
    setTimeout(() => {
      const categories: Array<{ category: "Biodegradable" | "Non-Biodegradable"; confidence: number }> = [
        { category: "Biodegradable", confidence: 0.94 },
        { category: "Non-Biodegradable", confidence: 0.91 },
      ];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setPrediction(randomCategory);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary/50 hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full shadow-soft mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                AI-Powered Classification
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
              Waste Classifier
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload an image to identify if waste is biodegradable
            </p>
          </div>

          <Card className="p-8 md:p-12 shadow-hover backdrop-blur-sm bg-card/95 animate-fade-in border-border/50" style={{ animationDelay: "0.2s" }}>
            {/* Upload Section */}
            <div
              className={`border-2 border-dashed rounded-2xl p-12 md:p-16 text-center transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/10 scale-105 shadow-hover"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!selectedImage ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="bg-gradient-hero p-6 rounded-full shadow-soft animate-pulse">
                      <Upload className="h-16 w-16 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2 text-foreground">
                      Drop your waste image here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse • Supports JPG, PNG, WEBP
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    className="shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto"
                  >
                    <FileImage className="mr-2 h-5 w-5" />
                    Select Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-scale-in">
                  <div className="flex justify-center">
                    <div className="bg-gradient-hero p-8 rounded-3xl shadow-hover">
                      <FileImage className="h-24 w-24 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">Image uploaded</p>
                    <p className="text-sm text-muted-foreground truncate max-w-md mx-auto">
                      {fileName}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setPrediction(null);
                    }}
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    Change Image
                  </Button>
                </div>
              )}
            </div>

            {/* Predict Button */}
            {selectedImage && !prediction && !isAnalyzing && (
              <div className="mt-10 text-center animate-fade-in">
                <Button
                  onClick={handlePredict}
                  size="lg"
                  className="shadow-hover hover:shadow-soft transition-all duration-300 hover:scale-105 text-lg px-10 py-6 h-auto"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  Predict Category
                </Button>
              </div>
            )}

            {/* Analyzing State */}
            {isAnalyzing && (
              <div className="mt-10 text-center animate-fade-in">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 rounded-full">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  <span className="text-lg font-medium text-primary">Analyzing...</span>
                </div>
              </div>
            )}

            {/* Results Section */}
            {prediction && !isAnalyzing && (
              <div className="mt-10 animate-fade-in">
                <Card className={`p-8 md:p-10 border-2 transition-all duration-500 ${
                  prediction.category === "Biodegradable" 
                    ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30" 
                    : "bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/30"
                }`}>
                  <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center animate-scale-in">
                      <div className={`p-6 rounded-full ${
                        prediction.category === "Biodegradable" 
                          ? "bg-primary/20" 
                          : "bg-destructive/20"
                      }`}>
                        {prediction.category === "Biodegradable" ? (
                          <Leaf className={`h-16 w-16 ${
                            prediction.category === "Biodegradable" 
                              ? "text-primary" 
                              : "text-destructive"
                          }`} />
                        ) : (
                          <Trash2 className="h-16 w-16 text-destructive" />
                        )}
                      </div>
                    </div>

                    {/* Result Text */}
                    <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                        {prediction.category}
                      </h3>
                      <p className="text-muted-foreground">
                        {prediction.category === "Biodegradable" 
                          ? "This waste can decompose naturally" 
                          : "This waste requires special disposal"}
                      </p>
                    </div>

                    {/* Confidence Bar */}
                    <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Confidence</span>
                        <span className="text-lg font-bold text-foreground">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ease-out ${
                            prediction.category === "Biodegradable" 
                              ? "bg-gradient-hero" 
                              : "bg-gradient-to-r from-destructive to-destructive/80"
                          }`}
                          style={{ width: `${prediction.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => {
                        setSelectedImage(null);
                        setFileName("");
                        setPrediction(null);
                      }}
                      variant="outline"
                      size="lg"
                      className="w-full mt-6 hover:scale-105 transition-all duration-300 text-lg py-6 h-auto"
                    >
                      Classify Another Image
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Classifier;
