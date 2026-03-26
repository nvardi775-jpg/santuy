export type Gender = 'M' | 'F';
export type ActivityLevel = 'Rest Day' | 'Active Day';
export type Phase = 'Strict' | 'Santuy';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number;
  initialWeight: number;
  baseActivityLevel: number; // 1.2 to 1.9
  macroPreference: 'Moderate' | 'Low' | 'High';
  initialMeasurements?: {
    belly: number;
    waist: number;
    hip: number;
    neck: number;
    arm: number;
    thigh: number;
  };
}

export interface WeeklyCheckIn {
  weekNumber: number;
  date: string;
  weight: number;
  belly?: number;
  waist?: number;
  hip?: number;
  neck?: number;
  arm?: number;
  thigh?: number;
  targetCalories: number;
}

export interface DailyLog {
  date: string;
  activity: ActivityLevel;
  exercise?: {
    type: string;
    minutes: number;
    caloriesBurned: number;
  };
  waterIntake?: number; // in ml
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AppState {
  profile: UserProfile | null;
  weeklyCheckIns: WeeklyCheckIn[];
  dailyLogs: Record<string, DailyLog>;
  startDate: string | null;
  chatHistory: ChatMessage[];
  lastHealthWarningWeek?: number;
}
