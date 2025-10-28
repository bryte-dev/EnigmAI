export {};


declare global {
  type RiddleData = {
    id: string;
    riddle: string;
    answer: string;
    hint: string;
  }

  interface EnigmatikAPI {
    generateRiddle: () => Promise<{ id: string; riddle: string; answer: string; hint: string }>;
    submitAnswer: (riddleId: string, answer: string, correct?: boolean) => Promise<void>;
  }

  interface Window {
    enigmatik: EnigmatikAPI;
  }
}