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


class Category(object):
	def __init__(self):
		self.colors = {1: 6, 6: 1, 2: 5, 5: 2, 3: 4, 4: 3}

	def sameColor(self, die1, die2):
		return self.colors[die1] == die2 or die1 == die2

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


class Board(object):
	def __init__(self):
		pass


d = Dice()
dd = [1,6,5,1,6]
TwoPair = TwoPairSameColor()
print dd
print TwoPair.checkRule(dd)
