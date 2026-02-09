// Tier 3 Debug Challenges: Functions & Control Flow bugs
// Each challenge contains exactly ONE bug that tests Python semantics understanding

window.TIER3_DEBUG = [
    {
        id: "t3d-missing-return",
        tier: 3,
        tags: ["functions", "return"],
        title: "Missing Return Statement",
        code: "def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item\n    # Function ends without return",
        bugLine: 4,
        bugDescription: "Function computes total but doesn't return it",
        bugChoices: [
            "Function computes the result but never returns it, so callers get None",
            "The loop doesn't iterate properly over the items list",
            "Variable 'total' is not initialized before the loop",
            "The += operator is being used incorrectly with integers"
        ],
        correctBugChoice: 0,
        fixedCode: "def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item\n    return total",
        explanation: "A common beginner mistake is forgetting the return statement. Python functions that don't explicitly return a value return None by default. The function correctly computes the total but doesn't return it, so any caller will receive None instead of the calculated sum.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-early-return",
        tier: 3,
        tags: ["loops", "return", "control-flow"],
        title: "Return Inside Loop",
        code: "def find_evens(numbers):\n    evens = []\n    for num in numbers:\n        if num % 2 == 0:\n            evens.append(num)\n            return evens\n    return evens",
        bugLine: 6,
        bugDescription: "Return statement exits on first even number found",
        bugChoices: [
            "The return statement is inside the loop, so it exits after finding the first even number",
            "The modulo operator % 2 doesn't correctly check for even numbers",
            "The evens list should be initialized outside the function scope",
            "The append method is called incorrectly and should use += instead"
        ],
        correctBugChoice: 0,
        fixedCode: "def find_evens(numbers):\n    evens = []\n    for num in numbers:\n        if num % 2 == 0:\n            evens.append(num)\n    return evens",
        explanation: "The return statement is incorrectly placed inside the loop, causing the function to exit after finding the first even number. The return should be outside the loop (unindented one level) so it only executes after all numbers have been processed. This is a common indentation logic error.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3d-mutable-default",
        tier: 3,
        tags: ["functions", "default-arguments", "mutable"],
        title: "Mutable Default Argument",
        code: "def add_item(item, items=[]):\n    items.append(item)\n    return items\n\nprint(add_item('a'))  # ['a']\nprint(add_item('b'))  # ['a', 'b'] - Bug!",
        bugLine: 1,
        bugDescription: "Default list is created once and shared across all calls",
        bugChoices: [
            "The default list [] is created once at function definition and shared across calls, accumulating values",
            "The append method modifies the wrong list in memory",
            "The return statement should return a copy of items instead of the original",
            "The parameter 'item' shadows the loop variable and causes incorrect behavior"
        ],
        correctBugChoice: 0,
        fixedCode: "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items",
        explanation: "Python's default arguments are evaluated once at function definition time, not each time the function is called. When using a mutable default (like a list), the same object is reused across calls, leading to accumulated state. The fix is to use None as default and create a new list inside the function when needed.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t3d-infinite-loop",
        tier: 3,
        tags: ["loops", "while", "control-flow"],
        title: "Infinite Loop",
        code: "def count_to_n(n):\n    i = 1\n    while i <= n:\n        print(i)\n    return 'Done'",
        bugLine: 3,
        bugDescription: "Loop counter never increments, causing infinite loop",
        bugChoices: [
            "The loop counter 'i' is never incremented, so the condition always stays true",
            "The condition i <= n should be i < n to avoid off-by-one errors",
            "The print statement should be inside an if block to execute properly",
            "The return statement is unreachable because it's outside the loop"
        ],
        correctBugChoice: 0,
        fixedCode: "def count_to_n(n):\n    i = 1\n    while i <= n:\n        print(i)\n        i += 1\n    return 'Done'",
        explanation: "The while loop's condition i <= n will always be true because 'i' is never incremented. This creates an infinite loop that will print '1' forever. The fix is to add 'i += 1' inside the loop body to ensure the loop variable progresses toward the terminating condition.",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#first-steps-towards-programming"
    },
    {
        id: "t3d-range-off-by-one",
        tier: 3,
        tags: ["loops", "range", "off-by-one"],
        title: "Range Off-By-One Error",
        code: "def sum_1_to_n(n):\n    total = 0\n    for i in range(1, n):\n        total += i\n    return total\n\n# sum_1_to_n(5) returns 10, not 15",
        bugLine: 3,
        bugDescription: "range(1, n) excludes n, so it sums 1 to n-1",
        bugChoices: [
            "range(1, n) excludes the upper bound n, so it only sums from 1 to n-1",
            "The total variable should be initialized to 1 instead of 0",
            "The += operator accumulates incorrectly in for loops",
            "The range function requires a step parameter to work correctly"
        ],
        correctBugChoice: 0,
        fixedCode: "def sum_1_to_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total",
        explanation: "Python's range(start, stop) function excludes the stop value. range(1, n) generates numbers from 1 to n-1, not 1 to n. For example, range(1, 5) produces [1, 2, 3, 4]. To include n, use range(1, n + 1). This is a classic off-by-one error when transitioning from math notation to Python.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#range"
    },
    {
        id: "t3d-unreachable-code",
        tier: 3,
        tags: ["functions", "return", "control-flow"],
        title: "Unreachable Code After Return",
        code: "def process_data(data):\n    if not data:\n        return None\n        print('No data provided')\n    return len(data)",
        bugLine: 4,
        bugDescription: "Print statement after return is unreachable",
        bugChoices: [
            "The print statement is after return, so it never executes (unreachable code)",
            "The condition 'not data' doesn't correctly check for empty data",
            "The len() function should be called before the return statement",
            "The return None statement should be changed to return 0"
        ],
        correctBugChoice: 0,
        fixedCode: "def process_data(data):\n    if not data:\n        print('No data provided')\n        return None\n    return len(data)",
        explanation: "Once a return statement executes, the function exits immediately. Any code after a return statement in the same block is unreachable and will never execute. The print statement should come before the return. Many Python linters will warn about unreachable code, as it often indicates a logic error.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-wrong-arg-order",
        tier: 3,
        tags: ["functions", "arguments", "parameters"],
        title: "Wrong Argument Order",
        code: "def divide(dividend, divisor):\n    return dividend / divisor\n\nresult = divide(2, 10)\nprint(result)  # 0.2 instead of 5.0",
        bugLine: 4,
        bugDescription: "Arguments passed in wrong order (divisor, dividend)",
        bugChoices: [
            "The arguments are passed in reversed order: divide(2, 10) computes 2/10 instead of 10/2",
            "The division operator / should be // for integer division",
            "The function definition has parameters in the wrong order",
            "The return statement should use the modulo operator instead of division"
        ],
        correctBugChoice: 0,
        fixedCode: "def divide(dividend, divisor):\n    return dividend / divisor\n\nresult = divide(10, 2)\nprint(result)  # 5.0",
        explanation: "Function arguments in Python are positional by default. The function expects divide(dividend, divisor), but the call passes divide(2, 10), which computes 2/10 = 0.2. The intended calculation was likely 10/2 = 5.0. Always ensure arguments match the expected parameter order, or use keyword arguments for clarity: divide(dividend=10, divisor=2).",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-forgot-to-call",
        tier: 3,
        tags: ["functions", "function-calls"],
        title: "Forgot Function Call Parentheses",
        code: "def get_greeting():\n    return 'Hello, World!'\n\nmessage = get_greeting\nprint(message)  # Prints function object, not 'Hello, World!'",
        bugLine: 4,
        bugDescription: "Assigned function object instead of calling the function",
        bugChoices: [
            "Missing parentheses: 'get_greeting' refers to the function object, not its return value",
            "The return statement in the function is formatted incorrectly",
            "The print function doesn't accept function objects as arguments",
            "The variable name 'message' conflicts with a built-in Python function"
        ],
        correctBugChoice: 0,
        fixedCode: "def get_greeting():\n    return 'Hello, World!'\n\nmessage = get_greeting()\nprint(message)  # Prints 'Hello, World!'",
        explanation: "In Python, using a function name without parentheses refers to the function object itself, not the result of calling it. 'get_greeting' is the function object, while 'get_greeting()' calls the function and returns its value. This is useful for passing functions as arguments, but a common mistake when you actually want to call the function.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-nested-break",
        tier: 3,
        tags: ["loops", "break", "nested-loops"],
        title: "Break Only Exits Inner Loop",
        code: "def find_pair(matrix, target):\n    for row in matrix:\n        for val in row:\n            if val == target:\n                break\n    return 'Found'  # Returns even if not found",
        bugLine: 5,
        bugDescription: "break only exits inner loop, outer loop continues",
        bugChoices: [
            "The break statement only exits the inner loop, not the outer loop, so execution continues",
            "The return statement should be inside the if block to work correctly",
            "The target parameter is not being compared correctly with val",
            "The for loop syntax doesn't support nested iteration over matrices"
        ],
        correctBugChoice: 0,
        fixedCode: "def find_pair(matrix, target):\n    for row in matrix:\n        for val in row:\n            if val == target:\n                return 'Found'\n    return 'Not found'",
        explanation: "The break statement only exits the innermost loop it's in. After breaking from the inner loop, execution continues with the next iteration of the outer loop. To exit both loops when the target is found, use return instead of break, or use a flag variable, or wrap in a try/except with a custom exception.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3d-variable-shadowing",
        tier: 3,
        tags: ["scope", "variables", "shadowing"],
        title: "Variable Shadowing",
        code: "total = 100\n\ndef add_to_total(amount):\n    total = total + amount\n    return total\n\nresult = add_to_total(50)  # UnboundLocalError",
        bugLine: 4,
        bugDescription: "Local assignment shadows global, causes UnboundLocalError",
        bugChoices: [
            "Assigning to 'total' makes it local, but it's read before assignment on the same line",
            "The amount parameter has the wrong type and can't be added to total",
            "The global variable total is immutable and can't be modified",
            "The return statement should use a different variable name"
        ],
        correctBugChoice: 0,
        fixedCode: "total = 100\n\ndef add_to_total(amount):\n    global total\n    total = total + amount\n    return total",
        explanation: "Python determines variable scope at compile time. When 'total' is assigned inside the function, Python treats it as a local variable throughout the function. The line 'total = total + amount' tries to read the local 'total' before it's assigned, causing UnboundLocalError. Use 'global total' to modify the global variable, or better yet, redesign to avoid global state by passing and returning values.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-am-i-getting-an-unboundlocalerror-when-the-variable-has-a-value"
    }
];
