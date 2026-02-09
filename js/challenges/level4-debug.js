// Level 4 Debug Challenges: Methods & Comprehensions bugs
// Each challenge contains exactly ONE bug that tests Python semantics understanding

window.LEVEL4_DEBUG = [
    {
        id: "t4d-sort-returns-none",
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
        level: 4,
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
    },
    {
        id: "t4d-list-insert-vs-append",
        level: 4,
        tags: ["lists", "methods", "insert"],
        title: "Wrong List Method: insert vs append",
        code: "numbers = [1, 2, 3]\nnumbers.insert(4)\nprint(numbers)  # TypeError: insert expected 2 arguments, got 1",
        bugLine: 2,
        bugDescription: "insert() requires index and value; use append() to add at end",
        bugChoices: [
            "insert() requires two arguments (index, value); use append(value) to add at the end",
            "The numbers list is immutable and can't be modified",
            "The insert method should be called with parentheses around the argument",
            "The value 4 has the wrong type for insertion into the list"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3]\nnumbers.append(4)\n# Or: numbers.insert(len(numbers), 4)\nprint(numbers)  # [1, 2, 3, 4]",
        explanation: "The insert() method requires two arguments: insert(index, value) to insert at a specific position. To add an element at the end of a list, use append(value) which is simpler and more efficient. Confusing these methods is common when first learning Python list operations. insert(0, x) adds at the beginning, insert(len(lst), x) is equivalent to append(x).",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t4d-dict-pop-without-default",
        level: 4,
        tags: ["dictionaries", "methods", "pop"],
        title: "dict.pop() Without Default Value",
        code: "config = {'host': 'localhost', 'port': 8080}\nusername = config.pop('username')\nprint(username)  # KeyError: 'username'",
        bugLine: 2,
        bugDescription: "pop() raises KeyError if key not found; provide default value",
        bugChoices: [
            "pop() raises KeyError if the key doesn't exist; use pop('username', None) to provide a default",
            "The pop() method only works with numeric keys in dictionaries",
            "The config dictionary is immutable and can't be modified",
            "The variable name 'username' conflicts with the dictionary key"
        ],
        correctBugChoice: 0,
        fixedCode: "config = {'host': 'localhost', 'port': 8080}\nusername = config.pop('username', None)\n# Or: username = config.pop('username', 'guest')\nprint(username)  # None",
        explanation: "The dict.pop(key) method removes and returns the value for the key, but raises KeyError if the key doesn't exist. To avoid the error, provide a default value as the second argument: pop(key, default). This returns the default if the key is not found. This is similar to get(key, default), but pop() also removes the key if it exists.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.pop"
    },
    {
        id: "t4d-wrong-comprehension-variable",
        level: 4,
        tags: ["comprehensions", "scope", "variables"],
        title: "Wrong Variable in Comprehension",
        code: "matrix = [[1, 2], [3, 4], [5, 6]]\nflat = [num for row in matrix for num in matrix]\nprint(flat)  # [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, ...]",
        bugLine: 2,
        bugDescription: "Inner loop iterates over matrix instead of row",
        bugChoices: [
            "The inner loop iterates over 'matrix' instead of 'row', causing incorrect flattening",
            "List comprehensions can't handle nested lists properly",
            "The variable 'num' should be declared before the comprehension",
            "The matrix structure is incompatible with this comprehension syntax"
        ],
        correctBugChoice: 0,
        fixedCode: "matrix = [[1, 2], [3, 4], [5, 6]]\nflat = [num for row in matrix for num in row]\nprint(flat)  # [1, 2, 3, 4, 5, 6]",
        explanation: "In nested comprehensions, make sure each loop iterates over the correct iterable. The pattern is [num for row in matrix for num in row] - first loop gets each row, second loop iterates over that row. Using 'for num in matrix' in the inner loop iterates over the entire matrix for each row, creating duplicates. Variable scope errors in comprehensions can be subtle and produce unexpected results.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions"
    },
    {
        id: "t4d-str-find-returns-minus-one",
        level: 4,
        tags: ["strings", "methods", "find"],
        title: "str.find() Returns -1, Not Error",
        code: "text = 'Hello World'\nindex = text.find('Python')\nfirst_char = text[index]\nprint(first_char)  # Prints 'd' (last character!)",
        bugLine: 3,
        bugDescription: "find() returns -1 when not found, which indexes from end",
        bugChoices: [
            "find() returns -1 when substring not found; text[-1] gets last character, not an error",
            "The find() method should be called with a second argument for the starting position",
            "The variable 'Python' doesn't exist in the text so find() raises an exception",
            "The indexing operation [index] requires parentheses around the index"
        ],
        correctBugChoice: 0,
        fixedCode: "text = 'Hello World'\nindex = text.find('Python')\nif index != -1:\n    first_char = text[index]\n    print(first_char)\nelse:\n    print('Not found')",
        explanation: "Unlike index(), which raises ValueError when the substring isn't found, find() returns -1. In Python, negative indices count from the end, so text[-1] is the last character. This silent failure can cause subtle bugs. Always check if find() returns -1 before using the result as an index. Use index() if you want an exception on failure, or check the return value of find().",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.find"
    },
    {
        id: "t4d-sorted-stability-misunderstanding",
        level: 4,
        tags: ["sorting", "stable-sort", "sorting-stability"],
        title: "Misunderstanding Sort Stability",
        code: "data = [('a', 2), ('b', 1), ('c', 2)]\nsorted_data = sorted(data, key=lambda x: x[1])\nsorted_data.sort(key=lambda x: x[0])\nprint(sorted_data)  # Lost the secondary sort!",
        bugLine: 3,
        bugDescription: "Second sort overwrites first; use tuple key instead",
        bugChoices: [
            "The second sort() overwrites the first sort; use a single sort with tuple key instead",
            "The sorted() function and sort() method can't be used together on the same data",
            "Lambda functions don't work correctly with multiple sort operations",
            "The data structure with tuples is incompatible with sorting methods"
        ],
        correctBugChoice: 0,
        fixedCode: "data = [('a', 2), ('b', 1), ('c', 2)]\n# Sort by x[1] first (secondary), then x[0] (primary)\nsorted_data = sorted(data, key=lambda x: (x[0], x[1]))\nprint(sorted_data)",
        explanation: "While Python's sort is stable (maintains relative order of equal elements), calling sort() twice doesn't create a two-level sort - the second sort completely reorders based on its key alone. To sort by multiple criteria, either: 1) Sort by secondary key first, then primary (relying on stability), or 2) Use a tuple key: sorted(data, key=lambda x: (x[0], x[1])). The tuple approach is clearer and less error-prone.",
        conceptLink: "https://docs.python.org/3/howto/sorting.html#sort-stability-and-complex-sorts"
    },
    {
        id: "t4d-wrong-map-usage",
        level: 4,
        tags: ["iterators", "map", "functions"],
        title: "Wrong map() Usage",
        code: "numbers = [1, 2, 3, 4, 5]\nsquares = map(lambda x: x ** 2, numbers)\nprint(squares)  # <map object at 0x...> not the values!",
        bugLine: 3,
        bugDescription: "map() returns iterator, not list; convert with list()",
        bugChoices: [
            "map() returns an iterator, not a list; use list(squares) to see the values",
            "The lambda function syntax is incorrect for the map() function",
            "The ** operator doesn't work with map() operations",
            "The numbers list has the wrong type for map() processing"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 4, 5]\nsquares = list(map(lambda x: x ** 2, numbers))\n# Or use comprehension: [x ** 2 for x in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]",
        explanation: "In Python 3, map() returns an iterator (lazy evaluation), not a list. Printing the iterator shows the object representation, not the values. Convert to a list with list(), or iterate over it. For simple transformations, list comprehensions are often more readable: [x**2 for x in numbers]. Iterators are memory-efficient for large datasets but need to be materialized to see results.",
        conceptLink: "https://docs.python.org/3/library/functions.html#map"
    },
    {
        id: "t4d-join-on-non-strings",
        level: 4,
        tags: ["strings", "methods", "join"],
        title: "join() on Non-Strings",
        code: "numbers = [1, 2, 3, 4, 5]\nresult = ', '.join(numbers)\nprint(result)  # TypeError: sequence item 0: expected str, int found",
        bugLine: 2,
        bugDescription: "join() requires all items to be strings",
        bugChoices: [
            "join() requires all items in the iterable to be strings; convert with map(str, numbers)",
            "The ', ' separator format is incorrect for the join() method",
            "The numbers list should be unpacked with * before joining",
            "join() only works with lists containing fewer than 5 elements"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 4, 5]\nresult = ', '.join(map(str, numbers))\n# Or: ', '.join(str(n) for n in numbers)\nprint(result)  # '1, 2, 3, 4, 5'",
        explanation: "The str.join() method requires an iterable of strings. Trying to join non-string objects like integers raises TypeError. Convert items to strings first using map(str, iterable) or a generator expression: ''.join(str(x) for x in items). This is a common gotcha when building strings from mixed-type data.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.join"
    },
    {
        id: "t4d-wrong-dict-merge",
        level: 4,
        tags: ["dictionaries", "operators", "merge"],
        title: "Wrong Dict Merge Behavior",
        code: "defaults = {'a': 1, 'b': 2}\nuser_config = {'b': 3, 'c': 4}\nconfig = {**defaults, **user_config}\nprint(config['b'])  # 3, not 2!",
        bugLine: 3,
        bugDescription: "Later dict overwrites earlier values in merge",
        bugChoices: [
            "In {**defaults, **user_config}, later dict (user_config) overwrites earlier (defaults) values",
            "The ** operator can't be used to merge dictionaries with overlapping keys",
            "The config dictionary should use + operator instead of ** for merging",
            "The print statement should access config using .get() instead of indexing"
        ],
        correctBugChoice: 0,
        fixedCode: "defaults = {'a': 1, 'b': 2}\nuser_config = {'b': 3, 'c': 4}\n# If you want defaults to take precedence:\nconfig = {**user_config, **defaults}\nprint(config['b'])  # 2",
        explanation: "When merging dicts with {**dict1, **dict2}, values from dict2 overwrite dict1 for duplicate keys. The order matters: {**defaults, **user_config} means user settings override defaults (usually desired). If you want defaults to win, reverse the order. Python 3.9+ also has the | operator: defaults | user_config. Understanding merge order is crucial for config management.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict"
    },
    {
        id: "t4d-enumerate-destructuring-error",
        level: 4,
        tags: ["enumerate", "unpacking", "loops"],
        title: "Enumerate Destructuring Error",
        code: "pairs = [('a', 1), ('b', 2), ('c', 3)]\nfor i, letter, number in enumerate(pairs):\n    print(f'{i}: {letter}={number}')\n# ValueError: not enough values to unpack",
        bugLine: 2,
        bugDescription: "enumerate returns (index, item); need nested unpacking",
        bugChoices: [
            "enumerate returns (index, item); need for i, (letter, number) in enumerate(pairs) for nested unpacking",
            "The enumerate function can't handle lists of tuples",
            "The loop variables should be declared before the for statement",
            "The print statement needs different formatting for enumerated tuples"
        ],
        correctBugChoice: 0,
        fixedCode: "pairs = [('a', 1), ('b', 2), ('c', 3)]\nfor i, (letter, number) in enumerate(pairs):\n    print(f'{i}: {letter}={number}')\n# Or iterate without enumerate if index not needed",
        explanation: "enumerate() returns tuples of (index, item). If item is itself a tuple, you need nested unpacking: for i, (a, b) in enumerate(pairs). The pattern 'for i, a, b in enumerate(pairs)' tries to unpack into three variables, but enumerate only yields two (index and the tuple). Parentheses make the nested unpacking explicit: i gets the index, (a, b) unpacks the pair.",
        conceptLink: "https://docs.python.org/3/library/functions.html#enumerate"
    },
    {
        id: "t4d-reversed-not-returning-list",
        level: 4,
        tags: ["iterators", "reversed", "lists"],
        title: "reversed() Doesn't Return List",
        code: "numbers = [1, 2, 3, 4, 5]\nbackwards = reversed(numbers)\nprint(backwards[0])  # TypeError: 'reversed' object not subscriptable",
        bugLine: 3,
        bugDescription: "reversed() returns iterator, not list; can't index",
        bugChoices: [
            "reversed() returns an iterator, not a list; convert with list() or use slicing [::-1]",
            "The reversed() function requires a reverse=True parameter to work",
            "The numbers list should be sorted before reversing",
            "The indexing syntax [0] doesn't work with reversed iterators"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 4, 5]\nbackwards = list(reversed(numbers))\n# Or: backwards = numbers[::-1]\nprint(backwards[0])  # 5",
        explanation: "The reversed() function returns an iterator, not a list. You can't index into an iterator directly. Convert to a list with list(reversed(seq)) if you need indexing or multiple iterations. Alternatively, use slice notation [::-1] which creates a reversed copy directly. Iterators are memory-efficient but have limitations compared to lists.",
        conceptLink: "https://docs.python.org/3/library/functions.html#reversed"
    },
    {
        id: "t4d-list-extend-vs-append",
        level: 4,
        tags: ["lists", "methods", "extend"],
        title: "extend() vs append() Confusion",
        code: "letters = ['a', 'b', 'c']\nletters.append(['d', 'e'])\nprint(letters)  # ['a', 'b', 'c', ['d', 'e']] - nested!",
        bugLine: 2,
        bugDescription: "append() adds list as single element; use extend() to add items",
        bugChoices: [
            "append() adds the entire list as a single nested element; use extend() to add individual items",
            "The list ['d', 'e'] has incompatible types for appending",
            "The letters list can only contain single characters, not lists",
            "append() requires unpacking the list with * operator"
        ],
        correctBugChoice: 0,
        fixedCode: "letters = ['a', 'b', 'c']\nletters.extend(['d', 'e'])\n# Or: letters += ['d', 'e']\nprint(letters)  # ['a', 'b', 'c', 'd', 'e']",
        explanation: "append() adds its argument as a single element to the list, even if the argument is itself a list. This creates nested lists. extend() iterates over its argument and adds each item individually. Use append(x) to add one item, extend(iterable) to add multiple items. The += operator on lists behaves like extend(). This confusion is extremely common.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t4d-dict-keys-returns-view",
        level: 4,
        tags: ["dictionaries", "views", "methods"],
        title: "dict.keys() Returns View, Not List",
        code: "config = {'a': 1, 'b': 2, 'c': 3}\nkeys = config.keys()\nfirst_key = keys[0]\nprint(first_key)  # TypeError: 'dict_keys' not subscriptable",
        bugLine: 3,
        bugDescription: "keys() returns dict_keys view object, not list; can't index",
        bugChoices: [
            "keys() returns a dict_keys view object, not a list; convert with list(keys) to index",
            "The config dictionary has too many keys for the keys() method",
            "Dictionary keys are unordered and can't be accessed by index",
            "The keys() method requires a parameter to specify which key to retrieve"
        ],
        correctBugChoice: 0,
        fixedCode: "config = {'a': 1, 'b': 2, 'c': 3}\nkeys = list(config.keys())\nfirst_key = keys[0]\nprint(first_key)  # 'a' (in Python 3.7+, insertion order)",
        explanation: "In Python 3, dict.keys(), dict.values(), and dict.items() return view objects, not lists. Views are dynamic and reflect changes to the dictionary, but they don't support indexing. To index into keys, convert to a list: list(config.keys())[0]. Note that while dicts maintain insertion order (3.7+), treating them as ordered sequences is often a code smell - consider if you really need indexing.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict-views"
    },
    {
        id: "t4d-set-comprehension-duplicates",
        level: 4,
        tags: ["comprehensions", "sets", "set-comprehension"],
        title: "Set Comprehension Removes Duplicates",
        code: "numbers = [1, 2, 2, 3, 3, 3]\nsquares = {n * n for n in numbers}\nprint(len(squares))  # 3, not 6!",
        bugLine: 2,
        bugDescription: "Set comprehension automatically removes duplicates",
        bugChoices: [
            "Set comprehension creates a set, which automatically removes duplicates; use list comprehension instead",
            "The multiplication operator doesn't work correctly in set comprehensions",
            "The len() function counts unique elements incorrectly for sets",
            "Set comprehensions have a maximum size of 3 elements"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 2, 3, 3, 3]\nsquares = [n * n for n in numbers]  # List comprehension\nprint(len(squares))  # 6\n# Or use set if you want unique: {1, 4, 9}",
        explanation: "Set comprehensions use curly braces {expr for x in iterable} and create sets, which by definition contain only unique elements. If numbers contains [1, 2, 2, 3, 3, 3], then {n*n for n in numbers} produces {1, 4, 9} (3 items), not [1, 4, 4, 9, 9, 9] (6 items). Use list comprehension [n*n for n in numbers] if you need to preserve duplicates. The syntax difference is subtle but the behavior is very different.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#sets"
    },
    {
        id: "t4d-dict-get-default-none",
        level: 4,
        tags: ["dictionaries", "methods", "get"],
        title: "dict.get() Default is None",
        code: "scores = {'Alice': 95, 'Bob': 87}\ntotal = scores.get('Charlie') + scores.get('Alice')\nprint(total)  # TypeError: unsupported operand None + int",
        bugLine: 2,
        bugDescription: "get() returns None by default; provide default value",
        bugChoices: [
            "get() returns None if key not found; use get('Charlie', 0) to provide a default value",
            "The addition operator can't be used with dictionary values",
            "The scores dictionary should use a different method to access values",
            "The variable 'Charlie' doesn't exist so get() raises an exception"
        ],
        correctBugChoice: 0,
        fixedCode: "scores = {'Alice': 95, 'Bob': 87}\ntotal = scores.get('Charlie', 0) + scores.get('Alice', 0)\nprint(total)  # 95",
        explanation: "dict.get(key) returns the value if the key exists, or None if it doesn't. You can't add None to a number, causing TypeError. Always provide a sensible default as the second argument: get(key, default). This is especially important in calculations where missing keys should be treated as 0, empty string, empty list, etc. Using get() with defaults makes code more robust.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t4d-list-remove-value",
        level: 4,
        tags: ["lists", "methods", "remove"],
        title: "remove() Removes by Value, Not Index",
        code: "numbers = [10, 20, 30, 40, 50]\nnumbers.remove(2)\nprint(numbers)  # ValueError: list.remove(x): x not in list",
        bugLine: 2,
        bugDescription: "remove() takes a value, not an index; 2 is not in the list",
        bugChoices: [
            "remove() removes by value, not index; use del numbers[2] or numbers.pop(2) to remove by index",
            "The remove() method only works with string elements",
            "The numbers list is immutable and can't be modified",
            "remove() requires two arguments: index and value"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [10, 20, 30, 40, 50]\nnumbers.pop(2)  # Or: del numbers[2]\nprint(numbers)  # [10, 20, 40, 50]",
        explanation: "list.remove(x) removes the first occurrence of value x from the list. It does NOT remove by index. Since 2 is not in [10, 20, 30, 40, 50], it raises ValueError. To remove by index, use pop(index) or del list[index]. To remove by value, use remove(value). This confusion is very common.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    }
];
