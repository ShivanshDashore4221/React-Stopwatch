import React, {useState,useEffect,useRef} from "react";

function Stopwatch(){
    const [isRunning , setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        //we should add cleaning function to end of useEffect
        return ()=> {
            clearInterval(intervalIdRef.current);
        }
    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime(){
        //formatting of miliseconds wala elapsed time into hours, minutes, seconds ,miliseconds
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let miliseconds = Math.floor((elapsedTime % 1000) /10); // /10 done to display only 2 digits of milisecs and not 4 digits
        
        // return `00:00:00`; dummy output. It is called a template string;
        // return `${hours}:${minutes}:${seconds}:${miliseconds}`; // this gives o/p 0:0:0:0
        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        miliseconds = String(miliseconds).padStart(2,"0");
        return `${hours}:${minutes}:${seconds}:${miliseconds}`; // this gives o/p 00:00:00:00

    }
    return(
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}
export default Stopwatch