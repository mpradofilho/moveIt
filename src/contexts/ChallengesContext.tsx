import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  challengesCompleted: number;
  currentExperience: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
}

interface challengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: challengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    setActiveChallenge(challenges[randomChallengesIndex]);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio criado ', {
        body: `Valendo ${challenges[randomChallengesIndex].amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  useEffect(() =>{
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted])

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        challengesCompleted,
        currentExperience,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}>
      {children}
    </ChallengesContext.Provider>
  );
}