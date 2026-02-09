// PyLens Level 2 Trace Challenges: Collections
// Topics: lists, dicts, tuples, sets, slicing, indexing, membership

window.LEVEL2_TRACE = [
    {
        id: "t2t-list-len",
        level: 2,
        tags: ["list", "len", "built-in-functions"],
        title: "List Creation and Length",
        code: "numbers = [10, 20, 30, 40]\nprint(len(numbers))\nprint(numbers[1])",
        correctOutput: "4\n20",
        outputChoices: ["4\n20", "4\n10", "3\n20", "5\n20"],
        explanation: "len() returns the number of items in the list (4 elements). List indexing starts at 0, so numbers[1] returns the second element, which is 20.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#list"
    },
    {
        id: "t2t-dict-access",
        level: 2,
        tags: ["dict", "dictionary", "indexing"],
        title: "Dictionary Key Access",
        code: "person = {'name': 'Alice', 'age': 25}\nprint(person['name'])\nprint(person['age'])",
        correctOutput: "Alice\n25",
        outputChoices: ["Alice\n25", "name\nage", "'name'\n'age'", "Alice 25"],
        explanation: "Dictionary values are accessed using keys in square brackets. person['name'] returns 'Alice' and person['age'] returns 25.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict"
    },
    {
        id: "t2t-tuple-unpack",
        level: 2,
        tags: ["tuple", "unpacking", "assignment"],
        title: "Tuple Unpacking",
        code: "a, b = 10, 20\nprint(a)\nprint(b)\nprint(a + b)",
        correctOutput: "10\n20\n30",
        outputChoices: ["10\n20\n30", "20\n10\n30", "10\n20\n1020", "(10, 20)\n30"],
        explanation: "Tuple unpacking assigns multiple values simultaneously. a gets 10, b gets 20, then a + b = 30.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2t-list-slice",
        level: 2,
        tags: ["list", "slicing"],
        title: "List Slicing Start to Stop",
        code: "items = ['a', 'b', 'c', 'd', 'e']\nprint(items[1:4])",
        correctOutput: "['b', 'c', 'd']",
        outputChoices: ["['b', 'c', 'd']", "['a', 'b', 'c']", "['b', 'c', 'd', 'e']", "['a', 'b', 'c', 'd']"],
        explanation: "Slicing [1:4] returns elements from index 1 up to (but not including) index 4. This gives ['b', 'c', 'd'].",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t2t-in-operator",
        level: 2,
        tags: ["membership", "in", "strings"],
        title: "Membership Test with In",
        code: "text = 'Python'\nprint('th' in text)\nprint('x' in text)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "1\n0", "th\nx"],
        explanation: "The 'in' operator checks if a substring exists within a string. 'th' is in 'Python' (True), but 'x' is not (False).",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#membership-test-operations"
    },
    {
        id: "t2t-set-duplicates",
        level: 2,
        tags: ["set", "duplicates", "type-conversion"],
        title: "Set Removes Duplicates",
        code: "numbers = [1, 2, 2, 3, 3, 3]\nunique = set(numbers)\nprint(len(unique))",
        correctOutput: "3",
        outputChoices: ["3", "6", "4", "5"],
        explanation: "Converting a list to a set removes all duplicate values. The list has 6 items, but only 3 unique values (1, 2, 3), so len(unique) is 3.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#set"
    },
    {
        id: "t2t-negative-index",
        level: 2,
        tags: ["list", "negative-indexing"],
        title: "Negative List Indexing",
        code: "letters = ['a', 'b', 'c', 'd']\nprint(letters[-1])\nprint(letters[-2])",
        correctOutput: "d\nc",
        outputChoices: ["d\nc", "a\nb", "c\nd", "d\nb"],
        explanation: "Negative indices count from the end of the list. letters[-1] is the last element 'd', and letters[-2] is the second-to-last element 'c'.",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t2t-dict-keys",
        level: 2,
        tags: ["dict", "dictionary", "keys", "iteration"],
        title: "Dictionary Keys Iteration",
        code: "data = {'x': 1, 'y': 2, 'z': 3}\nfor key in data.keys():\n    print(key, end=' ')",
        correctOutput: "x y z ",
        outputChoices: ["x y z ", "1 2 3 ", "xyz", "x y z"],
        explanation: "The .keys() method returns the dictionary keys. The loop prints each key followed by a space (end=' '). Note the trailing space after 'z'.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.keys"
    },
    {
        id: "t2t-slice-step",
        level: 2,
        tags: ["list", "slicing", "step"],
        title: "List Slicing with Step",
        code: "nums = [0, 1, 2, 3, 4, 5, 6]\nprint(nums[::2])",
        correctOutput: "[0, 2, 4, 6]",
        outputChoices: ["[0, 2, 4, 6]", "[0, 1, 2, 3]", "[1, 3, 5]", "[0, 2, 4, 6, 8]"],
        explanation: "The slice [::2] means start at the beginning, go to the end, taking every 2nd element (step of 2). This gives [0, 2, 4, 6].",
        conceptLink: "https://docs.python.org/3/library/functions.html#slice"
    },
    {
        id: "t2t-nested-list",
        level: 2,
        tags: ["list", "nested", "indexing"],
        title: "Nested List Access",
        code: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(matrix[1][2])\nprint(matrix[0][0])",
        correctOutput: "6\n1",
        outputChoices: ["6\n1", "5\n1", "6\n3", "2\n1"],
        explanation: "matrix[1][2] accesses row 1 (second row [4,5,6]), then element 2 (third element: 6). matrix[0][0] accesses the first element of the first row: 1.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        id: "t2t-list-append",
        level: 2,
        tags: ["list", "methods", "append"],
        title: "List Append Method",
        code: "fruits = ['apple', 'banana']\nfruits.append('cherry')\nprint(len(fruits))\nprint(fruits[-1])",
        correctOutput: "3\ncherry",
        outputChoices: ["3\ncherry", "2\nbanana", "3\nbanana", "4\ncherry"],
        explanation: "The .append() method adds an element to the end of the list. After appending 'cherry', the list has 3 items, and fruits[-1] returns the last item 'cherry'.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2t-dict-get",
        level: 2,
        tags: ["dict", "dictionary", "get", "methods"],
        title: "Dictionary Get Method",
        code: "data = {'a': 10, 'b': 20}\nprint(data.get('a'))\nprint(data.get('c', 0))",
        correctOutput: "10\n0",
        outputChoices: ["10\n0", "10\nNone", "a\nc", "10\nError"],
        explanation: "The .get() method returns the value for a key. If the key doesn't exist, it returns the default value (second argument). 'a' exists (10), but 'c' doesn't, so it returns 0.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t2t-list-extend",
        level: 2,
        tags: ["list", "methods", "extend"],
        title: "List Extend vs Append",
        code: "nums = [1, 2]\nnums.extend([3, 4])\nprint(nums)",
        correctOutput: "[1, 2, 3, 4]",
        outputChoices: ["[1, 2, 3, 4]", "[1, 2, [3, 4]]", "[3, 4]", "[1, 2, 3]"],
        explanation: "The .extend() method adds each element from the iterable to the list. It's different from .append() which would add the entire list as a single element.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2t-tuple-immutable",
        level: 2,
        tags: ["tuple", "immutable", "indexing"],
        title: "Tuple Immutability",
        code: "coords = (5, 10, 15)\nprint(coords[1])\nprint(len(coords))",
        correctOutput: "10\n3",
        outputChoices: ["10\n3", "5\n3", "10\n2", "5\n2"],
        explanation: "Tuples are immutable sequences. You can access elements by index (coords[1] = 10) and get their length (3), but you cannot modify them.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2t-list-in",
        level: 2,
        tags: ["list", "membership", "in"],
        title: "List Membership Test",
        code: "colors = ['red', 'blue', 'green']\nprint('blue' in colors)\nprint('yellow' in colors)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "1\n0", "blue\nyellow"],
        explanation: "The 'in' operator checks if an element exists in a list. 'blue' is in the list (True), but 'yellow' is not (False).",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#membership-test-operations"
    },
    {
        id: "t2t-dict-values",
        level: 2,
        tags: ["dict", "dictionary", "values", "list"],
        title: "Dictionary Values as List",
        code: "scores = {'Alice': 90, 'Bob': 85, 'Carol': 95}\nvals = list(scores.values())\nprint(len(vals))\nprint(max(vals))",
        correctOutput: "3\n95",
        outputChoices: ["3\n95", "3\n90", "2\n95", "3\n85"],
        explanation: "The .values() method returns the dictionary values. Converting to a list gives [90, 85, 95]. len() returns 3, and max() finds the largest value (95).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.values"
    },
    {
        id: "t2t-slice-negative",
        level: 2,
        tags: ["list", "slicing", "negative-indexing"],
        title: "Negative Slice Indices",
        code: "items = ['a', 'b', 'c', 'd', 'e']\nprint(items[-3:-1])",
        correctOutput: "['c', 'd']",
        outputChoices: ["['c', 'd']", "['c', 'd', 'e']", "['d', 'e']", "['b', 'c', 'd']"],
        explanation: "Negative slice indices count from the end. items[-3:-1] means from the 3rd-to-last ('c') up to (but not including) the last element, giving ['c', 'd'].",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t2t-list-count",
        level: 2,
        tags: ["list", "methods", "count"],
        title: "List Count Method",
        code: "numbers = [1, 2, 2, 3, 2, 4]\nprint(numbers.count(2))\nprint(numbers.count(5))",
        correctOutput: "3\n0",
        outputChoices: ["3\n0", "2\n0", "3\n1", "2\n1"],
        explanation: "The .count() method returns how many times a value appears in the list. The number 2 appears 3 times, and 5 doesn't appear at all (0).",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2t-dict-update",
        level: 2,
        tags: ["dict", "dictionary", "update", "methods"],
        title: "Dictionary Update Method",
        code: "data = {'a': 1, 'b': 2}\ndata.update({'b': 20, 'c': 3})\nprint(data['b'])\nprint(len(data))",
        correctOutput: "20\n3",
        outputChoices: ["20\n3", "2\n3", "20\n2", "2\n4"],
        explanation: "The .update() method merges dictionaries. Existing keys are overwritten (b becomes 20), and new keys are added (c). The result has 3 keys: a, b, c.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.update"
    },
    {
        id: "t2t-reverse-slice",
        level: 2,
        tags: ["list", "slicing", "step", "reverse"],
        title: "Reversing with Negative Step",
        code: "nums = [1, 2, 3, 4, 5]\nprint(nums[::-1])",
        correctOutput: "[5, 4, 3, 2, 1]",
        outputChoices: ["[5, 4, 3, 2, 1]", "[1, 2, 3, 4, 5]", "[2, 3, 4, 5]", "[5]"],
        explanation: "The slice [::-1] uses a step of -1, which reverses the list. It starts at the end and goes backward, producing [5, 4, 3, 2, 1].",
        conceptLink: "https://docs.python.org/3/library/functions.html#slice"
    },
    {
        id: "t2t-set-operations",
        level: 2,
        tags: ["set", "union", "operations"],
        title: "Set Union Operation",
        code: "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(len(a | b))",
        correctOutput: "5",
        outputChoices: ["5", "6", "3", "1"],
        explanation: "The | operator performs set union, combining all unique elements from both sets. {1, 2, 3, 4, 5} has 5 elements (3 appears in both but is counted once).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#set"
    },
    {
        id: "t2t-list-index",
        level: 2,
        tags: ["list", "methods", "index"],
        title: "List Index Method",
        code: "fruits = ['apple', 'banana', 'cherry', 'banana']\nprint(fruits.index('banana'))\nprint(fruits.index('cherry'))",
        correctOutput: "1\n2",
        outputChoices: ["1\n2", "0\n2", "1\n3", "3\n2"],
        explanation: "The .index() method returns the position of the first occurrence of a value. 'banana' first appears at index 1, and 'cherry' is at index 2.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2t-dict-items",
        level: 2,
        tags: ["dict", "dictionary", "items", "iteration"],
        title: "Dictionary Items Iteration",
        code: "data = {'x': 10, 'y': 20}\nfor k, v in data.items():\n    print(v, end=' ')",
        correctOutput: "10 20 ",
        outputChoices: ["10 20 ", "x y ", "x 10 y 20 ", "1020"],
        explanation: "The .items() method returns key-value pairs as tuples. The loop unpacks each pair into k and v, printing only the values (10 and 20) with spaces.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.items"
    },
    {
        id: "t2t-empty-slice",
        level: 2,
        tags: ["list", "slicing", "copy"],
        title: "Full List Slice Copy",
        code: "original = [1, 2, 3]\ncopy = original[:]\ncopy.append(4)\nprint(len(original))\nprint(len(copy))",
        correctOutput: "3\n4",
        outputChoices: ["3\n4", "4\n4", "3\n3", "4\n3"],
        explanation: "The slice [:] creates a shallow copy of the entire list. Modifying the copy doesn't affect the original. original has 3 items, copy has 4.",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t2t-set-intersection",
        level: 2,
        tags: ["set", "intersection", "operations"],
        title: "Set Intersection Operation",
        code: "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\ncommon = a & b\nprint(sorted(common))",
        correctOutput: "[3, 4]",
        outputChoices: ["[3, 4]", "[1, 2, 3, 4, 5, 6]", "[1, 2]", "[5, 6]"],
        explanation: "The & operator finds the intersection (common elements) of two sets. Both sets contain 3 and 4, so a & b returns {3, 4}, which sorted() converts to [3, 4].",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#set"
    }
];
