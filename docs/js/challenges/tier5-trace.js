window.TIER5_TRACE = [
    {
        id: "t5t-legb-basic",
        tier: 5,
        tags: ["scope", "LEGB"],
        title: "LEGB: Local Shadows Global",
        code: "x = 10\ndef f():\n    x = 20\n    print(x)\nf()\nprint(x)",
        correctOutput: "20\n10",
        outputChoices: [
            "20\n10",
            "20\n20",
            "10\n10",
            "10\n20"
        ],
        explanation: "Local variable x in f() shadows the global x. The function prints its local x (20), then the global x (10) is printed outside.",
        conceptLink: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
    },
    {
        id: "t5t-legb-enclosing",
        tier: 5,
        tags: ["scope", "LEGB", "closures"],
        title: "LEGB: Enclosing Scope",
        code: "def outer():\n    x = 5\n    def inner():\n        print(x)\n    inner()\n    x = 10\n    inner()\nouter()",
        correctOutput: "5\n10",
        outputChoices: [
            "5\n10",
            "5\n5",
            "10\n10",
            "NameError"
        ],
        explanation: "inner() accesses x from its enclosing scope. First call sees x=5, second call sees x=10 after the rebinding in outer().",
        conceptLink: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
    },
    {
        id: "t5t-legb-global-keyword",
        tier: 5,
        tags: ["scope", "LEGB", "global"],
        title: "Global Keyword Effect",
        code: "x = 1\ndef f():\n    global x\n    x = 2\nf()\nprint(x)",
        correctOutput: "2",
        outputChoices: [
            "2",
            "1",
            "NameError",
            "UnboundLocalError"
        ],
        explanation: "The global keyword makes x refer to the global variable. f() modifies the global x from 1 to 2.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#global"
    },
    {
        id: "t5t-legb-nonlocal",
        tier: 5,
        tags: ["scope", "LEGB", "nonlocal"],
        title: "Nonlocal Keyword",
        code: "def outer():\n    x = 0\n    def inner():\n        nonlocal x\n        x += 1\n        return x\n    print(inner())\n    print(inner())\nouter()",
        correctOutput: "1\n2",
        outputChoices: [
            "1\n2",
            "1\n1",
            "0\n1",
            "UnboundLocalError"
        ],
        explanation: "nonlocal allows inner() to modify x in outer()'s scope. Each call increments the same x variable.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#nonlocal"
    },
    {
        id: "t5t-closure-late-binding",
        tier: 5,
        tags: ["closures", "late-binding"],
        title: "Closure Late Binding Loop",
        code: "funcs = []\nfor i in range(3):\n    funcs.append(lambda: i)\nprint(funcs[0]())\nprint(funcs[2]())",
        correctOutput: "2\n2",
        outputChoices: [
            "2\n2",
            "0\n2",
            "0\n0",
            "1\n2"
        ],
        explanation: "Lambda closures capture i by reference, not value. After the loop, i=2, so all lambdas return 2 (late binding).",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t5t-closure-late-binding-fix",
        tier: 5,
        tags: ["closures", "late-binding"],
        title: "Closure with Default Argument",
        code: "funcs = []\nfor i in range(3):\n    funcs.append(lambda x=i: x)\nprint(funcs[0]())\nprint(funcs[2]())",
        correctOutput: "0\n2",
        outputChoices: [
            "0\n2",
            "2\n2",
            "0\n0",
            "NameError"
        ],
        explanation: "Default argument x=i captures i's value at lambda creation time (early binding), fixing the late binding issue.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t5t-closure-counter",
        tier: 5,
        tags: ["closures", "nonlocal"],
        title: "Closure Counter Pattern",
        code: "def make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\nc = make_counter()\nprint(c())\nprint(c())",
        correctOutput: "1\n2",
        outputChoices: [
            "1\n2",
            "1\n1",
            "0\n1",
            "UnboundLocalError"
        ],
        explanation: "The closure maintains state via count in enclosing scope. nonlocal allows modification across calls.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    },
    {
        id: "t5t-closure-list-comprehension",
        tier: 5,
        tags: ["closures", "late-binding", "comprehension"],
        title: "Closure in List Comprehension",
        code: "funcs = [lambda: i for i in range(3)]\nprint(funcs[0]())\nprint(funcs[1]())",
        correctOutput: "2\n2",
        outputChoices: [
            "2\n2",
            "0\n1",
            "0\n0",
            "NameError"
        ],
        explanation: "List comprehension creates closures with late binding. All lambdas see i=2 after comprehension completes.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t5t-mutable-default-list",
        tier: 5,
        tags: ["mutable-defaults", "gotcha"],
        title: "Mutable Default Argument",
        code: "def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\nprint(add_item(1))\nprint(add_item(2))",
        correctOutput: "[1]\n[1, 2]",
        outputChoices: [
            "[1]\n[1, 2]",
            "[1]\n[2]",
            "[1, 2]\n[1, 2]",
            "[[1]]\n[[1], [2]]"
        ],
        explanation: "Default [] is created once at function definition. Both calls modify the same list object, accumulating items.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t5t-mutable-default-dict",
        tier: 5,
        tags: ["mutable-defaults", "gotcha"],
        title: "Mutable Default Dictionary",
        code: "def track(key, d={}):\n    d[key] = d.get(key, 0) + 1\n    return d\nprint(len(track('a')))\nprint(len(track('b')))",
        correctOutput: "1\n2",
        outputChoices: [
            "1\n2",
            "1\n1",
            "2\n2",
            "0\n1"
        ],
        explanation: "Default {} is shared across calls. First call adds 'a' (len=1), second adds 'b' to same dict (len=2).",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t5t-aliasing-list",
        tier: 5,
        tags: ["aliasing", "reference"],
        title: "List Aliasing Basics",
        code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
        correctOutput: "4",
        outputChoices: [
            "4",
            "3",
            "5",
            "TypeError"
        ],
        explanation: "b = a creates an alias (both reference the same list). Modifying b also modifies a. The list now has 4 elements.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t5t-aliasing-nested",
        tier: 5,
        tags: ["aliasing", "reference", "nested"],
        title: "Nested List Aliasing",
        code: "a = [[1, 2]]\nb = a\nb[0].append(3)\nprint(a[0])",
        correctOutput: "[1, 2, 3]",
        outputChoices: [
            "[1, 2, 3]",
            "[1, 2]",
            "[[1, 2, 3]]",
            "[3]"
        ],
        explanation: "a and b reference the same outer list, which contains a reference to [1, 2]. Appending to b[0] modifies the shared inner list.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t5t-aliasing-dict",
        tier: 5,
        tags: ["aliasing", "reference"],
        title: "Dictionary Aliasing",
        code: "d1 = {'x': 1}\nd2 = d1\nd2['y'] = 2\nprint(len(d1))",
        correctOutput: "2",
        outputChoices: [
            "2",
            "1",
            "0",
            "KeyError"
        ],
        explanation: "d2 = d1 creates an alias. Adding 'y' to d2 also adds it to d1 (same dict). Length is 2.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict"
    },
    {
        id: "t5t-aliasing-slice-copy",
        tier: 5,
        tags: ["aliasing", "copy", "slice"],
        title: "Slice Creates Shallow Copy",
        code: "a = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(len(a))",
        correctOutput: "3",
        outputChoices: [
            "3",
            "4",
            "2",
            "5"
        ],
        explanation: "a[:] creates a shallow copy. b is a new list, so appending to b doesn't affect a. a still has 3 elements.",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t5t-shallow-copy-list",
        tier: 5,
        tags: ["shallow-copy", "copy"],
        title: "Shallow Copy with copy()",
        code: "import copy\na = [[1, 2], [3, 4]]\nb = a.copy()\nb[0].append(5)\nprint(a[0])",
        correctOutput: "[1, 2, 5]",
        outputChoices: [
            "[1, 2, 5]",
            "[1, 2]",
            "[[1, 2, 5]]",
            "[5]"
        ],
        explanation: "list.copy() is shallow: outer list is copied, but inner lists are aliased. Modifying b[0] affects a[0].",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t5t-shallow-vs-deep",
        tier: 5,
        tags: ["shallow-copy", "deep-copy"],
        title: "Deep Copy Breaks All References",
        code: "import copy\na = [[1, 2], [3, 4]]\nb = copy.deepcopy(a)\nb[0].append(5)\nprint(a[0])",
        correctOutput: "[1, 2]",
        outputChoices: [
            "[1, 2]",
            "[1, 2, 5]",
            "[[1, 2]]",
            "[5]"
        ],
        explanation: "deepcopy() recursively copies all nested objects. b[0] is a new list, so modifying it doesn't affect a[0].",
        conceptLink: "https://docs.python.org/3/library/copy.html#copy.deepcopy"
    },
    {
        id: "t5t-deep-copy-dict",
        tier: 5,
        tags: ["deep-copy", "copy"],
        title: "Deep Copy Dictionary",
        code: "import copy\na = {'x': [1, 2]}\nb = copy.deepcopy(a)\nb['x'].append(3)\nprint(len(a['x']))",
        correctOutput: "2",
        outputChoices: [
            "2",
            "3",
            "1",
            "4"
        ],
        explanation: "deepcopy() creates a new dict with a new list. Appending to b['x'] doesn't affect a['x'], which remains length 2.",
        conceptLink: "https://docs.python.org/3/library/copy.html#copy.deepcopy"
    },
    {
        id: "t5t-rebind-vs-mutate-list",
        tier: 5,
        tags: ["rebinding", "mutation"],
        title: "Rebinding vs Mutating List",
        code: "a = [1, 2]\nb = a\nb = b + [3]\nprint(len(a))",
        correctOutput: "2",
        outputChoices: [
            "2",
            "3",
            "1",
            "4"
        ],
        explanation: "b + [3] creates a new list and rebinds b to it. a still references the original [1, 2] (length 2).",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t5t-rebind-vs-mutate-extend",
        tier: 5,
        tags: ["rebinding", "mutation"],
        title: "In-Place Mutation with +=",
        code: "a = [1, 2]\nb = a\nb += [3]\nprint(len(a))",
        correctOutput: "3",
        outputChoices: [
            "3",
            "2",
            "4",
            "1"
        ],
        explanation: "+= mutates the list in-place (like extend). Both a and b reference the same modified list (length 3).",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#augmented-assignment-statements"
    },
    {
        id: "t5t-rebind-vs-mutate-tuple",
        tier: 5,
        tags: ["rebinding", "mutation", "immutable"],
        title: "Tuple += Creates New Object",
        code: "a = (1, 2)\nb = a\nb += (3,)\nprint(len(a))",
        correctOutput: "2",
        outputChoices: [
            "2",
            "3",
            "1",
            "TypeError"
        ],
        explanation: "Tuples are immutable. += creates a new tuple and rebinds b. a still references the original (1, 2) (length 2).",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t5t-rebind-string",
        tier: 5,
        tags: ["rebinding", "immutable"],
        title: "String Rebinding",
        code: "a = 'hello'\nb = a\nb = b + ' world'\nprint(a)",
        correctOutput: "hello",
        outputChoices: [
            "hello",
            "hello world",
            "world",
            "TypeError"
        ],
        explanation: "Strings are immutable. b + ' world' creates a new string and rebinds b. a still references 'hello'.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
    },
    {
        id: "t5t-id-vs-equality",
        tier: 5,
        tags: ["identity", "is", "=="],
        title: "Identity vs Equality",
        code: "a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b)\nprint(a is b)",
        correctOutput: "True\nFalse",
        outputChoices: [
            "True\nFalse",
            "False\nFalse",
            "True\nTrue",
            "False\nTrue"
        ],
        explanation: "== checks value equality (True: both are [1,2,3]). is checks identity (False: different objects in memory).",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#is"
    },
    {
        id: "t5t-id-small-int-cache",
        tier: 5,
        tags: ["identity", "is", "int-cache"],
        title: "Small Integer Caching",
        code: "a = 256\nb = 256\nprint(a is b)\na = 257\nb = 257\nprint(a is b)",
        correctOutput: "True\nFalse",
        outputChoices: [
            "True\nFalse",
            "False\nFalse",
            "True\nTrue",
            "False\nTrue"
        ],
        explanation: "CPython caches small integers (-5 to 256). 256 is cached (same object), but 257 creates separate objects.",
        conceptLink: "https://docs.python.org/3/c-api/long.html#c.PyLong_FromLong"
    },
    {
        id: "t5t-arg-pass-immutable",
        tier: 5,
        tags: ["arguments", "immutable"],
        title: "Function Arguments: Immutable",
        code: "def modify(x):\n    x = x + 10\n    return x\na = 5\nmodify(a)\nprint(a)",
        correctOutput: "5",
        outputChoices: [
            "5",
            "15",
            "10",
            "0"
        ],
        explanation: "Integers are immutable. x = x + 10 rebinds local x to a new int. The original a is unchanged (still 5).",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference"
    },
    {
        id: "t5t-arg-pass-mutable",
        tier: 5,
        tags: ["arguments", "mutable"],
        title: "Function Arguments: Mutable",
        code: "def modify(lst):\n    lst.append(10)\n    return lst\na = [5]\nmodify(a)\nprint(a)",
        correctOutput: "[5, 10]",
        outputChoices: [
            "[5, 10]",
            "[5]",
            "[10]",
            "[[5], [10]]"
        ],
        explanation: "Lists are mutable. lst references the same object as a. append() mutates it, so a is modified to [5, 10].",
        conceptLink: "https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference"
    }
];
