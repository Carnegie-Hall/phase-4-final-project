from config import app

from models.models import *
from routes.routes import *

from flask import Flask, request, jsonify

from flask_socketio import SocketIO, emit

from flask_cors import CORS 

# app = Flask(__name__)
# app.config['SECRET_KEY'] = "secret!"
# CORS(app, resources={r"/*":{"origins":"*"}}) we redefined here instead 
socketio = SocketIO(app, cors_allowed_origins="*")
# here we initialize our socket.io 

@app.route('/http-call')
def http_call():
    data = {'data':'text fetched via an HTTP Call to server on render'}
    return jsonify(data)

@socketio.on('connect')
def connected():
    print(request.sid)
    print("Client is connected")
    # emit("connect", {
    #     "data": f"id: {request.sid} is connected"
    # })
 # event to create once a client connects.
 #emits are used to go and create our events, they contain data properties that we custom make in this case we're passing in our user's data information for them to see they are connected. 

@socketio.on('disconnect')
def disconnected():
    print("User disconnected")
    emit("disconnect", f"user {request.sid} has been disconnected", broadcast=True)
#we create a similiar disconnect function to display that the user is no longer connected to the chat. 
#our broadcast id is used to broadcast and inform the other chat members that the individual is no longer in the chat. 

@socketio.on('data')
def handle_message(data):
    print("Data from the front end: ",str(data))
    emit("data",{ 
        'data': data, 'id':request.sid
    }, broadcast=True)
    # here we are sending our data back to our client side

if __name__ == "__main__":
    socketio.run(app,debug=True,port=5555)
    # app.run(port=5, debug=True)

# if __name__ == "__main__":
