window.TIER4_TRACE = [
    {
        id: "t4t-split-join",
        tier: 4,
        tags: ["strings", "split", "join", "methods"],
        title: "Split and Join",
        code: "text = 'apple-orange-banana'\nfruits = text.split('-')\nresult = ' '.join(fruits)\nprint(result)",
        correctOutput: "apple orange banana",
        outputChoices: [
            "apple orange banana",
            "apple-orange-banana",
            "['apple', 'orange', 'banana']",
            "appleorangebanana"
        ],
        explanation: "split('-') breaks the string into a list ['apple', 'orange', 'banana']. Then ' '.join(fruits) concatenates them with spaces between, producing 'apple orange banana'.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.split"
    },
    {
        id: "t4t-list-comp-filter",
        tier: 4,
        tags: ["list-comprehension", "comprehensions", "filtering"],
        title: "List Comprehension with Condition",
        code: "numbers = [1, 2, 3, 4, 5, 6]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)",
        correctOutput: "[2, 4, 6]",
        outputChoices: [
            "[2, 4, 6]",
            "[1, 3, 5]",
            "[1, 2, 3, 4, 5, 6]",
            "[0, 0, 0]"
        ],
        explanation: "The list comprehension iterates through numbers and includes only values where n % 2 == 0 (even numbers). This filters to [2, 4, 6].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    },
    {
        id: "t4t-dict-get",
        tier: 4,
        tags: ["dictionaries", "get", "default-values"],
        title: "Dict Get with Default",
        code: "scores = {'Alice': 95, 'Bob': 82}\nprint(scores.get('Alice', 0))\nprint(scores.get('Charlie', 0))",
        correctOutput: "95\n0",
        outputChoices: [
            "95\n0",
            "95\nNone",
            "95\nCharlie",
            "None\n0"
        ],
        explanation: "get('Alice', 0) returns 95 because 'Alice' exists in the dictionary. get('Charlie', 0) returns the default value 0 because 'Charlie' is not in the dictionary.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t4t-sorted-key",
        tier: 4,
        tags: ["sorting", "sorted", "key-function"],
        title: "Sorted with Key Function",
        code: "words = ['python', 'is', 'awesome']\nresult = sorted(words, key=len)\nprint(result)",
        correctOutput: "['is', 'python', 'awesome']",
        outputChoices: [
            "['is', 'python', 'awesome']",
            "['awesome', 'python', 'is']",
            "['awesome', 'is', 'python']",
            "['is', 'awesome', 'python']"
        ],
        explanation: "sorted() with key=len sorts by string length. 'is' has length 2, 'python' has length 6, 'awesome' has length 7, so the result is ['is', 'python', 'awesome'].",
        conceptLink: "https://docs.python.org/3/library/functions.html#sorted"
    },
    {
        id: "t4t-replace-chain",
        tier: 4,
        tags: ["strings", "replace", "method-chaining"],
        title: "Chained Replace",
        code: "text = 'hello world'\nresult = text.replace('l', 'L').replace('o', 'O')\nprint(result)",
        correctOutput: "heLLO wOrLd",
        outputChoices: [
            "heLLO wOrLd",
            "hello world",
            "HELLO WORLD",
            "heLLo worLd"
        ],
        explanation: "First replace('l', 'L') changes 'hello world' to 'heLLo worLd'. Then replace('o', 'O') changes it to 'heLLO wOrLd'. Each replace affects all occurrences.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.replace"
    },
    {
        id: "t4t-dict-comp",
        tier: 4,
        tags: ["dict-comprehension", "comprehensions", "dictionaries"],
        title: "Dictionary Comprehension",
        code: "numbers = [1, 2, 3, 4]\nsquares = {n: n**2 for n in numbers}\nprint(squares[3])",
        correctOutput: "9",
        outputChoices: [
            "9",
            "3",
            "6",
            "{3: 9}"
        ],
        explanation: "The dict comprehension creates {1: 1, 2: 4, 3: 9, 4: 16}. Accessing squares[3] returns the value associated with key 3, which is 9 (3 squared).",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        id: "t4t-enumerate",
        tier: 4,
        tags: ["enumerate", "loops", "indexing"],
        title: "Enumerate in Loop",
        code: "fruits = ['apple', 'banana', 'cherry']\nfor i, fruit in enumerate(fruits, start=1):\n    print(f'{i}. {fruit}')",
        correctOutput: "1. apple\n2. banana\n3. cherry",
        outputChoices: [
            "1. apple\n2. banana\n3. cherry",
            "0. apple\n1. banana\n2. cherry",
            "apple\nbanana\ncherry",
            "1 apple\n2 banana\n3 cherry"
        ],
        explanation: "enumerate(fruits, start=1) generates pairs (1, 'apple'), (2, 'banana'), (3, 'cherry'). The loop unpacks each pair and formats them with f-strings.",
        conceptLink: "https://docs.python.org/3/library/functions.html#enumerate"
    },
    {
        id: "t4t-zip",
        tier: 4,
        tags: ["zip", "loops", "iteration"],
        title: "Zip Two Lists",
        code: "names = ['Alice', 'Bob', 'Charlie']\nscores = [85, 92, 78]\nfor name, score in zip(names, scores):\n    print(f'{name}: {score}')",
        correctOutput: "Alice: 85\nBob: 92\nCharlie: 78",
        outputChoices: [
            "Alice: 85\nBob: 92\nCharlie: 78",
            "Alice Bob Charlie\n85 92 78",
            "[('Alice', 85), ('Bob', 92), ('Charlie', 78)]",
            "Alice: 92\nBob: 78\nCharlie: 85"
        ],
        explanation: "zip(names, scores) pairs elements from both lists: ('Alice', 85), ('Bob', 92), ('Charlie', 78). The loop unpacks and formats each pair.",
        conceptLink: "https://docs.python.org/3/library/functions.html#zip"
    },
    {
        id: "t4t-star-unpack",
        tier: 4,
        tags: ["unpacking", "star-operator", "extended-unpacking"],
        title: "Star Unpacking",
        code: "values = [1, 2, 3, 4, 5]\na, *middle, c = values\nprint(a)\nprint(middle)\nprint(c)",
        correctOutput: "1\n[2, 3, 4]\n5",
        outputChoices: [
            "1\n[2, 3, 4]\n5",
            "1\n2\n3",
            "1\n(2, 3, 4)\n5",
            "[1]\n[2, 3, 4]\n[5]"
        ],
        explanation: "Star unpacking assigns first element to a (1), last element to c (5), and all middle elements to middle as a list [2, 3, 4].",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists"
    },
    {
        id: "t4t-list-comp-method",
        tier: 4,
        tags: ["list-comprehension", "string-methods", "comprehensions"],
        title: "List Comp with String Method",
        code: "words = ['hello', 'world', 'python']\nloud = [s.upper() for s in words]\nprint(loud)",
        correctOutput: "['HELLO', 'WORLD', 'PYTHON']",
        outputChoices: [
            "['HELLO', 'WORLD', 'PYTHON']",
            "['hello', 'world', 'python']",
            "HELLO WORLD PYTHON",
            "['Hello', 'World', 'Python']"
        ],
        explanation: "The list comprehension applies .upper() to each string in words, converting 'hello' to 'HELLO', 'world' to 'WORLD', and 'python' to 'PYTHON'.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    }
];
