window.TIER1_DEBUG = [
    {
        id: "t1d-offbyone-range",
        tier: 1,
        tags: ["loops", "range", "off-by-one"],
        title: "Print First N Numbers",
        code: "# Print numbers from 1 to n\nn = 5\nfor i in range(1, n):\n    print(i)",
        bugLine: 3,
        bugDescription: "range(1, n) stops at n-1, not n",
        bugChoices: [
            "range(1, n) stops at n-1, not n",
            "range should start at 0, not 1",
            "The loop variable should be named 'num' instead of 'i'",
            "print(i) needs parentheses around i"
        ],
        correctBugChoice: 0,
        fixedCode: "# Print numbers from 1 to n\nn = 5\nfor i in range(1, n + 1):\n    print(i)",
        explanation: "The range() function's stop parameter is exclusive, meaning range(1, n) generates numbers from 1 to n-1. To include n, use range(1, n + 1). With n=5, range(1, 5) produces [1, 2, 3, 4], but we want [1, 2, 3, 4, 5].",
        conceptLink: null
    },
    {
        id: "t1d-comparison-operator",
        tier: 1,
        tags: ["conditionals", "operators", "comparison"],
        title: "Check Even Number",
        code: "def is_even(num):\n    if num % 2 = 0:\n        return True\n    return False",
        bugLine: 2,
        bugDescription: "Using assignment = instead of comparison ==",
        bugChoices: [
            "Using assignment = instead of comparison ==",
            "Should use num // 2 instead of num % 2",
            "Missing colon after the if statement",
            "The condition should be num % 2 == 1"
        ],
        correctBugChoice: 0,
        fixedCode: "def is_even(num):\n    if num % 2 == 0:\n        return True\n    return False",
        explanation: "In Python, = is the assignment operator, while == is the comparison operator. Using = in a condition causes a SyntaxError. The correct syntax is 'if num % 2 == 0:' to check if the remainder is equal to zero.",
        conceptLink: null
    },
    {
        id: "t1d-missing-return",
        tier: 1,
        tags: ["functions", "return"],
        title: "Calculate Square",
        code: "def square(x):\n    result = x * x\n\nprint(square(5))",
        bugLine: 2,
        bugDescription: "Function computes result but doesn't return it",
        bugChoices: [
            "Function computes result but doesn't return it",
            "Should use x ** 2 instead of x * x",
            "Variable name 'result' is too generic",
            "Missing parentheses in the multiplication"
        ],
        correctBugChoice: 0,
        fixedCode: "def square(x):\n    result = x * x\n    return result\n\nprint(square(5))",
        explanation: "The function calculates the square but never returns the value. Without a return statement, the function returns None by default. This causes print(square(5)) to output 'None' instead of 25. Always use 'return' to send values back from a function.",
        conceptLink: null
    },
    {
        id: "t1d-wrong-indentation",
        tier: 1,
        tags: ["loops", "indentation", "logic"],
        title: "Sum All Numbers",
        code: "def sum_list(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n        return total",
        bugLine: 5,
        bugDescription: "return is inside loop, returns after first iteration",
        bugChoices: [
            "return is inside loop, returns after first iteration",
            "Should use total = total + num",
            "Missing initialization of total",
            "Loop variable should be 'n' not 'num'"
        ],
        correctBugChoice: 0,
        fixedCode: "def sum_list(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total",
        explanation: "The return statement is indented to be inside the for loop, causing the function to return after processing only the first number. The return should be at the same indentation level as the for loop (but still inside the function) so it executes after the loop completes. Proper indentation is critical in Python.",
        conceptLink: null
    },
    {
        id: "t1d-string-method-misuse",
        tier: 1,
        tags: ["strings", "methods"],
        title: "Check Substring Presence",
        code: "text = \"Hello World\"\nif text.find(\"World\"):\n    print(\"Found it!\")\nelse:\n    print(\"Not found\")",
        bugLine: 2,
        bugDescription: "find() returns index (0 is falsy), use 'in' operator or check != -1",
        bugChoices: [
            "find() returns index (0 is falsy), use 'in' operator or check != -1",
            "Should use text.search() instead of find()",
            "Missing quotes around World",
            "Should use == instead of if"
        ],
        correctBugChoice: 0,
        fixedCode: "text = \"Hello World\"\nif \"World\" in text:\n    print(\"Found it!\")\nelse:\n    print(\"Not found\")",
        explanation: "The find() method returns the index where the substring is found, or -1 if not found. If the substring is at index 0, the condition evaluates to False (since 0 is falsy in Python). Use the 'in' operator for boolean checks, or check 'if text.find(\"World\") != -1'.",
        conceptLink: null
    },
    {
        id: "t1d-modify-while-iterate",
        tier: 1,
        tags: ["lists", "loops", "mutation"],
        title: "Remove Negative Numbers",
        code: "numbers = [1, -2, 3, -4, 5]\nfor num in numbers:\n    if num < 0:\n        numbers.remove(num)\nprint(numbers)",
        bugLine: 4,
        bugDescription: "Modifying list during iteration skips elements",
        bugChoices: [
            "Modifying list during iteration skips elements",
            "remove() doesn't exist for lists",
            "Should use numbers.delete(num) instead",
            "The condition should be num <= 0"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, -2, 3, -4, 5]\nfiltered = [num for num in numbers if num >= 0]\nprint(filtered)",
        explanation: "Removing items from a list while iterating over it causes the iterator to skip elements because indices shift when items are removed. For example, after removing -2 at index 1, the element that was at index 2 moves to index 1, but the loop has already moved to index 2. Use list comprehension or iterate over a copy.",
        conceptLink: null
    },
    {
        id: "t1d-string-int-concat",
        tier: 1,
        tags: ["strings", "types", "concatenation"],
        title: "Display Counter",
        code: "count = 10\nmessage = \"Count: \" + count\nprint(message)",
        bugLine: 2,
        bugDescription: "Cannot concatenate str and int, need str(count)",
        bugChoices: [
            "Cannot concatenate str and int, need str(count)",
            "Should use comma instead of plus",
            "count should be in quotes",
            "Missing parentheses around count"
        ],
        correctBugChoice: 0,
        fixedCode: "count = 10\nmessage = \"Count: \" + str(count)\nprint(message)",
        explanation: "Python doesn't automatically convert integers to strings during concatenation. Attempting to concatenate a string and an integer with + raises a TypeError. Use str(count) to convert the integer to a string, or use f-strings: f\"Count: {count}\".",
        conceptLink: null
    },
    {
        id: "t1d-missing-dict-key",
        tier: 1,
        tags: ["dictionaries", "keys", "errors"],
        title: "Get Student Grade",
        code: "grades = {\"Alice\": 95, \"Bob\": 87}\nstudent = \"Charlie\"\ngrade = grades[student]\nprint(f\"{student}: {grade}\")",
        bugLine: 3,
        bugDescription: "Key 'Charlie' doesn't exist, causes KeyError",
        bugChoices: [
            "Key 'Charlie' doesn't exist, causes KeyError",
            "Should use grades.get(student) syntax",
            "Dictionary brackets should be parentheses",
            "student variable needs quotes"
        ],
        correctBugChoice: 0,
        fixedCode: "grades = {\"Alice\": 95, \"Bob\": 87}\nstudent = \"Charlie\"\ngrade = grades.get(student, \"Not found\")\nprint(f\"{student}: {grade}\")",
        explanation: "Accessing a dictionary key with brackets (grades[student]) raises a KeyError if the key doesn't exist. Use the get() method instead, which returns None (or a default value) if the key is missing: grades.get(student) or grades.get(student, 'Not found').",
        conceptLink: null
    },
    {
        id: "t1d-missing-self",
        tier: 1,
        tags: ["classes", "methods", "self"],
        title: "Circle Class Method",
        code: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area():\n        return 3.14 * self.radius ** 2",
        bugLine: 5,
        bugDescription: "Method missing 'self' parameter",
        bugChoices: [
            "Method missing 'self' parameter",
            "Should use this instead of self",
            "Missing colon after def area()",
            "radius should be a global variable"
        ],
        correctBugChoice: 0,
        fixedCode: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return 3.14 * self.radius ** 2",
        explanation: "Instance methods in Python classes must have 'self' as their first parameter to access instance attributes and other methods. Without 'self', calling the method results in a TypeError because Python passes the instance automatically, but the method signature doesn't accept it.",
        conceptLink: null
    },
    {
        id: "t1d-assignment-in-condition",
        tier: 1,
        tags: ["conditionals", "logic", "operators"],
        title: "Password Validator",
        code: "password = \"secret123\"\nmin_length = 8\nif len(password) > min_length:\n    valid = True\nif valid:\n    print(\"Password accepted\")",
        bugLine: 5,
        bugDescription: "Variable 'valid' may not be defined if condition is False",
        bugChoices: [
            "Variable 'valid' may not be defined if condition is False",
            "Should use >= instead of >",
            "valid should be assigned before the if statement",
            "Missing else clause in first if"
        ],
        correctBugChoice: 0,
        fixedCode: "password = \"secret123\"\nmin_length = 8\nvalid = False\nif len(password) > min_length:\n    valid = True\nif valid:\n    print(\"Password accepted\")",
        explanation: "The variable 'valid' is only created if the first condition is True. If the password is too short, 'valid' is never assigned, causing a NameError when the second if statement tries to use it. Always initialize variables before conditional assignment, or handle both cases in the logic.",
        conceptLink: null
    },
    {
        id: "t1d-wrong-loop-variable",
        tier: 1,
        tags: ["loops", "variables", "scope"],
        title: "Nested Loop Matrix",
        code: "for i in range(3):\n    for j in range(3):\n        print(f\"({i}, {i})\")\n    print()",
        bugLine: 3,
        bugDescription: "Using 'i' twice instead of 'i' and 'j'",
        bugChoices: [
            "Using 'i' twice instead of 'i' and 'j'",
            "range(3) should be range(1, 3)",
            "Missing colon after for statement",
            "print() should have arguments"
        ],
        correctBugChoice: 0,
        fixedCode: "for i in range(3):\n    for j in range(3):\n        print(f\"({i}, {j})\")\n    print()",
        explanation: "The code uses variable 'i' in both positions of the coordinate pair, ignoring the inner loop variable 'j'. This results in output like (0, 0), (0, 0), (0, 0) instead of (0, 0), (0, 1), (0, 2). Always use the correct loop variable, especially in nested loops where it's easy to copy-paste errors.",
        conceptLink: null
    },
    {
        id: "t1d-index-out-of-range",
        tier: 1,
        tags: ["lists", "indexing", "errors"],
        title: "Get Last Element",
        code: "numbers = [10, 20, 30, 40, 50]\nlast_index = len(numbers)\nlast = numbers[last_index]\nprint(last)",
        bugLine: 3,
        bugDescription: "Index equals length, should be len(numbers) - 1",
        bugChoices: [
            "Index equals length, should be len(numbers) - 1",
            "Should use numbers.last() instead",
            "len() returns wrong value for lists",
            "Missing parentheses in index"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [10, 20, 30, 40, 50]\nlast_index = len(numbers) - 1\nlast = numbers[last_index]\nprint(last)",
        explanation: "List indices start at 0, so a list of length 5 has valid indices 0-4. Using len(numbers) as an index (which is 5) causes an IndexError. The last valid index is always len(numbers) - 1. Alternatively, use negative indexing: numbers[-1] to get the last element.",
        conceptLink: null
    },
    {
        id: "t1d-wrong-arg-order",
        tier: 1,
        tags: ["functions", "arguments", "parameters"],
        title: "Format Full Name",
        code: "def make_fullname(first, last):\n    return f\"{first} {last}\"\n\nname = make_fullname(\"Smith\", \"John\")\nprint(name)",
        bugLine: 4,
        bugDescription: "Arguments reversed, should be (\"John\", \"Smith\")",
        bugChoices: [
            "Arguments reversed, should be (\"John\", \"Smith\")",
            "Function should return last + first",
            "Missing comma in function call",
            "Should use concatenation instead of f-string"
        ],
        correctBugChoice: 0,
        fixedCode: "def make_fullname(first, last):\n    return f\"{first} {last}\"\n\nname = make_fullname(\"John\", \"Smith\")\nprint(name)",
        explanation: "The function expects first name then last name, but the arguments are passed in reverse order (last name first). This produces \"Smith John\" instead of \"John Smith\". Always pass arguments in the order defined by the function parameters, or use keyword arguments (first=\"John\", last=\"Smith\") to make the intent explicit and prevent order mistakes.",
        conceptLink: null
    },
    {
        id: "t1d-forgot-function-call",
        tier: 1,
        tags: ["functions", "syntax", "common-mistakes"],
        title: "Get Random Number",
        code: "import random\n\ndef get_dice_roll():\n    return random.randint(1, 6)\n\nresult = get_dice_roll\nprint(f\"You rolled: {result}\")",
        bugLine: 6,
        bugDescription: "Missing parentheses, get_dice_roll() not called",
        bugChoices: [
            "Missing parentheses, get_dice_roll() not called",
            "random.randint needs three arguments",
            "Should use return statement in print",
            "Function name should be capitalized"
        ],
        correctBugChoice: 0,
        fixedCode: "import random\n\ndef get_dice_roll():\n    return random.randint(1, 6)\n\nresult = get_dice_roll()\nprint(f\"You rolled: {result}\")",
        explanation: "Without parentheses, 'get_dice_roll' refers to the function object itself, not the result of calling it. The code assigns the function object to 'result', so printing it shows something like '<function get_dice_roll at 0x...>' instead of a number. Always use () to call functions.",
        conceptLink: null
    },
    {
        id: "t1d-append-vs-extend",
        tier: 1,
        tags: ["lists", "methods", "append-extend"],
        title: "Combine Number Lists",
        code: "numbers = [1, 2, 3]\nmore_numbers = [4, 5, 6]\nnumbers.append(more_numbers)\nprint(numbers)",
        bugLine: 3,
        bugDescription: "append() adds list as single element, use extend()",
        bugChoices: [
            "append() adds list as single element, use extend()",
            "Should use numbers + more_numbers",
            "append() doesn't exist for lists",
            "Missing parentheses in method call"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3]\nmore_numbers = [4, 5, 6]\nnumbers.extend(more_numbers)\nprint(numbers)",
        explanation: "The append() method adds its argument as a single element, so numbers.append([4, 5, 6]) creates [1, 2, 3, [4, 5, 6]]. To add individual elements from another list, use extend() which results in [1, 2, 3, 4, 5, 6]. Alternatively, use numbers += more_numbers or numbers = numbers + more_numbers.",
        conceptLink: null
    }
];
