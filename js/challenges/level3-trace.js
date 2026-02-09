window.LEVEL3_TRACE = [
    {
        id: "t3t-default-arg",
        level: 3,
        tags: ["functions", "default-arguments"],
        title: "Default Argument",
        code: "def greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\nprint(greet('Alice'))\nprint(greet('Bob', 'Hi'))",
        correctOutput: "Hello, Alice!\nHi, Bob!",
        outputChoices: [
            "Hello, Alice!\nHi, Bob!",
            "Hello, Alice!\nHello, Bob!",
            "greeting, Alice!\nHi, Bob!",
            "None\nNone"
        ],
        explanation: "When greet('Alice') is called without a second argument, the default greeting='Hello' is used. When greet('Bob', 'Hi') is called, 'Hi' overrides the default.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t3t-multiple-return",
        level: 3,
        tags: ["functions", "return-values", "tuples"],
        title: "Multiple Return Values",
        code: "def get_stats(nums):\n    return min(nums), max(nums)\n\nsmall, large = get_stats([5, 2, 8, 1])\nprint(small)\nprint(large)",
        correctOutput: "1\n8",
        outputChoices: [
            "1\n8",
            "5\n1",
            "2\n8",
            "(1, 8)\n(1, 8)"
        ],
        explanation: "The function returns a tuple (min, max). When unpacking with small, large = get_stats(...), small gets 1 (the minimum) and large gets 8 (the maximum).",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists"
    },
    {
        id: "t3t-range-step",
        level: 3,
        tags: ["range", "loops", "for"],
        title: "Range with Step",
        code: "for i in range(10, 4, -2):\n    print(i, end=' ')",
        correctOutput: "10 8 6 ",
        outputChoices: [
            "10 8 6 ",
            "10 8 6 4 ",
            "10 9 8 7 6 5 ",
            "4 6 8 10 "
        ],
        explanation: "range(10, 4, -2) starts at 10, stops before 4, and steps by -2. It generates: 10, 8, 6. The 4 is not included (stop is exclusive).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#range"
    },
    {
        id: "t3t-for-else",
        level: 3,
        tags: ["for", "else", "control-flow"],
        title: "For-Else Construct",
        code: "for n in [2, 4, 6, 8]:\n    if n > 10:\n        print('Found')\n        break\nelse:\n    print('Not found')",
        correctOutput: "Not found",
        outputChoices: [
            "Not found",
            "Found",
            "Found\nNot found",
            ""
        ],
        explanation: "The else clause after a for loop executes when the loop completes normally (without break). Since no number is greater than 10, break never executes, so else runs and prints 'Not found'.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3t-nested-loops",
        level: 3,
        tags: ["nested-loops", "for", "range"],
        title: "Nested Loops Output",
        code: "for i in range(2):\n    for j in range(3):\n        print(f'{i}{j}', end=' ')",
        correctOutput: "00 01 02 10 11 12 ",
        outputChoices: [
            "00 01 02 10 11 12 ",
            "00 10 01 11 02 12 ",
            "0 1 2 0 1 2 ",
            "00 11 22 "
        ],
        explanation: "The outer loop runs twice (i=0, i=1). For each i, the inner loop runs three times (j=0, j=1, j=2). This produces: 00 01 02 (when i=0), then 10 11 12 (when i=1).",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#for-statements"
    },
    {
        id: "t3t-args-collect",
        level: 3,
        tags: ["functions", "args", "variable-arguments"],
        title: "Collecting Extra Arguments",
        code: "def add_all(first, *rest):\n    total = first\n    for num in rest:\n        total += num\n    return total\n\nprint(add_all(1, 2, 3, 4))",
        correctOutput: "10",
        outputChoices: [
            "10",
            "1",
            "4",
            "9"
        ],
        explanation: "*rest collects all arguments after the first into a tuple. So first=1 and rest=(2, 3, 4). The function sums 1 + 2 + 3 + 4 = 10.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#arbitrary-argument-lists"
    },
    {
        id: "t3t-implicit-none",
        level: 3,
        tags: ["functions", "return", "None"],
        title: "Implicit None Return",
        code: "def show_double(x):\n    print(x * 2)\n\nresult = show_double(5)\nprint(result)",
        correctOutput: "10\nNone",
        outputChoices: [
            "10\nNone",
            "10\n10",
            "None\nNone",
            "10"
        ],
        explanation: "show_double(5) prints 10 but has no return statement, so it implicitly returns None. The result variable gets None, which is then printed on the second line.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3t-while-break",
        level: 3,
        tags: ["while", "break", "control-flow"],
        title: "While Loop with Break",
        code: "count = 0\nwhile True:\n    count += 1\n    if count == 3:\n        break\n    print(count, end=' ')",
        correctOutput: "1 2 ",
        outputChoices: [
            "1 2 ",
            "1 2 3 ",
            "0 1 2 ",
            "3 "
        ],
        explanation: "The loop increments count, then checks if count==3. If not, it prints. When count=1: prints 1. When count=2: prints 2. When count=3: break executes before printing.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3t-lambda-basic",
        level: 3,
        tags: ["lambda", "functions", "anonymous-functions"],
        title: "Lambda Function",
        code: "square = lambda x: x * x\nresult = square(7)\nprint(result)",
        correctOutput: "49",
        outputChoices: [
            "49",
            "7",
            "14",
            "x * x"
        ],
        explanation: "The lambda creates an anonymous function that takes x and returns x * x. When square(7) is called, it computes 7 * 7 = 49.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions"
    },
    {
        id: "t3t-ternary",
        level: 3,
        tags: ["conditional-expression", "ternary", "if-else"],
        title: "Conditional Expression",
        code: "age = 15\nstatus = 'adult' if age >= 18 else 'minor'\nprint(status)\nage = 20\nstatus = 'adult' if age >= 18 else 'minor'\nprint(status)",
        correctOutput: "minor\nadult",
        outputChoices: [
            "minor\nadult",
            "adult\nadult",
            "minor\nminor",
            "True\nFalse"
        ],
        explanation: "The conditional expression evaluates the condition. For age=15 (< 18), it returns 'minor'. For age=20 (>= 18), it returns 'adult'.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#conditional-expressions"
    },
    {
        id: "t3t-recursion-countdown",
        level: 3,
        tags: ["recursion", "functions", "base-case"],
        title: "Simple Recursion",
        code: "def countdown(n):\n    if n <= 0:\n        print('Done!')\n    else:\n        print(n)\n        countdown(n - 1)\n\ncountdown(3)",
        correctOutput: "3\n2\n1\nDone!",
        outputChoices: [
            "3\n2\n1\nDone!",
            "Done!\n1\n2\n3",
            "3\n2\n1",
            "Done!"
        ],
        explanation: "countdown(3) prints 3, then calls countdown(2), which prints 2, then calls countdown(1), which prints 1, then calls countdown(0), which prints 'Done!' (base case).",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3t-nested-function",
        level: 3,
        tags: ["nested-functions", "functions", "scope"],
        title: "Nested Function",
        code: "def outer(x):\n    def inner(y):\n        return x + y\n    return inner(10)\n\nprint(outer(5))",
        correctOutput: "15",
        outputChoices: [
            "15",
            "10",
            "5",
            "Error"
        ],
        explanation: "outer(5) defines inner function that can access x from outer scope. inner(10) is called with y=10, returning 5 + 10 = 15.",
        conceptLink: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
    },
    {
        id: "t3t-closure",
        level: 3,
        tags: ["closures", "nested-functions", "scope"],
        title: "Closure Capturing Variable",
        code: "def multiplier(factor):\n    def multiply(num):\n        return num * factor\n    return multiply\n\ntimes3 = multiplier(3)\nprint(times3(7))",
        correctOutput: "21",
        outputChoices: [
            "21",
            "10",
            "3",
            "7"
        ],
        explanation: "multiplier(3) returns the multiply function, which captures factor=3. When times3(7) is called, it computes 7 * 3 = 21.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#what-are-closures"
    },
    {
        id: "t3t-global-keyword",
        level: 3,
        tags: ["global", "scope", "variables"],
        title: "Global Keyword",
        code: "count = 0\n\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)",
        correctOutput: "2",
        outputChoices: [
            "2",
            "0",
            "1",
            "Error"
        ],
        explanation: "The global keyword allows increment() to modify the global count variable. Two calls increment it from 0 to 1 to 2.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#global"
    },
    {
        id: "t3t-nonlocal-keyword",
        level: 3,
        tags: ["nonlocal", "nested-functions", "scope"],
        title: "Nonlocal Keyword",
        code: "def outer():\n    x = 1\n    def inner():\n        nonlocal x\n        x += 2\n    inner()\n    return x\n\nprint(outer())",
        correctOutput: "3",
        outputChoices: [
            "3",
            "1",
            "2",
            "Error"
        ],
        explanation: "nonlocal allows inner() to modify x from outer's scope. inner() changes x from 1 to 3, then outer() returns 3.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#nonlocal"
    },
    {
        id: "t3t-early-return",
        level: 3,
        tags: ["return", "functions", "control-flow"],
        title: "Early Return Pattern",
        code: "def check_positive(n):\n    if n <= 0:\n        return 'Invalid'\n    if n > 100:\n        return 'Too large'\n    return 'Valid'\n\nprint(check_positive(50))",
        correctOutput: "Valid",
        outputChoices: [
            "Valid",
            "Invalid",
            "Too large",
            "None"
        ],
        explanation: "For n=50, the first condition (n <= 0) is false, the second condition (n > 100) is false, so execution reaches the final return statement.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3t-multiple-return-paths",
        level: 3,
        tags: ["return", "functions", "conditionals"],
        title: "Multiple Return Paths",
        code: "def classify(score):\n    if score >= 90:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    else:\n        return 'C'\n\nprint(classify(85))",
        correctOutput: "B",
        outputChoices: [
            "B",
            "A",
            "C",
            "None"
        ],
        explanation: "For score=85, the first condition (>= 90) is false, but the second condition (>= 80) is true, so the function returns 'B'.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#if-statements"
    },
    {
        id: "t3t-loop-else-break",
        level: 3,
        tags: ["for", "else", "break", "control-flow"],
        title: "Loop Else with Break",
        code: "for n in [3, 6, 9, 12]:\n    if n > 10:\n        print('Found')\n        break\nelse:\n    print('Not found')",
        correctOutput: "Found",
        outputChoices: [
            "Found",
            "Not found",
            "Found\nNot found",
            ""
        ],
        explanation: "When n=12, the condition n > 10 is true, so 'Found' prints and break executes. Since break was triggered, the else clause does not run.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3t-continue-statement",
        level: 3,
        tags: ["continue", "for", "control-flow"],
        title: "Continue Statement",
        code: "for i in range(5):\n    if i % 2 == 0:\n        continue\n    print(i, end=' ')",
        correctOutput: "1 3 ",
        outputChoices: [
            "1 3 ",
            "0 2 4 ",
            "1 2 3 4 ",
            "0 1 2 3 4 "
        ],
        explanation: "When i is even (0, 2, 4), continue skips the rest of the loop body. Only odd values (1, 3) are printed.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3t-nested-conditionals",
        level: 3,
        tags: ["conditionals", "if-else", "nesting"],
        title: "Nested Conditionals",
        code: "x = 15\nif x > 10:\n    if x < 20:\n        print('Medium')\n    else:\n        print('Large')\nelse:\n    print('Small')",
        correctOutput: "Medium",
        outputChoices: [
            "Medium",
            "Large",
            "Small",
            "Medium\nLarge"
        ],
        explanation: "x=15 satisfies x > 10, so we enter the outer if. Then x < 20 is true, so 'Medium' is printed.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#if-statements"
    },
    {
        id: "t3t-function-as-argument",
        level: 3,
        tags: ["functions", "higher-order", "lambda"],
        title: "Function as Argument",
        code: "def apply(func, value):\n    return func(value)\n\nresult = apply(lambda x: x * 2, 8)\nprint(result)",
        correctOutput: "16",
        outputChoices: [
            "16",
            "8",
            "2",
            "lambda x: x * 2"
        ],
        explanation: "apply receives the lambda function and value 8. It calls the lambda with 8, which returns 8 * 2 = 16.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions"
    },
    {
        id: "t3t-recursion-sum",
        level: 3,
        tags: ["recursion", "functions", "base-case"],
        title: "Recursive Sum",
        code: "def sum_to(n):\n    if n == 1:\n        return 1\n    return n + sum_to(n - 1)\n\nprint(sum_to(4))",
        correctOutput: "10",
        outputChoices: [
            "10",
            "4",
            "1",
            "Error"
        ],
        explanation: "sum_to(4) returns 4 + sum_to(3). This expands to 4 + 3 + sum_to(2), then 4 + 3 + 2 + sum_to(1), then 4 + 3 + 2 + 1 = 10.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3t-while-else",
        level: 3,
        tags: ["while", "else", "control-flow"],
        title: "While-Else Construct",
        code: "x = 0\nwhile x < 3:\n    x += 1\nelse:\n    print('Done')\nprint(x)",
        correctOutput: "Done\n3",
        outputChoices: [
            "Done\n3",
            "3",
            "Done\n0",
            "Done"
        ],
        explanation: "The while loop runs until x reaches 3. Since the loop completes normally (no break), the else clause executes, printing 'Done'. Then x (which is 3) is printed.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3t-kwargs-basic",
        level: 3,
        tags: ["kwargs", "functions", "keyword-arguments"],
        title: "Keyword Arguments Collection",
        code: "def describe(**kwargs):\n    for key, val in kwargs.items():\n        print(f'{key}: {val}')\n\ndescribe(name='Alice', age=30)",
        correctOutput: "name: Alice\nage: 30",
        outputChoices: [
            "name: Alice\nage: 30",
            "Alice\n30",
            "{'name': 'Alice', 'age': 30}",
            "key: val"
        ],
        explanation: "**kwargs collects all keyword arguments into a dictionary {'name': 'Alice', 'age': 30}. The loop iterates and prints each key-value pair.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#keyword-arguments"
    },
    {
        id: "t3t-range-empty",
        level: 3,
        tags: ["range", "loops", "edge-cases"],
        title: "Empty Range",
        code: "total = 0\nfor i in range(5, 2):\n    total += i\nprint(total)",
        correctOutput: "0",
        outputChoices: [
            "0",
            "5",
            "9",
            "Error"
        ],
        explanation: "range(5, 2) with default step of 1 cannot go from 5 to 2, so it produces an empty sequence. The loop body never executes, leaving total at 0.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#range"
    }
];
