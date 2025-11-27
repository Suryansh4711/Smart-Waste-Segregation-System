"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileImage, ArrowLeft, Sparkles, Leaf, Trash2, Camera, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function Classifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [prediction, setPrediction] = useState<{
    category: "Biodegradable" | "Non-Biodegradable";
    confidence: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setSelectedFile(file);
      setFileName(file.name);
      setPrediction(null);
      setError(null);
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

  const handlePredict = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction from server");
      }

      const data = await response.json();
      
      // Map backend response to frontend format
      const category = data.prediction === "bio-degradable" 
        ? "Biodegradable" 
        : "Non-Biodegradable";
      
      setPrediction({
        category: category as "Biodegradable" | "Non-Biodegradable",
        confidence: data.confidence,
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze image. Please make sure the backend server is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-emerald-100 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-emerald-300 rounded-full px-6 py-6 text-emerald-700 font-semibold shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/70 backdrop-blur-md rounded-full shadow-xl border-2 border-emerald-300/50 hover:border-emerald-400/70 transition-all duration-300 hover:scale-105 mb-6">
              <Camera className="h-6 w-6 text-emerald-600 animate-pulse" />
              <span className="text-base font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                AI-Powered Classification
              </span>
              <Sparkles className="h-6 w-6 text-green-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
              Waste Classifier
            </h1>
            <p className="text-gray-700 text-xl max-w-3xl mx-auto font-medium">
              Upload an image to instantly identify if waste is <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">biodegradable</span> or <span className="font-bold text-red-700 bg-red-100 px-2 py-1 rounded">non-biodegradable</span>
            </p>
          </div>

          <Card className="p-10 md:p-14 shadow-2xl backdrop-blur-xl bg-white/95 animate-fade-in border-2 border-emerald-200/50 hover:border-emerald-300/70 rounded-3xl transition-all duration-500" style={{ animationDelay: "0.2s" }}>
            {/* Upload Section */}
            <div
              className={`border-3 border-dashed rounded-3xl p-14 md:p-20 text-center transition-all duration-500 ${
                isDragging
                  ? "border-emerald-600 bg-emerald-50 scale-105 shadow-2xl"
                  : "border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/30 hover:scale-[1.02]"
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
                <div className="space-y-10 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-3xl opacity-25 animate-pulse" />
                      <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-10 rounded-full shadow-2xl hover:shadow-emerald-400/50 transition-all duration-500 hover:scale-110">
                        <Upload className="h-24 w-24 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-3xl font-black text-gray-800">
                      Drop your waste image here
                    </p>
                    <p className="text-lg text-gray-600 font-medium">
                      or click the button below to browse
                    </p>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 pt-2">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>JPG</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>PNG</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>WEBP</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 group text-lg px-12 py-8 h-auto rounded-full font-bold overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <FileImage className="mr-3 h-6 w-6 relative z-10" />
                    <span className="relative z-10">Select Image</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-scale-in">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-2xl opacity-20" />
                      <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-10 rounded-3xl shadow-2xl">
                        <CheckCircle2 className="h-28 w-28 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse" />
                      <p className="text-sm font-semibold text-green-700 dark:text-green-300">Image Ready</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">Successfully Uploaded!</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-md mx-auto px-4">
                      📄 {fileName}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setPrediction(null);
                    }}
                    variant="outline"
                    size="lg"
                    className="border-2 border-green-600 dark:border-green-400 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:scale-105 transition-all duration-300 rounded-full px-8 py-6"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Change Image
                  </Button>
                </div>
              )}
            </div>

            {/* Predict Button */}
            {selectedImage && !prediction && !isAnalyzing && (
              <div className="mt-12 text-center animate-fade-in">
                <Button
                  onClick={handlePredict}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 text-xl px-12 py-8 h-auto rounded-full relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Sparkles className="mr-3 h-7 w-7 animate-pulse" />
                  <span className="relative z-10">Analyze & Predict</span>
                  <ArrowLeft className="ml-3 h-7 w-7 rotate-180 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            )}

            {/* Error Display */}
            {error && !isAnalyzing && (
              <div className="mt-12 animate-fade-in">
                <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
                      <p className="text-red-700">{error}</p>
                      <p className="text-sm text-red-600 mt-2">
                        Make sure the backend server is running on http://localhost:8080
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analyzing State */}
            {isAnalyzing && (
              <div className="mt-12 text-center animate-fade-in">
                <div className="inline-flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-8 border-green-200 rounded-full" />
                    <div className="absolute top-0 left-0 w-24 h-24 border-8 border-green-600 rounded-full border-t-transparent animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-green-600 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Analyzing Image...</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Our AI is processing your waste image</p>
                  </div>
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
}
