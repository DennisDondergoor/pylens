// PyLens Tier 1 Trace Challenges: Absolute Basics
// Topics: print output, basic arithmetic, strings, booleans, type()

window.TIER1_TRACE = [
    {
        id: "t1t-print-sep",
        tier: 1,
        tags: ["print", "separator"],
        title: "Print with Separator",
        code: "print(1, 2, 3, sep='-')",
        correctOutput: "1-2-3",
        outputChoices: ["1-2-3", "1 2 3", "123", "1, 2, 3"],
        explanation: "The sep parameter in print() replaces the default space separator with the specified string. Here, sep='-' places dashes between each argument.",
        conceptLink: "https://docs.python.org/3/library/functions.html#print"
    },
    {
        id: "t1t-division-types",
        tier: 1,
        tags: ["arithmetic", "division", "operators"],
        title: "Integer vs Float Division",
        code: "print(7 // 2)\nprint(7 / 2)",
        correctOutput: "3\n3.5",
        outputChoices: ["3\n3.5", "3.5\n3.5", "3\n3", "3.5\n3"],
        explanation: "The // operator performs floor division (returns an integer), while / performs true division (returns a float). 7 // 2 = 3 and 7 / 2 = 3.5.",
        conceptLink: "https://docs.python.org/3/library/operator.html"
    },
    {
        id: "t1t-string-ops",
        tier: 1,
        tags: ["strings", "concatenation", "repetition"],
        title: "String Concatenation and Repetition",
        code: "word = 'Py'\nprint(word + 'thon')\nprint(word * 3)",
        correctOutput: "Python\nPyPyPy",
        outputChoices: ["Python\nPyPyPy", "Python\nPy3", "Py thon\nPyPyPy", "Python\n'Py''Py''Py'"],
        explanation: "The + operator concatenates strings ('Py' + 'thon' = 'Python'), while * repeats a string ('Py' * 3 = 'PyPyPy').",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
    },
    {
        id: "t1t-bool-arithmetic",
        tier: 1,
        tags: ["boolean", "arithmetic", "type-coercion"],
        title: "Boolean Values in Arithmetic",
        code: "result = True + True + False\nprint(result)",
        correctOutput: "2",
        outputChoices: ["2", "True", "1", "TrueTrueFalse"],
        explanation: "In arithmetic contexts, True is treated as 1 and False as 0. Therefore, True + True + False equals 1 + 1 + 0 = 2.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-type-bool"
    },
    {
        id: "t1t-type-function",
        tier: 1,
        tags: ["type", "built-in-functions"],
        title: "Type Function Returns",
        code: "x = 42\nprint(type(x))",
        correctOutput: "<class 'int'>",
        outputChoices: ["<class 'int'>", "int", "42", "<type 'int'>"],
        explanation: "The type() function returns the class object representing the type of the argument. For an integer, it returns <class 'int'>.",
        conceptLink: "https://docs.python.org/3/library/functions.html#type"
    },
    {
        id: "t1t-multiline-string",
        tier: 1,
        tags: ["strings", "escape-sequences"],
        title: "Newline Escape Sequence",
        code: "message = 'Hello\\nWorld'\nprint(message)",
        correctOutput: "Hello\nWorld",
        outputChoices: ["Hello\nWorld", "Hello\\nWorld", "HelloWorld", "Hello World"],
        explanation: "The \\n escape sequence represents a newline character, causing the text after it to appear on a new line when printed.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1t-modulo-operator",
        tier: 1,
        tags: ["arithmetic", "modulo", "operators"],
        title: "Modulo Operator",
        code: "print(17 % 5)\nprint(20 % 4)",
        correctOutput: "2\n0",
        outputChoices: ["2\n0", "3\n5", "2\n4", "3.4\n5.0"],
        explanation: "The % operator returns the remainder of division. 17 % 5 = 2 (17 divided by 5 leaves remainder 2), and 20 % 4 = 0 (divides evenly).",
        conceptLink: "https://docs.python.org/3/library/operator.html"
    },
    {
        id: "t1t-string-indexing",
        tier: 1,
        tags: ["strings", "indexing"],
        title: "String Character Access",
        code: "word = 'Python'\nprint(word[0])\nprint(word[3])",
        correctOutput: "P\nh",
        outputChoices: ["P\nh", "P\nt", "y\nh", "P\ny"],
        explanation: "String indexing starts at 0. word[0] returns the first character 'P', and word[3] returns the fourth character 'h'.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str"
    },
    {
        id: "t1t-comparison-bool",
        tier: 1,
        tags: ["comparison", "boolean", "operators"],
        title: "Comparison Returns Boolean",
        code: "x = 5\ny = 10\nprint(x < y)\nprint(x == y)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "5\n10", "1\n0", "False\nTrue"],
        explanation: "Comparison operators return boolean values. Since 5 < 10 is true and 5 == 10 is false, we get True and False respectively.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#comparisons"
    },
    {
        id: "t1t-mixed-arithmetic",
        tier: 1,
        tags: ["arithmetic", "int", "float", "type-coercion"],
        title: "Integer and Float Mixed Math",
        code: "result = 10 + 3.5\nprint(result)\nprint(type(result))",
        correctOutput: "13.5\n<class 'float'>",
        outputChoices: ["13.5\n<class 'float'>", "13\n<class 'int'>", "13.5\n<class 'int'>", "14\n<class 'float'>"],
        explanation: "When integers and floats are mixed in arithmetic, Python converts the result to a float. 10 + 3.5 = 13.5 (a float).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex"
    }
];
