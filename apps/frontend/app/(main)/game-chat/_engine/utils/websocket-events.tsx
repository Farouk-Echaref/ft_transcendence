import { useCallback, useEffect, useState } from "react";
import { EventGame } from "../entity/entity";
import { useSocket } from "@/context/events-socket-context";
import { usePlayer1State, usePlayer2State } from "../state/player";
import { useBallState } from "../state/ball";
import { STATUS, useStatus } from "../state/status";
import { useMatchState, useScoreState } from "../state";

export function usePlayerPosition(direction: string): boolean {
  const [arrowDirection, setArrowDirection] = useState(false);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === direction) {
        setArrowDirection(true);
      }
    },
    [direction]
  );

  const handleKeyUp = useCallback(() => {
    setArrowDirection(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  return arrowDirection;
}

export const useSetGameEvents = () => {
  const socket = useSocket();
  const setP1Position = usePlayer1State((state) => state.setPosition);
  const setP2Position = usePlayer2State((state) => state.setPosition);
  const setP1Id = usePlayer1State((state) => state.setId);
  const setP2Id = usePlayer2State((state) => state.setId);
  const setBallPosition = useBallState((state) => state.setPosition);
  const setStatus = useStatus((s) => s.setStatus);
  const { setState: setMatch } = useMatchState();
  const setHome = useScoreState((s) => s.setHomeScore);
  const setAdversary = useScoreState((s) => s.setAdversary);

  useEffect(() => {
    if (!socket) return;
    if (socket.hasListeners(EventGame.MCHFOUND)) return;

    socket.on(EventGame.MCHFOUND, (data) => {
      console.log(EventGame.MCHFOUND, data.match);
      setMatch(data.match);
      setStatus(STATUS.STRGAME);
      socket.emit(EventGame.PLAYMACH, { matchId: data.match.matchId });
    });

    socket.on(EventGame.STARTSGM, (data) => {
      setMatch(data.match);
      setStatus(STATUS.UPDGAME);
      setP1Id(data.match.homeId);
      setP2Id(data.match.adversaryId);
    });

    socket.on(EventGame.UPDTGAME, (data) => {
      const parsedData = JSON.parse(data);
      // console.log({ parsedData });
      setHome(parsedData.scores.home);
      setHome(parsedData.scores.adversary);
      setP1Position({
        x: parsedData.home.posi[0],
        y: parsedData.home.posi[1],
        z: parsedData.home.posi[2],
      });
      setP2Position({
        x: parsedData.adversary.posi[0],
        y: parsedData.adversary.posi[1],
        z: parsedData.adversary.posi[2],
      });
      setBallPosition({
        x: parsedData.bl.posi[0],
        y: parsedData.bl.posi[1],
        z: parsedData.bl.posi[2],
      });
    });
    socket.on(EventGame.GAMEOVER, (data) => {
      socket.emit("leaveGame");
      setStatus(STATUS.GAMOVER);
    });
  }, [socket]);
};

export const useUpdateGame = () => {
  const status = useStatus();
  const socket = useSocket();
  const matchId = useMatchState((st) => st.matchId);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (status.name == STATUS.UPDGAME) {
        socket?.emit(STATUS.UPDGAME, { matchId });
      }
    }, 16);

    return () => clearInterval(intervalId);
  });
};
