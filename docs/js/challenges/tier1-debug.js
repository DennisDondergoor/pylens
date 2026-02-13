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
    },
    {
        id: "t1d-indentation-error",
        tier: 1,
        tags: ["syntax", "indentation", "whitespace"],
        title: "Inconsistent Indentation",
        code: "x = 10\nif x > 5:\n    print('x is large')\n  print('Still in if block')",
        bugLine: 4,
        bugDescription: "Inconsistent indentation: must use same number of spaces",
        bugChoices: [
            "Inconsistent indentation (2 spaces vs 4 spaces); Python requires consistent indentation",
            "Missing colon after if statement",
            "Variable x is not defined",
            "print statement syntax is incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "x = 10\nif x > 5:\n    print('x is large')\n    print('Still in if block')",
        explanation: "Python uses indentation to define code blocks. All statements in the same block must have identical indentation. Line 4 uses 2 spaces while line 3 uses 4 spaces, causing an IndentationError. Consistently use 4 spaces (PEP 8 recommendation) or tabs throughout your code, never mix them.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#indentation"
    },
    {
        id: "t1d-missing-colon",
        tier: 1,
        tags: ["syntax", "conditionals", "colon"],
        title: "Missing Colon After If",
        code: "age = 18\nif age >= 18\n    print('You can vote')\nelse:\n    print('Too young')",
        bugLine: 2,
        bugDescription: "Missing colon : at end of if statement",
        bugChoices: [
            "Missing colon : at the end of the if statement",
            "Wrong comparison operator used",
            "Variable age is not defined",
            "Indentation is incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "age = 18\nif age >= 18:\n    print('You can vote')\nelse:\n    print('Too young')",
        explanation: "Python requires a colon : at the end of compound statements (if, elif, else, for, while, def, class). The colon signals the start of an indented block. Forgetting the colon is a common syntax error that Python will catch immediately when you run the code.",
        conceptLink: "https://docs.python.org/3/reference/compound_stmts.html"
    },
    {
        id: "t1d-boolean-string",
        tier: 1,
        tags: ["booleans", "strings", "type-error"],
        title: "Boolean as String",
        code: "is_ready = 'True'\nif is_ready:\n    print('Starting process...')",
        bugLine: 1,
        bugDescription: "String 'True' is not boolean True; any non-empty string is truthy",
        bugChoices: [
            "String 'True' is always truthy; use boolean True without quotes",
            "Missing parentheses around True",
            "Variable name cannot start with is_",
            "if statement syntax is incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "is_ready = True\nif is_ready:\n    print('Starting process...')",
        explanation: "In Python, 'True' (string) and True (boolean) are different. Any non-empty string is truthy, so 'True' and even 'False' both evaluate to True in conditions. Use boolean literals True and False without quotes. This mistake often occurs when reading configuration values without proper type conversion.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#truth-value-testing"
    },
    {
        id: "t1d-modulo-vs-divide",
        tier: 1,
        tags: ["operators", "arithmetic", "modulo"],
        title: "Wrong Operator for Remainder",
        code: "number = 17\nremainder = number / 5\nprint('Remainder:', remainder)",
        bugLine: 2,
        bugDescription: "Division / gives quotient; use modulo % for remainder",
        bugChoices: [
            "Division / returns quotient (3.4); use modulo % to get remainder (2)",
            "Need to use // instead of /",
            "Missing parentheses around the division",
            "Variable number must be a float"
        ],
        correctBugChoice: 0,
        fixedCode: "number = 17\nremainder = number % 5\nprint('Remainder:', remainder)",
        explanation: "The modulo operator % returns the remainder after division: 17 % 5 = 2 (because 17 = 5 * 3 + 2). The division operator / returns the full quotient: 17 / 5 = 3.4. Use % when you need to check divisibility, find remainders, or cycle through values.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations"
    },
    {
        id: "t1d-string-quotes-mismatch",
        tier: 1,
        tags: ["strings", "syntax", "quotes"],
        title: "Mismatched String Quotes",
        code: "greeting = 'Hello, World!\"\nprint(greeting)",
        bugLine: 1,
        bugDescription: "String starts with single quote but ends with double quote",
        bugChoices: [
            "String starts with ' but ends with \"; quotes must match",
            "Missing comma in the string",
            "Variable name greeting is invalid",
            "Need to use triple quotes for strings"
        ],
        correctBugChoice: 0,
        fixedCode: "greeting = 'Hello, World!'\nprint(greeting)",
        explanation: "Python strings must start and end with matching quotes: both single ('...') or both double (\"...\"). Mixing quote types causes a SyntaxError. You can use single quotes inside double-quoted strings and vice versa: \"It's working\" or 'She said \"hi\"', or use escape sequences.",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1d-xor-operator",
        tier: 1,
        tags: ["operators", "arithmetic", "bitwise"],
        title: "Wrong XOR Operator",
        code: "base = 2\nexponent = 3\nresult = base ^ exponent\nprint('2 to the power of 3:', result)",
        bugLine: 3,
        bugDescription: "^ is XOR, not exponentiation; use ** for power",
        bugChoices: [
            "^ is bitwise XOR, not exponentiation; use ** for power (2 ** 3 = 8)",
            "Missing parentheses around the operation",
            "Variables are in wrong order",
            "Should use base * exponent instead"
        ],
        correctBugChoice: 0,
        fixedCode: "base = 2\nexponent = 3\nresult = base ** exponent\nprint('2 to the power of 3:', result)",
        explanation: "In Python, ^ is the bitwise XOR operator, not exponentiation. This confuses programmers from languages like Ruby or Excel where ^ means power. In Python, ** is the exponentiation operator: 2 ** 3 = 8. The expression 2 ^ 3 performs XOR and returns 1, not 8.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#the-power-operator"
    },
    {
        id: "t1d-undefined-variable",
        tier: 1,
        tags: ["variables", "name-error", "scope"],
        title: "Using Variable Before Definition",
        code: "print('Total:', total)\ntotal = 100 + 50",
        bugLine: 1,
        bugDescription: "Variable total used before assignment",
        bugChoices: [
            "Variable total is used before being defined; move assignment before print",
            "Missing quotes around the word total",
            "print statement syntax is incorrect",
            "Need to use str(total) for conversion"
        ],
        correctBugChoice: 0,
        fixedCode: "total = 100 + 50\nprint('Total:', total)",
        explanation: "Python executes code line by line from top to bottom. Variables must be defined (assigned a value) before they can be used. Attempting to use an undefined variable raises NameError: name 'total' is not defined. Always ensure variables are initialized before use.",
        conceptLink: "https://docs.python.org/3/tutorial/errors.html#exceptions"
    },
    {
        id: "t1d-float-int-confusion",
        tier: 1,
        tags: ["types", "type-conversion", "float"],
        title: "Integer When Float Expected",
        code: "celsius = 20\nfahrenheit = celsius * 9 / 5 + 32\nprint('Temperature:', int(fahrenheit), 'F')",
        bugLine: 3,
        bugDescription: "Converting to int loses decimal precision; keep as float",
        bugChoices: [
            "int() truncates decimal part; remove int() to keep precision (68.0 not 68)",
            "Wrong formula for temperature conversion",
            "Missing parentheses in the calculation",
            "Variable celsius should be a string"
        ],
        correctBugChoice: 0,
        fixedCode: "celsius = 20\nfahrenheit = celsius * 9 / 5 + 32\nprint('Temperature:', fahrenheit, 'F')",
        explanation: "Converting a float to int with int() truncates the decimal part. For 20°C, the correct result is 68.0°F. Using int(68.0) gives 68, which is mathematically correct here, but for other values like 21°C (69.8°F), int() would incorrectly give 69 instead of 69.8. Keep float values unless you specifically need integers.",
        conceptLink: "https://docs.python.org/3/library/functions.html#int"
    },
    {
        id: "t1d-and-vs-ampersand",
        tier: 1,
        tags: ["operators", "boolean", "logical"],
        title: "Bitwise AND Instead of Logical",
        code: "age = 25\nhas_license = True\nif age >= 18 & has_license:\n    print('Can drive')",
        bugLine: 3,
        bugDescription: "& is bitwise AND; use logical and for boolean conditions",
        bugChoices: [
            "& is bitwise AND; use 'and' keyword for logical boolean operations",
            "Missing colon after if statement",
            "Wrong comparison operator used",
            "Variable has_license should be a string"
        ],
        correctBugChoice: 0,
        fixedCode: "age = 25\nhas_license = True\nif age >= 18 and has_license:\n    print('Can drive')",
        explanation: "Python has separate logical and bitwise operators. For boolean logic, use keywords: 'and', 'or', 'not'. Bitwise operators (&, |, ~) work on integers at the bit level. Using & for boolean conditions may work sometimes but can produce unexpected results. Always use 'and' for logical conditions.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#boolean-operations"
    },
    {
        id: "t1d-string-multiplication",
        tier: 1,
        tags: ["strings", "operators", "repetition"],
        title: "String Addition Instead of Multiplication",
        code: "char = '-'\nseparator = char + 20\nprint(separator)",
        bugLine: 2,
        bugDescription: "Cannot add string and int; use * for string repetition",
        bugChoices: [
            "Cannot concatenate string and int; use char * 20 to repeat string 20 times",
            "Missing parentheses around the addition",
            "Variable char should be an integer",
            "Need to use str(20) for conversion"
        ],
        correctBugChoice: 0,
        fixedCode: "char = '-'\nseparator = char * 20\nprint(separator)",
        explanation: "In Python, string * int repeats the string: '-' * 20 gives '--------------------'. You cannot add a string and integer with +, which causes TypeError. The * operator has special behavior with strings for repetition, making it easy to create repeated patterns.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t1d-not-equals",
        tier: 1,
        tags: ["operators", "comparison", "inequality"],
        title: "Wrong Inequality Operator",
        code: "status = 'inactive'\nif status <> 'active':\n    print('Not active')",
        bugLine: 2,
        bugDescription: "<> is not valid in Python 3; use != for not equals",
        bugChoices: [
            "<> is invalid in Python 3; use != for not equals comparison",
            "Missing quotes around active",
            "Variable status is not defined",
            "Should use == instead of <>"
        ],
        correctBugChoice: 0,
        fixedCode: "status = 'inactive'\nif status != 'active':\n    print('Not active')",
        explanation: "Python 3 uses != for inequality (not equal) comparison. The <> operator was available in Python 2 but removed in Python 3. This causes a SyntaxError. Always use != to test if two values are not equal. Some programmers from other languages mistakenly use <> or =/=.",
        conceptLink: "https://docs.python.org/3/whatsnew/3.0.html#removed-syntax"
    },
    {
        id: "t1d-missing-quotes",
        tier: 1,
        tags: ["strings", "syntax", "quotes"],
        title: "String Without Quotes",
        code: "city = New York\nprint('Location:', city)",
        bugLine: 1,
        bugDescription: "String must be enclosed in quotes",
        bugChoices: [
            "String literals must be enclosed in quotes: 'New York' or \"New York\"",
            "Variable name cannot contain spaces",
            "Missing comma between New and York",
            "Need to use city = str(New York)"
        ],
        correctBugChoice: 0,
        fixedCode: "city = 'New York'\nprint('Location:', city)",
        explanation: "In Python, all string literals must be enclosed in quotes (single or double). Without quotes, Python treats New and York as variable names, causing a SyntaxError. This is a fundamental syntax requirement. Always wrap text in quotes: 'text' or \"text\".",
        conceptLink: "https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals"
    },
    {
        id: "t1d-wrong-string-repeat",
        tier: 1,
        tags: ["strings", "operators", "types"],
        title: "Wrong Repetition Operator",
        code: "separator = '-'\nwidth = 20\nbanner = separator + width\nprint(banner)",
        bugLine: 3,
        bugDescription: "Using + instead of * to repeat a string; + requires both operands to be strings",
        bugChoices: [
            "Cannot use + between a string and int; use * to repeat a string (separator * width)",
            "The variable width should be a string '20' instead of an integer",
            "The print function cannot display strings created with concatenation",
            "The separator variable needs to be longer than one character"
        ],
        correctBugChoice: 0,
        fixedCode: "separator = '-'\nwidth = 20\nbanner = separator * width\nprint(banner)",
        explanation: "The + operator between a string and an integer raises a TypeError. To repeat a string, use the * operator: '-' * 20 produces '--------------------'. The + operator for strings only works when both sides are strings (concatenation).",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t1d-type-function-call",
        tier: 1,
        tags: ["types", "functions", "type-checking"],
        title: "Missing Parentheses on type()",
        code: "value = 42\ndata_type = type value\nprint('Type:', data_type)",
        bugLine: 2,
        bugDescription: "type() is a function and requires parentheses: type(value)",
        bugChoices: [
            "type is a function requiring parentheses: type(value), not type value",
            "Variable value is not defined",
            "Should use typeof instead of type",
            "Missing quotes around value"
        ],
        correctBugChoice: 0,
        fixedCode: "value = 42\ndata_type = type(value)\nprint('Type:', data_type)",
        explanation: "In Python, all functions must be called with parentheses, even if they take no arguments: type(value), len(list), print(). Unlike some languages where parentheses are optional, Python requires them for all function calls. The type() function returns the type of an object.",
        conceptLink: "https://docs.python.org/3/library/functions.html#type"
    },
    {
        id: "t1d-case-sensitivity",
        tier: 1,
        tags: ["booleans", "syntax", "case-sensitive"],
        title: "Boolean Case Sensitivity",
        code: "is_valid = true\nif is_valid:\n    print('Valid input')",
        bugLine: 1,
        bugDescription: "Python is case-sensitive; use True not true",
        bugChoices: [
            "Boolean must be capitalized: True not true (Python is case-sensitive)",
            "Variable name is_valid is invalid",
            "Missing quotes around true",
            "Should use is_valid = 1 instead"
        ],
        correctBugChoice: 0,
        fixedCode: "is_valid = True\nif is_valid:\n    print('Valid input')",
        explanation: "Python is case-sensitive and boolean literals must be capitalized: True and False, not true/false. Using lowercase true raises NameError: name 'true' is not defined. This is a common mistake for programmers coming from JavaScript, Java, or other languages that use lowercase booleans.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#boolean-values"
    }
];
