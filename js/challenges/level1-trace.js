// PyLens Level 1 Trace Challenges: Absolute Basics
// Topics: print output, basic arithmetic, strings, booleans, type()

window.LEVEL1_TRACE = [
    {
        id: "t1t-print-sep",
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
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
        level: 1,
        tags: ["arithmetic", "int", "float", "type-coercion"],
        title: "Integer and Float Mixed Math",
        code: "result = 10 + 3.5\nprint(result)\nprint(type(result))",
        correctOutput: "13.5\n<class 'float'>",
        outputChoices: ["13.5\n<class 'float'>", "13\n<class 'int'>", "13.5\n<class 'int'>", "14\n<class 'float'>"],
        explanation: "When integers and floats are mixed in arithmetic, Python converts the result to a float. 10 + 3.5 = 13.5 (a float).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex"
    },
    {
        id: "t1t-exponentiation",
        level: 1,
        tags: ["arithmetic", "operators", "exponentiation"],
        title: "Power Operator",
        code: "print(2 ** 3)\nprint(5 ** 2)",
        correctOutput: "8\n25",
        outputChoices: ["8\n25", "6\n10", "9\n25", "8\n10"],
        explanation: "The ** operator performs exponentiation. 2 ** 3 means 2 to the power of 3 (2 * 2 * 2 = 8), and 5 ** 2 means 5 squared (25).",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#the-power-operator"
    },
    {
        id: "t1t-string-length",
        level: 1,
        tags: ["strings", "len", "built-in-functions"],
        title: "String Length Function",
        code: "text = 'Hello'\nprint(len(text))",
        correctOutput: "5",
        outputChoices: ["5", "4", "6", "Hello"],
        explanation: "The len() function returns the number of characters in a string. 'Hello' contains 5 characters, so len(text) returns 5.",
        conceptLink: "https://docs.python.org/3/library/functions.html#len"
    },
    {
        id: "t1t-string-methods",
        level: 1,
        tags: ["strings", "methods", "upper-lower"],
        title: "String Case Conversion",
        code: "word = 'Python'\nprint(word.upper())\nprint(word.lower())",
        correctOutput: "PYTHON\npython",
        outputChoices: ["PYTHON\npython", "python\nPYTHON", "Python\nPython", "PYTHON\nPYTHON"],
        explanation: "The .upper() method converts all characters to uppercase, while .lower() converts all to lowercase. The original string remains unchanged.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#string-methods"
    },
    {
        id: "t1t-print-end",
        level: 1,
        tags: ["print", "end-parameter"],
        title: "Print with Custom Ending",
        code: "print('Hello', end='!')\nprint('World')",
        correctOutput: "Hello!World",
        outputChoices: ["Hello!World", "Hello!\nWorld", "Hello World!", "Hello! World"],
        explanation: "The end parameter in print() replaces the default newline with the specified string. end='!' makes the second print start immediately after the '!'.",
        conceptLink: "https://docs.python.org/3/library/functions.html#print"
    },
    {
        id: "t1t-negative-numbers",
        level: 1,
        tags: ["arithmetic", "operators", "negation"],
        title: "Negative Number Operations",
        code: "x = -5\nprint(x * 2)\nprint(abs(x))",
        correctOutput: "-10\n5",
        outputChoices: ["-10\n5", "10\n5", "-10\n-5", "10\n-5"],
        explanation: "Multiplying -5 by 2 gives -10. The abs() function returns the absolute value, converting -5 to 5.",
        conceptLink: "https://docs.python.org/3/library/functions.html#abs"
    },
    {
        id: "t1t-string-quotes",
        level: 1,
        tags: ["strings", "quotes", "escape-sequences"],
        title: "Quotes Inside Strings",
        code: "text = \"It's Python\"\nprint(text)",
        correctOutput: "It's Python",
        outputChoices: ["It's Python", "It\\'s Python", "Its Python", "Error"],
        explanation: "Using double quotes to wrap a string allows single quotes inside without escaping. The string prints exactly as written: It's Python.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1t-operator-precedence",
        level: 1,
        tags: ["arithmetic", "operators", "precedence"],
        title: "Order of Operations",
        code: "result = 2 + 3 * 4\nprint(result)",
        correctOutput: "14",
        outputChoices: ["14", "20", "24", "11"],
        explanation: "Multiplication has higher precedence than addition. Python calculates 3 * 4 = 12 first, then 2 + 12 = 14.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#operator-precedence"
    },
    {
        id: "t1t-logical-and",
        level: 1,
        tags: ["boolean", "logical-operators", "and"],
        title: "Logical AND Operator",
        code: "print(True and True)\nprint(True and False)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "True\nTrue", "False\nFalse"],
        explanation: "The 'and' operator returns True only if both operands are True. True and True is True, but True and False is False.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not"
    },
    {
        id: "t1t-logical-or",
        level: 1,
        tags: ["boolean", "logical-operators", "or"],
        title: "Logical OR Operator",
        code: "print(False or True)\nprint(False or False)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "True\nTrue", "False\nFalse"],
        explanation: "The 'or' operator returns True if at least one operand is True. False or True is True, but False or False is False.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not"
    },
    {
        id: "t1t-string-format",
        level: 1,
        tags: ["strings", "f-strings", "formatting"],
        title: "F-String Formatting",
        code: "name = 'Alice'\nage = 30\nprint(f'{name} is {age}')",
        correctOutput: "Alice is 30",
        outputChoices: ["Alice is 30", "{name} is {age}", "Alice30", "name is age"],
        explanation: "F-strings (formatted string literals) allow embedding expressions inside strings using curly braces. {name} and {age} are replaced with their values.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#f-strings"
    },
    {
        id: "t1t-int-conversion",
        level: 1,
        tags: ["type-conversion", "int", "float"],
        title: "Float to Integer Conversion",
        code: "x = 7.9\nprint(int(x))\nprint(type(int(x)))",
        correctOutput: "7\n<class 'int'>",
        outputChoices: ["7\n<class 'int'>", "8\n<class 'int'>", "7.9\n<class 'float'>", "8\n<class 'float'>"],
        explanation: "The int() function truncates (doesn't round) the decimal part. 7.9 becomes 7, and the result type is int.",
        conceptLink: "https://docs.python.org/3/library/functions.html#int"
    },
    {
        id: "t1t-str-conversion",
        level: 1,
        tags: ["type-conversion", "str", "concatenation"],
        title: "Number to String Conversion",
        code: "num = 42\ntext = 'The answer is ' + str(num)\nprint(text)",
        correctOutput: "The answer is 42",
        outputChoices: ["The answer is 42", "The answer is num", "Error", "The answer is '42'"],
        explanation: "You cannot concatenate strings and numbers directly. str(num) converts 42 to the string '42', allowing concatenation with 'The answer is '.",
        conceptLink: "https://docs.python.org/3/library/functions.html#func-str"
    },
    {
        id: "t1t-not-operator",
        level: 1,
        tags: ["boolean", "logical-operators", "not"],
        title: "Logical NOT Operator",
        code: "value = True\nprint(not value)\nprint(not False)",
        correctOutput: "False\nTrue",
        outputChoices: ["False\nTrue", "True\nFalse", "False\nFalse", "True\nTrue"],
        explanation: "The 'not' operator inverts a boolean value. not True becomes False, and not False becomes True.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not"
    },
    {
        id: "t1t-tab-escape",
        level: 1,
        tags: ["strings", "escape-sequences", "tab"],
        title: "Tab Escape Sequence",
        code: "print('Name:\\tAlice')\nprint('Age:\\t25')",
        correctOutput: "Name:\tAlice\nAge:\t25",
        outputChoices: ["Name:\tAlice\nAge:\t25", "Name:tAlice\nAge:t25", "Name: Alice\nAge: 25", "Name:\\tAlice\\nAge:\\t25"],
        explanation: "The \\t escape sequence inserts a tab character, creating consistent spacing. Both lines have a tab between the label and value.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1t-chained-comparison",
        level: 1,
        tags: ["comparison", "operators", "boolean"],
        title: "Chained Comparison",
        code: "x = 15\nprint(10 < x < 20)\nprint(20 < x < 30)",
        correctOutput: "True\nFalse",
        outputChoices: ["True\nFalse", "False\nTrue", "True\nTrue", "False\nFalse"],
        explanation: "Python allows chained comparisons. 10 < 15 < 20 checks if 15 is between 10 and 20 (True). 20 < 15 < 30 is False because 15 is not greater than 20.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#comparisons"
    }
];
