// Simple Levenshtein distance calculation for text similarity
export const calculateLevenshteinDistance = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
};

export const calculateSimilarityScore = (original: string, transcribed: string): number => {
  const normalizedOriginal = original.toLowerCase().trim();
  const normalizedTranscribed = transcribed.toLowerCase().trim();

  if (!normalizedTranscribed) return 0;

  const distance = calculateLevenshteinDistance(normalizedOriginal, normalizedTranscribed);
  const maxLength = Math.max(normalizedOriginal.length, normalizedTranscribed.length);
  
  const similarity = maxLength === 0 ? 100 : ((maxLength - distance) / maxLength) * 100;
  
  return Math.max(0, Math.min(100, similarity));
};

export const calculateSegmentScore = (similarity: number, maxScore: number = 45): number => {
  return (similarity / 100) * maxScore;
};
