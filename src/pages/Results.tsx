import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Home, RotateCcw } from 'lucide-react';
import { Dialogue, TestResponse, TestResult, SegmentResult } from '@/types/test';
import { calculateSimilarityScore, calculateSegmentScore } from '@/utils/textSimilarity';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const responsesStr = localStorage.getItem('test_responses');
    const dialogueStr = localStorage.getItem('test_dialogue');

    if (!responsesStr || !dialogueStr) {
      navigate('/language-select');
      return;
    }

    const responses: TestResponse[] = JSON.parse(responsesStr);
    const dialogue: Dialogue = JSON.parse(dialogueStr);

    const segmentResults: SegmentResult[] = responses.map(response => {
      const segment = dialogue.segments.find(s => s.id === response.segmentId);
      const similarity = calculateSimilarityScore(segment?.text || '', response.transcript);
      const score = calculateSegmentScore(similarity, 45 / dialogue.segments.length);

      return {
        segmentId: response.segmentId,
        originalText: segment?.text || '',
        userTranscript: response.transcript,
        score,
        similarity
      };
    });

    const totalScore = segmentResults.reduce((sum, r) => sum + r.score, 0);

    setResult({
      totalScore: Math.round(totalScore * 10) / 10,
      maxScore: 45,
      segments: segmentResults,
      completedAt: new Date()
    });

    localStorage.removeItem('test_responses');
    localStorage.removeItem('test_dialogue');
  }, [navigate]);

  if (!result) {
    return null;
  }

  const percentage = (result.totalScore / result.maxScore) * 100;
  const passed = result.totalScore >= 29;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 py-8">
      <div className="container max-w-4xl mx-auto">
        <Card className="shadow-xl mb-6">
          <CardHeader className="text-center pb-6">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              passed ? 'bg-accent/20' : 'bg-destructive/20'
            }`}>
              <Award className={`w-10 h-10 ${passed ? 'text-accent' : 'text-destructive'}`} />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Test Complete!</CardTitle>
            <p className="text-muted-foreground">
              {passed ? 'Congratulations! You passed the test.' : 'Keep practicing to improve your score.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">
                {result.totalScore} / {result.maxScore}
              </div>
              <Progress value={percentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}% accuracy
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button onClick={() => navigate('/language-select')} size="lg" className="h-12">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
              <Button onClick={() => navigate('/test')} variant="outline" size="lg" className="h-12">
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake Test
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold px-1">Detailed Results</h3>
          {result.segments.map((segment, index) => (
            <Card key={segment.segmentId} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-lg font-bold">{segment.score.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Similarity</p>
                    <p className="text-lg font-bold text-accent">{segment.similarity.toFixed(0)}%</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Original</p>
                    <p className="text-sm bg-muted/50 rounded p-3">{segment.originalText}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Your Response</p>
                    <p className="text-sm bg-accent/10 rounded p-3">
                      {segment.userTranscript || <span className="text-muted-foreground">No response recorded</span>}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
