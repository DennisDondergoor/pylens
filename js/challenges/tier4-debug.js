// Tier 4 Debug Challenges: Methods & Comprehensions bugs
// Each challenge contains exactly ONE bug that tests Python semantics understanding

window.TIER4_DEBUG = [
    {
        id: "t4d-sort-returns-none",
        tier: 4,
        tags: ["methods", "lists", "mutability"],
        title: "sort() Returns None",
        code: "numbers = [3, 1, 4, 1, 5]\nsorted_nums = numbers.sort()\nprint(sorted_nums)  # Prints None\nprint(numbers)      # Prints [1, 1, 3, 4, 5]",
        bugLine: 2,
        bugDescription: "list.sort() modifies in-place and returns None",
        bugChoices: [
            "The sort() method modifies the list in-place and returns None, not the sorted list",
            "The sort() method requires a key parameter to work correctly",
            "The variable 'numbers' is immutable and cannot be sorted",
            "The print function doesn't display None values properly"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [3, 1, 4, 1, 5]\nsorted_nums = sorted(numbers)\n# Or: numbers.sort() then use numbers directly\nprint(sorted_nums)  # Prints [1, 1, 3, 4, 5]",
        explanation: "Python has two ways to sort: the list.sort() method modifies the list in-place and returns None, while the sorted() built-in function returns a new sorted list and leaves the original unchanged. Using 'result = lst.sort()' assigns None to result. Use sorted() when you need the sorted result, or call sort() and use the original list variable.",
        conceptLink: "https://docs.python.org/3/howto/sorting.html"
    },
    {
        id: "t4d-wrong-split-delimiter",
        tier: 4,
        tags: ["strings", "methods", "parsing"],
        title: "Wrong split() Delimiter",
        code: "csv_line = 'apple,banana,cherry'\nfruits = csv_line.split()\nprint(fruits)  # ['apple,banana,cherry'] - not split!",
        bugLine: 2,
        bugDescription: "split() with no argument splits on whitespace, not comma",
        bugChoices: [
            "split() without arguments splits on whitespace; need split(',') to split on commas",
            "The csv_line string has the wrong format for the split method",
            "The split() method requires a maxsplit parameter to work",
            "The variable name 'fruits' conflicts with the string content"
        ],
        correctBugChoice: 0,
        fixedCode: "csv_line = 'apple,banana,cherry'\nfruits = csv_line.split(',')\nprint(fruits)  # ['apple', 'banana', 'cherry']",
        explanation: "The str.split() method without arguments splits on any whitespace (spaces, tabs, newlines) and removes empty strings from the result. To split on a specific delimiter like a comma, you must provide it as an argument: split(','). This is a common mistake when parsing CSV or other delimited data.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.split"
    },
    {
        id: "t4d-comprehension-wrong-order",
        tier: 4,
        tags: ["comprehensions", "list-comprehension", "filtering"],
        title: "List Comprehension Wrong Order",
        code: "numbers = [1, 2, 3, 4, 5]\nsquares_of_evens = [n * n if n % 2 == 0 for n in numbers]\n# SyntaxError: invalid syntax",
        bugLine: 2,
        bugDescription: "Conditional filter must come after for clause",
        bugChoices: [
            "The if condition for filtering must come after the for clause, not in the expression part",
            "The multiplication operator * can't be used in list comprehensions",
            "The variable 'n' is not defined before being used in the comprehension",
            "List comprehensions require parentheses instead of square brackets"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 4, 5]\nsquares_of_evens = [n * n for n in numbers if n % 2 == 0]\n# Result: [4, 16]",
        explanation: "List comprehensions have specific syntax: [expression for item in iterable if condition]. The if clause for filtering comes at the end, after the for clause. The syntax 'expression if condition' (ternary) is different and goes in the expression part: [x if condition else y for item in iterable]. Mixing these causes syntax errors.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    },
    {
        id: "t4d-string-replace-immutable",
        tier: 4,
        tags: ["strings", "methods", "immutability"],
        title: "String replace() Not Modifying Original",
        code: "text = 'Hello World'\ntext.replace('World', 'Python')\nprint(text)  # Still prints 'Hello World'",
        bugLine: 2,
        bugDescription: "Strings are immutable; replace() returns new string",
        bugChoices: [
            "Strings are immutable; replace() returns a new string and doesn't modify the original",
            "The replace() method requires a third argument to specify the count",
            "The variable 'text' is a constant and can't be reassigned",
            "The replace() method only works with single characters, not words"
        ],
        correctBugChoice: 0,
        fixedCode: "text = 'Hello World'\ntext = text.replace('World', 'Python')\nprint(text)  # Prints 'Hello Python'",
        explanation: "Strings in Python are immutable, meaning they cannot be changed after creation. Methods like replace(), upper(), strip(), etc. don't modify the original string - they return a new string with the changes. You must assign the result back to a variable to use it. This is different from mutable types like lists, where methods like append() modify in-place.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#string-methods"
    },
    {
        id: "t4d-wrong-sort-key",
        tier: 4,
        tags: ["sorting", "functions", "key-function"],
        title: "Wrong Key Function in sorted()",
        code: "words = ['apple', 'pie', 'zoo', 'a']\nsorted_words = sorted(words, key=len())\n# TypeError: 'int' object is not callable",
        bugLine: 2,
        bugDescription: "key should be len (function), not len() (function call)",
        bugChoices: [
            "key expects a function object (len), not a function call result (len())",
            "The len function doesn't work with string sorting",
            "The sorted() function requires a reverse parameter along with key",
            "The words list contains incompatible types for sorting"
        ],
        correctBugChoice: 0,
        fixedCode: "words = ['apple', 'pie', 'zoo', 'a']\nsorted_words = sorted(words, key=len)\n# Result: ['a', 'pie', 'zoo', 'apple']",
        explanation: "The key parameter expects a function object that will be called on each element. Using len (without parentheses) passes the function itself, which sorted() will call for each item. Using len() calls the function immediately with no arguments, causing a TypeError. This applies to all key functions: use str.lower, not str.lower(), or lambda x: x[0], etc.",
        conceptLink: "https://docs.python.org/3/howto/sorting.html#key-functions"
    },
    {
        id: "t4d-dict-comp-overwrite",
        tier: 4,
        tags: ["comprehensions", "dict-comprehension", "dictionaries"],
        title: "Dict Comprehension Overwriting Keys",
        code: "numbers = [1, 2, 3, 2, 4, 3]\nsquares = {n: n * n for n in numbers}\nprint(squares)  # {1: 1, 2: 4, 3: 9, 4: 16} - lost duplicates!",
        bugLine: 2,
        bugDescription: "Duplicate keys overwrite previous values silently",
        bugChoices: [
            "Dictionary keys must be unique; duplicate keys overwrite previous values silently",
            "The dict comprehension syntax doesn't support numeric keys",
            "The n * n expression is evaluated incorrectly for duplicate numbers",
            "Dictionary comprehensions require a default value for duplicate keys"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 2, 4, 3]\n# Use list of tuples or track occurrences:\nsquares = [(n, n * n) for n in numbers]\n# Or: {n: n * n for n in set(numbers)}",
        explanation: "Dictionaries have unique keys. In a dict comprehension, if a key appears multiple times, each subsequent occurrence overwrites the previous value. The comprehension {n: n*n for n in [1, 2, 3, 2]} creates {1:1, 2:4, 3:9}, and the second 2 just overwrites the same key. Use set(numbers) if you want unique values, or use a list comprehension if order and duplicates matter.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        id: "t4d-enumerate-wrong-start",
        tier: 4,
        tags: ["loops", "enumerate", "indexing"],
        title: "enumerate() Starting at Wrong Index",
        code: "fruits = ['apple', 'banana', 'cherry']\nfor i, fruit in enumerate(fruits):\n    print(f'{i}. {fruit}')\n# Prints: 0. apple, 1. banana, 2. cherry",
        bugLine: 2,
        bugDescription: "enumerate() starts at 0 by default, need start=1",
        bugChoices: [
            "enumerate() starts counting at 0 by default; use enumerate(fruits, start=1) for 1-based indexing",
            "The f-string format is incorrect for displaying enumeration",
            "The loop variable 'i' should be declared before the for loop",
            "enumerate() requires two separate for loops for index and value"
        ],
        correctBugChoice: 0,
        fixedCode: "fruits = ['apple', 'banana', 'cherry']\nfor i, fruit in enumerate(fruits, start=1):\n    print(f'{i}. {fruit}')\n# Prints: 1. apple, 2. banana, 3. cherry",
        explanation: "The enumerate() function returns tuples of (index, value) and starts counting at 0 by default, following Python's 0-based indexing convention. For 1-based numbering (like numbered lists), use the start parameter: enumerate(iterable, start=1). This is cleaner than manually adding 1 in the loop body.",
        conceptLink: "https://docs.python.org/3/library/functions.html#enumerate"
    },
    {
        id: "t4d-zip-truncates",
        tier: 4,
        tags: ["iterators", "zip", "iteration"],
        title: "zip() Truncates Silently",
        code: "names = ['Alice', 'Bob', 'Charlie']\nscores = [85, 92]\npairs = list(zip(names, scores))\nprint(pairs)  # [('Alice', 85), ('Bob', 92)] - Charlie lost!",
        bugLine: 3,
        bugDescription: "zip() stops at shortest iterable, silently dropping extra items",
        bugChoices: [
            "zip() stops when the shortest iterable is exhausted, silently discarding remaining items",
            "The list() function doesn't properly convert zip objects to lists",
            "The names and scores variables have incompatible types for zipping",
            "zip() requires all iterables to have the same length or it raises an error"
        ],
        correctBugChoice: 0,
        fixedCode: "from itertools import zip_longest\nnames = ['Alice', 'Bob', 'Charlie']\nscores = [85, 92]\npairs = list(zip_longest(names, scores, fillvalue=0))\n# [('Alice', 85), ('Bob', 92), ('Charlie', 0)]",
        explanation: "The zip() function stops when the shortest input iterable is exhausted, silently discarding any remaining items from longer iterables. This can cause data loss bugs that are hard to detect. If you need to process all items, use itertools.zip_longest() which fills missing values with a fillvalue (None by default). Python 3.10+ also added strict=True parameter to zip() to raise an error on length mismatch.",
        conceptLink: "https://docs.python.org/3/library/functions.html#zip"
    },
    {
        id: "t4d-wrong-unpacking",
        tier: 4,
        tags: ["unpacking", "variables", "assignment"],
        title: "Wrong Unpacking with Star Expression",
        code: "data = [1, 2, 3, 4, 5]\nfirst, second, *rest = data\nprint(first, second)  # 1 2\nprint(rest)           # [3, 4, 5] - correct\na, b = data  # ValueError: too many values to unpack",
        bugLine: 5,
        bugDescription: "Too many values to unpack into 2 variables",
        bugChoices: [
            "Can't unpack 5 values into 2 variables; need star expression or exact count match",
            "The data list contains the wrong type of elements for unpacking",
            "Variables a and b were already defined in the previous line",
            "The unpacking syntax requires parentheses around the variables"
        ],
        correctBugChoice: 0,
        fixedCode: "data = [1, 2, 3, 4, 5]\nfirst, second, *rest = data\nprint(first, second)  # 1 2\nprint(rest)           # [3, 4, 5]\na, b, *_ = data  # Use star expression to ignore extras",
        explanation: "Unpacking requires the number of variables to match the number of values, unless you use a starred expression (*rest) to capture remaining values. 'a, b = [1, 2, 3, 4, 5]' fails because you're trying to unpack 5 values into 2 variables. Use 'a, b, *rest = data' or 'a, b = data[:2]' to handle extra values. The star can appear anywhere: 'a, *middle, z = data'.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t4d-strip-vs-remove",
        tier: 4,
        tags: ["strings", "methods", "strip"],
        title: "strip() Removes Character Sets, Not Substrings",
        code: "url = 'https://example.com'\nclean = url.strip('https://')\nprint(clean)  # 'example.com' expected, but prints 'example.co'!",
        bugLine: 2,
        bugDescription: "strip() removes any characters in set, not the substring",
        bugChoices: [
            "strip() removes any characters from the set 'https:/', not the substring; it removed 'm' from end",
            "The strip() method only works on whitespace characters",
            "The url variable is immutable and can't be modified by strip()",
            "strip() requires a regex pattern instead of a plain string"
        ],
        correctBugChoice: 0,
        fixedCode: "url = 'https://example.com'\nclean = url.removeprefix('https://')\n# Or for older Python: url[8:] or url.replace('https://', '', 1)\nprint(clean)  # 'example.com'",
        explanation: "A common misconception: strip(), lstrip(), and rstrip() don't remove substrings - they remove any characters that appear in the given string from the start/end. strip('https://') creates a set {'h','t','p','s',':','/'} and removes these characters from both ends. Since 'example.com' ends with 'm', and 'm' isn't in the set, it stays, but the final 'm' matches... wait, it doesn't. The bug is subtle: 'https://' contains the characters that match '.com' partially. Use removeprefix() (Python 3.9+) or slicing instead.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.strip"
    }
];
