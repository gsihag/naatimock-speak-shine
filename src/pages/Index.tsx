import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, Award, Clock } from "lucide-react";
import Header from "@/components/Header";
import { isAuthenticated } from "@/utils/auth";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate("/language-select");
    } else {
      navigate("/auth");
    }
  };

  const features = [
    {
      icon: Globe,
      title: "Multiple Languages",
      description: "Practice in Hindi and other languages with authentic dialogues",
    },
    {
      icon: Clock,
      title: "Real-Time Practice",
      description: "30-second response windows mimicking actual NAATI test conditions",
    },
    {
      icon: Award,
      title: "Detailed Scoring",
      description: "Get comprehensive feedback on each segment with similarity analysis",
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed test history",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Master Your NAATI Exam
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Practice dialogue interpreting with our advanced mock test platform. 
            Get instant feedback and improve your skills before the real exam.
          </p>
          <Button size="lg" onClick={handleGetStarted} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            Why Choose NaatiMockTest?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our platform provides realistic test conditions and intelligent feedback 
            to help you succeed in your NAATI certification.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Choose Your Language</h3>
                <p className="text-muted-foreground">
                  Select from available languages including Hindi to practice your dialogue interpreting skills.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Pay for Your Mock Test</h3>
                <p className="text-muted-foreground">
                  Choose from our flexible pricing: 1 mock test for A$4, 5 tests for A$18, or 10 tests for A$30.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Give Mock Test</h3>
                <p className="text-muted-foreground">
                  Listen to dialogue segments and interpret between English and your chosen language in real-time with 30-second response windows.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground">Get Detailed Feedback</h3>
                <p className="text-muted-foreground">
                  Review your performance with segment-by-segment analysis and similarity scoring.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={handleGetStarted}>
              Start Your Free Practice
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 NaatiMockTest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
