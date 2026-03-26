import { Gender, UserProfile } from "../types";

export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  if (gender === 'M') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function calculateTDEE(bmr: number, multiplier: number): number {
  return bmr * multiplier;
}

export function calculateTargetCalories(tdee: number, gender: Gender): number {
  const target = tdee - 500;
  const min = gender === 'M' ? 1500 : 1200;
  return Math.max(target, min);
}

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export function calculateMacros(calories: number, preference: 'Moderate' | 'Low' | 'High'): Macros {
  let pPct, cPct, fPct;

  switch (preference) {
    case 'Low':
      pPct = 0.40;
      cPct = 0.20;
      fPct = 0.40;
      break;
    case 'High':
      pPct = 0.30;
      cPct = 0.50;
      fPct = 0.20;
      break;
    case 'Moderate':
    default:
      pPct = 0.30;
      cPct = 0.35;
      fPct = 0.35;
      break;
  }

  return {
    protein: Math.round((calories * pPct) / 4),
    carbs: Math.round((calories * cPct) / 4),
    fat: Math.round((calories * fPct) / 9),
  };
}

export function getPhase(weekNumber: number): 'Strict' | 'Santuy' {
  // Weeks 1-2: Strict
  // Weeks 3-4: Santuy
  // Rotation every 2 weeks
  const cycle = Math.ceil(weekNumber / 2);
  return cycle % 2 === 1 ? 'Strict' : 'Santuy';
}

export function getWeekNumber(startDate: Date, currentDate: Date): number {
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil((diffDays || 1) / 7);
}

export function getDayOfProgram(startDate: Date, currentDate: Date): number {
  const diffTime = currentDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
