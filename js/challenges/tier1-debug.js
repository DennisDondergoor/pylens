/**
 * PyLens - Tier 1 Debug Challenges
 * Level 1: Absolute Basics - Simple syntax and logic errors
 */

window.TIER1_DEBUG = [
    {
        id: "t1d-print-parentheses",
        tier: 1,
        tags: ["syntax", "print", "python3"],
        title: "Print Statement Issue",
        code: "name = 'Alice'\nage = 25\nprint 'Name:', name\nprint('Age:', age)",
        bugLine: 3,
        bugDescription: "Python 3 requires parentheses for print function",
        bugChoices: [
            "print requires parentheses in Python 3",
            "Missing quotation marks around the string",
            "Variable name is not defined",
            "Need to use f-string formatting"
        ],
        correctBugChoice: 0,
        fixedCode: "name = 'Alice'\nage = 25\nprint('Name:', name)\nprint('Age:', age)",
        explanation: "In Python 3, print is a function and requires parentheses: print(). In Python 2, print was a statement and didn't need parentheses. This is one of the most common migration issues when moving from Python 2 to Python 3.",
        conceptLink: "https://docs.python.org/3/whatsnew/3.0.html#print-is-a-function"
    },
    {
        id: "t1d-exponent-operator",
        tier: 1,
        tags: ["operators", "arithmetic", "exponentiation"],
        title: "Wrong Power Operator",
        code: "radius = 5\narea = 3.14 * radius * 2\nprint('Circle area:', area)",
        bugLine: 2,
        bugDescription: "Should use ** for exponentiation, not * 2",
        bugChoices: [
            "Should use ** for exponentiation (radius ** 2), not multiply by 2",
            "Missing parentheses around the multiplication",
            "Variable radius is not defined correctly",
            "The value of pi should be more precise"
        ],
        correctBugChoice: 0,
        fixedCode: "radius = 5\narea = 3.14 * radius ** 2\nprint('Circle area:', area)",
        explanation: "The exponentiation operator in Python is **, not ^. The formula for circle area is π * r², which requires radius ** 2 (radius squared), not radius * 2 (radius times two). Multiplying by 2 gives the diameter, not the area.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#the-power-operator"
    },
    {
        id: "t1d-string-int-concat",
        tier: 1,
        tags: ["strings", "type-error", "concatenation"],
        title: "Type Mismatch in Concatenation",
        code: "score = 95\nmessage = 'Your score is: ' + score\nprint(message)",
        bugLine: 2,
        bugDescription: "Cannot concatenate string and integer without conversion",
        bugChoices: [
            "Cannot concatenate string and int; need str(score) or use f-string",
            "Missing parentheses in the print statement",
            "Variable score should be a float, not an int",
            "Need to use comma instead of plus sign"
        ],
        correctBugChoice: 0,
        fixedCode: "score = 95\nmessage = 'Your score is: ' + str(score)\nprint(message)",
        explanation: "Python doesn't allow concatenating strings with integers using the + operator. You must explicitly convert the integer to a string using str(), or use alternative formatting like f-strings: f'Your score is: {score}' or format(): 'Your score is: {}'.format(score).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str"
    },
    {
        id: "t1d-assignment-vs-comparison",
        tier: 1,
        tags: ["operators", "conditionals", "syntax-error"],
        title: "Assignment in Condition",
        code: "temperature = 75\nif temperature = 80:\n    print('Hot day!')\nelse:\n    print('Nice weather')",
        bugLine: 2,
        bugDescription: "Used assignment = instead of comparison ==",
        bugChoices: [
            "Should use == for comparison, not = for assignment",
            "Missing colon after the if statement",
            "Indentation error in the print statement",
            "Variable temperature is not defined"
        ],
        correctBugChoice: 0,
        fixedCode: "temperature = 75\nif temperature == 80:\n    print('Hot day!')\nelse:\n    print('Nice weather')",
        explanation: "In Python, = is the assignment operator (assigns a value to a variable), while == is the comparison operator (tests if two values are equal). Using = in an if condition causes a SyntaxError. This is a common mistake for beginners coming from languages like C.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#comparisons"
    },
    {
        id: "t1d-typo-variable-name",
        tier: 1,
        tags: ["variables", "name-error", "typo"],
        title: "Variable Name Typo",
        code: "first_name = 'Bob'\nlast_name = 'Smith'\nfull_name = first_name + ' ' + lastname\nprint(full_name)",
        bugLine: 3,
        bugDescription: "Variable name typo: lastname should be last_name",
        bugChoices: [
            "Variable lastname is undefined; should be last_name (with underscore)",
            "Missing quotes around the space character",
            "Need to use str() to convert variables",
            "Wrong concatenation operator used"
        ],
        correctBugChoice: 0,
        fixedCode: "first_name = 'Bob'\nlast_name = 'Smith'\nfull_name = first_name + ' ' + last_name\nprint(full_name)",
        explanation: "Python variable names are case-sensitive and must match exactly. The variable was defined as last_name (with underscore), but used as lastname (no underscore) on line 3. This causes a NameError: name 'lastname' is not defined. Always double-check spelling and capitalization of variable names.",
        conceptLink: "https://docs.python.org/3/tutorial/errors.html#exceptions"
    },
    {
        id: "t1d-integer-division",
        tier: 1,
        tags: ["operators", "division", "arithmetic"],
        title: "Wrong Division Operator",
        code: "total_price = 100\nnum_people = 3\nprice_per_person = total_price // num_people\nprint('Each person pays:', price_per_person)",
        bugLine: 3,
        bugDescription: "Used floor division // instead of regular division /",
        bugChoices: [
            "Used // (floor division) which truncates; should use / for decimal result",
            "Need to convert total_price to float first",
            "Division operator is missing parentheses",
            "Variables should be in reverse order"
        ],
        correctBugChoice: 0,
        fixedCode: "total_price = 100\nnum_people = 3\nprice_per_person = total_price / num_people\nprint('Each person pays:', price_per_person)",
        explanation: "Python has two division operators: / (true division) returns a float result, while // (floor division) returns an integer by rounding down. Using // for 100 // 3 gives 33, losing the .33... remainder. For accurate financial calculations, use / to get 33.333..., then round if needed.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations"
    },
    {
        id: "t1d-order-of-operations",
        tier: 1,
        tags: ["operators", "arithmetic", "precedence"],
        title: "Missing Parentheses",
        code: "hours = 2\nminutes = 30\ntotal_minutes = hours * 60 + minutes / 60\nprint('Total hours:', total_minutes)",
        bugLine: 3,
        bugDescription: "Division happens before intended; need parentheses around (hours * 60 + minutes)",
        bugChoices: [
            "Need parentheses: (hours * 60 + minutes) / 60 due to operator precedence",
            "Should use // instead of / for division",
            "Missing multiplication operator between hours and 60",
            "Variables are in the wrong order"
        ],
        correctBugChoice: 0,
        fixedCode: "hours = 2\nminutes = 30\ntotal_minutes = (hours * 60 + minutes) / 60\nprint('Total hours:', total_minutes)",
        explanation: "Python follows mathematical operator precedence: multiplication and division happen before addition. Without parentheses, the expression calculates (hours * 60) + (minutes / 60) = 120 + 0.5 = 120.5. With parentheses (hours * 60 + minutes) / 60, it correctly calculates (120 + 30) / 60 = 2.5 hours.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#operator-precedence"
    },
    {
        id: "t1d-off-by-one-range",
        tier: 1,
        tags: ["loops", "range", "off-by-one"],
        title: "Range Off-By-One Error",
        code: "print('Counting to 5:')\nfor i in range(5):\n    print(i)\nprint('Done!')",
        bugLine: 2,
        bugDescription: "range(5) produces 0-4; should use range(1, 6) to print 1-5",
        bugChoices: [
            "range(5) gives 0-4; should use range(1, 6) to print 1 through 5",
            "Missing colon after the for statement",
            "Variable i is not defined",
            "Need to use range(0, 5) instead"
        ],
        correctBugChoice: 0,
        fixedCode: "print('Counting to 5:')\nfor i in range(1, 6):\n    print(i)\nprint('Done!')",
        explanation: "range(5) generates numbers from 0 to 4 (5 numbers total, but stops before 5). To count from 1 to 5 inclusive, use range(1, 6) which starts at 1 and stops before 6. The range function follows the pattern range(start, stop) where stop is exclusive. This is a classic off-by-one error.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#range"
    },
    {
        id: "t1d-escape-sequence",
        tier: 1,
        tags: ["strings", "escape-sequences", "syntax"],
        title: "Invalid Escape Sequence",
        code: "file_path = 'C:\\users\\data\\new_file.txt'\nprint('File location:', file_path)",
        bugLine: 1,
        bugDescription: "\\n is interpreted as newline; use raw string r'...' or escape backslashes \\\\",
        bugChoices: [
            "\\n is treated as newline escape; use raw string r'C:\\users\\...' or double backslashes",
            "Missing quotes around the file path",
            "Should use forward slashes instead of any backslashes",
            "Variable file_path is not a valid name"
        ],
        correctBugChoice: 0,
        fixedCode: "file_path = r'C:\\users\\data\\new_file.txt'\nprint('File location:', file_path)",
        explanation: "In Python strings, backslash \\ starts escape sequences: \\n is newline, \\t is tab. In the path C:\\users\\data\\new_file.txt, \\n becomes a newline character. Solutions: use raw strings r'C:\\users\\...' (treats backslashes literally), double backslashes 'C:\\\\users\\\\...', or forward slashes 'C:/users/...' (Windows accepts both).",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1d-type-comparison",
        tier: 1,
        tags: ["types", "comparison", "string-vs-int"],
        title: "Comparing Different Types",
        code: "user_input = '42'\nexpected = 42\nif user_input == expected:\n    print('Correct!')\nelse:\n    print('Wrong answer')",
        bugLine: 3,
        bugDescription: "Comparing string '42' with int 42; convert with int(user_input)",
        bugChoices: [
            "Comparing string '42' with int 42; need int(user_input) to convert",
            "Using wrong comparison operator, should use is",
            "Missing colon after if statement",
            "Variables are in wrong order"
        ],
        correctBugChoice: 0,
        fixedCode: "user_input = '42'\nexpected = 42\nif int(user_input) == expected:\n    print('Correct!')\nelse:\n    print('Wrong answer')",
        explanation: "In Python, '42' (string) and 42 (integer) are different types and not equal when compared with ==. This commonly occurs with user input, which is always a string. Convert the string to an integer using int(user_input) before comparison. Note: Python 3 allows comparing different types with ==, but they're never equal.",
        conceptLink: "https://docs.python.org/3/library/functions.html#int"
    }
];
