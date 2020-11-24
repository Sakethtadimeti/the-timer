import "./App.css";
import { useEffect, useState, useRef } from "react";
// import useInterval from "./useInterval";

/*Refer this
https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/
const App = () => {
  const [currTime, setTime] = useState(10);
  const [isPlaying, setPlaying] = useState(true);

  /*const intervalId = useInterval(() => setTime(currTime - 1), 1000);
  useEffect(() => {
    if (currTime == 0) {
      clearInterval(intervalId);
    }
  }, [currTime]);*/
  const intervalRef = useRef(null);
  const stopTimer = () => clearInterval(intervalRef.current);
  const onPlayPauseClick = () => {
    if (isPlaying) {
      stopTimer();
    } else {
      startTimer();
    }
    setPlaying(isPlaying => !isPlaying);
  };
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(currTime => currTime - 1);
      /* This wont work
      setTime(currTime+1)
      */
    }, 1000);
  };
  useEffect(() => {
    if (currTime === 0) {
      stopTimer();
    }
  }, [currTime]);
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <div className="App">
      <div className="app-playground">
        <h3>{currTime}</h3>
        <div className="control-buttons">
          <button className="control-btn pause-btn" onClick={onPlayPauseClick}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="control-btn reset-btn" onClick={() => setTime(10)}>
            Reset
          </button>
          <button
            className="control-btn add-time-btn"
            onClick={() => setTime(time => time + 10)}
          >
            + 10
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
