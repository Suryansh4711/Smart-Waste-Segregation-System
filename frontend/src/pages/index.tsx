import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Recycle, Leaf, ArrowRight, Upload, Sparkles, CheckCircle2, X } from "lucide-react";
import heroImage from "@/assets/hero-waste-illustration.png";

const Index = () => {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Centered Illustration */}
          <div className="relative inline-block animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-30 rounded-full animate-pulse" />
            <img
              src={heroImage}
              alt="Smart Waste Segregation - Eco-friendly recycling illustration"
              className="relative rounded-3xl shadow-hover w-full max-w-2xl mx-auto hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Title */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full shadow-soft">
              <Leaf className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">
                AI-Powered Eco Solution
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Welcome to our{" "}
              <span className="text-primary bg-gradient-hero bg-clip-text">
                Smart Waste Segregation System
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to identify and properly categorize waste. 
              Make recycling effortless and contribute to a sustainable future.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => navigate("/classifier")}
              size="lg"
              className="shadow-hover hover:shadow-soft transition-all duration-300 hover:scale-105 group text-lg px-8 py-6 h-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button
              onClick={() => setShowLearnMore(true)}
              variant="outline"
              size="lg"
              className="shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto"
            >
              <Recycle className="mr-2 h-6 w-6" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</p>
              <p className="text-sm md:text-base text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">2</p>
              <p className="text-sm md:text-base text-muted-foreground">Categories</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-300 hover:scale-105">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">Fast</p>
              <p className="text-sm md:text-base text-muted-foreground">Results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={showLearnMore} onOpenChange={setShowLearnMore}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4 text-primary">
              How It Works
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 py-4">
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
                    Materials that don't break down easily - plastics, metals, glass, and synthetic items requiring special disposal.
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
              <Button 
                onClick={() => {
                  setShowLearnMore(false);
                  navigate("/classifier");
                }}
                size="lg"
                className="shadow-hover hover:shadow-soft transition-all duration-300 hover:scale-105 text-lg px-10 py-6 h-auto"
              >
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
