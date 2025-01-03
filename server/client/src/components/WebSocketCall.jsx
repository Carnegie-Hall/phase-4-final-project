import React, { useEffect, useState } from 'react'

function WebSocketCall({ socket }) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const handleText = (e) => {
        const inputMessage = e.target.value
        setMessage(inputMessage)
    }

    const handleSubmit = () => {
        if (!message) {
            return;
        }

        socket.emit('data', message)
        setMessage("")
    }

    useEffect(() => {
        socket.on('data', (data) => {
            setMessages([...messages, data.data])
        })

        return () => {
            socket.off('data', () => {
                console.log('data event was removed')
            })
        }
    }, [socket, messages])

    return (
        <div>
            <h2>Check your order's status here!</h2>
            <input type="text" onChange={handleText} value={message}></input>
            <button onClick={handleSubmit}>Submit</button>

            <ul>
                {messages.map((message, index) => {
                    return <li key={index}>{message}</li>
                })}
            </ul>
        </div>
    )
}

export default WebSocketCall