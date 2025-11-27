"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Recycle, Leaf, ArrowRight, Upload, Sparkles, CheckCircle2, X, TreePine, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-14 animate-fade-in">
          {/* Centered Illustration with enhanced styling */}
          <div className="relative inline-block animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-400 blur-3xl opacity-25 rounded-full animate-pulse" />
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-2 border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover:shadow-emerald-200/50">
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <Image
                src="/hero-waste.png"
                alt="Smart Waste Segregation - Eco-friendly recycling illustration"
                width={800}
                height={600}
                className="relative rounded-2xl w-full max-w-2xl mx-auto hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-7 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center gap-3 px-7 py-3.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border-2 border-emerald-300/50 hover:border-emerald-400/70 transition-all duration-300 hover:scale-105">
              <TreePine className="h-5 w-5 text-emerald-600 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                AI-Powered Eco Solution
              </span>
              <Zap className="h-5 w-5 text-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="text-gray-800">Welcome to our</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
                Smart Waste Segregation
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                System
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Harness the power of <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">artificial intelligence</span> to identify and properly categorize waste. 
              Make recycling effortless and contribute to a <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">sustainable future</span>.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link href="/classifier">
              <Button
                size="lg"
                className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 group text-lg px-12 py-8 h-auto rounded-full font-bold overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Sparkles className="mr-3 h-6 w-6 animate-pulse relative z-10" />
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </Button>
            </Link>
            <Button
              onClick={() => setShowLearnMore(!showLearnMore)}
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-md border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg px-12 py-8 h-auto rounded-full font-bold"
            >
              <Recycle className="mr-3 h-6 w-6" />
              Learn More
            </Button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white via-emerald-50/50 to-green-50 backdrop-blur-sm shadow-2xl hover:shadow-emerald-300/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border-2 border-emerald-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-green-400/5 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mb-5 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-3 drop-shadow">95%</p>
                <p className="text-base md:text-lg text-gray-700 font-bold">AI Accuracy</p>
                <p className="text-sm text-gray-500 mt-2">Precision classification</p>
              </div>
            </div>
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white via-green-50/50 to-emerald-50 backdrop-blur-sm shadow-2xl hover:shadow-green-300/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border-2 border-green-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-emerald-400/5 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-5 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Recycle className="h-10 w-10 text-white" />
                </div>
                <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-3 drop-shadow">2</p>
                <p className="text-base md:text-lg text-gray-700 font-bold">Waste Categories</p>
                <p className="text-sm text-gray-500 mt-2">Biodegradable & Non-Biodegradable</p>
              </div>
            </div>
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white via-teal-50/50 to-cyan-50 backdrop-blur-sm shadow-2xl hover:shadow-teal-300/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border-2 border-teal-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 via-cyan-400/5 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 mb-5 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent mb-3 drop-shadow">Fast</p>
                <p className="text-base md:text-lg text-gray-700 font-bold">Instant Results</p>
                <p className="text-sm text-gray-500 mt-2">Real-time processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      {showLearnMore && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowLearnMore(false)}>
          <div className="bg-card rounded-2xl max-w-3xl max-h-[90vh] overflow-y-auto p-8 animate-scale-in shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center mb-4 text-primary">
                How It Works
              </h2>
              
              {/* What We Do */}
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">What We Do</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-12">
                  Our Smart Waste Segregation System uses advanced AI technology to help you identify and properly categorize waste items. Simply upload an image, and our system will instantly tell you whether the item is biodegradable or non-biodegradable.
                </p>
              </div>

              {/* Understanding Categories */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Waste Categories</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 pl-12">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Biodegradable
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Organic waste that decomposes naturally - food scraps, paper, leaves, and plant materials.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Non-Biodegradable
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Materials that don&apos;t break down easily - plastics, metals, glass, and synthetic items requiring special disposal.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Use */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Simple 3-Step Process</h3>
                </div>
                <div className="space-y-3 pl-12">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Take a photo or upload an image of your waste item
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Click Predict
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Let our AI analyze the image and classify the waste type
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Get Results
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Receive instant classification and proper disposal guidance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link href="/classifier">
                  <Button 
                    size="lg"
                    className="shadow-hover hover:shadow-soft transition-all duration-300 hover:scale-105 text-lg px-10 py-6 h-auto"
                  >
                    Try It Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
