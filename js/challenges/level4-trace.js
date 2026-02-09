window.LEVEL4_TRACE = [
    {
        id: "t4t-split-join",
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
    },
    {
        id: "t4t-str-format",
        level: 4,
        tags: ["strings", "format", "formatting"],
        title: "String Format Method",
        code: "name = 'Alice'\nage = 30\nmsg = 'Name: {}, Age: {}'.format(name, age)\nprint(msg)",
        correctOutput: "Name: Alice, Age: 30",
        outputChoices: [
            "Name: Alice, Age: 30",
            "Name: {}, Age: {}",
            "Name: name, Age: age",
            "Alice 30"
        ],
        explanation: ".format() replaces {} placeholders with the provided arguments in order. First {} gets 'Alice', second {} gets 30.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.format"
    },
    {
        id: "t4t-list-count",
        level: 4,
        tags: ["lists", "count", "methods"],
        title: "List Count Method",
        code: "numbers = [1, 2, 2, 3, 2, 4, 2]\ncount = numbers.count(2)\nprint(count)",
        correctOutput: "4",
        outputChoices: [
            "4",
            "2",
            "7",
            "3"
        ],
        explanation: "The count() method returns how many times 2 appears in the list. The value 2 appears 4 times.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#list.count"
    },
    {
        id: "t4t-dict-items",
        level: 4,
        tags: ["dictionaries", "items", "iteration"],
        title: "Dict Items Iteration",
        code: "data = {'x': 10, 'y': 20}\nfor key, val in data.items():\n    print(f'{key}={val}', end=' ')",
        correctOutput: "x=10 y=20 ",
        outputChoices: [
            "x=10 y=20 ",
            "10 20 ",
            "x y ",
            "('x', 10) ('y', 20) "
        ],
        explanation: "data.items() returns key-value pairs as tuples. The loop unpacks each (key, val) pair and prints them in the format key=val.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.items"
    },
    {
        id: "t4t-nested-comp",
        level: 4,
        tags: ["list-comprehension", "nested", "comprehensions"],
        title: "Nested List Comprehension",
        code: "matrix = [[1, 2], [3, 4]]\nflat = [num for row in matrix for num in row]\nprint(flat)",
        correctOutput: "[1, 2, 3, 4]",
        outputChoices: [
            "[1, 2, 3, 4]",
            "[[1, 2], [3, 4]]",
            "[1, 3, 2, 4]",
            "[2, 4, 6, 8]"
        ],
        explanation: "The nested comprehension iterates through each row, then through each num in that row. This flattens [[1, 2], [3, 4]] into [1, 2, 3, 4].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        id: "t4t-set-comp",
        level: 4,
        tags: ["set-comprehension", "comprehensions", "sets"],
        title: "Set Comprehension",
        code: "numbers = [1, 2, 2, 3, 3, 3, 4]\nunique = {n for n in numbers}\nprint(sorted(unique))",
        correctOutput: "[1, 2, 3, 4]",
        outputChoices: [
            "[1, 2, 3, 4]",
            "[1, 2, 2, 3, 3, 3, 4]",
            "{1, 2, 3, 4}",
            "4"
        ],
        explanation: "Set comprehension creates {1, 2, 3, 4}, automatically removing duplicates. sorted() converts the set to a sorted list [1, 2, 3, 4].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        id: "t4t-str-startswith",
        level: 4,
        tags: ["strings", "startswith", "methods"],
        title: "String Startswith",
        code: "words = ['python', 'java', 'javascript']\njs_words = [w for w in words if w.startswith('j')]\nprint(js_words)",
        correctOutput: "['java', 'javascript']",
        outputChoices: [
            "['java', 'javascript']",
            "['python', 'java', 'javascript']",
            "['javascript']",
            "['python']"
        ],
        explanation: "The comprehension filters words that start with 'j'. Both 'java' and 'javascript' match, while 'python' does not.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.startswith"
    },
    {
        id: "t4t-str-endswith",
        level: 4,
        tags: ["strings", "endswith", "methods"],
        title: "String Endswith",
        code: "files = ['doc.txt', 'image.png', 'data.txt']\ntxt_files = [f for f in files if f.endswith('.txt')]\nprint(txt_files)",
        correctOutput: "['doc.txt', 'data.txt']",
        outputChoices: [
            "['doc.txt', 'data.txt']",
            "['image.png']",
            "['doc.txt', 'image.png', 'data.txt']",
            "['data.txt']"
        ],
        explanation: "The comprehension filters files ending with '.txt'. Both 'doc.txt' and 'data.txt' match, while 'image.png' does not.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.endswith"
    },
    {
        id: "t4t-reversed",
        level: 4,
        tags: ["reversed", "iteration", "lists"],
        title: "Reversed Iteration",
        code: "nums = [1, 2, 3, 4]\nfor n in reversed(nums):\n    print(n, end=' ')",
        correctOutput: "4 3 2 1 ",
        outputChoices: [
            "4 3 2 1 ",
            "1 2 3 4 ",
            "[4, 3, 2, 1] ",
            "Error"
        ],
        explanation: "reversed(nums) returns an iterator that yields elements in reverse order: 4, 3, 2, 1.",
        conceptLink: "https://docs.python.org/3/library/functions.html#reversed"
    },
    {
        id: "t4t-map-function",
        level: 4,
        tags: ["map", "functions", "iteration"],
        title: "Map Function",
        code: "nums = [1, 2, 3, 4]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)",
        correctOutput: "[1, 4, 9, 16]",
        outputChoices: [
            "[1, 4, 9, 16]",
            "[2, 4, 6, 8]",
            "[1, 2, 3, 4]",
            "16"
        ],
        explanation: "map() applies the lambda function to each element. It squares each number: 1**2=1, 2**2=4, 3**2=9, 4**2=16.",
        conceptLink: "https://docs.python.org/3/library/functions.html#map"
    },
    {
        id: "t4t-filter-function",
        level: 4,
        tags: ["filter", "functions", "iteration"],
        title: "Filter Function",
        code: "nums = [1, 2, 3, 4, 5, 6]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)",
        correctOutput: "[2, 4, 6]",
        outputChoices: [
            "[2, 4, 6]",
            "[1, 3, 5]",
            "[1, 2, 3, 4, 5, 6]",
            "True"
        ],
        explanation: "filter() keeps only elements where the lambda returns True. The lambda checks if x % 2 == 0, so even numbers [2, 4, 6] are kept.",
        conceptLink: "https://docs.python.org/3/library/functions.html#filter"
    },
    {
        id: "t4t-multiple-unpack",
        level: 4,
        tags: ["unpacking", "tuples", "assignment"],
        title: "Multiple Unpacking",
        code: "data = [(1, 2), (3, 4), (5, 6)]\nfor a, b in data:\n    print(a + b, end=' ')",
        correctOutput: "3 7 11 ",
        outputChoices: [
            "3 7 11 ",
            "1 3 5 ",
            "2 4 6 ",
            "6 12 18 "
        ],
        explanation: "Each tuple is unpacked into a and b. The sums are: 1+2=3, 3+4=7, 5+6=11.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t4t-dict-update",
        level: 4,
        tags: ["dictionaries", "update", "methods"],
        title: "Dict Update Method",
        code: "scores = {'Alice': 85, 'Bob': 90}\nscores.update({'Bob': 95, 'Charlie': 88})\nprint(scores['Bob'])",
        correctOutput: "95",
        outputChoices: [
            "95",
            "90",
            "88",
            "Error"
        ],
        explanation: "update() merges the new dictionary into scores. 'Bob' already exists, so its value is updated from 90 to 95. 'Charlie' is added.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.update"
    },
    {
        id: "t4t-sorted-reverse",
        level: 4,
        tags: ["sorting", "sorted", "reverse"],
        title: "Sorted with Reverse",
        code: "numbers = [3, 1, 4, 1, 5]\nresult = sorted(numbers, reverse=True)\nprint(result)",
        correctOutput: "[5, 4, 3, 1, 1]",
        outputChoices: [
            "[5, 4, 3, 1, 1]",
            "[1, 1, 3, 4, 5]",
            "[3, 1, 4, 1, 5]",
            "[1, 5, 1, 4, 3]"
        ],
        explanation: "sorted() with reverse=True sorts in descending order. The numbers are arranged from largest to smallest: [5, 4, 3, 1, 1].",
        conceptLink: "https://docs.python.org/3/library/functions.html#sorted"
    },
    {
        id: "t4t-str-strip",
        level: 4,
        tags: ["strings", "strip", "methods"],
        title: "String Strip Method",
        code: "text = '  hello  '\nresult = text.strip().upper()\nprint(result)",
        correctOutput: "HELLO",
        outputChoices: [
            "HELLO",
            "  HELLO  ",
            "hello",
            "  hello  "
        ],
        explanation: "strip() removes leading and trailing whitespace, producing 'hello'. Then upper() converts it to 'HELLO'.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.strip"
    },
    {
        id: "t4t-list-extend",
        level: 4,
        tags: ["lists", "extend", "methods"],
        title: "List Extend Method",
        code: "a = [1, 2]\nb = [3, 4]\na.extend(b)\nprint(a)",
        correctOutput: "[1, 2, 3, 4]",
        outputChoices: [
            "[1, 2, 3, 4]",
            "[1, 2, [3, 4]]",
            "[3, 4]",
            "[[1, 2], [3, 4]]"
        ],
        explanation: "extend() adds all elements from b to the end of a. This modifies a to [1, 2, 3, 4].",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#list.extend"
    }
];
