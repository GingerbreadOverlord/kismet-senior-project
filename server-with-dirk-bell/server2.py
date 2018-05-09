#!/usr/bin/python

import socket
import threading
import copy
import psycopg2
import uuid
import time
from random import randint
from Checkers2 import *
from k import *

HOST = socket.gethostname() 
PORT = 5004

##########################
#user_id: creates a unique serial key for each user
#or for each game
##########################
def user_id():
    return uuid.uuid4()


##########################
#The Client thread
##########################
class ClientThread(threading.Thread):

    def __init__(self,ip,PORT, clientsock, cursor):
        threading.Thread.__init__(self)
        self.ip = ip
        self.port = PORT
        self.socket = clientsock
        self.cursor = cursor
        self.found = True
        self.username = None
        self.user_id = None
        self.waiting = False
        print "[+] New thread started for "+ip+":"+str(PORT)

##########################
#LOG IN FUNCTION
##########################
    def log_in(self):
        #initialize flag to be false
        flag = False

        #cycle through until a correct username has been entered
        while(flag == False):
            #get username from client
            self.socket.send("\nPlease Enter Your Username: ")
            username = self.socket.recv(1024)

            #get password from client
            self.socket.send("\nPlease Enter Your Password: ")
            password = self.socket.recv(1024)

            #Check if the username and password are correct
            self.cursor.execute("SELECT user_id FROM account WHERE username = %s AND password = %s", (username, password))

            #check if account exist
            UI = self.cursor.fetchone()
            if (UI is not None):
                flag = True
            else:
                self.socket.send("\nInvalid Username Or Password!!\n")

        #notify the server that a client has logged in
        print "User LOGGED IN!"

        #set the clients username and user_id
        self.username = username
        self.user_id = UI

        #return to main menu
        self.run()



##########################
#CREATE ACCOUNT FUNCTION
##########################
    def create_account(self):

        #get username
        self.socket.send("\nPlease Enter Your Desired Username: ")
        username = self.socket.recv(1024)

        #see if it is in the database alrady
        self.cursor.execute("SELECT username FROM account WHERE username = %s", (username,))

   
        #cycle through until a unique username is found
        while(self.cursor.fetchone() is not None):
            self.socket.send("\nUsername is taken. Please enter a different username: ")
            username = self.socket.recv(1024)
            self.cursor.execute("SELECT username FROM account WHERE username = %s", (username,))

        #get desired password
        self.socket.send("\nPlease Enter Your Desired Password: ")
        password = self.socket.recv(1024)

        #confirm password
        self.socket.send("\nPlease Retype Your Password: ")
        password2 = self.socket.recv(1024)

        #cycle through until the passwords match
        while(password != password2):
            self.socket.send("\nPasswords Do Not Match. Enter New Password: ")
            password = self.socket.recv(1024)

            self.socket.send("\nPlease Retype Your Password: ")
            password2 = self.socket.recv(1024)

        unique_id = user_id()


        #insert the new account into the ACCOUNT table
        self.cursor.execute("INSERT INTO account (user_id, username, password) VALUES(%s, %s, %s)", (str(unique_id), username, password))

        #set the username and user_id for the connected client
        self.username = username
        self.user_id = unique_id

        #notify server that a new client has been connected
        print "NEW ACCOUNT CREATED: " + self.username
        #return to main menu
        self.run()

##########################
#LIST OPTIONS
##########################
    def options(self):
        print "options"

##########################
#PLAY GAME
##########################
    def play(self, opponent):


        #initialize the game
        board = checkers()
        board2 = checkers()
        counter = 0
        piece_check_flag = False

        side_det = randint(0,1)
        if side_det == 0:
            board.black = opponent
            board.white = self
            board2.black = opponent
            board2.white = self
        if side_det == 1:
            board.black = self
            board.white = opponent
            board2.black = self
            board2.white = opponent

        
        #set up game loop
        while(board.game_over() == False):
            flag = True

            #create copy of board
            board2.board = dict(board.board)
            print board.board_printer()

            #Set up string with board to send to client
            scheme = board.board_printer()
            #Send data to client
            self.socket.send(scheme)
            opponent.socket.send(scheme)

            #send data depending on whose turn it is
            if counter == 0:
                piece_check_flag = True
                if board.white == opponent:
                    opponent.socket.send("WHITE - Please Enter Move: ")
                    move = opponent.socket.recv(1024)
                else:
                    self.socket.send("WHITE - Please Enter Move: ")
                    move = self.socket.recv(1024)

                counter += 1
            else:
                piece_check_flag = False
                if board.black == opponent:
                    opponent.socket.send("BLACK - Please Enter Move: ")
                    move = opponent.socket.recv(1024)
                else:
                    self.socket.send("BLACK - Please Enter Move: ")
                    move = self.socket.recv(1024)
                counter -= 1

            #split up string into seperate moves
            string_move = [int(s) for s in move.split() if s.isdigit()]

            #create a copy of the moves
            string_move2 = list(string_move)


            while (len(string_move) > 4):

                x1 = string_move[0]
                y1 = string_move[1]
                x2 = string_move[2]
                y2 = string_move[3]

                if(board2.piece_checker(x1, y1, piece_check_flag) == False):
                    flag = False
                    break

                if(board2.check_move_copy(x1, y1, x2, y2, self) == False):
                    flag = False
                    break
                else:
                    board2.make_move_copy(x1, y1, x2, y2)
                    del string_move[0]
                    del string_move[0]
           

            if len(string_move) == 4:
                x1 = string_move[0]
                y1 = string_move[1]
                x2 = string_move[2]
                y2 = string_move[3]

                if(board2.piece_checker(x1, y1, piece_check_flag) == False):
                    flag = False


                if(board2.check_move(x1, y1, x2, y2, self) == False):
                    flag = False


            if flag == True:
                while (len(string_move2) >= 4):
                    x1 = string_move2[0]
                    y1 = string_move2[1]
                    x2 = string_move2[2]
                    y2 = string_move2[3]

                    if(board.check_move(x1, y1, x2, y2, self) == True):
                        board.make_move(x1, y1, x2, y2)
                        del string_move2[0]
                        del string_move2[0]
                       
                
                flag = False
                   
            else:
                flag = True
                if counter == 0:
                    counter = 1
                else:
                    counter = 0

            #check if game over
            if (board.game_over() == 1):
                opponent.socket.send("White Wins")
                self.socket.send("White Wins")
                return True
            if (board.game_over() == 2):
                opponent.socket.send("Black Wins")
                self.socket.send("Black Wins")
                return True




##########################
#PLAY Game FUNCTION
##########################
    def play_game2(self, player1, player2, game_id):

        self.cursor.execute("INSERT INTO active_games (user_id_1, user_id_2, game_id, game_type) VALUES(%s, %s, %s, %s)", (player1, player2, game_id, "CHECKERS"))

        for item in threads:
            if (item.username == player2 and item.waiting == True):
                opponent = item

            KismetBoard = Board()
            opponent.found = True
            KismetBoard.onePlayer(self, opponent)
            opponent.waiting = False



##########################
#PLAY Game FUNCTION
##########################
    def play_game(self, player1, player2, game_id):

        self.cursor.execute("INSERT INTO active_games (user_id_1, user_id_2, game_id, game_type) VALUES(%s, %s, %s, %s)", (player1, player2, game_id, "CHECKERS"))

        for item in threads:
            if (item.username == player2 and item.waiting == True):
                opponent = item

        opponent.found = True
        self.play(opponent)
        opponent.waiting = False


        # else:





##########################
#New Game FUNCTION
##########################
    def new_game(self):

        #send instructions to create a new game to the client
        self.socket.send("Instructions: Please choose one of the following:\n     -Search User\n     -Find Game\n     -Search Game List\n     -Back\n")


        #recieve client response
        data = self.socket.recv(1024)

        #Repeat until valid instructions given
        while(data != "search user" and data != "Search User" and data != "Find Game" and data != "find game" and data != "Search Game List" and data != "search game list" and data != "back" and data != "Back"):
            self.socket.send("Invalid Input\nInstructions: Please choose one of the following:\n     -Search User\n     -Create Random Game\n     -Search Game List\n")
            try:
                data = self.socket.recv(1024)
            except:
                return False

        #handle client input properly

        #Search for a username and establish a game
        if data == "search user" or data == "Search User":


            #get username from client
            self.socket.send("Please Enter Username: ")
            username = self.socket.recv(1024)

            #check if valid username
            self.cursor.execute("SELECT username FROM account WHERE username = %s", (username,))
            while(self.cursor.fetchall() is None):
                self.socket.send("\nInvalid Username. Please Enter Valid username or EXIT")
                username = self.socket.recv(1024)
                if username == "exit":
                    self.run()
                self.cursor.execute("SELECT username FROM account WHERE username = %s", (username,))

            if username not in user_list:
                self.socket.send("ERROR: user is not looking for a new game.")
                self.new_game()

            GI = str(user_id())
            self.play_game(self.username, username, GI)

        #Create a game and add it to the list that people can accept from
        if (data == "Find Game" or data == "find game"):

            self.socket.send("Please enter game type - Kismet or Checkers:")
            gamer = self.socket.recv(1024);

            while (gamer != "kismet" and gamer != "Kismet" and gamer != "checkers" and gamer != "Checkers"):
                self.socket.send("ERROR: Invalid game type. Please enter: Kismet or Checkers:")
                gamer = self.socket.recv(1024);

            self.waiting = True
            self.found = False

            if (gamer == "Checkers" or gamer == "checkers"):

                if not user_list:  
                    user_list.append(self.username)
                else:
                    username = user_list.pop(0)
                    self.waiting = False
                    self.found = False
                    GI = str(user_id())
                    self.play_game(self.username, username, GI)

                while(self.waiting == True):
                    if(self.found == False):
                        self.socket.send("waiting for game...")
                    time.sleep(3)


            elif(gamer == "Kismet" or gamer == "kismet"):

                if not kismet_list:  
                    kismet_list.append(self.username)
                else:
                    username = kismet_list.pop(0)
                    self.waiting = False
                    self.found = False
                    GI = str(user_id())
                    self.play_game2(self.username, username, GI)

                while(self.waiting == True):
                    if(self.found == False):
                        self.socket.send("waiting for kismet game...")
                    time.sleep(3)

            self.waiting = False
            self.run()



        #
        if (data == "Search Game List" or data == "search game list"):
            self.socket.send("Currently the server only hosts checkers. Please use \"Find game\"")
            self.new_game()

        if (data == "Back" or data == "back"):
            self.run()




##########################
#RUN FUNCTION
##########################
    def run(self):

        print "Connection from : "+self.ip+":"+str(self.port)

        #check if client is logged in
        if(self.username is not None):
            self.socket.send("\nWelcome to Checkers, " + self.username + "!\n\nInstructions: Please choose one of the following:\n     -Log In\n     -Create Account\n     -New Game\n")
        else:
        #send instructions to user
            self.socket.send("\nWelcome to Checkers!\n\nInstructions: Please choose one of the following:\n     -Log In\n     -Create Account\n     -New Game\n")


        #recieve data from user
        try:
            data = self.socket.recv(1024)
        except:
            return False


        #check for valid data
        while(data != "Log In" and data != "log in" and data != "Create Account" and data != "create account" and data != "New Game" and data != "new game" and data != "play" and data != "Play"):
            self.socket.send("Invalid Input\nInstructions: Please choose one of the following:\n     -Log In\n     -Create Account\n     -Play\n     -New Game\n")
            try:
                data = self.socket.recv(1024)
            except:
                return False


        #Handle the data and call the appropriate function
        if data == "log in" or data == "Log In":
            self.log_in()
        if (data == "Create Account" or data == "create account"):
            self.create_account();
        if data == "new game" or data == "New Game":
            if self.username == None:
                self.run()
            else:
                self.new_game()





###########################################################
#MAIN
###########################################################
def main():

    user_id()
    HOST = socket.gethostname() 
    PORT = 5004

##########################
#SET UP DATABASE

# LOGIN: psql -U postgres
##########################
    try:
        conn = psycopg2.connect("dbname='cpsc490' user='postgres'")
        conn.autocommit = True
    except:
        print "Unable to connect to the Database. Exiting."
        return 0

    cursor = conn.cursor()
    print "Connected to Database!"



##########################
#start network connection
##########################
    tcpsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcpsock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    tcpsock.bind((HOST,PORT)) 


    while True:
        tcpsock.listen(100)
        print "\nListening for incoming connections..."
        serverip, serverport = tcpsock.getsockname()
        (clientsock, (ip, PORT)) = tcpsock.accept()
        newthread = ClientThread(ip, PORT, clientsock, cursor)
        newthread.start()
        threads.append(newthread)

    for t in threads:
        print "what"
        t.join()



threads = []
user_list = []
kismet_list = []

main()



