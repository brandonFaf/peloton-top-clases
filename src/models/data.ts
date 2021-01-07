export interface Workout {
  id: string;
  date: Date;
  totalOutput: number;
  title: string;
  difficulty: number;
  instructor: string;
  difficultyLevel: number;
  rideId: string;
  duration: number;
  rank?: number;
}

export interface data {
  workouts: {
    '5': Workout[];
    '10': Workout[];
    '15': Workout[];
    '20': Workout[];
    '30': Workout[];
    '45': Workout[];
  };
  count: number;
}
