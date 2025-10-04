export interface DialogueSegment {
  id: number;
  text: string;
  language: 'en' | 'hi';
}

export interface Dialogue {
  id: string;
  title: string;
  segments: DialogueSegment[];
}

export interface TestResponse {
  segmentId: number;
  transcript: string;
  duration: number;
}

export interface SegmentResult {
  segmentId: number;
  originalText: string;
  userTranscript: string;
  score: number;
  similarity: number;
}

export interface TestResult {
  totalScore: number;
  maxScore: number;
  segments: SegmentResult[];
  completedAt: Date;
}
