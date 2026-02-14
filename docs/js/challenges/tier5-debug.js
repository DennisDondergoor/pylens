// Tier 5 Debug Challenges: Scope & Mutability
// Each challenge contains exactly ONE bug that tests Python semantics understanding

window.TIER5_DEBUG = [
    {
        id: "t5d-unbound-local-counter",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "Unbound Local Error",
        code: "counter = 0\n\ndef increment():\n    counter += 1  # Bug: UnboundLocalError\n    return counter\n\nprint(increment())",
        bugLine: 4,
        bugDescription: "Function raises UnboundLocalError when trying to increment global counter",
        bugChoices: [
            "Assignment to counter makes it local; must use 'global counter' before modifying",
            "The counter variable needs to be initialized inside the function first",
            "The += operator is not supported for global variables in functions",
            "Need to use nonlocal instead of global for module-level variables"
        ],
        correctBugChoice: 0,
        fixedCode: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n    return counter\n\nprint(increment())",
        explanation: "Python sees 'counter += 1' as an assignment, making counter a local variable. When the function tries to read counter's value for the += operation, it hasn't been assigned locally yet, causing UnboundLocalError. Use 'global counter' to explicitly refer to the module-level variable.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-am-i-getting-an-unboundlocalerror-when-the-variable-has-a-value"
    },
    {
        id: "t5d-closure-late-binding",
        tier: 5,
        tags: ["closure", "scope"],
        title: "Closure Late Binding Bug",
        code: "functions = []\nfor i in range(3):\n    functions.append(lambda: i)  # Bug: all closures share same i\n\nprint([f() for f in functions])  # Prints [2, 2, 2] not [0, 1, 2]",
        bugLine: 3,
        bugDescription: "All lambda functions return the same final value instead of different values",
        bugChoices: [
            "Closure captures variable reference, not value; use 'lambda i=i: i' to capture current value",
            "Lambda functions cannot be created inside loops in Python",
            "Need to use functools.partial instead of lambda in loops",
            "The range() function doesn't work correctly with closures"
        ],
        correctBugChoice: 0,
        fixedCode: "functions = []\nfor i in range(3):\n    functions.append(lambda i=i: i)  # Capture current value as default\n\nprint([f() for f in functions])  # Prints [0, 1, 2]",
        explanation: "Closures capture variables by reference, not by value. All lambdas reference the same 'i' variable, which ends up being 2 after the loop. Using a default argument 'lambda i=i: i' captures the current value of i at function creation time.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t5d-mutable-default-list",
        tier: 5,
        tags: ["mutability", "defaults"],
        title: "Mutable Default Argument",
        code: "def add_item(item, items=[]):  # Bug: default list shared across calls\n    items.append(item)\n    return items\n\nprint(add_item('a'))\nprint(add_item('b'))  # Prints ['a', 'b'] not ['b']",
        bugLine: 1,
        bugDescription: "Default list accumulates items across multiple function calls",
        bugChoices: [
            "Default arguments are evaluated once at function definition; use 'items=None' and create new list inside",
            "Lists cannot be used as default arguments in Python",
            "Need to use items.copy() in the default parameter",
            "The append() method doesn't work correctly with default arguments"
        ],
        correctBugChoice: 0,
        fixedCode: "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nprint(add_item('a'))\nprint(add_item('b'))  # Prints ['b']",
        explanation: "Default arguments are evaluated once when the function is defined, not each time it's called. Using a mutable default like [] means all calls share the same list object. Use None as default and create a new list inside the function.",
        conceptLink: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions"
    },
    {
        id: "t5d-list-aliasing",
        tier: 5,
        tags: ["mutability", "aliasing"],
        title: "List Aliasing Bug",
        code: "original = [1, 2, 3]\ncopy = original  # Bug: creates alias, not copy\ncopy.append(4)\n\nprint(original)  # Prints [1, 2, 3, 4] not [1, 2, 3]",
        bugLine: 2,
        bugDescription: "Modifying copy also modifies the original list",
        bugChoices: [
            "Assignment creates an alias (same object); use 'copy = original.copy()' or 'original[:]' to create a new list",
            "The append() method affects all variables pointing to any list",
            "Need to use the deepcopy module for all list copies",
            "Lists are immutable in Python, so copying requires special syntax"
        ],
        correctBugChoice: 0,
        fixedCode: "original = [1, 2, 3]\ncopy = original.copy()  # or original[:]\ncopy.append(4)\n\nprint(original)  # Prints [1, 2, 3]",
        explanation: "Assignment in Python creates a new reference to the same object, not a copy. Both 'original' and 'copy' point to the same list. Use .copy(), [:], or list() to create a new list with the same elements.",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t5d-shallow-copy-nested",
        tier: 5,
        tags: ["mutability", "copy"],
        title: "Shallow Copy Nested Lists",
        code: "original = [[1, 2], [3, 4]]\ncopy = original.copy()  # Bug: shallow copy, nested lists still shared\ncopy[0].append(5)\n\nprint(original)  # Prints [[1, 2, 5], [3, 4]] not [[1, 2], [3, 4]]",
        bugLine: 2,
        bugDescription: "Shallow copy doesn't protect nested lists from modification",
        bugChoices: [
            "Shallow copy only copies outer list; use 'copy.deepcopy(original)' to copy nested structures",
            "The copy() method doesn't work on lists containing other lists",
            "Need to use original[:] instead of original.copy() for nested lists",
            "Nested lists are immutable and cannot be copied"
        ],
        correctBugChoice: 0,
        fixedCode: "import copy\n\noriginal = [[1, 2], [3, 4]]\ncopy = copy.deepcopy(original)\ncopy[0].append(5)\n\nprint(original)  # Prints [[1, 2], [3, 4]]",
        explanation: "The copy() method performs a shallow copy, creating a new outer list but keeping references to the same inner lists. Modifying an inner list affects both. Use copy.deepcopy() to recursively copy all nested structures.",
        conceptLink: "https://docs.python.org/3/library/copy.html#copy.deepcopy"
    },
    {
        id: "t5d-nonlocal-nested-scope",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "Missing Nonlocal Declaration",
        code: "def outer():\n    count = 0\n    def inner():\n        count += 1  # Bug: UnboundLocalError\n        return count\n    return inner()\n\nprint(outer())",
        bugLine: 4,
        bugDescription: "Nested function cannot modify enclosing scope variable",
        bugChoices: [
            "Assignment makes count local in inner(); use 'nonlocal count' to modify enclosing scope variable",
            "Need to use 'global count' instead of nonlocal for nested functions",
            "Nested functions cannot access variables from outer functions",
            "The += operator doesn't work in nested function scopes"
        ],
        correctBugChoice: 0,
        fixedCode: "def outer():\n    count = 0\n    def inner():\n        nonlocal count\n        count += 1\n        return count\n    return inner()\n\nprint(outer())",
        explanation: "Without 'nonlocal', the assignment 'count += 1' makes count a local variable in inner(). When Python tries to read count's value for the += operation, it's not defined locally, causing UnboundLocalError. Use 'nonlocal count' to modify the enclosing scope's variable.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#nonlocal"
    },
    {
        id: "t5d-closure-loop-enumerate",
        tier: 5,
        tags: ["closure", "scope"],
        title: "Closure Loop with Enumerate",
        code: "items = ['a', 'b', 'c']\nfuncs = []\nfor i, item in enumerate(items):\n    funcs.append(lambda: f'{i}: {item}')  # Bug: captures final values\n\nprint(funcs[0]())  # Prints '2: c' not '0: a'",
        bugLine: 4,
        bugDescription: "Lambda captures final loop values instead of current iteration values",
        bugChoices: [
            "Closures capture variable references; use default arguments 'lambda i=i, item=item: f\"{i}: {item}\"' to capture values",
            "The enumerate() function doesn't work with lambda closures",
            "Need to create a separate function outside the loop",
            "Lambda functions cannot capture multiple variables from a loop"
        ],
        correctBugChoice: 0,
        fixedCode: "items = ['a', 'b', 'c']\nfuncs = []\nfor i, item in enumerate(items):\n    funcs.append(lambda i=i, item=item: f'{i}: {item}')\n\nprint(funcs[0]())  # Prints '0: a'",
        explanation: "All lambdas capture references to the same 'i' and 'item' variables, which have their final loop values (2 and 'c'). Use default arguments to capture the current values at each iteration.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t5d-mutable-default-dict",
        tier: 5,
        tags: ["mutability", "defaults"],
        title: "Mutable Default Dictionary",
        code: "def add_entry(key, value, cache={}):  # Bug: shared dict across calls\n    cache[key] = value\n    return cache\n\nprint(add_entry('a', 1))\nprint(add_entry('b', 2))  # Prints {'a': 1, 'b': 2} not {'b': 2}",
        bugLine: 1,
        bugDescription: "Default dictionary accumulates entries across all function calls",
        bugChoices: [
            "Default dict is created once and shared; use 'cache=None' and initialize new dict inside function",
            "Dictionaries cannot be used as default arguments",
            "Need to use cache.clear() before adding new entries",
            "The assignment operator doesn't work with default arguments"
        ],
        correctBugChoice: 0,
        fixedCode: "def add_entry(key, value, cache=None):\n    if cache is None:\n        cache = {}\n    cache[key] = value\n    return cache\n\nprint(add_entry('a', 1))\nprint(add_entry('b', 2))  # Prints {'b': 2}",
        explanation: "Default arguments are evaluated once at function definition time. Using a mutable default like {} means all calls without providing cache share the same dictionary. Use None and create a new dict inside the function.",
        conceptLink: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions"
    },
    {
        id: "t5d-dict-aliasing",
        tier: 5,
        tags: ["mutability", "aliasing"],
        title: "Dictionary Aliasing",
        code: "config = {'host': 'localhost', 'port': 8000}\nbackup = config  # Bug: creates alias, not copy\nbackup['port'] = 9000\n\nprint(config['port'])  # Prints 9000 not 8000",
        bugLine: 2,
        bugDescription: "Modifying backup dictionary also changes original config",
        bugChoices: [
            "Assignment creates an alias to same dict; use 'backup = config.copy()' to create new dictionary",
            "Need to use dict() constructor for all dictionary copies",
            "Dictionaries are immutable after creation in Python",
            "The bracket notation doesn't work on aliased dictionaries"
        ],
        correctBugChoice: 0,
        fixedCode: "config = {'host': 'localhost', 'port': 8000}\nbackup = config.copy()\nbackup['port'] = 9000\n\nprint(config['port'])  # Prints 8000",
        explanation: "Assignment creates a new reference to the same dictionary object, not a copy. Both 'config' and 'backup' point to the same dict. Use .copy() or dict() to create a new dictionary with the same key-value pairs.",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t5d-rebinding-vs-mutation",
        tier: 5,
        tags: ["mutability", "scope"],
        title: "Variable Rebinding vs Mutation",
        code: "def modify_list(lst):\n    lst = lst + [4]  # Bug: rebinds local variable instead of mutating\n    return lst\n\ndata = [1, 2, 3]\nmodify_list(data)\nprint(data)  # Prints [1, 2, 3] not [1, 2, 3, 4]",
        bugLine: 2,
        bugDescription: "Function doesn't modify the original list passed as argument",
        bugChoices: [
            "The += operator creates new list and rebinds local variable; use 'lst.extend([4])' or 'lst += [4]' to mutate",
            "Lists cannot be modified inside functions in Python",
            "Need to use global keyword to modify list arguments",
            "The + operator doesn't work on lists inside functions"
        ],
        correctBugChoice: 0,
        fixedCode: "def modify_list(lst):\n    lst += [4]  # or lst.extend([4])\n    return lst\n\ndata = [1, 2, 3]\nmodify_list(data)\nprint(data)  # Prints [1, 2, 3, 4]",
        explanation: "The expression 'lst = lst + [4]' creates a new list and rebinds the local variable 'lst', leaving the original list unchanged. Use 'lst += [4]' or 'lst.extend([4])' to mutate the list in-place, which affects the original.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference"
    },
    {
        id: "t5d-shallow-copy-dict-nested",
        tier: 5,
        tags: ["mutability", "copy"],
        title: "Shallow Copy Nested Dictionary",
        code: "original = {'user': {'name': 'Alice', 'age': 30}}\ncopy = original.copy()  # Bug: shallow copy, nested dict still shared\ncopy['user']['age'] = 31\n\nprint(original['user']['age'])  # Prints 31 not 30",
        bugLine: 2,
        bugDescription: "Shallow copy doesn't protect nested dictionaries from modification",
        bugChoices: [
            "Shallow copy only copies outer dict; use 'copy.deepcopy(original)' for nested dictionaries",
            "The copy() method doesn't work on nested dictionaries",
            "Need to use dict() constructor instead of copy() for nested structures",
            "Nested dictionaries are immutable in Python"
        ],
        correctBugChoice: 0,
        fixedCode: "import copy\n\noriginal = {'user': {'name': 'Alice', 'age': 30}}\ncopy = copy.deepcopy(original)\ncopy['user']['age'] = 31\n\nprint(original['user']['age'])  # Prints 30",
        explanation: "The copy() method creates a new outer dictionary but keeps references to the same nested dictionaries. Changes to nested dicts affect both copies. Use copy.deepcopy() to recursively copy all nested structures.",
        conceptLink: "https://docs.python.org/3/library/copy.html#copy.deepcopy"
    },
    {
        id: "t5d-identity-vs-equality",
        tier: 5,
        tags: ["mutability", "comparison"],
        title: "Identity vs Equality Bug",
        code: "def reset_cache(cache):\n    if cache == []:  # Bug: should use 'is None' not '== []'\n        cache = []\n    return cache\n\nresult = reset_cache(None)  # Returns None, not []",
        bugLine: 2,
        bugDescription: "Function doesn't handle None argument correctly",
        bugChoices: [
            "Comparing None with == [] is False; use 'if cache is None' to check for None",
            "Need to use 'cache == None' instead of checking for empty list",
            "The == operator doesn't work with None in Python",
            "Empty lists cannot be compared with == in if statements"
        ],
        correctBugChoice: 0,
        fixedCode: "def reset_cache(cache):\n    if cache is None or cache == []:\n        cache = []\n    return cache\n\nresult = reset_cache(None)  # Returns []",
        explanation: "The condition 'cache == []' checks for value equality with an empty list. When cache is None, this is False, so the reset doesn't happen. Use 'is None' to check for None specifically, or handle both None and empty list cases.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#is"
    },
    {
        id: "t5d-global-in-function",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "Global Variable Shadowing",
        code: "total = 100\n\ndef calculate():\n    total = 0  # Bug: creates local variable, shadows global\n    for i in range(5):\n        total += i\n    # Missing: can't access original global total\n\ncalculate()\nprint(total)  # Prints 100, not affected by function",
        bugLine: 4,
        bugDescription: "Function creates local variable instead of using global total",
        bugChoices: [
            "Local assignment shadows global; declare 'global total' before assignment to modify global variable",
            "Cannot have variables with same name in global and local scope",
            "The total variable must be renamed in the function",
            "Need to use self.total instead of just total"
        ],
        correctBugChoice: 0,
        fixedCode: "total = 100\n\ndef calculate():\n    global total\n    total = 0\n    for i in range(5):\n        total += i\n\ncalculate()\nprint(total)  # Prints 10",
        explanation: "When a function assigns to a variable name, Python treats it as local unless explicitly declared global. The local 'total' shadows the global one. Use 'global total' to indicate you want to modify the module-level variable.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#global"
    },
    {
        id: "t5d-mutable-default-nested",
        tier: 5,
        tags: ["mutability", "defaults"],
        title: "Mutable Default with Nested List",
        code: "def add_row(row, matrix=[[]]):  # Bug: nested list default shared\n    matrix[-1].append(row)\n    return matrix\n\nprint(add_row(1))\nprint(add_row(2))  # Prints [[1, 2]] not [[2]]",
        bugLine: 1,
        bugDescription: "Default nested list accumulates values across calls",
        bugChoices: [
            "Default argument evaluated once; nested list is shared across calls; use 'matrix=None' and create new structure",
            "Cannot use nested lists as default arguments in Python",
            "Need to use matrix.copy() in the parameter default",
            "The append() method doesn't work correctly with default nested lists"
        ],
        correctBugChoice: 0,
        fixedCode: "def add_row(row, matrix=None):\n    if matrix is None:\n        matrix = [[]]\n    matrix[-1].append(row)\n    return matrix\n\nprint(add_row(1))\nprint(add_row(2))  # Prints [[2]]",
        explanation: "Default arguments are evaluated once at function definition. The nested list [[]] is created once and shared across all calls that don't provide matrix. Use None as default and create a new nested list inside the function.",
        conceptLink: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions"
    },
    {
        id: "t5d-list-extend-vs-append",
        tier: 5,
        tags: ["mutability", "methods"],
        title: "List Mutation Method Confusion",
        code: "def merge_lists(list1, list2):\n    result = list1\n    result.append(list2)  # Bug: appends entire list as element\n    return result\n\nprint(merge_lists([1, 2], [3, 4]))  # Prints [1, 2, [3, 4]] not [1, 2, 3, 4]",
        bugLine: 3,
        bugDescription: "Function appends entire list instead of merging elements",
        bugChoices: [
            "append() adds entire list as single element; use 'result.extend(list2)' to add individual elements",
            "Need to use result += list2 instead of append()",
            "The append() method doesn't work with lists as arguments",
            "Must use list1.merge(list2) for combining lists"
        ],
        correctBugChoice: 0,
        fixedCode: "def merge_lists(list1, list2):\n    result = list1\n    result.extend(list2)\n    return result\n\nprint(merge_lists([1, 2], [3, 4]))  # Prints [1, 2, 3, 4]",
        explanation: "append() adds its argument as a single element to the list. To merge two lists, use extend() which adds each element individually, or use the += operator. Note: this also mutates list1 due to aliasing.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t5d-tuple-mutability-nested",
        tier: 5,
        tags: ["mutability", "aliasing"],
        title: "Tuple Containing Mutable Elements",
        code: "original = ([1, 2], [3, 4])\ncopy = original  # Bug: tuple immutable but contents are mutable\noriginal[0].append(5)  # Modifies the list inside tuple\n\nprint(copy)  # Prints ([1, 2, 5], [3, 4])",
        bugLine: 2,
        bugDescription: "Tuple immutability doesn't protect mutable objects it contains",
        bugChoices: [
            "Tuples are immutable but can contain mutable objects; use 'copy.deepcopy()' to copy nested mutable objects",
            "Tuples cannot contain mutable objects like lists",
            "Need to use tuple() constructor to create proper copies",
            "The append() method doesn't work on lists inside tuples"
        ],
        correctBugChoice: 0,
        fixedCode: "import copy\n\noriginal = ([1, 2], [3, 4])\ncopy = copy.deepcopy(original)\noriginal[0].append(5)\n\nprint(copy)  # Prints ([1, 2], [3, 4])",
        explanation: "Tuples are immutable (can't change which objects they contain), but the objects inside can still be mutable. Both 'original' and 'copy' reference the same tuple containing the same list objects. Use deepcopy() to copy the nested mutable objects.",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t5d-closure-class-reference",
        tier: 5,
        tags: ["closure", "scope"],
        title: "Closure with Class Method",
        code: "class Counter:\n    def __init__(self):\n        self.count = 0\n    def get_incrementer(self):\n        return lambda: self.count + 1  # Bug: doesn't increment, just returns value\n\nc = Counter()\nf = c.get_incrementer()\nprint(f())  # Prints 1\nprint(f())  # Prints 1 not 2",
        bugLine: 5,
        bugDescription: "Lambda returns current count + 1 but doesn't modify the counter",
        bugChoices: [
            "Lambda only returns value without mutation; need to mutate in lambda or return different function",
            "Cannot capture self in closures from class methods",
            "Need to use nonlocal self.count in the lambda",
            "Lambda functions cannot access class attributes"
        ],
        correctBugChoice: 0,
        fixedCode: "class Counter:\n    def __init__(self):\n        self.count = 0\n    def get_incrementer(self):\n        def increment():\n            self.count += 1\n            return self.count\n        return increment\n\nc = Counter()\nf = c.get_incrementer()\nprint(f())  # Prints 1\nprint(f())  # Prints 2",
        explanation: "The lambda 'lambda: self.count + 1' reads self.count and returns it plus one, but doesn't modify it. Each call returns the same value. To actually increment, you need to mutate self.count using += inside the closure.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#what-are-the-rules-for-local-and-global-variables-in-python"
    },
    {
        id: "t5d-string-reassignment",
        tier: 5,
        tags: ["mutability", "scope"],
        title: "String Immutability Confusion",
        code: "def modify_string(s):\n    s = s + ' World'  # Bug: strings immutable, creates new object\n    return s\n\ngreeting = 'Hello'\nmodify_string(greeting)\nprint(greeting)  # Prints 'Hello' not 'Hello World'",
        bugLine: 2,
        bugDescription: "Function doesn't modify original string argument",
        bugChoices: [
            "Strings are immutable; assignment creates new string and rebinds local variable; must return and reassign",
            "Need to use += operator instead of + for string modification",
            "Strings cannot be concatenated inside functions",
            "Must use global keyword to modify string arguments"
        ],
        correctBugChoice: 0,
        fixedCode: "def modify_string(s):\n    s = s + ' World'\n    return s\n\ngreeting = 'Hello'\ngreeting = modify_string(greeting)  # Reassign the result\nprint(greeting)  # Prints 'Hello World'",
        explanation: "Strings are immutable in Python. The concatenation creates a new string and rebinds the local variable 's', but doesn't affect the original 'greeting' variable. The caller must capture and use the return value.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference"
    },
    {
        id: "t5d-function-arg-mutation",
        tier: 5,
        tags: ["mutability", "arguments"],
        title: "Function Argument Mutation Side Effect",
        code: "def process_data(items):\n    items.sort()  # Bug: mutates caller's list unexpectedly\n    return items[:3]\n\noriginal = [5, 2, 8, 1, 9]\ntop_three = process_data(original)\nprint(original)  # Prints [1, 2, 5, 8, 9] - unexpectedly modified!",
        bugLine: 2,
        bugDescription: "Function has unexpected side effect of modifying input list",
        bugChoices: [
            "sort() mutates list in-place; use 'items = sorted(items)' or work on copy to avoid side effects",
            "Need to use items.copy().sort() to avoid mutation",
            "The sort() method doesn't work on function arguments",
            "Must declare items as const parameter to prevent mutation"
        ],
        correctBugChoice: 0,
        fixedCode: "def process_data(items):\n    items = sorted(items)  # Creates new sorted list\n    return items[:3]\n\noriginal = [5, 2, 8, 1, 9]\ntop_three = process_data(original)\nprint(original)  # Prints [5, 2, 8, 1, 9]",
        explanation: "The sort() method mutates the list in-place, affecting the caller's list. This is often unexpected. Use sorted() to create a new sorted list, or explicitly work on a copy if you need to use sort(). This makes the function's behavior more predictable.",
        conceptLink: "https://docs.python.org/3/howto/sorting.html#sorting-basics"
    },
    {
        id: "t5d-is-vs-equals-list",
        tier: 5,
        tags: ["mutability", "comparison"],
        title: "Identity vs Equality for Lists",
        code: "def check_unchanged(data, original):\n    return data is original  # Bug: checks identity not equality\n\nlist1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nprint(check_unchanged(list2, list1))  # Prints False, should be True",
        bugLine: 2,
        bugDescription: "Function checks if lists are same object, not if they have same values",
        bugChoices: [
            "The 'is' operator checks object identity (same object); use '==' to check value equality",
            "Need to use list.equals() method instead of is operator",
            "Cannot compare lists with is operator in Python",
            "The is operator only works for immutable types like strings"
        ],
        correctBugChoice: 0,
        fixedCode: "def check_unchanged(data, original):\n    return data == original  # Check equality\n\nlist1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nprint(check_unchanged(list2, list1))  # Prints True",
        explanation: "The 'is' operator checks if two references point to the exact same object (identity). The '==' operator checks if two objects have the same value (equality). Two lists with the same elements are equal but not identical unless they're the same object.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#is"
    },
    {
        id: "t5d-nonlocal-multiple-levels",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "Nonlocal Across Multiple Nesting Levels",
        code: "def outer():\n    x = 1\n    def middle():\n        def inner():\n            nonlocal x  # Bug: works but searches enclosing scopes\n            x += 1\n        inner()\n        return x\n    return middle()\n\nprint(outer())  # Works: prints 2",
        bugLine: 5,
        bugDescription: "This actually works, showing nonlocal searches enclosing scopes correctly",
        bugChoices: [
            "This code works correctly; nonlocal searches all enclosing function scopes until it finds the variable",
            "nonlocal can only access the immediate parent scope, not multiple levels",
            "Need to use 'nonlocal x' in middle() as well for this to work",
            "Cannot use nonlocal with multiple nesting levels in Python"
        ],
        correctBugChoice: 0,
        fixedCode: "def outer():\n    x = 1\n    def middle():\n        def inner():\n            nonlocal x  # Correctly finds x in outer()\n            x += 1\n        inner()\n        return x\n    return middle()\n\nprint(outer())  # Prints 2",
        explanation: "This code actually works correctly. The 'nonlocal' statement searches all enclosing function scopes (not just the immediate parent) to find the variable. It finds 'x' in outer() and modifies it. This demonstrates that nonlocal is not limited to immediate parent scope.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#nonlocal"
    },
    {
        id: "t5d-list-multiply-aliasing",
        tier: 5,
        tags: ["mutability", "aliasing"],
        title: "List Multiplication Creates Aliases",
        code: "matrix = [[0] * 3] * 3  # Bug: creates 3 references to same list\nmatrix[0][0] = 1\n\nprint(matrix)  # Prints [[1, 0, 0], [1, 0, 0], [1, 0, 0]]",
        bugLine: 1,
        bugDescription: "Modifying one row modifies all rows in the matrix",
        bugChoices: [
            "List multiplication creates references to same list; use list comprehension '[[0] * 3 for _ in range(3)]' to create separate lists",
            "Cannot use * operator to create 2D lists in Python",
            "Need to use matrix.copy() after creating with * operator",
            "The * operator doesn't work correctly with nested lists"
        ],
        correctBugChoice: 0,
        fixedCode: "matrix = [[0] * 3 for _ in range(3)]  # Creates 3 separate lists\nmatrix[0][0] = 1\n\nprint(matrix)  # Prints [[1, 0, 0], [0, 0, 0], [0, 0, 0]]",
        explanation: "The expression '[[0] * 3] * 3' creates one inner list [0, 0, 0], then creates a list containing three references to that same list. Modifying any row affects all rows. Use a list comprehension to create separate list objects for each row.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-create-a-multidimensional-list"
    },
    {
        id: "t5d-dict-items-mutation",
        tier: 5,
        tags: ["mutability", "iteration"],
        title: "Mutating Dictionary During Iteration",
        code: "data = {'a': 1, 'b': 2, 'c': 3}\nfor key in data:  # Bug: can't modify dict while iterating\n    if data[key] == 2:\n        del data[key]\n\nprint(data)  # RuntimeError: dictionary changed size during iteration",
        bugLine: 2,
        bugDescription: "Deleting from dictionary during iteration causes RuntimeError",
        bugChoices: [
            "Cannot modify dict while iterating; iterate over 'list(data.keys())' copy or use dict comprehension to filter",
            "Need to use data.items() instead of data for deletion to work",
            "The del keyword doesn't work inside for loops",
            "Must use data.pop(key) instead of del for dictionary iteration"
        ],
        correctBugChoice: 0,
        fixedCode: "data = {'a': 1, 'b': 2, 'c': 3}\nfor key in list(data.keys()):  # Iterate over copy of keys\n    if data[key] == 2:\n        del data[key]\n\nprint(data)  # Prints {'a': 1, 'c': 3}",
        explanation: "Modifying a dictionary's structure (adding/removing keys) while iterating over it causes a RuntimeError. Iterate over a copy of the keys using list(data.keys()), or use a dictionary comprehension to create a filtered dictionary.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dictionary-view-objects"
    },
    {
        id: "t5d-function-default-evaluation",
        tier: 5,
        tags: ["mutability", "defaults"],
        title: "Default Argument with Timestamp",
        code: "from datetime import datetime\n\ndef log_event(msg, timestamp=datetime.now()):  # Bug: timestamp evaluated at definition\n    return f'{timestamp}: {msg}'\n\nimport time\nprint(log_event('Event 1'))\ntime.sleep(2)\nprint(log_event('Event 2'))  # Shows same timestamp as Event 1!",
        bugLine: 3,
        bugDescription: "All function calls use the same timestamp instead of current time",
        bugChoices: [
            "Default arguments evaluated at function definition, not call time; use 'timestamp=None' and call datetime.now() inside",
            "The datetime.now() function doesn't work in default arguments",
            "Need to use timestamp=lambda: datetime.now() as default",
            "Must use global keyword for datetime functions in defaults"
        ],
        correctBugChoice: 0,
        fixedCode: "from datetime import datetime\n\ndef log_event(msg, timestamp=None):\n    if timestamp is None:\n        timestamp = datetime.now()\n    return f'{timestamp}: {msg}'\n\nimport time\nprint(log_event('Event 1'))\ntime.sleep(2)\nprint(log_event('Event 2'))  # Shows different timestamp",
        explanation: "Default argument expressions are evaluated once when the function is defined, not each time it's called. datetime.now() is called once at definition, so all calls get the same timestamp. Use None and call datetime.now() inside the function to get the current time for each call.",
        conceptLink: "https://docs.python.org/3/reference/compound_stmts.html#function-definitions"
    },
    {
        id: "t5d-variable-scope-comprehension",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "Loop Variable Scope in Comprehension",
        code: "x = 'global'\nresult = [x for x in range(3)]  # Bug: x in comprehension shadows global\nprint(x)  # In Python 3: prints 'global' (comprehension has own scope)",
        bugLine: 2,
        bugDescription: "Comprehension variable doesn't leak into outer scope (this is correct in Python 3)",
        bugChoices: [
            "This is actually correct behavior in Python 3; list comprehensions have their own scope, don't leak variables",
            "The x in comprehension permanently overwrites the global x",
            "Need to use different variable name in comprehension to avoid shadowing",
            "Comprehensions cannot use the same variable name as global variables"
        ],
        correctBugChoice: 0,
        fixedCode: "x = 'global'\nresult = [x for x in range(3)]  # Comprehension x doesn't leak\nprint(x)  # Correctly prints 'global' in Python 3",
        explanation: "In Python 3, list comprehensions (and all comprehensions) have their own scope. The loop variable 'x' doesn't leak into the enclosing scope. After the comprehension, the outer 'x' retains its original value. This is different from Python 2 where comprehension variables would leak.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    }
];
