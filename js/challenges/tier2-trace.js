// PyLens Tier 2 Trace Challenges: Collections
// Topics: lists, dicts, tuples, sets, slicing, indexing, membership

window.TIER2_TRACE = [
    {
        id: "t2t-list-len",
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
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
        tier: 2,
        tags: ["list", "nested", "indexing"],
        title: "Nested List Access",
        code: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(matrix[1][2])\nprint(matrix[0][0])",
        correctOutput: "6\n1",
        outputChoices: ["6\n1", "5\n1", "6\n3", "2\n1"],
        explanation: "matrix[1][2] accesses row 1 (second row [4,5,6]), then element 2 (third element: 6). matrix[0][0] accesses the first element of the first row: 1.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    }
];
