import os
import re


class Stack:
    def __init__(self):
        self.data = []
        self.size = 0

    def push(self, data):
        self.data.append(data)

    def pop(self):
        return self.data.pop()

    def isEmpty(self):
        return self.data == []


def reorder():
    scss = open('Btn.txt')
    # for line in scss:
    stack = Stack()
    lines = []
    newLine = []
    for line in scss:
        if "}" in line:
            newLine.append(line)
            lines.append(newLine)
            newLine = []
            stack.pop()
        if "{" in line:
            stack.push("{")
        if not stack.isEmpty():
            newLine.append(line)

    for j, line in enumerate(lines):
        print(str(j) + "\n")
        for i, l in enumerate(line):
            print(str(i) + ": " + l)

    # print(lines)
    # reg = re.findall(r'^\.\w+(-{1,2})?\w+', line)


reorder()
