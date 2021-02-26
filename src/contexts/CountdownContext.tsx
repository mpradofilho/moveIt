import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderData {
  isActive: boolean;
  hasFinished: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
  minutes: number;
  seconds: number;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownProviderData);

let countdownTimeout: NodeJS.Timeout


export function CountdownProvider({children}: CountdownProviderProps) {
  const {startNewChallenge} = useContext(ChallengesContext);
  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown () {
    setIsActive(true)
  }

  function resetCountdown () {
    clearTimeout(countdownTimeout)
    setHasFinished(false)
    setIsActive(false)
    setTime(0.05 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime((prevState) => prevState - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      startNewChallenge();
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value = {{
        isActive,
        hasFinished,
        resetCountdown,
        startCountdown,
        minutes,
        seconds,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}