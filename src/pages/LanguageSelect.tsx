import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages, LogOut } from 'lucide-react';
import { logout, getUser } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getUser();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate('/auth');
  };

  const handleLanguageSelect = (language: string) => {
    localStorage.setItem('selected_language', language);
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Languages className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">NaatiMockTest</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold mb-2">Select Your Language</CardTitle>
            <CardDescription className="text-base">
              Choose the language you want to practice for your NAATI mock test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-8">
            <Button
              onClick={() => handleLanguageSelect('hindi')}
              className="w-full h-20 text-xl font-semibold bg-primary hover:bg-primary/90"
              size="lg"
            >
              <span className="flex items-center gap-3">
                <span className="text-3xl">🇮🇳</span>
                <span>Hindi</span>
              </span>
            </Button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-sm text-muted-foreground">More languages coming soon</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                disabled
                variant="outline"
                className="h-16 text-base opacity-50"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🇨🇳</span>
                  <span>Mandarin</span>
                </span>
              </Button>
              <Button
                disabled
                variant="outline"
                className="h-16 text-base opacity-50"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🇪🇸</span>
                  <span>Spanish</span>
                </span>
              </Button>
              <Button
                disabled
                variant="outline"
                className="h-16 text-base opacity-50"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🇫🇷</span>
                  <span>French</span>
                </span>
              </Button>
              <Button
                disabled
                variant="outline"
                className="h-16 text-base opacity-50"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span className="text-2xl">🇩🇪</span>
                  <span>German</span>
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSelect;
