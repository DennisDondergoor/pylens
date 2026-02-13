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
    },
    {
        id: "t3d-wrong-recursion-base",
        tier: 3,
        tags: ["recursion", "functions", "base-case"],
        title: "Wrong Recursion Base Case",
        code: "def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))  # RecursionError!",
        bugLine: 2,
        bugDescription: "Base case doesn't handle n=0, causing infinite recursion",
        bugChoices: [
            "Base case only checks n == 1, so factorial(0) recurses infinitely with negative numbers",
            "The multiplication operator can't be used with recursive function calls",
            "The return statement on line 4 is missing parentheses around the expression",
            "The parameter n should be checked for negative values inside the recursion"
        ],
        correctBugChoice: 0,
        fixedCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
        explanation: "The base case n == 1 doesn't handle n=0. When factorial(0) is called, it doesn't match the base case, so it recursively calls factorial(-1), factorial(-2), etc., causing infinite recursion and eventually a RecursionError. The fix is to use n <= 1 or explicitly check n == 0. Mathematically, 0! = 1 by convention.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-infinite-recursion",
        tier: 3,
        tags: ["recursion", "functions", "control-flow"],
        title: "Infinite Recursion",
        code: "def countdown(n):\n    print(n)\n    countdown(n - 1)\n    if n == 0:\n        return",
        bugLine: 3,
        bugDescription: "Recursive call happens before base case check",
        bugChoices: [
            "Recursive call happens before base case check, so recursion never stops",
            "The print statement should come after the recursive call",
            "The parameter n is not being decremented correctly",
            "The return statement should return a value instead of None"
        ],
        correctBugChoice: 0,
        fixedCode: "def countdown(n):\n    if n == 0:\n        return\n    print(n)\n    countdown(n - 1)",
        explanation: "The base case check must come before the recursive call. In the buggy version, countdown() is called unconditionally, and the base case check on line 4 is unreachable for n=0 because the function already made a recursive call. Always place base case checks at the beginning of recursive functions to ensure they terminate.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t3d-wrong-loop-condition",
        tier: 3,
        tags: ["loops", "while", "logic"],
        title: "Wrong Loop Condition",
        code: "def find_first_positive(numbers):\n    i = 0\n    while i < len(numbers) and numbers[i] >= 0:\n        i += 1\n    return i if i < len(numbers) else -1",
        bugLine: 3,
        bugDescription: "Condition should check < 0 (negative), not >= 0",
        bugChoices: [
            "The condition checks >= 0 (non-negative) but should check < 0 (negative) to find positive",
            "The loop counter i should start at 1 instead of 0",
            "The and operator should be replaced with or for correct logic",
            "The len() function returns incorrect values for the numbers list"
        ],
        correctBugChoice: 0,
        fixedCode: "def find_first_positive(numbers):\n    i = 0\n    while i < len(numbers) and numbers[i] < 0:\n        i += 1\n    return i if i < len(numbers) else -1",
        explanation: "The loop is supposed to skip negative numbers and find the first positive one, but the condition checks numbers[i] >= 0, which includes positive numbers and zero. This causes the loop to skip over positive numbers instead of stopping at them. The correct condition is numbers[i] < 0 to skip only negative numbers.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#comparisons"
    },
    {
        id: "t3d-using-global-without-declaring",
        tier: 3,
        tags: ["scope", "global", "variables"],
        title: "Reading Global Without Global Keyword",
        code: "counter = 0\n\ndef increment():\n    counter += 1\n    return counter\n\nincrement()  # UnboundLocalError",
        bugLine: 4,
        bugDescription: "counter += 1 is assignment, making counter local but reading it first",
        bugChoices: [
            "The += operation assigns to counter, making it local, but reads it first causing UnboundLocalError",
            "The global variable counter is read-only and can't be modified",
            "The return statement should come before the increment operation",
            "The function needs a parameter to accept the counter value"
        ],
        correctBugChoice: 0,
        fixedCode: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n    return counter",
        explanation: "The augmented assignment counter += 1 is equivalent to counter = counter + 1, which assigns to counter. Python sees the assignment and treats counter as a local variable throughout the function. When it tries to read counter on the right side, it's not yet defined locally, causing UnboundLocalError. Use 'global counter' to indicate you're modifying the global variable.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-am-i-getting-an-unboundlocalerror-when-the-variable-has-a-value"
    },
    {
        id: "t3d-wrong-elif-logic",
        tier: 3,
        tags: ["conditionals", "if-elif-else", "logic"],
        title: "Wrong elif Ordering",
        code: "def grade(score):\n    if score >= 60:\n        return 'Pass'\n    elif score >= 80:\n        return 'Excellent'\n    else:\n        return 'Fail'",
        bugLine: 4,
        bugDescription: "elif score >= 80 never executes because >= 60 catches it first",
        bugChoices: [
            "The elif for 80+ comes after >= 60, so scores 80+ return 'Pass' instead of 'Excellent'",
            "The comparison operators should use > instead of >= for proper ranges",
            "The else clause is unreachable because all cases are covered by previous conditions",
            "The return statements should be replaced with a single return at the end"
        ],
        correctBugChoice: 0,
        fixedCode: "def grade(score):\n    if score >= 80:\n        return 'Excellent'\n    elif score >= 60:\n        return 'Pass'\n    else:\n        return 'Fail'",
        explanation: "In if-elif chains, Python evaluates conditions in order and executes the first one that's true. A score of 85 matches score >= 60 first and returns 'Pass', never reaching the score >= 80 condition. Always order conditions from most specific to most general, or from highest to lowest in numeric ranges.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#if-statements"
    },
    {
        id: "t3d-return-in-finally",
        tier: 3,
        tags: ["exceptions", "try-except", "finally"],
        title: "Return in Finally Block",
        code: "def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error'\n    finally:\n        return 'Done'",
        bugLine: 7,
        bugDescription: "Return in finally overrides previous return values",
        bugChoices: [
            "The return in finally block always executes last, overriding any previous return values",
            "The finally block should not contain any return statements according to Python syntax",
            "The except clause's return is unreachable because finally comes after",
            "The try block's return value is cached before the finally block executes"
        ],
        correctBugChoice: 0,
        fixedCode: "def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error'\n    finally:\n        print('Done')  # Cleanup, no return",
        explanation: "The finally block always executes, even when there's a return statement in try or except. If finally contains a return, it overrides any previous return value. This function always returns 'Done' regardless of whether division succeeds or fails. Use finally for cleanup only, never for returning values.",
        conceptLink: "https://docs.python.org/3/tutorial/errors.html#defining-clean-up-actions"
    },
    {
        id: "t3d-modifying-loop-variable",
        tier: 3,
        tags: ["loops", "for", "iteration"],
        title: "Modifying Loop Variable",
        code: "def skip_evens(n):\n    result = []\n    for i in range(n):\n        if i % 2 == 0:\n            i += 1\n        result.append(i)\n    return result",
        bugLine: 5,
        bugDescription: "Modifying loop variable doesn't affect iteration",
        bugChoices: [
            "Modifying i inside the loop doesn't affect the next iteration; range() controls the values",
            "The modulo operator % 2 returns incorrect results for even numbers",
            "The append operation should happen before modifying the loop variable",
            "The range function needs a step parameter to skip even numbers"
        ],
        correctBugChoice: 0,
        fixedCode: "def skip_evens(n):\n    result = []\n    for i in range(n):\n        if i % 2 == 1:  # Only append odds\n            result.append(i)\n    return result",
        explanation: "In a for loop, the loop variable is reassigned on each iteration from the iterator (range()). Modifying i inside the loop body doesn't affect what value i will have in the next iteration. If range() yields 0, 1, 2, 3, then i will be those values in order, regardless of any modifications. To skip values, use the if condition to filter, not modify the loop variable.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#for-statements"
    },
    {
        id: "t3d-wrong-boolean-logic",
        tier: 3,
        tags: ["logic", "conditionals", "boolean"],
        title: "Wrong Boolean Logic in Condition",
        code: "def is_valid_password(pwd):\n    has_digit = any(c.isdigit() for c in pwd)\n    has_letter = any(c.isalpha() for c in pwd)\n    return len(pwd) >= 8 or has_digit or has_letter",
        bugLine: 4,
        bugDescription: "Should use 'and' to require all conditions, not 'or'",
        bugChoices: [
            "Using 'or' means only one condition needs to be true; should use 'and' to require all three",
            "The len() function should be called with a different syntax for passwords",
            "The has_digit and has_letter variables are computed incorrectly",
            "The >= operator should be > for proper length validation"
        ],
        correctBugChoice: 0,
        fixedCode: "def is_valid_password(pwd):\n    has_digit = any(c.isdigit() for c in pwd)\n    has_letter = any(c.isalpha() for c in pwd)\n    return len(pwd) >= 8 and has_digit and has_letter",
        explanation: "The password validation should require all three conditions: sufficient length AND at least one digit AND at least one letter. Using 'or' makes a password valid if ANY single condition is met, so '12345678' (no letters) or 'abc' (too short but has letters) would pass. Boolean logic errors like this are common and can create security vulnerabilities.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#boolean-operations"
    },
    {
        id: "t3d-forgot-to-accumulate",
        tier: 3,
        tags: ["loops", "accumulation", "logic"],
        title: "Forgot to Accumulate in Loop",
        code: "def sum_squares(numbers):\n    total = 0\n    for num in numbers:\n        square = num * num\n    return total",
        bugLine: 4,
        bugDescription: "Square is computed but never added to total",
        bugChoices: [
            "The square is computed but never accumulated into total, so the function returns 0",
            "The total variable should be initialized to 1 instead of 0",
            "The return statement should return square instead of total",
            "The for loop syntax requires an else clause to accumulate values"
        ],
        correctBugChoice: 0,
        fixedCode: "def sum_squares(numbers):\n    total = 0\n    for num in numbers:\n        square = num * num\n        total += square\n    return total",
        explanation: "The code computes each square but forgets to add it to the accumulator 'total'. This is a common mistake when refactoring code or thinking about the calculation steps separately from the accumulation. The function always returns 0 because total is never modified. Remember that intermediate values computed in loops usually need to be accumulated.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#for-statements"
    },
    {
        id: "t3d-wrong-parameter-default",
        tier: 3,
        tags: ["functions", "default-arguments", "evaluation"],
        title: "Wrong Default Parameter Evaluation Time",
        code: "import time\n\ndef log(msg, timestamp=time.time()):\n    print(f'{timestamp}: {msg}')\n\nlog('First')   # 1234567890.5\nlog('Second')  # 1234567890.5 - Same time!",
        bugLine: 3,
        bugDescription: "Default argument evaluated once at function definition time",
        bugChoices: [
            "Default argument time.time() is evaluated once when function is defined, not on each call",
            "The time.time() function returns a constant value that never changes",
            "The timestamp parameter should be a string instead of a float",
            "The print statement doesn't properly format timestamp values"
        ],
        correctBugChoice: 0,
        fixedCode: "import time\n\ndef log(msg, timestamp=None):\n    if timestamp is None:\n        timestamp = time.time()\n    print(f'{timestamp}: {msg}')",
        explanation: "Default argument values are evaluated once at function definition time, not on each call. time.time() is called once when Python parses the def statement, and that single timestamp is reused for all calls. To get the current time on each call, use None as default and evaluate time.time() inside the function body. This applies to any expression with side effects or time-dependent values.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t3d-continue-in-finally",
        tier: 3,
        tags: ["loops", "exceptions", "continue"],
        title: "Continue in Try Block",
        code: "def process_items(items):\n    results = []\n    for item in items:\n        try:\n            result = 100 / item\n            continue\n        except ZeroDivisionError:\n            result = 0\n        results.append(result)\n    return results",
        bugLine: 6,
        bugDescription: "continue skips append, so successful results are never added",
        bugChoices: [
            "The continue statement skips the append() call, so only error cases (0) are added to results",
            "The continue statement is not allowed inside a try block in Python",
            "The except clause is unreachable because continue always executes first",
            "The results list should be initialized inside the loop instead of outside"
        ],
        correctBugChoice: 0,
        fixedCode: "def process_items(items):\n    results = []\n    for item in items:\n        try:\n            result = 100 / item\n        except ZeroDivisionError:\n            result = 0\n        results.append(result)\n    return results",
        explanation: "The continue statement in the try block causes the loop to skip to the next iteration, jumping over the results.append(result) line. This means successful calculations are never added to results, only error cases where the except clause sets result = 0 and then falls through to append. Remove the continue to let both successful and error cases reach the append statement.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3d-for-else-misunderstanding",
        tier: 3,
        tags: ["loops", "for-else", "control-flow"],
        title: "Misunderstanding for-else",
        code: "def find_negative(numbers):\n    for num in numbers:\n        if num < 0:\n            return num\n    else:\n        return 'Error: negative found'\n    return 'No negatives'",
        bugLine: 5,
        bugDescription: "else executes when loop completes normally (not when break)",
        bugChoices: [
            "The else clause executes when the loop completes normally, not when a negative is found",
            "The else clause should be aligned with the if statement instead of the for loop",
            "The return statement on line 7 is the only one that ever executes",
            "The condition num < 0 doesn't correctly check for negative numbers"
        ],
        correctBugChoice: 0,
        fixedCode: "def find_negative(numbers):\n    for num in numbers:\n        if num < 0:\n            return num\n    else:\n        return 'No negatives'",
        explanation: "The for-else clause executes when the loop completes normally (exhausts the iterator) without hitting a break or return. It does NOT execute when the loop exits early via break/return. In this code, the else returns 'Error: negative found' when NO negative is found (opposite of intended). The message is backwards. for-else is useful for search patterns: loop looking for something, else = not found.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops"
    },
    {
        id: "t3d-walrus-in-condition",
        tier: 3,
        tags: ["assignment", "walrus-operator", "while"],
        title: "Wrong Assignment in While Condition",
        code: "def read_until_empty(items):\n    results = []\n    i = 0\n    while item = items[i]:\n        results.append(item)\n        i += 1\n    return results",
        bugLine: 4,
        bugDescription: "Assignment operator = instead of walrus := in condition",
        bugChoices: [
            "Can't use assignment = in condition; need walrus operator := or separate assignment",
            "The items list needs to be checked for emptiness before the loop",
            "The variable item is not defined before being used in the condition",
            "The while loop should use a comparison operator == instead of assignment"
        ],
        correctBugChoice: 0,
        fixedCode: "def read_until_empty(items):\n    results = []\n    i = 0\n    while (item := items[i] if i < len(items) else None):\n        results.append(item)\n        i += 1\n    return results",
        explanation: "Python doesn't allow regular assignment = in expressions like conditions. This causes a SyntaxError. The walrus operator := (assignment expression) was introduced in Python 3.8 to allow assignment in expressions. However, for simple iteration, a for loop would be more appropriate. This pattern is sometimes used when reading input until a sentinel value.",
        conceptLink: "https://docs.python.org/3/whatsnew/3.8.html#assignment-expressions"
    },
    {
        id: "t3d-pass-by-reference-confusion",
        tier: 3,
        tags: ["functions", "mutability", "lists"],
        title: "Unexpected List Mutation",
        code: "def clear_list(lst):\n    lst = []\n    return lst\n\nmy_list = [1, 2, 3]\nresult = clear_list(my_list)\nprint(my_list)  # Still [1, 2, 3]!",
        bugLine: 2,
        bugDescription: "Assignment to parameter creates new local object, doesn't modify caller's list",
        bugChoices: [
            "Assigning lst = [] creates a new local list; doesn't modify the original passed list",
            "The return statement should not return lst but should return None",
            "Lists are immutable in Python and cannot be cleared inside functions",
            "The function parameter needs to use a special keyword to enable modification"
        ],
        correctBugChoice: 0,
        fixedCode: "def clear_list(lst):\n    lst.clear()  # Or lst[:] = []\n    return lst\n\nmy_list = [1, 2, 3]\nresult = clear_list(my_list)\nprint(my_list)  # []",
        explanation: "When you assign to a parameter (lst = []), you're rebinding the local variable to a new object. This doesn't affect the caller's reference to the original object. To actually modify the passed list, use methods that mutate it in-place like clear(), or slice assignment lst[:] = []. This is a common source of confusion about Python's parameter passing model.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference"
    },
    {
        id: "t3d-loop-variable-closure",
        tier: 3,
        tags: ["closures", "loops", "functions"],
        title: "Loop Variable Captured by Reference",
        code: "def make_multipliers():\n    multipliers = []\n    for i in range(4):\n        multipliers.append(lambda x: x * i)\n    return multipliers\n\nfns = make_multipliers()\nprint(fns[0](5), fns[1](5), fns[2](5))",
        bugLine: 4,
        bugDescription: "Lambda captures variable i by reference, not by value; all closures share final value",
        bugChoices: [
            "All lambdas capture the same variable i, which ends at 3, so every function multiplies by 3",
            "The lambda syntax is incorrect and should use def instead",
            "The append method does not work with lambda functions",
            "The range(4) should be range(1, 4) to avoid multiplying by zero"
        ],
        correctBugChoice: 0,
        fixedCode: "def make_multipliers():\n    multipliers = []\n    for i in range(4):\n        multipliers.append(lambda x, i=i: x * i)\n    return multipliers\n\nfns = make_multipliers()\nprint(fns[0](5), fns[1](5), fns[2](5))",
        explanation: "Closures in Python capture variables by reference, not by value. When the loop ends, i is 3, so all lambdas see i=3. The fix is to use a default argument (i=i) which captures the current value of i at each iteration. This is a classic Python gotcha with closures in loops.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    }
];
