import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get("http://localhost:3001/clock").then((response)=>{
    console.log(response);
    });
  }, []);

  let [clock, setClock] = useState(0);
  let [pause, setPause] = useState(0);
  let [state, setState] = useState("");

  const startClock = () => {
    setState((state = "START"));
    setClock((clock = new Date().getTime()));
    console.log(`Start time ${clock}`);
  };

  const pauseClock = () => {
    let deadLine = new Date().getTime();
    let t = deadLine - clock;
    let seconds = Math.floor((t % (1000 * 60)) / 1000);
    setPause((pause = pause + seconds));
    console.log(`saved time ${pause}`);
    setState((state = "PAUSE"));
  };

  const finishClock = async() => {
    if(pause==0){
      let deadLine =  new Date().getTime();
      let t = deadLine - clock;
      let seconds = Math.floor((t % (1000 * 60)) / 1000);
      console.log(`Seconds sending : ${seconds}`);
      axios({
        method : 'POST',
        url : 'http://localhost:3001/clock',
        data : {
          time : seconds
        }
      }).then(res => console.log(res))
    }else {
      let deadLine =  new Date().getTime();
      let t = deadLine - clock;
      let seconds = Math.floor((t % (1000 * 60)) / 1000);
      seconds = seconds + pause;
      console.log(`Seconds sending with pause value : ${seconds}`);
      axios({
        method : 'POST',
        url : 'http://localhost:3001/clock',
        data : {
          time : seconds
        }
      }).then(res => console.log(res)).catch((err) => console.log(err.message))
    }
  };

  


  if(!state){
    return (
      <div className="App">
        <Button  onClick={startClock} variant="contained" color="primary">
          Start
        </Button>
        <Button disabled onClick={pauseClock} variant="contained" color="secondary">
          Stop
        </Button>
        <Button onClick={finishClock} disabled variant="contained" color="secondary">
          Finish
        </Button>
      </div>
    );
  }else if(state==="PAUSE"){
    return (
      <div className="App">
        <Button  onClick={startClock} variant="contained" color="primary">
          Start
        </Button>
        <Button disabled onClick={pauseClock} variant="contained" color="secondary">
          Stop
        </Button>
        <Button  onClick={finishClock} variant="contained" color="secondary">
          Finish
        </Button>
        <div>
        <Button disabled variant="contained" color="secondary">Time : {pause}</Button>
        </div>
      </div>
    );
  }else if(state==="START"){
    return (
      <div className="App">
        <Button disabled onClick={startClock} variant="content" color="primary">
          Start
        </Button>
        <Button  onClick={pauseClock} variant="contained" color="secondary">
          Stop
        </Button>
        <Button onClick={finishClock} variant="contained" color="secondary">
          Finish
        </Button>
      </div>
    );
  }
 
  } 
export default App;
