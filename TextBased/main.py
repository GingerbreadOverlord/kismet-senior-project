from random import randint
from collections import Counter

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
	def applyRule(dice):
		return dice

	def checkRule(self, dice):
		dice.sort()
		return self.applyRule(dice)


class Ones(Category):
	def applyRule(self, dice):
		return self.matchNum(1, dice)


class Twos(Category):
	def applyRule(self, dice):
		return self.matchNum(2, dice)


class Threes(Category):
	def applyRule(self, dice):
		return self.matchNum(3, dice)


class Fours(Category):
	def applyRule(self, dice):
		return self.matchNum(4, dice)


class Fives(Category):
	def applyRule(self, dice):
		return self.matchNum(5, dice)


class Sixes(Category):
	def applyRule(self, dice):
		return self.matchNum(6, dice)


class TwoPairSameColor(Category):
	def applyRule(self, dice):
		# there are 3 ways we can make a 2 pair with sorted dice
		# each int represents the start index of a pair
		ways = [(0, 2), (0, 3), (1, 3)]
		print "***"
		print dice
		for way in ways:
			x1, x2, y1, y2 = dice[way[0]], dice[way[0] + 1], dice[way[1]], dice[way[1] + 1]

			if x1 == x2 and y1 == y2 and self.sameColor(x1, y1):
				return sum(dice)

		return 0


class ThreeOfAKind(Category):
	def applyRule(self, dice):
		for i in xrange(3):
			if dice[i] == dice[i+1] == dice[i+2]:
				return sum(dice)

		return 0


class Straight(Category):
	def applyRule(self, dice):
		if dice[4] == dice[3] + 1 == dice[2] + 2 == dice[1] + 3 == dice[0] + 4:
			return 30
		else:
			return 0


class Flush(Category):
	def applyRule(self, dice):
		if self.sameColor(dice[0], dice[1]) and self.sameColor(dice[1], dice[2]) and \
		   self.sameColor(dice[2], dice[3]) and self.sameColor(dice[3], dice[4]):
			return 35
		else:
			return 0


class FullHouse(Category):
	def applyRule(self, dice):
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
	def applyRule(self, dice):
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
	def applyRule(self, dice):
		for i in xrange(2):
			if dice[i] == dice[i+1] == dice[i+2] == dice[i+3]:
				return sum(dice) + 25

		return 0


class Yaraborough(Category):
	def applyRule(self, dice):
		return sum(dice)


class Kismet(Category):
	def applyRule(self, dice):
		if self.allSameRoll(dice):
			return sum(dice)
		else:
			return 0


class Board(object):
	def __init__(self):
		pass


d = Dice()
dd = [1,6,1,6,1]
TwoPair = FullHouse()
print dd
print TwoPair.checkRule(dd)
