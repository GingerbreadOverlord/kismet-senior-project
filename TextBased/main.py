from random import randint
import sys

class Dice(object):
	def __init__(self):
		pass

	@staticmethod
	def rollOneDice():
		return randint(1, 6)

	def rollXTimes(self, x):
		rolls = []

		if x < 1 or x > 5:
			return rolls

		for i in xrange(x):
			rolls.append(self.rollOneDice())

		return rolls

	def standardRoll(self):
		return self.rollXTimes(5)


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
		for i in xrange(3):
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
			print three_of_a_kind, pairx, pairy
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
			print three_of_a_kind, pairx, pairy
			if three_of_a_kind[0] == three_of_a_kind[1] == three_of_a_kind[2] and pairx == pairy and \
			   self.sameColor(three_of_a_kind[0], pairx):
				return sum(dice) + 20

		return 0


class FourOfAKind(Category):
	def score(self, dice):
		for i in xrange(2):
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
		self.turn = 1
		self.max_turn = 15
		self.category_count = 15
		self.categories = {
			1: Ones(),
			2: Twos(),
			3: Threes(),
			4: Fours(),
			5: Fives(),
			6: Sixes(),
			7: TwoPairSameColor(),
			8: ThreeOfAKind(),
			9: Straight(),
			10: Flush(),
			11: FullHouse(),
			12: FullHouseSameColor(),
			13: FourOfAKind(),
			14: Yaraborough(),
			15: Kismet()
		}
		self.player1_score = [None]*15
		self.player2_score = [None]*15

	@staticmethod
	def printDice(dice):
		print "dice:",  " ".join(map(str, dice))

	def playGame(self, player2=False):
		print "welcome to Kismet"
		print "colors: 1&6, 2&5, 3&4"
		print "categories: ones twos threes fours fives sixes 2pairSC(7) 3(8) straight(9) Flush(10) FH(11) FHSC(12) 4(13) Yara(14) Kismet(15)"
		if not player2:
			self.onePlayer()
		else:
			self.twoPlayer()

	def onePlayer(self):
		d = Dice()

		while self.turn <= self.max_turn:
			print "score", self.player1_score
			dice = d.standardRoll()
			rolls = 1

			while True:
				self.printDice(dice)
				sys.stdout.flush()
				line = raw_input().strip().split()
				if line[0] == "score":
					c = int(line[1])
					if 1 <= c <= self.category_count and self.player1_score[c-1] is None:
						self.player1_score[c-1] = self.categories[c].applyRule(dice)
						print "scored into category", c
						break
				elif line[0] == "reroll" and rolls < 3:
					if len(line) == 1:
						dice = d.standardRoll()
					else:
						rerolled = line[1:]
						new_dice = d.rollXTimes(len(rerolled))
						for i, r in enumerate(new_dice):
							dice[int(rerolled[i])-1] = r
						print "rerolled"

					rolls += 1

			self.turn += 1

		print self.player1_score
		print "total score", sum(self.player1_score)

	def twoPlayer(self):
		pass


if __name__ == "__main__":
	KismetBoard = Board()
	if len(sys.argv) == 1:
		KismetBoard.playGame()
	else:
		KismetBoard.playGame(True)
