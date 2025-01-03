
import {useState, useEffect} from 'react';
import './App.css';
import HttpCall from './components/HttpCall';
import WebSocketCall from './components/WebSocketCall';
import io from 'socket.io-client'

function App() {

  const [socketInstance, setSocketInstance] = useState("")
  const [loading, setLoading] = useState("true")
  const [buttonStatus, setButtonStatus] = useState(true)

  const handleClick = () => {
    if(buttonStatus === false){
      setButtonStatus(true)
    }else{
      setButtonStatus(false)
    }
  }

  useEffect(() => {
    // if(buttonStatus === true){
      const socket = io("localhost:5555/",{
        transports:['websocket'],
        cors:{
          origin:"http://localhost:5173/"
        }
      })

      setSocketInstance(socket)

      socket.on('connect', () => {
        console.log(socket.id)
      })

      setLoading(false)
      
      socket.on('disconnect', (data) => {
        console.log(data)
      })

      // return function cleanup(){
      //   socket.disconnect()
      // }

    // }
  },[])

  return (
    <div className="App">
      <h1>Boba Chat!</h1>
        <div className='line'>
          <HttpCall/> 
          {/* Here we made a custom component*/}
     </div>
     {!buttonStatus ? (
        <button onClick={handleClick}>Turn Chat on</button>
     ): <>
     <button onClick={handleClick}>Turn Chat off</button>
     <div className='line'>
        {!loading && <WebSocketCall socket={socketInstance} />}
     </div>
     </>}
    </div>
  );
}

export default App;
