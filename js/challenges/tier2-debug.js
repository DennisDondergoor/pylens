window.TIER2_DEBUG = [
    {
        id: "t2d-shallow-copy",
        tier: 2,
        tags: ["lists", "copy", "mutability"],
        title: "Nested List Copy Problem",
        code: "matrix = [[1, 2], [3, 4]]\nmatrix_copy = matrix.copy()\nmatrix_copy[0][0] = 99\nprint(matrix[0][0])",
        bugLine: 2,
        bugDescription: "Shallow copy doesn't create independent copies of nested lists",
        bugChoices: [
            "Shallow copy doesn't create independent copies of nested lists",
            "The copy() method doesn't work on lists containing other lists",
            "The index [0][0] is out of bounds for the copied matrix",
            "You need to use deepcopy() on the original list first before using copy()"
        ],
        correctBugChoice: 0,
        fixedCode: "import copy\nmatrix = [[1, 2], [3, 4]]\nmatrix_copy = copy.deepcopy(matrix)\nmatrix_copy[0][0] = 99\nprint(matrix[0][0])",
        explanation: "The copy() method creates a shallow copy, which means it creates a new list but the elements inside are still references to the original nested lists. Modifying matrix_copy[0][0] modifies the same inner list that matrix[0] refers to. Use copy.deepcopy() to create truly independent nested structures.",
        conceptLink: null
    },
    {
        id: "t2d-late-binding",
        tier: 2,
        tags: ["closures", "loops", "scope"],
        title: "Closure Late Binding Bug",
        code: "functions = []\nfor i in range(3):\n    functions.append(lambda: i)\nprint([f() for f in functions])",
        bugLine: 3,
        bugDescription: "Lambda captures variable by reference, not value, resulting in all functions returning the final value",
        bugChoices: [
            "Lambda captures variable by reference, not value, resulting in all functions returning the final value",
            "Lambda functions cannot be stored in lists",
            "The range(3) should be range(0, 3) to work correctly",
            "Lambda functions need an explicit return statement"
        ],
        correctBugChoice: 0,
        fixedCode: "functions = []\nfor i in range(3):\n    functions.append(lambda x=i: x)\nprint([f() for f in functions])",
        explanation: "Python's closures use late binding, meaning variables are looked up when the function is called, not when it's defined. All lambdas reference the same variable 'i', which has value 2 after the loop ends. The fix uses a default argument (x=i) to capture the current value of i at definition time.",
        conceptLink: null
    },
    {
        id: "t2d-append-returns-none",
        tier: 2,
        tags: ["lists", "methods", "return-values"],
        title: "Append Returns None",
        code: "numbers = [1, 2, 3]\nresult = numbers.append(4)\ntotal = sum(result)\nprint(total)",
        bugLine: 2,
        bugDescription: "append() modifies the list in-place and returns None, not the modified list",
        bugChoices: [
            "append() modifies the list in-place and returns None, not the modified list",
            "append() requires two arguments: the list and the value",
            "sum() cannot work with lists that have been modified by append()",
            "The variable 'result' needs to be initialized as an empty list first"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3]\nnumbers.append(4)\ntotal = sum(numbers)\nprint(total)",
        explanation: "List methods like append(), extend(), sort(), and reverse() modify the list in-place and return None. This is a common source of bugs when developers expect these methods to return the modified list. Use the original list variable (numbers) after calling append() instead of trying to capture a return value.",
        conceptLink: null
    },
    {
        id: "t2d-except-order",
        tier: 2,
        tags: ["exceptions", "error-handling"],
        title: "Exception Handling Order",
        code: "try:\n    value = int('abc')\nexcept Exception:\n    print('General error')\nexcept ValueError:\n    print('Not a number')",
        bugLine: 3,
        bugDescription: "Catching the general Exception before ValueError makes the specific handler unreachable",
        bugChoices: [
            "Catching the general Exception before ValueError makes the specific handler unreachable",
            "You cannot have multiple except blocks for the same try block",
            "ValueError is not a valid exception type for int() conversion",
            "The except blocks need to be indented more to align with try"
        ],
        correctBugChoice: 0,
        fixedCode: "try:\n    value = int('abc')\nexcept ValueError:\n    print('Not a number')\nexcept Exception:\n    print('General error')",
        explanation: "Exception handlers are checked in order from top to bottom. Since ValueError is a subclass of Exception, the first except block catches all ValueError instances, making the second handler unreachable. Always order exception handlers from most specific to most general.",
        conceptLink: null
    },
    {
        id: "t2d-is-vs-equals",
        tier: 2,
        tags: ["operators", "identity", "integers"],
        title: "Identity vs Equality Comparison",
        code: "a = 256\nb = 256\nprint(a is b)\nc = 257\nd = 257\nprint(c is d)",
        bugLine: 6,
        bugDescription: "Using 'is' for value comparison instead of '=='; Python only caches small integers (-5 to 256)",
        bugChoices: [
            "Using 'is' for value comparison instead of '=='; Python only caches small integers (-5 to 256)",
            "The variable d needs to be declared with int(257) for 'is' to work",
            "You cannot use 'is' to compare two different variables",
            "257 is too large to be stored as an integer in Python"
        ],
        correctBugChoice: 0,
        fixedCode: "a = 256\nb = 256\nprint(a == b)\nc = 257\nd = 257\nprint(c == d)",
        explanation: "The 'is' operator checks object identity (same object in memory), not value equality. Python caches small integers (-5 to 256) for performance, so 'a is b' works for 256. For larger numbers, each literal creates a new object, so 'c is d' returns False even though they have the same value. Always use '==' for value comparison and reserve 'is' for identity checks like 'x is None'.",
        conceptLink: null
    },
    {
        id: "t2d-strip-misunderstanding",
        tier: 2,
        tags: ["strings", "methods"],
        title: "Strip Method Misunderstanding",
        code: "url = 'hello_world_hello'\nclean = url.strip('hello')\nprint(clean)",
        bugLine: 2,
        bugDescription: "strip() removes any characters in the set from both ends, not the substring as a whole",
        bugChoices: [
            "strip() removes any characters in the set from both ends, not the substring as a whole",
            "strip() only works with whitespace characters, not custom strings",
            "You need to call strip() twice to remove from both ends",
            "strip() is case-sensitive and 'hello' doesn't match 'Hello'"
        ],
        correctBugChoice: 0,
        fixedCode: "url = 'hello_world_hello'\nif url.startswith('hello'):\n    url = url[5:]\nif url.endswith('hello'):\n    url = url[:-5]\nclean = url\nprint(clean)",
        explanation: "The strip() method (and lstrip/rstrip) removes any characters that appear in the provided string from the ends, treating the argument as a set of characters, not as a substring. strip('hello') removes any combination of 'h', 'e', 'l', 'o' from both ends. To remove a specific substring, use string slicing with startswith()/endswith() or the removeprefix()/removesuffix() methods (Python 3.9+).",
        conceptLink: null
    },
    {
        id: "t2d-mutable-class-attr",
        tier: 2,
        tags: ["classes", "mutability", "attributes"],
        title: "Mutable Class Attribute Shared",
        code: "class Player:\n    items = []\n    def __init__(self, name):\n        self.name = name\np1 = Player('Alice')\np1.items.append('sword')\np2 = Player('Bob')\nprint(p2.items)",
        bugLine: 2,
        bugDescription: "Class-level mutable attributes are shared across all instances instead of being per-instance",
        bugChoices: [
            "Class-level mutable attributes are shared across all instances instead of being per-instance",
            "The items list needs to be declared inside the __init__ method",
            "You cannot append to a list that's defined at the class level",
            "The Player class needs to inherit from object to work properly"
        ],
        correctBugChoice: 0,
        fixedCode: "class Player:\n    def __init__(self, name):\n        self.name = name\n        self.items = []\np1 = Player('Alice')\np1.items.append('sword')\np2 = Player('Bob')\nprint(p2.items)",
        explanation: "When you define a mutable object (like a list or dict) as a class attribute, it's shared among all instances of that class. When p1.items.append() is called, it modifies the shared class-level list. To create per-instance attributes, initialize them in __init__. Immutable class attributes (strings, numbers, tuples) don't have this issue because assignment creates instance attributes.",
        conceptLink: null
    },
    {
        id: "t2d-super-init",
        tier: 2,
        tags: ["inheritance", "super", "classes"],
        title: "Super Init Missing Arguments",
        code: "class Animal:\n    def __init__(self, name):\n        self.name = name\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__()\n        self.breed = breed\nd = Dog('Rex', 'Labrador')\nprint(d.name)",
        bugLine: 6,
        bugDescription: "super().__init__() is called without passing required arguments from parent class",
        bugChoices: [
            "super().__init__() is called without passing required arguments from parent class",
            "super() should be called with super(Dog, self).__init__()",
            "You cannot use super() in classes that take multiple parameters",
            "The Animal class __init__ needs to have default parameter values"
        ],
        correctBugChoice: 0,
        fixedCode: "class Animal:\n    def __init__(self, name):\n        self.name = name\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\nd = Dog('Rex', 'Labrador')\nprint(d.name)",
        explanation: "When calling super().__init__(), you must pass any required arguments that the parent class's __init__ method expects. In this case, Animal.__init__ requires a 'name' parameter. Forgetting to pass arguments causes a TypeError. Always check the parent class's method signature when using super().",
        conceptLink: null
    },
    {
        id: "t2d-aliased-list-modify",
        tier: 2,
        tags: ["lists", "aliasing", "mutability"],
        title: "Modifying Aliased List Element",
        code: "data = [1, 2, 3]\nbackup = data\ndata.append(4)\nprint(len(backup))",
        bugLine: 2,
        bugDescription: "Assignment creates an alias, not a copy; both variables reference the same list",
        bugChoices: [
            "Assignment creates an alias, not a copy; both variables reference the same list",
            "The append() method affects all variables in the current scope",
            "You need to use backup = list(data) to create a backup",
            "len() doesn't work correctly on aliased lists"
        ],
        correctBugChoice: 0,
        fixedCode: "data = [1, 2, 3]\nbackup = data.copy()\ndata.append(4)\nprint(len(backup))",
        explanation: "In Python, assignment with mutable objects (lists, dicts, sets) creates an alias, not a copy. Both 'data' and 'backup' point to the same list object in memory. Modifications through either variable affect the same underlying list. To create an independent copy, use .copy(), list(), or copy.copy() for shallow copies, or copy.deepcopy() for nested structures.",
        conceptLink: null
    },
    {
        id: "t2d-dict-modify-iteration",
        tier: 2,
        tags: ["dictionaries", "iteration", "runtime-error"],
        title: "Modifying Dictionary During Iteration",
        code: "scores = {'Alice': 10, 'Bob': 15, 'Charlie': 20}\nfor name in scores:\n    if scores[name] > 12:\n        del scores[name]\nprint(scores)",
        bugLine: 4,
        bugDescription: "Deleting dictionary keys during iteration causes RuntimeError: dictionary changed size",
        bugChoices: [
            "Deleting dictionary keys during iteration causes RuntimeError: dictionary changed size",
            "The del keyword cannot be used inside a for loop",
            "You need to use scores.pop(name) instead of del",
            "The comparison scores[name] > 12 is invalid during iteration"
        ],
        correctBugChoice: 0,
        fixedCode: "scores = {'Alice': 10, 'Bob': 15, 'Charlie': 20}\nscores = {name: score for name, score in scores.items() if score <= 12}\nprint(scores)",
        explanation: "Python raises a RuntimeError if you modify a dictionary's size (add or remove keys) while iterating over it. The dictionary's internal structure changes during iteration, making it unsafe. Solutions include: 1) iterate over a copy: 'for name in list(scores):', 2) use dictionary comprehension to create a new dict (shown in fix), or 3) collect keys to delete first, then delete them in a separate loop.",
        conceptLink: null
    },
    {
        id: "t2d-lambda-list-comp",
        tier: 2,
        tags: ["lambda", "closures", "comprehensions"],
        title: "Lambda in Comprehension Capture Bug",
        code: "multipliers = [lambda x: x * i for i in range(4)]\nresult = [m(2) for m in multipliers]\nprint(result)",
        bugLine: 1,
        bugDescription: "Lambda captures loop variable by reference; all lambdas use the final value of i",
        bugChoices: [
            "Lambda captures loop variable by reference; all lambdas use the final value of i",
            "Lambda functions cannot be created inside list comprehensions",
            "The variable x conflicts with the comprehension variable i",
            "You need to use def instead of lambda for this to work"
        ],
        correctBugChoice: 0,
        fixedCode: "multipliers = [lambda x, i=i: x * i for i in range(4)]\nresult = [m(2) for m in multipliers]\nprint(result)",
        explanation: "This is a classic late-binding closure issue. The lambda functions capture the variable 'i' by reference, not by value. When the lambdas are called, they all look up the current value of 'i', which is 3 after the comprehension completes. The fix uses a default argument (i=i) to bind the current value at lambda creation time. This creates a local scope that captures the value, not the reference.",
        conceptLink: null
    },
    {
        id: "t2d-global-vs-nonlocal",
        tier: 2,
        tags: ["scope", "closures", "keywords"],
        title: "Global vs Nonlocal Confusion",
        code: "def outer():\n    count = 0\n    def inner():\n        global count\n        count += 1\n    inner()\n    return count\nprint(outer())",
        bugLine: 4,
        bugDescription: "Using 'global' instead of 'nonlocal' to access enclosing function's variable",
        bugChoices: [
            "Using 'global' instead of 'nonlocal' to access enclosing function's variable",
            "The variable count needs to be declared outside the outer function",
            "You cannot modify variables from an outer function in Python",
            "inner() needs to accept count as a parameter"
        ],
        correctBugChoice: 0,
        fixedCode: "def outer():\n    count = 0\n    def inner():\n        nonlocal count\n        count += 1\n    inner()\n    return count\nprint(outer())",
        explanation: "The 'global' keyword refers to module-level variables, not variables in enclosing function scopes. Using 'global count' in inner() tries to access/create a global variable named 'count', not the 'count' from outer(). Use 'nonlocal' to modify variables from enclosing (but not global) scopes. This is essential for closures that need to maintain state in the outer function.",
        conceptLink: null
    },
    {
        id: "t2d-float-precision",
        tier: 2,
        tags: ["floats", "precision", "equality"],
        title: "Float Precision Comparison",
        code: "result = 0.1 + 0.2\nif result == 0.3:\n    print('Math works!')\nelse:\n    print('Unexpected')",
        bugLine: 2,
        bugDescription: "Binary floating-point cannot represent 0.1 and 0.2 exactly, causing precision errors with ==",
        bugChoices: [
            "Binary floating-point cannot represent 0.1 and 0.2 exactly, causing precision errors with ==",
            "Python uses integer math by default and needs float(0.1) + float(0.2)",
            "The == operator doesn't work with decimal numbers in Python",
            "You need to round the result before comparing it"
        ],
        correctBugChoice: 0,
        fixedCode: "import math\nresult = 0.1 + 0.2\nif math.isclose(result, 0.3):\n    print('Math works!')\nelse:\n    print('Unexpected')",
        explanation: "Floating-point numbers are represented in binary, and many decimal fractions (like 0.1 and 0.2) cannot be represented exactly. This leads to tiny rounding errors: 0.1 + 0.2 actually equals 0.30000000000000004. Never use == to compare floats. Instead, use math.isclose() which compares within a small tolerance, or use the decimal module for exact decimal arithmetic.",
        conceptLink: null
    },
    {
        id: "t2d-sorted-confusion",
        tier: 2,
        tags: ["lists", "sorting", "methods"],
        title: "sorted() vs sort() Confusion",
        code: "numbers = [3, 1, 4, 1, 5]\nresult = numbers.sort()\nprint(result[0])",
        bugLine: 2,
        bugDescription: "sort() modifies list in-place and returns None; cannot use the return value",
        bugChoices: [
            "sort() modifies list in-place and returns None; cannot use the return value",
            "sort() requires a key parameter to work properly",
            "You need to use sorted(numbers) instead which returns a value",
            "The list needs to have unique values for sort() to return properly"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [3, 1, 4, 1, 5]\nresult = sorted(numbers)\nprint(result[0])",
        explanation: "Python has two sorting approaches: list.sort() modifies the list in-place and returns None, while sorted() returns a new sorted list and leaves the original unchanged. Many developers expect sort() to return the sorted list. If you need the return value, use sorted(). If you want to modify the original list, use sort() and then reference the original list variable.",
        conceptLink: null
    },
    {
        id: "t2d-string-immutable",
        tier: 2,
        tags: ["strings", "immutability", "indexing"],
        title: "String Immutability Error",
        code: "message = 'hello'\nmessage[0] = 'H'\nprint(message)",
        bugLine: 2,
        bugDescription: "Strings are immutable in Python; cannot modify individual characters using index assignment",
        bugChoices: [
            "Strings are immutable in Python; cannot modify individual characters using index assignment",
            "You need to use message[0:1] = 'H' to modify a single character",
            "String indexing in Python is read-only by default unless you enable write mode",
            "The index 0 is out of bounds for string modification"
        ],
        correctBugChoice: 0,
        fixedCode: "message = 'hello'\nmessage = 'H' + message[1:]\nprint(message)",
        explanation: "Strings in Python are immutable, meaning they cannot be changed after creation. Attempting to assign to a string index (message[0] = 'H') raises a TypeError. To 'modify' a string, you must create a new string. Common approaches include: string concatenation ('H' + message[1:]), str.replace(), or converting to a list, modifying it, and joining back (''.join(list)).",
        conceptLink: null
    }
];
