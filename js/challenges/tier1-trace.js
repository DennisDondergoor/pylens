window.TIER1_TRACE = [
    {
        id: "t1t-int-division",
        tier: 1,
        tags: ["operators", "division"],
        title: "Integer Division vs True Division",
        code: "print(5 / 2)\nprint(5 // 2)",
        correctOutput: "2.5\n2",
        outputChoices: ["2.5\n2", "2\n2", "2.5\n2.5", "Error"],
        explanation: "The / operator performs true division (returns float), while // performs floor division (returns integer). 5/2 = 2.5, and 5//2 = 2 (rounds down).",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations"
    },
    {
        id: "t1t-string-mult",
        tier: 1,
        tags: ["strings", "operators"],
        title: "String Multiplication",
        code: "result = \"ha\" * 3\nprint(result)",
        correctOutput: "hahaha",
        outputChoices: ["hahaha", "ha ha ha", "ha3", "Error"],
        explanation: "The * operator with strings repeats the string. \"ha\" * 3 concatenates \"ha\" three times to produce \"hahaha\".",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t1t-list-slice-step",
        tier: 1,
        tags: ["lists", "slicing"],
        title: "List Slicing with Step",
        code: "nums = [1, 2, 3, 4, 5]\nprint(nums[::2])",
        correctOutput: "[1, 3, 5]",
        outputChoices: ["[1, 3, 5]", "[2, 4]", "[1, 2, 3, 4, 5]", "[5, 3, 1]"],
        explanation: "The slice [::2] starts at index 0, goes to the end, with a step of 2. This selects every second element: indices 0, 2, and 4.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t1t-bool-arithmetic",
        tier: 1,
        tags: ["booleans", "operators"],
        title: "Boolean Arithmetic",
        code: "result = True + True + False\nprint(result)",
        correctOutput: "2",
        outputChoices: ["2", "True", "1", "Error"],
        explanation: "In Python, True equals 1 and False equals 0 in numeric contexts. True + True + False = 1 + 1 + 0 = 2.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-type-bool"
    },
    {
        id: "t1t-fstring-expr",
        tier: 1,
        tags: ["strings", "f-strings"],
        title: "F-String Expressions",
        code: "power = 10\nprint(f\"{2**power}\")",
        correctOutput: "1024",
        outputChoices: ["1024", "2**10", "20", "Error"],
        explanation: "F-strings evaluate expressions inside curly braces. 2**10 (2 to the power of 10) equals 1024, which is then converted to a string.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#f-strings"
    },
    {
        id: "t1t-dict-get-default",
        tier: 1,
        tags: ["dictionaries", "methods"],
        title: "Dictionary .get() with Default",
        code: "data = {\"name\": \"Alice\", \"age\": 30}\nprint(data.get(\"city\", \"Unknown\"))",
        correctOutput: "Unknown",
        outputChoices: ["Unknown", "None", "Error", "city"],
        explanation: "The .get() method returns the default value (second argument) when the key doesn't exist. Since \"city\" is not in the dictionary, it returns \"Unknown\".",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t1t-tuple-unpack",
        tier: 1,
        tags: ["unpacking", "tuples", "lists"],
        title: "Tuple Unpacking with *",
        code: "a, *b, c = [1, 2, 3, 4, 5]\nprint(b)",
        correctOutput: "[2, 3, 4]",
        outputChoices: ["[2, 3, 4]", "[1, 2, 3, 4, 5]", "[2, 3]", "Error"],
        explanation: "The * operator in unpacking captures the middle elements. a=1, c=5, and *b captures everything in between as a list: [2, 3, 4].",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t1t-in-operator-string",
        tier: 1,
        tags: ["strings", "operators"],
        title: "The 'in' Operator with Strings",
        code: "result = \"lo\" in \"hello world\"\nprint(result)",
        correctOutput: "True",
        outputChoices: ["True", "False", "2", "Error"],
        explanation: "The 'in' operator checks if a substring exists within a string. \"lo\" appears in \"hello world\" (in \"hello\"), so it returns True.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#membership-test-operations"
    },
    {
        id: "t1t-chained-compare",
        tier: 1,
        tags: ["operators", "comparisons"],
        title: "Chained Comparisons",
        code: "print(1 < 2 < 3)\nprint(1 < 2 > 0)",
        correctOutput: "True\nTrue",
        outputChoices: ["True\nTrue", "True\nFalse", "False\nTrue", "Error"],
        explanation: "Chained comparisons evaluate each pair. (1 < 2 < 3) means (1 < 2) and (2 < 3), both true. (1 < 2 > 0) means (1 < 2) and (2 > 0), both true.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#comparisons"
    },
    {
        id: "t1t-type-return",
        tier: 1,
        tags: ["types", "functions"],
        title: "type() Return Values",
        code: "x = [1, 2, 3]\nprint(type(x).__name__)",
        correctOutput: "list",
        outputChoices: ["list", "<class 'list'>", "[1, 2, 3]", "Error"],
        explanation: "type(x) returns the type object. Accessing .__name__ gives the string name of that type. For a list, this is \"list\".",
        conceptLink: "https://docs.python.org/3/library/functions.html#type"
    },
    {
        id: "t1t-is-vs-equals",
        tier: 1,
        tags: ["operators", "identity"],
        title: "'is' vs '==' Operators",
        code: "a = [1, 2]\nb = [1, 2]\nprint(a == b)\nprint(a is b)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "True\nTrue", "False\nFalse"],
        explanation: "== checks value equality (both lists contain [1, 2]), which is True. 'is' checks identity (same object in memory), which is False since they are different list objects.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#is"
    },
    {
        id: "t1t-falsy-values",
        tier: 1,
        tags: ["booleans", "truthiness"],
        title: "Falsy Values in Python",
        code: "values = [bool(\"\"), bool(0), bool([]), bool(\"0\")]\nprint(values)",
        correctOutput: "[False, False, False, True]",
        outputChoices: ["[False, False, False, True]", "[False, False, False, False]", "[True, True, True, True]", "[False, True, False, True]"],
        explanation: "Empty strings (\"\"), zero (0), and empty lists ([]) are falsy. However, the string \"0\" is a non-empty string, so it is truthy and evaluates to True.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#truth-value-testing"
    },
    {
        id: "t1t-string-chain",
        tier: 1,
        tags: ["strings", "methods"],
        title: "String Method Chaining",
        code: "text = \"  Hello World  \"\nresult = text.strip().upper().replace(\"O\", \"0\")\nprint(result)",
        correctOutput: "HELL0 W0RLD",
        outputChoices: ["HELL0 W0RLD", "hello world", "  HELLO WORLD  ", "Error"],
        explanation: "Methods chain left to right: .strip() removes whitespace (\"Hello World\"), .upper() capitalizes (\"HELLO WORLD\"), .replace(\"O\", \"0\") substitutes Os with zeros.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#string-methods"
    },
    {
        id: "t1t-negative-index",
        tier: 1,
        tags: ["lists", "slicing", "indexing"],
        title: "Negative Indexing in Slices",
        code: "nums = [1, 2, 3, 4, 5]\nprint(nums[-2:])",
        correctOutput: "[4, 5]",
        outputChoices: ["[4, 5]", "[5]", "[1, 2, 3, 4]", "[2, 3, 4, 5]"],
        explanation: "Negative indices count from the end. -2 is the second-to-last element (4). The slice [-2:] goes from index -2 to the end, giving [4, 5].",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t1t-floor-mod-negative",
        tier: 1,
        tags: ["operators", "division", "modulo"],
        title: "Floor Division and Modulo with Negatives",
        code: "print(-7 // 2)\nprint(-7 % 2)",
        correctOutput: "-4\n1",
        outputChoices: ["-4\n1", "-3\n-1", "-3\n1", "Error"],
        explanation: "Floor division rounds toward negative infinity: -7//2 = -4 (not -3). Modulo in Python always returns a non-negative result when divisor is positive: -7 % 2 = 1.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations"
    }
];
