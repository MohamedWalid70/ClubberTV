export interface ProblemAPI {
  id?: number;
  title: string;
  constraints: string;
  description: string;
  difficultyLevel: number;
  testCaseInput: string;
  testCaseOutput: string;
  best_Solution: string;
  userProblems?: any;
}

// تحويل مستوى الصعوبة الرقمي إلى نص
export function getDifficultyText(level: number): string {
  switch (level) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    default:
      return 'Unknown';
  }
}

// تحويل النص إلى مستوى صعوبة رقمي
export function getDifficultyLevel(text: string): number {
  switch (text.toLowerCase()) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 1;
  }
}
