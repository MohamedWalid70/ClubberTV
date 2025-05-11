export interface SubmissionResponse {
    Id: number;
    Date: string;
    SubmissionStatus: string;
    ProblemId: number;
    ProblemTitle: string;
    SubmissionLanguage: string;
    SuccessRate: number;
    AiFeedback: string;
}
