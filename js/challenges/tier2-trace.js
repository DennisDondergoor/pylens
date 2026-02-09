window.TIER2_TRACE = [
    {
        id: "t2t-mutable-default",
        tier: 2,
        tags: ["functions", "mutable-defaults", "gotcha"],
        title: "Mutable Default Argument Trap",
        code: "def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item(1))\nprint(add_item(2))",
        correctOutput: "[1]\n[1, 2]",
        outputChoices: [
            "[1]\n[2]",
            "[1]\n[1, 2]",
            "[1, 1]\n[2, 2]",
            "[[1]]\n[[2]]"
        ],
        explanation: "Default mutable arguments are created once when the function is defined, not each time it's called. Both calls share the same list object, so the second call appends to the list that already contains 1.",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
    },
    {
        id: "t2t-closure-late-binding",
        tier: 2,
        tags: ["closures", "lambda", "scope"],
        title: "Late Binding in Closures",
        code: "funcs = []\nfor i in range(3):\n    funcs.append(lambda: i)\n\nprint(funcs[0]())\nprint(funcs[1]())\nprint(funcs[2]())",
        correctOutput: "2\n2\n2",
        outputChoices: [
            "0\n1\n2",
            "2\n2\n2",
            "0\n0\n0",
            "None\nNone\nNone"
        ],
        explanation: "Lambda functions capture variables by reference, not by value. All lambdas reference the same variable 'i', which has the value 2 after the loop completes. This is called late binding.",
        conceptLink: "https://docs.python.org/3/faq/programming.html#why-do-lambdas-defined-in-a-loop-with-different-values-all-return-the-same-result"
    },
    {
        id: "t2t-list-comp-conditional",
        tier: 2,
        tags: ["comprehensions", "conditionals"],
        title: "List Comprehension with Filter",
        code: "result = [x for x in range(10) if x % 2 == 0]\nprint(result)",
        correctOutput: "[0, 2, 4, 6, 8]",
        outputChoices: [
            "[0, 2, 4, 6, 8]",
            "[1, 3, 5, 7, 9]",
            "[2, 4, 6, 8, 10]",
            "[0, 1, 2, 3, 4]"
        ],
        explanation: "The comprehension iterates through range(10) which gives 0-9, and the 'if x % 2 == 0' filter keeps only even numbers. Zero is even because 0 % 2 equals 0.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    },
    {
        id: "t2t-generator-exhaustion",
        tier: 2,
        tags: ["generators", "iterators"],
        title: "Generator Exhaustion",
        code: "gen = (x * 2 for x in range(3))\nprint(list(gen))\nprint(list(gen))",
        correctOutput: "[0, 2, 4]\n[]",
        outputChoices: [
            "[0, 2, 4]\n[0, 2, 4]",
            "[0, 2, 4]\n[]",
            "[]\n[0, 2, 4]",
            "[0, 2, 4]\nNone"
        ],
        explanation: "Generators can only be iterated once. The first list() call consumes all values from the generator. The second call finds an already-exhausted generator and returns an empty list.",
        conceptLink: "https://docs.python.org/3/tutorial/classes.html#generators"
    },
    {
        id: "t2t-dict-merge-operator",
        tier: 2,
        tags: ["dictionaries", "operators", "python3.9+"],
        title: "Dictionary Merge Operator",
        code: "d1 = {1: 'a', 2: 'b'}\nd2 = {2: 'c', 3: 'd'}\nresult = d1 | d2\nprint(result)",
        correctOutput: "{1: 'a', 2: 'c', 3: 'd'}",
        outputChoices: [
            "{1: 'a', 2: 'b', 3: 'd'}",
            "{1: 'a', 2: 'c', 3: 'd'}",
            "{1: 'a', 2: 'b', 2: 'c', 3: 'd'}",
            "{2: 'c', 3: 'd'}"
        ],
        explanation: "The | operator merges dictionaries with the right operand taking precedence. Key 2 exists in both dictionaries, so the value from d2 ('c') overwrites the value from d1 ('b').",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict"
    },
    {
        id: "t2t-walrus-operator",
        tier: 2,
        tags: ["walrus-operator", "assignment-expressions", "python3.8+"],
        title: "Walrus Operator Side Effect",
        code: "result = [y := x + 1 for x in range(3)]\nprint(y)",
        correctOutput: "3",
        outputChoices: [
            "2",
            "3",
            "[1, 2, 3]",
            "NameError"
        ],
        explanation: "The walrus operator := assigns while also returning the value. In the comprehension, y is assigned for each iteration. After the comprehension completes, y retains the last assigned value: 2 + 1 = 3.",
        conceptLink: "https://docs.python.org/3/whatsnew/3.8.html#assignment-expressions"
    },
    {
        id: "t2t-star-unpacking",
        tier: 2,
        tags: ["unpacking", "starred-expressions"],
        title: "Star Unpacking",
        code: "a, *b = [1, 2, 3, 4]\nprint(a)\nprint(b)",
        correctOutput: "1\n[2, 3, 4]",
        outputChoices: [
            "1\n[2, 3, 4]",
            "[1]\n[2, 3, 4]",
            "1\n(2, 3, 4)",
            "1\n2"
        ],
        explanation: "Star unpacking captures remaining items in a list. The first element (1) is assigned to 'a', and the starred expression *b captures all remaining elements as a list [2, 3, 4].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2t-enumerate-start",
        tier: 2,
        tags: ["enumerate", "built-in-functions"],
        title: "Enumerate with Start Parameter",
        code: "result = list(enumerate(['a', 'b', 'c'], start=1))\nprint(result)",
        correctOutput: "[(1, 'a'), (2, 'b'), (3, 'c')]",
        outputChoices: [
            "[(0, 'a'), (1, 'b'), (2, 'c')]",
            "[(1, 'a'), (2, 'b'), (3, 'c')]",
            "[('a', 1), ('b', 2), ('c', 3)]",
            "[(1, 0), (2, 1), (3, 2)]"
        ],
        explanation: "enumerate() creates tuples of (index, value). The start parameter sets the starting index to 1 instead of the default 0, producing 1-indexed results.",
        conceptLink: "https://docs.python.org/3/library/functions.html#enumerate"
    },
    {
        id: "t2t-zip-truncation",
        tier: 2,
        tags: ["zip", "built-in-functions", "iterators"],
        title: "Zip Truncates to Shortest",
        code: "result = list(zip([1, 2, 3], ['a', 'b']))\nprint(result)",
        correctOutput: "[(1, 'a'), (2, 'b')]",
        outputChoices: [
            "[(1, 'a'), (2, 'b'), (3, None)]",
            "[(1, 'a'), (2, 'b')]",
            "[(1, 'a'), (2, 'b'), (3, '')]",
            "[1, 'a', 2, 'b', 3]"
        ],
        explanation: "zip() combines iterables element-by-element but stops when the shortest iterable is exhausted. The second list has only 2 elements, so zip produces only 2 tuples. The third element (3) is not paired.",
        conceptLink: "https://docs.python.org/3/library/functions.html#zip"
    },
    {
        id: "t2t-nested-comprehension",
        tier: 2,
        tags: ["comprehensions", "nested-loops"],
        title: "Nested Comprehension Order",
        code: "result = [[j for j in range(i)] for i in range(4)]\nprint(result)",
        correctOutput: "[[], [0], [0, 1], [0, 1, 2]]",
        outputChoices: [
            "[[0], [0, 1], [0, 1, 2], [0, 1, 2, 3]]",
            "[[], [0], [0, 1], [0, 1, 2]]",
            "[[0, 0, 0, 0], [1, 1, 1], [2, 2], [3]]",
            "[[0, 1, 2, 3]]"
        ],
        explanation: "The outer comprehension iterates i from 0 to 3. For each i, the inner comprehension creates a list from range(i). range(0) is empty, range(1) is [0], range(2) is [0,1], and range(3) is [0,1,2].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        id: "t2t-dict-setdefault",
        tier: 2,
        tags: ["dictionaries", "methods"],
        title: "Dictionary setdefault Behavior",
        code: "d = {'a': 1}\nprint(d.setdefault('a', 99))\nprint(d.setdefault('b', 99))\nprint(d)",
        correctOutput: "1\n99\n{'a': 1, 'b': 99}",
        outputChoices: [
            "99\n99\n{'a': 99, 'b': 99}",
            "1\n99\n{'a': 1, 'b': 99}",
            "1\nNone\n{'a': 1}",
            "None\n99\n{'a': 1, 'b': 99}"
        ],
        explanation: "setdefault(key, default) returns the existing value if the key exists, or sets and returns the default if it doesn't. Key 'a' already exists with value 1 (unchanged), key 'b' doesn't exist so it's set to 99.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.setdefault"
    },
    {
        id: "t2t-counter-most-common",
        tier: 2,
        tags: ["collections", "Counter"],
        title: "Counter most_common",
        code: "from collections import Counter\nc = Counter(['a', 'b', 'a', 'c', 'b', 'a'])\nprint(c.most_common(2))",
        correctOutput: "[('a', 3), ('b', 2)]",
        outputChoices: [
            "[('a', 3), ('b', 2)]",
            "['a', 'b']",
            "[('a', 3), ('b', 2), ('c', 1)]",
            "{'a': 3, 'b': 2}"
        ],
        explanation: "Counter.most_common(n) returns a list of the n most common elements as (element, count) tuples, ordered by frequency. 'a' appears 3 times and 'b' appears 2 times, making them the top 2.",
        conceptLink: "https://docs.python.org/3/library/collections.html#collections.Counter.most_common"
    },
    {
        id: "t2t-any-all-generators",
        tier: 2,
        tags: ["built-in-functions", "any", "all", "generators"],
        title: "any() and all() with Generators",
        code: "nums = [1, 2, 3]\nprint(any(x > 3 for x in nums))\nprint(all(x > 0 for x in nums))",
        correctOutput: "False\nTrue",
        outputChoices: [
            "True\nTrue",
            "False\nTrue",
            "False\nFalse",
            "True\nFalse"
        ],
        explanation: "any() returns True if at least one element is truthy. No number in [1,2,3] is greater than 3, so the first returns False. all() returns True if all elements are truthy. All numbers are greater than 0, so the second returns True.",
        conceptLink: "https://docs.python.org/3/library/functions.html#any"
    },
    {
        id: "t2t-chained-assignment-mutability",
        tier: 2,
        tags: ["assignment", "mutability", "references"],
        title: "Chained Assignment with Mutable Objects",
        code: "a = b = [1, 2]\na.append(3)\nprint(b)",
        correctOutput: "[1, 2, 3]",
        outputChoices: [
            "[1, 2]",
            "[1, 2, 3]",
            "[1, 2, 3, 3]",
            "None"
        ],
        explanation: "Chained assignment makes both variables reference the same object. When a.append(3) modifies the list, both 'a' and 'b' see the change because they point to the same list object in memory.",
        conceptLink: "https://docs.python.org/3/reference/simple_stmts.html#assignment-statements"
    },
    {
        id: "t2t-sorted-key-function",
        tier: 2,
        tags: ["sorting", "built-in-functions", "key-functions"],
        title: "sorted() with Key Function",
        code: "words = ['banana', 'pie', 'a']\nresult = sorted(words, key=len)\nprint(result)",
        correctOutput: "['a', 'pie', 'banana']",
        outputChoices: [
            "['a', 'banana', 'pie']",
            "['a', 'pie', 'banana']",
            "['banana', 'pie', 'a']",
            "['pie', 'a', 'banana']"
        ],
        explanation: "sorted() with key=len sorts by the length of each string rather than alphabetically. 'a' has length 1, 'pie' has length 3, and 'banana' has length 6, so they're sorted in ascending order by length.",
        conceptLink: "https://docs.python.org/3/howto/sorting.html"
    }
];
