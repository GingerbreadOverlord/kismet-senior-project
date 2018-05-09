from random import randint
import sys

class Dice(object):
	def __init__(self):
		pass

	@staticmethod
	def rollOneDice():
		return randint(1, 6)

	@staticmethod
	def rollXTimes(x):
		rolls = []

		if x < 1 or x > 5:
			return rolls

		for i in range(x):
			rolls.append(Dice.rollOneDice())

		return rolls

	@staticmethod
	def standardRoll():
		return Dice.rollXTimes(5)


# https://endlessgames.com/wp-content/uploads/instructions/kismet_Instructions.pdf
class Category(object):
	def __init__(self):
		self.colors = {1: 6, 6: 1, 2: 5, 5: 2, 3: 4, 4: 3}

	def sameColor(self, die1, die2):
		return self.colors[die1] == die2 or die1 == die2

	@staticmethod
	def allSameRoll(dice):
		return dice[0] == dice[1] == dice[2] == dice[3] == dice[4]

	@staticmethod
	def matchNum(num, dice):
		return dice.count(num)

	@staticmethod
	def score(dice):
		return dice

	def applyRule(self, dice):
		dice.sort()
		return self.score(dice)


class Ones(Category):
	def score(self, dice):
		return self.matchNum(1, dice)


class Twos(Category):
	def score(self, dice):
		return self.matchNum(2, dice)


class Threes(Category):
	def score(self, dice):
		return self.matchNum(3, dice)


class Fours(Category):
	def score(self, dice):
		return self.matchNum(4, dice)


class Fives(Category):
	def score(self, dice):
		return self.matchNum(5, dice)


class Sixes(Category):
	def score(self, dice):
		return self.matchNum(6, dice)


class TwoPairSameColor(Category):
	def score(self, dice):
		# there are 3 ways we can make a 2 pair with sorted dice
		# each int represents the start index of a pair
		ways = [(0, 2), (0, 3), (1, 3)]
		for way in ways:
			x1, x2, y1, y2 = dice[way[0]], dice[way[0] + 1], dice[way[1]], dice[way[1] + 1]

			if x1 == x2 and y1 == y2 and self.sameColor(x1, y1):
				return sum(dice)

		return 0


class ThreeOfAKind(Category):
	def score(self, dice):
		for i in range(3):
			if dice[i] == dice[i+1] == dice[i+2]:
				return sum(dice)

		return 0


class Straight(Category):
	def score(self, dice):
		if dice[4] == dice[3] + 1 == dice[2] + 2 == dice[1] + 3 == dice[0] + 4:
			return 30
		else:
			return 0


class Flush(Category):
	def score(self, dice):
		if self.sameColor(dice[0], dice[1]) and self.sameColor(dice[1], dice[2]) and \
		   self.sameColor(dice[2], dice[3]) and self.sameColor(dice[3], dice[4]):
			return 35
		else:
			return 0


class FullHouse(Category):
	def score(self, dice):
		# there are 3 ways we can make a full house with sorted cards
		# the following triples represent: (start index of 3 of a kind, index of card 4, index of card 5)
		ways = [(0, 3, 4), (1, 0, 4), (2, 0, 1)]
		if self.allSameRoll(dice):
			return 0

		for way in ways:
			three_of_a_kind = (dice[way[0]], dice[way[0] + 1], dice[way[0] + 2])
			pairx = dice[way[1]]
			pairy = dice[way[2]]
			#printthree_of_a_kind, pairx, pairy
			if three_of_a_kind[0] == three_of_a_kind[1] == three_of_a_kind[2] and pairx == pairy:
				return sum(dice) + 15

		return 0


class FullHouseSameColor(Category):
	def score(self, dice):
		# there are 3 ways we can make a full house with sorted cards
		# the following triples represent: (start index of 3 of a kind, index of card 4, index of card 5)
		ways = [(0, 3, 4), (1, 0, 4), (2, 0, 1)]
		if self.allSameRoll(dice):
			return 0

		for way in ways:
			three_of_a_kind = (dice[way[0]], dice[way[0] + 1], dice[way[0] + 2])
			pairx = dice[way[1]]
			pairy = dice[way[2]]
			#print three_of_a_kind, pairx, pairy
			if three_of_a_kind[0] == three_of_a_kind[1] == three_of_a_kind[2] and pairx == pairy and \
			   self.sameColor(three_of_a_kind[0], pairx):
				return sum(dice) + 20

		return 0


class FourOfAKind(Category):
	def score(self, dice):
		for i in range(2):
			if dice[i] == dice[i+1] == dice[i+2] == dice[i+3]:
				return sum(dice) + 25

		return 0


class Yaraborough(Category):
	def score(self, dice):
		return sum(dice)


class Kismet(Category):
	def score(self, dice):
		if self.allSameRoll(dice):
			return sum(dice)
		else:
			return 0


class Board(object):
	def __init__(self):
		self.num_players = None
		self.round = None
		self.turn = None
		self.max_round = 15
		self.category_count = 15
		self.UNSCORED = '*'
		self.categories = {
			0: Ones(),
			1: Twos(),
			2: Threes(),
			3: Fours(),
			4: Fives(),
			5: Sixes(),
			6: TwoPairSameColor(),
			7: ThreeOfAKind(),
			8: Straight(),
			9: Flush(),
			10: FullHouse(),
			11: FullHouseSameColor(),
			12: FourOfAKind(),
			13: Yaraborough(),
			14: Kismet()
		}
		self.cat_names = {
			"1": 0,
			"2": 1,
			"3": 2,
			"4": 3,
			"5": 4,
			"6": 5,
			"2PSC": 6,
			"3K": 7,
			"STR": 8,
			"FL": 9,
			"FH": 10,
			"FHSC": 11,
			"4K": 12,
			"YAR": 13,
			"KIS": 14
		}
		self.p1_score = None
		self.p2_score = None
		self.p1_basic = None
		self.p1_bonus = None
		self.p2_basic = None
		self.p2_bonus = None
		self.p1_kismet = None
		self.p2_kismet = None

	def initializeBoard(self, players):
		self.num_players = players
		self.round = 1
		self.turn = 1
		self.p1_score = [self.UNSCORED]*15
		self.p2_score = [self.UNSCORED]*15
		self.p1_basic = 0
		self.p1_bonus = 0
		self.p2_basic = 0
		self.p2_bonus = 0
		self.p1_kismet = 0
		self.p2_kismet = 0

	def p1Total(self):
		s = 0
		for c in self.p1_score:
			if c != self.UNSCORED:
				s += c
		return s + self.p1_bonus

	def p2Total(self):
		s = 0
		for c in self.p2_score:
			if c != self.UNSCORED:
				s += c
		return s + self.p2_bonus

	@staticmethod
	def printDice(dice):
		print("dice:",  " ".join(map(str, dice)))

	# the state of board after each move, * denotes unscored
	def printBoard(self, player2=False):
		print("*"*30)
		print("ROUND:", self.round)

		# we only care about printing the turn when there is more than 1 player
		if player2:
			print("TURN: Player", self.turn)

		print("CATS: 1 2 3 4 5 6 2PSC(7) 3K(8) STR(9) FL(10) FH(11) FHSC(12) 4K(13) YAR(14) KIS(15)")
		print("P1 CATS:", " ".join([str(x) for x in self.p1_score]))
		print("P1 BASIC SECTION:", self.p1_basic, "P1 BONUS:", self.p1_bonus, "P1 TOTAL:", self.p1Total())
		
		if player2:
			print("P2 CATS:", " ".join([str(x) for x in self.p2_score]))
			print("P2 BASIC SECTION:", self.p2_basic, "P2 BONUS:", self.p2_bonus, "P2 TOTAL:", self.p2Total())


	@staticmethod
	def printRules():
		pass

	@staticmethod
	def printStartMessage():
		print("*"*30)
		print("Welcome to Kismet!")
		print("What would you like to do?")
		print("-solo //starts a solo game")
		print("-random //matches against a random oponent")
		print("-join //play against a specific oponent")


	def playGame(self, player2=False):
		print("welcome to Kismet")
		print("colors: 1&6, 2&5, 3&4")
		print("categories: ones twos threes fours fives sixes 2pairSC(7) 3(8) straight(9) Flush(10) FH(11) FHSC(12) 4(13) Yara(14) Kismet(15)")
		if not player2:
			self.onePlayer()
		else:
			self.twoPlayer()

	def getBonus(self, basic_score):
		if basic_score >= 78:
			return 75
		elif basic_score >= 71:
			return 55
		elif basic_score >= 63:
			return 35
		else:
			return 0 

	# if the desired category is unscored, scores into the category with the given dice and updates the board
	# returns true if the move is possible, false otherwise
	def scoreP1(self, dice, cat):
		#print(dice, cat)
		if self.p1_score[cat] != self.UNSCORED:
			return False
		else:
			score = self.categories[cat].applyRule(dice)
			self.p1_score[cat] = score 

			# update upper section and potential new bonus
			if 1 <= cat <= 6:
				self.p1_basic += score 
				self.p1_bonus = self.getBonus(self.p1_basic)

			return score

	# if the desired category is unscored, scores into the category with the given dice and updates the board
	# returns true if the move is possible, false otherwise
	def scoreP2(self, dice, cat):
		if self.p2_score[cat] != self.UNSCORED:
			return False
		else:
			score = self.categories[cat].applyRule(dice)
			self.p2_score[cat] = score 

			# update upper section and potential new bonus
			if 1 <= cat <= 6:
				self.p2_basic += score 
				self.p2_bonus = self.getBonus(self.p2_basic)

			return score

	def onePlayer(self):
		self.initializeBoard(1)

		while self.round <= self.max_round:
			dice = Dice.standardRoll()
			rerolls = 2
			self.printBoard()

			while True:
				sys.stdout.flush()
				self.printDice(dice)
				print("rerolls:", rerolls)
				line = input().strip().split()
				if line[0] == "-score":
					if len(line) < 2:
						print("-score [cat]")
						continue
					cat = line[1]
					if cat not in self.cat_names:
						print("Enter a valid category name")
					elif self.scoreP1(dice, self.cat_names[cat]):
						print("scored into", cat)
						break
					else:
						print("category already scored into")
				elif rerolls == 0:
					print("no more rerolls")
				elif line[0] == "-reroll":
					if len(line) == 1:
						dice = Dice.standardRoll()
					else:
						rerolled = line[1]
						new_dice = Dice.rollXTimes(len(rerolled))
						for i, r in enumerate(rerolled):
							dice[int(r)-1] = new_dice[i]
						rerolls -= 1
						print("rerolled")

			self.round += 1

		print("GAME OVER!")
		self.printBoard()

	def twoPlayer(self):
		pass

if __name__ == "__main__":
	board = Board()
	board.onePlayer()
