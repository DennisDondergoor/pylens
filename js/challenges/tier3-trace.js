window.TIER3_TRACE = [
    {
        id: "t3t-default-arg",
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
        tier: 3,
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
    }
];
