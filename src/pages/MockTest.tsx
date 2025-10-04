import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Volume2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRandomDialogue } from '@/data/dialogues';
import { DialogueSegment, TestResponse } from '@/types/test';

const MockTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogue] = useState(() => getRandomDialogue());
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentSegment = dialogue.segments[currentSegmentIndex];
  const progress = ((currentSegmentIndex + 1) / dialogue.segments.length) * 100;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = currentSegment?.language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Recognition Error",
          description: "There was an error with speech recognition. Please try again.",
          variant: "destructive"
        });
        stopRecording();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [currentSegmentIndex]);

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(currentSegment.text);
      utterance.lang = currentSegment.language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => {
        setIsPlaying(false);
        setTimeout(() => startRecording(), 2000);
      };

      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentSegment) {
      playAudio();
    }
  }, [currentSegmentIndex]);

  const startRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);
    setTranscript('');
    
    recognitionRef.current.lang = currentSegment.language === 'en' ? 'hi-IN' : 'en-US';
    recognitionRef.current.start();

    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
  };

  const handleNext = () => {
    const response: TestResponse = {
      segmentId: currentSegment.id,
      transcript: transcript,
      duration: recordingTime
    };

    setResponses(prev => [...prev, response]);
    stopRecording();

    if (currentSegmentIndex < dialogue.segments.length - 1) {
      setCurrentSegmentIndex(prev => prev + 1);
      setTranscript('');
      setRecordingTime(0);
    } else {
      localStorage.setItem('test_responses', JSON.stringify([...responses, response]));
      localStorage.setItem('test_dialogue', JSON.stringify(dialogue));
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/language-select')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Test
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Segment {currentSegmentIndex + 1} of {dialogue.segments.length}
          </div>
        </div>

        <Progress value={progress} className="mb-8 h-2" />

        <Card className="p-8 shadow-xl mb-6">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              {currentSegment?.language === 'en' ? 'English' : 'Hindi'}
            </div>

            <div className="min-h-[120px] flex items-center justify-center">
              <p className="text-2xl font-medium leading-relaxed px-4">
                {currentSegment?.text}
              </p>
            </div>

            {isPlaying && (
              <div className="flex items-center justify-center gap-3 text-primary">
                <Volume2 className="w-6 h-6 animate-pulse" />
                <span className="font-medium">Playing audio...</span>
              </div>
            )}

            {isRecording && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-destructive animate-pulse"></div>
                  <span className="text-lg font-semibold">Recording: {recordingTime}s / 30s</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 min-h-[80px]">
                  <p className="text-lg">
                    {transcript || <span className="text-muted-foreground">Speak now...</span>}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-4">
          {isRecording ? (
            <>
              <Button
                onClick={stopRecording}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-base"
              >
                <MicOff className="w-5 h-5 mr-2" />
                Stop Recording
              </Button>
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 h-14 text-base bg-accent hover:bg-accent/90"
                disabled={!transcript}
              >
                Next Segment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          ) : (
            <Button
              onClick={startRecording}
              size="lg"
              className="w-full h-14 text-base"
              disabled={isPlaying}
            >
              <Mic className="w-5 h-5 mr-2" />
              {isPlaying ? 'Please wait...' : 'Start Recording'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockTest;
