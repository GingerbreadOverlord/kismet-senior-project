#!/usr/bin/python

"""
Title: Checkers.py
Author: James Dirk Bell
Class: CPSC 490 - Senior Project

This file contains the Checkers class. It allows checkers to be played
by initializing the board, checking for legal moves, and checking if the game
is over or not.
"""

###########################
#checkers class
class checkers():
	def __init__(self):

		self.white = None
		self.black = None
		self.board = {}
		for row in range(8):
			for column in range(8):
				if (row % 2 == 0 and column % 2 == 0):
					self.board[(row,column)] = "1"
				if (row % 2 != 0 and column % 2 != 0):
					self.board[(row, column)] = "1"
				if (row % 2 == 0 and column % 2 != 0):
					self.board[(row, column)] = "0"
				if (row % 2 != 0 and column % 2 == 0):
					self.board[(row, column)] = "0"


		for row in range(3):
			c = row % 2
			for column in range(4):
				self.board[(row, c)] = "B"
				c += 2

		for row in range(5,8):
			c = row % 2
			for column in range(4):
				self.board[(row, c)] = "W"
				c += 2

#End checkers class
###########################

###########################
#piece_checker, checks if player is moving correct piece
	def piece_checker(self, x, y, flag):
		if flag == True:
			if self.board[(x, y)] == "W":
				return True
			else:
				return False

		if flag == False:
			if self.board[(x, y)] == "B":
				return True
			else:
				return False
#End piece_checker
###########################

###########################
#board_printer function function, puts the board into a string and returns it
	def board_printer(self):

		test = " "
		for x in range(8):
			test = test + str(x) + " " 

		test = test + "\n\n"

		for row in range(8):
			for column in range(8):
				test = test + " " + str(self.board[row,column])
			
			test = test + "  " + str(row) + "\n"	
			

		test = test + "\n"
		return test
#End board_printer
###########################


###########################
#game_over function, checks if the game is over
	def game_over(self):
		counter_w = 0
		counter_b = 0
		for item in self.board:
			if item == "B":
				counter_b += 1
			if item == "W":
				counter_w += 1
		if (counter_b == 0 and counter_w != 0):
			return 1
		if (counter_b != 0 and counter_w == 0):
			return 2
		else:
			return False

#End game_over
###########################


###########################
#CHECK_MOVE FUNCTION, CHECKS FOR VALID MOVE INPUT
	def check_move_copy(self, x1, y1, x2, y2, item):

		if (x1 - x2 != 2) and (x2 - x1 != 2):
			item.socket.send("ERROR: Invalid double jump.\n")

		print str(x1) + " ", str(y1) + " ", str(x2) + " ", str(y2) + " "
		if x1 > 7 or y1 > 7 or x2 > 7 or y2 > 7:
			item.socket.send("ERROR: Input must not be larger than 8.\n")
			return False
		if x1 < 0 or y1 < 0 or x2 < 0 or y2 < 0:
			item.socket.send("ERROR: Input must be larger than 0.\n")
			return False
		if y1 == y2 or x1 == x2:
			item.socket.send("ERROR: Must be diagnol move.\n")
			return False
		if abs(x1 - x2) > 2:
			item.socket.send("ERROR: Input must be 1 or 2 rows up/down.\n")
			return False


		if (self.board[(x2, y2)] == "B" or self.board[(x2, y2)] == "W"):
			item.socket.send("ERROR: Target space must be empty.\n")
			return False
		if(self.board[(x1, y1)] == "1" or self.board[(x1, y1)] == "0"):
			item.socket.send("ERROR: NO PIECE AT STARTING POINT.\n")
			return False

		#Move up/no pass
		if x1 > x2:
			#move right
			if y1 < y2: 
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x1 - x2 == 2):
					if self.board[(x1 - 1, y1 + 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y1)] = "0"
						self.board[(x1 - 1, y1 + 1)] = "1"
						return True
				if(x1 - x2 == 1):
					return True


			#move left
			else:
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x1 - x2 == 2):
					if self.board[(x1 -1, y1 - 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:

						#self.board[(x1,y1)] = "0"
						self.board[(x1 - 1, y1 - 1)] = "1"
						return True
				if(x1 - x2 == 1):
					return True

		#Move down 
		if x2 > x1:
			#move downt to right
			if y1 < y2: 
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				
				if(x2 - x1 == 2):
					if self.board[(x1 + 1, y1 + 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y2)] = "0"
						self.board[(x1 + 1, y1 + 1)] = "1"
						return True
				if(x2 - x1 == 1):
					return True

			#move left
			else:
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x2 - x1 == 2):
					if self.board[(x1 + 1, y1 - 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y2)] = "0"
						self.board[(x1 + 1, y1 - 1)] = "1"
						return True
				if(x2 - x1 == 1):
					return True

		return True



#END CHECK_MOVE FUNCTION
###########################


###########################
#Make_move function, makes the move after checking it
	def make_move_copy(self, x1, y1, x2, y2):

		piece = self.board[(x1, y1)]
		self.board[(x1, y1)] = "1"
		self.board[(x2, y2)] = piece
		return True
#End Make_move Function
###########################

###########################
#CHECK_MOVE FUNCTION, CHECKS FOR VALID MOVE INPUT
	def check_move(self, x1, y1, x2, y2, item):
		print str(x1) + " ", str(y1) + " ", str(x2) + " ", str(y2) + " "
		if x1 > 7 or y1 > 7 or x2 > 7 or y2 > 7:
			item.socket.send("ERROR: Input must not be larger than 8.\n")
			return False
		if x1 < 0 or y1 < 0 or x2 < 0 or y2 < 0:
			item.socket.send("ERROR: Input must be larger than 0.\n")
			return False
		if y1 == y2 or x1 == x2:
			item.socket.send("ERROR: Must be diagnol move.\n")
			return False
		if abs(x1 - x2) > 2:
			item.socket.send("ERROR: Input must be 1 or 2 rows up/down.\n")
			return False


		if (self.board[(x2, y2)] == "B" or self.board[(x2, y2)] == "W"):
			item.socket.send("ERROR: Target space must be empty.\n")
			return False
		if(self.board[(x1, y1)] == "1" or self.board[(x1, y1)] == "0"):
			item.socket.send("ERROR: NO PIECE AT STARTING POINT.\n")
			return False
		if(self.board[(x1, y1)] == "B" and x2 < x1):
			item.socket.send("ERROR: CAN'T MOVE NON-KING THAT DIRECTION.\n")
			return False
		if(self.board[(x1, y1)] == "W" and x1 < x2):
			item.socket.send("ERROR: CAN'T MOVE NON-KING THAT DIRECTION.\n")
			return False


		#Move up/no pass
		if x1 > x2:
			#move right
			if y1 < y2: 
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x1 - x2 == 2):
					if self.board[(x1 - 1, y1 + 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y1)] = "0"
						self.board[(x1 - 1, y1 + 1)] = "1"
						return True
				if(x1 - x2 == 1):
					return True


			#move left
			else:
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x1 - x2 == 2):
					if self.board[(x1 -1, y1 - 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:

						#self.board[(x1,y1)] = "0"
						self.board[(x1 - 1, y1 - 1)] = "1"
						return True
				if(x1 - x2 == 1):
					return True

		#Move down 
		if x2 > x1:
			#move downt to right
			if y1 < y2: 
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				
				if(x2 - x1 == 2):
					if self.board[(x1 + 1, y1 + 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y2)] = "0"
						self.board[(x1 + 1, y1 + 1)] = "1"
						return True
				if(x2 - x1 == 1):
					return True

			#move left
			else:
				if(self.board[(x1, y1)] == "B"):
					piece = "B"
				else:
					piece = "W"

				if(x2 - x1 == 2):
					if self.board[(x1 + 1, y1 - 1)] == piece:
						item.socket.send("ERROR: CANNOT JUMP OVER OWN PIECE.\n")
						return False
					else:
						#self.board[(x1, y2)] = "0"
						self.board[(x1 + 1, y1 - 1)] = "1"
						return True
				if(x2 - x1 == 1):
					return True

		return True



#END CHECK_MOVE FUNCTION
###########################


###########################
#Make_move function, makes the move after checking it
	def make_move(self, x1, y1, x2, y2):

		piece = self.board[(x1, y1)]
		self.board[(x1, y1)] = "1"
		self.board[(x2, y2)] = piece
		if(self.board[(x2, y2)] == "B" and x2 == 7):
			self.board[(x2, y2)] == "b"
		if(self.board[(x2, y2)] == "W" and x2 == 0):
			self.board[(x2, y2)] == "w"
		return True
#End Make_move Function
###########################

