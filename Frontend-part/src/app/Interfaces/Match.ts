export interface Match {
  id: string;
  title: string;
  competition: string;
  date: Date;
  status: MatchStatus;
  duration: number;
}

export enum MatchStatus {
  Live,
  Replay
}

export interface AddedMatch {
  title: string;
  competition: string;
  date: Date;
  status: MatchStatus;
  duration: number;
}
