#!/usr/bin/python

#Client.py

import socket
import time
import threading
from threading import Thread


def listen():
	while True:
		response = s.recv(1024)
		print response

#creare neew socket object
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 

# get local machine name
host = socket.gethostname()                         

port = 5004

# connection to hostname on the port.
s.connect((host, port))                               


thread = threading.Thread(target=listen)
thread.daemon = True
thread.start()

while True:
	data = raw_input()
	s.sendall(data)
                      

s.close()

