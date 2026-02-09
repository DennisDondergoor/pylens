/**
 * PyLens - Tier 2 Debug Challenges
 * Level 2: Collections - Errors with lists, dicts, tuples, indexing, slicing
 */

window.TIER2_DEBUG = [
    {
        id: "t2d-index-out-of-bounds",
        tier: 2,
        tags: ["lists", "indexing", "index-error"],
        title: "List Index Out of Range",
        code: "scores = [85, 92, 78, 90]\nprint('First score:', scores[0])\nlast_score = scores[len(scores)]\nprint('Last score:', last_score)",
        bugLine: 3,
        bugDescription: "Index len(scores) is out of bounds; should be len(scores) - 1 or scores[-1]",
        bugChoices: [
            "len(scores) is 4, but valid indices are 0-3; use len(scores) - 1 or scores[-1]",
            "Missing parentheses around len function",
            "List scores is not defined correctly",
            "Should use scores.length instead of len(scores)"
        ],
        correctBugChoice: 0,
        fixedCode: "scores = [85, 92, 78, 90]\nprint('First score:', scores[0])\nlast_score = scores[len(scores) - 1]\nprint('Last score:', last_score)",
        explanation: "Lists are zero-indexed: a list of length 4 has valid indices 0, 1, 2, 3. Using len(scores) gives 4, which is beyond the last valid index. To access the last element, use len(scores) - 1 or the more Pythonic negative indexing: scores[-1]. This is a classic off-by-one error.",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t2d-dict-key-error",
        tier: 2,
        tags: ["dictionaries", "key-error", "lookup"],
        title: "Missing Dictionary Key",
        code: "student = {'name': 'Alice', 'age': 20, 'major': 'CS'}\nprint('Name:', student['name'])\nprint('GPA:', student['gpa'])\nprint('Major:', student['major'])",
        bugLine: 3,
        bugDescription: "Key 'gpa' doesn't exist in dict; use .get() method or add the key",
        bugChoices: [
            "Key 'gpa' not in dictionary; use student.get('gpa', default) or check with 'gpa' in student",
            "Missing quotes around the key name",
            "Should use dot notation student.gpa instead",
            "Dictionary syntax is incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "student = {'name': 'Alice', 'age': 20, 'major': 'CS'}\nprint('Name:', student['name'])\nprint('GPA:', student.get('gpa', 'N/A'))\nprint('Major:', student['major'])",
        explanation: "Accessing a non-existent dictionary key with bracket notation student['gpa'] raises a KeyError. Safe alternatives: use .get() method which returns None or a default value if key is missing: student.get('gpa', 0.0), or check first: if 'gpa' in student: ..., or use try/except to handle the KeyError.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t2d-modify-while-iterating",
        tier: 2,
        tags: ["lists", "iteration", "runtime-error"],
        title: "Modifying List During Iteration",
        code: "numbers = [1, 2, 3, 4, 5, 6]\nfor num in numbers:\n    if num % 2 == 0:\n        numbers.remove(num)\nprint('Odd numbers:', numbers)",
        bugLine: 4,
        bugDescription: "Modifying list during iteration skips elements; iterate over copy numbers[:]",
        bugChoices: [
            "Removing items during iteration causes skipped elements; use for num in numbers[:] to iterate over a copy",
            "The remove() method doesn't exist for lists",
            "Should use numbers.delete(num) instead",
            "Missing parentheses in the if condition"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [1, 2, 3, 4, 5, 6]\nfor num in numbers[:]:\n    if num % 2 == 0:\n        numbers.remove(num)\nprint('Odd numbers:', numbers)",
        explanation: "Modifying a list while iterating over it causes unexpected behavior: when you remove an item, subsequent items shift position, causing the iterator to skip elements. Solution: iterate over a copy using numbers[:] or numbers.copy(), or use list comprehension: numbers = [num for num in numbers if num % 2 != 0].",
        conceptLink: "https://docs.python.org/3/tutorial/controlflow.html#for-statements"
    },
    {
        id: "t2d-tuple-immutable",
        tier: 2,
        tags: ["tuples", "immutability", "type-error"],
        title: "Attempting to Modify Tuple",
        code: "coordinates = (10, 20, 30)\nprint('Original:', coordinates)\ncoordinates[1] = 25\nprint('Updated:', coordinates)",
        bugLine: 3,
        bugDescription: "Tuples are immutable; cannot assign to index; use list or create new tuple",
        bugChoices: [
            "Tuples are immutable and cannot be modified; convert to list or create new tuple",
            "Wrong index used, should be coordinates[0]",
            "Missing parentheses around the assignment",
            "Need to use coordinates.set(1, 25) method"
        ],
        correctBugChoice: 0,
        fixedCode: "coordinates = (10, 20, 30)\nprint('Original:', coordinates)\ncoordinates = (coordinates[0], 25, coordinates[2])\nprint('Updated:', coordinates)",
        explanation: "Tuples are immutable in Python - their contents cannot be changed after creation. Attempting to assign coordinates[1] = 25 raises a TypeError. Solutions: convert to list for mutability: list(coordinates), or create a new tuple with updated values. Use tuples when data shouldn't change; use lists for mutable sequences.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2d-slice-off-by-one",
        tier: 2,
        tags: ["lists", "slicing", "indexing"],
        title: "Incorrect Slice Bounds",
        code: "letters = ['a', 'b', 'c', 'd', 'e']\nfirst_three = letters[0:2]\nprint('First three letters:', first_three)\nprint('Count:', len(first_three))",
        bugLine: 2,
        bugDescription: "Slice [0:2] gives 2 elements (indices 0-1); should be [0:3] for 3 elements",
        bugChoices: [
            "Slice [0:2] extracts indices 0 and 1 (2 items); use [0:3] to get first 3 elements",
            "Should use letters[0:2:1] with step parameter",
            "Missing parentheses around the slice",
            "Letters list is indexed incorrectly"
        ],
        correctBugChoice: 0,
        fixedCode: "letters = ['a', 'b', 'c', 'd', 'e']\nfirst_three = letters[0:3]\nprint('First three letters:', first_three)\nprint('Count:', len(first_three))",
        explanation: "Python slicing uses [start:stop] where start is inclusive and stop is exclusive. The slice [0:2] includes indices 0 and 1, giving 2 elements, not 3. To get the first 3 elements, use [0:3] or simply [:3]. This off-by-one error is common because the stop index is exclusive, not inclusive.",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#strings"
    },
    {
        id: "t2d-append-vs-extend",
        tier: 2,
        tags: ["lists", "methods", "append-vs-extend"],
        title: "Wrong List Method Used",
        code: "shopping_list = ['milk', 'eggs']\nnew_items = ['bread', 'butter']\nshopping_list.append(new_items)\nprint('Items:', shopping_list)\nprint('Total items:', len(shopping_list))",
        bugLine: 3,
        bugDescription: "append() adds list as single element; use extend() to add individual items",
        bugChoices: [
            "append() adds entire list as one element; use extend() to add items individually",
            "Missing parentheses in the append method call",
            "Should use shopping_list.add() instead",
            "The new_items variable is not a valid list"
        ],
        correctBugChoice: 0,
        fixedCode: "shopping_list = ['milk', 'eggs']\nnew_items = ['bread', 'butter']\nshopping_list.extend(new_items)\nprint('Items:', shopping_list)\nprint('Total items:', len(shopping_list))",
        explanation: "append() adds its argument as a single element: [1, 2].append([3, 4]) gives [1, 2, [3, 4]]. extend() adds each element individually: [1, 2].extend([3, 4]) gives [1, 2, 3, 4]. Use append() for single items, extend() for iterables. Alternative: use += operator: shopping_list += new_items.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2d-duplicate-dict-keys",
        tier: 2,
        tags: ["dictionaries", "literals", "duplicate-keys"],
        title: "Dictionary Key Overwriting",
        code: "prices = {\n    'apple': 1.50,\n    'banana': 0.75,\n    'apple': 1.75\n}\nprint('Apple price:', prices['apple'])",
        bugLine: 4,
        bugDescription: "Duplicate key 'apple' overwrites first value; only last value (1.75) is kept",
        bugChoices: [
            "Duplicate key 'apple' causes first value to be overwritten with 1.75; keys must be unique",
            "Missing comma after the banana entry",
            "Dictionary syntax is incorrect",
            "Should use list instead of dictionary"
        ],
        correctBugChoice: 0,
        fixedCode: "prices = {\n    'apple': 1.50,\n    'banana': 0.75,\n    'orange': 1.75\n}\nprint('Apple price:', prices['apple'])",
        explanation: "Dictionary keys must be unique. When you define a dictionary with duplicate keys, Python silently overwrites earlier values with later ones. The dictionary ends up with {'apple': 1.75, 'banana': 0.75}. This is not an error but usually indicates a mistake. Python 3.7+ maintains insertion order, so the last value wins.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        id: "t2d-unpacking-count-mismatch",
        tier: 2,
        tags: ["unpacking", "tuples", "value-error"],
        title: "Wrong Number of Values to Unpack",
        code: "point = (10, 20, 30)\nx, y = point\nprint(f'Coordinates: ({x}, {y})')",
        bugLine: 2,
        bugDescription: "Tuple has 3 values but only 2 variables; need x, y, z = point",
        bugChoices: [
            "Tuple has 3 elements but unpacking into 2 variables; use x, y, z = point or x, y, *rest = point",
            "Missing parentheses around the variables",
            "Should use square brackets for unpacking",
            "Variable point is not defined correctly"
        ],
        correctBugChoice: 0,
        fixedCode: "point = (10, 20, 30)\nx, y, z = point\nprint(f'Coordinates: ({x}, {y})')",
        explanation: "Unpacking requires the number of variables to match the number of values. Unpacking 3 values into 2 variables raises ValueError: too many values to unpack. Solutions: match the count (x, y, z = point), use * to capture extras (x, y, *rest = point), or index directly (x, y = point[0], point[1]).",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2d-range-needs-list",
        tier: 2,
        tags: ["range", "lists", "type-conversion"],
        title: "Range Object Instead of List",
        code: "numbers = range(1, 6)\nprint('Numbers:', numbers)\ntotal = sum(numbers)\nprint('First number:', numbers[0])\nprint('Total:', total)",
        bugLine: 2,
        bugDescription: "range() returns range object, not list; print shows range(1, 6) not values",
        bugChoices: [
            "range() returns a range object, not a list; use list(range(1, 6)) to see actual values",
            "Missing parentheses in the range function",
            "Should use range(0, 5) instead",
            "Variable numbers is not defined correctly"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = list(range(1, 6))\nprint('Numbers:', numbers)\ntotal = sum(numbers)\nprint('First number:', numbers[0])\nprint('Total:', total)",
        explanation: "In Python 3, range() returns a range object (memory-efficient iterator), not a list. Printing it shows 'range(1, 6)' rather than [1, 2, 3, 4, 5]. While range objects support indexing and iteration, converting to a list with list(range(1, 6)) is needed when you want to see or manipulate all values at once.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#range"
    },
    {
        id: "t2d-is-vs-equals",
        tier: 2,
        tags: ["operators", "comparison", "identity-vs-equality"],
        title: "Identity vs Equality Comparison",
        code: "list1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nif list1 is list2:\n    print('Lists are the same')\nelse:\n    print('Lists are different')",
        bugLine: 3,
        bugDescription: "is checks object identity (same object in memory); use == for value equality",
        bugChoices: [
            "is checks if same object in memory; use == to compare values/contents",
            "Missing colon after the if statement",
            "Should use list1.equals(list2) method",
            "Lists cannot be compared in Python"
        ],
        correctBugChoice: 0,
        fixedCode: "list1 = [1, 2, 3]\nlist2 = [1, 2, 3]\nif list1 == list2:\n    print('Lists are the same')\nelse:\n    print('Lists are different')",
        explanation: "The is operator checks identity (whether two variables reference the exact same object in memory), while == checks equality (whether values are the same). Two separate lists with identical contents are equal (==) but not identical (is). Use == for comparing values; reserve is for checking None or comparing to singleton objects.",
        conceptLink: "https://docs.python.org/3/reference/expressions.html#is"
    },
    {
        id: "t2d-negative-index-confusion",
        tier: 2,
        tags: ["lists", "indexing", "negative-indices"],
        title: "Incorrect Negative Indexing",
        code: "colors = ['red', 'green', 'blue', 'yellow']\nprint('Last color:', colors[-1])\nprint('Second to last:', colors[-4])\nprint('Third to last:', colors[-3])",
        bugLine: 3,
        bugDescription: "colors[-4] is first element, not second to last; should be colors[-2]",
        bugChoices: [
            "colors[-4] accesses first element (same as [0]); use colors[-2] for second to last",
            "Negative indices are not allowed in Python",
            "Should use colors[len(colors) - 4]",
            "Missing parentheses around the index"
        ],
        correctBugChoice: 0,
        fixedCode: "colors = ['red', 'green', 'blue', 'yellow']\nprint('Last color:', colors[-1])\nprint('Second to last:', colors[-2])\nprint('Third to last:', colors[-3])",
        explanation: "Negative indices count from the end: -1 is last, -2 is second to last, etc. In a list of 4 items, -4 wraps around to the first element (same as index 0). This is technically valid but confusing. Use positive indices when counting from the start, negative when counting from the end.",
        conceptLink: "https://docs.python.org/3/tutorial/introduction.html#lists"
    },
    {
        id: "t2d-dict-keys-immutable",
        tier: 2,
        tags: ["dictionaries", "keys", "type-error"],
        title: "Mutable Dictionary Key",
        code: "student_grades = {}\nstudent1 = ['Alice', 'Smith']\nstudent_grades[student1] = 95\nprint(student_grades)",
        bugLine: 3,
        bugDescription: "Lists are mutable and cannot be dict keys; use tuple instead",
        bugChoices: [
            "Lists are mutable and unhashable; cannot be dict keys; use tuple (student1[0], student1[1])",
            "Dictionary assignment syntax is incorrect",
            "Should use student_grades.add() method",
            "Missing quotes around student1"
        ],
        correctBugChoice: 0,
        fixedCode: "student_grades = {}\nstudent1 = ('Alice', 'Smith')\nstudent_grades[student1] = 95\nprint(student_grades)",
        explanation: "Dictionary keys must be hashable (immutable). Lists, dictionaries, and sets cannot be keys because they're mutable. Attempting to use a list as a key raises TypeError: unhashable type: 'list'. Use immutable types as keys: strings, numbers, tuples (containing only immutable items), or frozensets.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    },
    {
        id: "t2d-list-copy-reference",
        tier: 2,
        tags: ["lists", "copying", "references"],
        title: "Shallow Copy vs Reference",
        code: "original = [1, 2, 3]\ncopy = original\ncopy.append(4)\nprint('Original:', original)\nprint('Copy:', copy)",
        bugLine: 2,
        bugDescription: "Assignment creates reference, not copy; both variables point to same list",
        bugChoices: [
            "Assignment (=) creates reference to same list; use copy = original[:] or original.copy()",
            "append() method syntax is incorrect",
            "Should use copy = list(original)",
            "Missing parentheses around the assignment"
        ],
        correctBugChoice: 0,
        fixedCode: "original = [1, 2, 3]\ncopy = original[:]\ncopy.append(4)\nprint('Original:', original)\nprint('Copy:', copy)",
        explanation: "Assignment with = creates a reference, not a copy. Both variables point to the same list in memory, so modifying one affects the other. To create an independent copy, use slicing original[:], the .copy() method, or list(original). For nested structures, use copy.deepcopy().",
        conceptLink: "https://docs.python.org/3/library/copy.html"
    },
    {
        id: "t2d-slice-step-confusion",
        tier: 2,
        tags: ["lists", "slicing", "step"],
        title: "Reversed Slice Indices",
        code: "numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nsubset = numbers[7:3]\nprint('Subset:', subset)\nprint('Length:', len(subset))",
        bugLine: 2,
        bugDescription: "Slice [7:3] is empty because start > stop; use [7:3:-1] for reverse or [3:7]",
        bugChoices: [
            "Slice [7:3] produces empty list (start > stop); use [7:3:-1] to reverse or [3:7] forward",
            "Slice syntax is incorrect",
            "Should use numbers[3, 7] instead",
            "Missing step parameter"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nsubset = numbers[3:7]\nprint('Subset:', subset)\nprint('Length:', len(subset))",
        explanation: "Slicing [start:stop] works forward by default (step=1). When start > stop without a negative step, the result is an empty list. To slice backwards, use negative step: [7:3:-1] gives [7, 6, 5, 4]. To get elements 3-7, use [3:7] (remember stop is exclusive). Always ensure start < stop when using positive step.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t2d-in-operator-substring",
        tier: 2,
        tags: ["strings", "membership", "in-operator"],
        title: "Membership Test on Wrong Type",
        code: "fruits = ['apple', 'banana', 'cherry']\nif 'app' in fruits:\n    print('Found app!')\nelse:\n    print('Not found')",
        bugLine: 2,
        bugDescription: "'in' checks for exact element match in list, not substring; check in string instead",
        bugChoices: [
            "'in' with lists checks exact elements, not substrings; use any('app' in fruit for fruit in fruits)",
            "Missing colon after if statement",
            "Should use fruits.contains('app')",
            "String comparison syntax is incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "fruits = ['apple', 'banana', 'cherry']\nif any('app' in fruit for fruit in fruits):\n    print('Found app!')\nelse:\n    print('Not found')",
        explanation: "The 'in' operator checks for exact element membership in lists: 'apple' in fruits works, but 'app' in fruits doesn't because 'app' is not an element. To check if any string contains a substring, use a generator: any('app' in fruit for fruit in fruits), or check each string individually.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t2d-dict-values-method",
        tier: 2,
        tags: ["dictionaries", "methods", "iteration"],
        title: "Iterating Dict Without Values()",
        code: "inventory = {'apples': 10, 'oranges': 5, 'bananas': 8}\ntotal = 0\nfor count in inventory:\n    total += count\nprint('Total items:', total)",
        bugLine: 3,
        bugDescription: "Iterating dict gives keys, not values; use inventory.values()",
        bugChoices: [
            "Iterating dict yields keys, not values; use for count in inventory.values() or inventory[key]",
            "for loop syntax is incorrect",
            "Should use inventory.items() instead",
            "Variable total is not defined"
        ],
        correctBugChoice: 0,
        fixedCode: "inventory = {'apples': 10, 'oranges': 5, 'bananas': 8}\ntotal = 0\nfor count in inventory.values():\n    total += count\nprint('Total items:', total)",
        explanation: "When you iterate over a dictionary directly, you get the keys, not values. In this case, for count in inventory gives 'apples', 'oranges', 'bananas' (strings), causing TypeError when adding to total. Use .values() to iterate over values, .keys() for keys explicitly, or .items() for key-value pairs.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.values"
    },
    {
        id: "t2d-list-sort-vs-sorted",
        tier: 2,
        tags: ["lists", "methods", "sorting"],
        title: "Sort Method Returns None",
        code: "numbers = [5, 2, 8, 1, 9]\nsorted_numbers = numbers.sort()\nprint('Sorted:', sorted_numbers)\nprint('Original:', numbers)",
        bugLine: 2,
        bugDescription: "list.sort() modifies in-place and returns None; use sorted() for new list",
        bugChoices: [
            "list.sort() modifies list in-place and returns None; use sorted(numbers) to get new sorted list",
            "sort() method syntax is incorrect",
            "Should use numbers.sorted() instead",
            "Missing parentheses in method call"
        ],
        correctBugChoice: 0,
        fixedCode: "numbers = [5, 2, 8, 1, 9]\nsorted_numbers = sorted(numbers)\nprint('Sorted:', sorted_numbers)\nprint('Original:', numbers)",
        explanation: "The .sort() method sorts the list in-place and returns None. To get a new sorted list while preserving the original, use the sorted() function: sorted(numbers) returns a new sorted list. Use .sort() when you want to modify the list directly; use sorted() when you need to keep the original unchanged.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#list.sort"
    },
    {
        id: "t2d-dict-get-default",
        tier: 2,
        tags: ["dictionaries", "methods", "default-values"],
        title: "Get Method Default Not Working",
        code: "config = {'host': 'localhost', 'port': 8080}\ntimeout = config.get('timeout')\nif timeout > 0:\n    print('Timeout:', timeout)",
        bugLine: 3,
        bugDescription: "get() returns None when key missing; provide default: config.get('timeout', 30)",
        bugChoices: [
            "get() returns None for missing keys; cannot compare None > 0; use config.get('timeout', 30)",
            "Comparison operator is incorrect",
            "Should use config['timeout'] instead",
            "Variable timeout is not defined"
        ],
        correctBugChoice: 0,
        fixedCode: "config = {'host': 'localhost', 'port': 8080}\ntimeout = config.get('timeout', 30)\nif timeout > 0:\n    print('Timeout:', timeout)",
        explanation: "The .get() method returns None if the key doesn't exist and no default is provided. Comparing None > 0 raises TypeError. Always provide a sensible default as the second argument: config.get('timeout', 30) returns 30 if 'timeout' key is missing. This prevents None-related errors and provides fallback values.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict.get"
    },
    {
        id: "t2d-list-index-method",
        tier: 2,
        tags: ["lists", "methods", "value-error"],
        title: "Index Method on Missing Element",
        code: "colors = ['red', 'green', 'blue']\nprint('Green at:', colors.index('green'))\nposition = colors.index('yellow')\nprint('Yellow at:', position)",
        bugLine: 3,
        bugDescription: "index() raises ValueError if element not in list; check with 'in' first",
        bugChoices: [
            "index() raises ValueError if element not found; check 'yellow' in colors first or use try/except",
            "index() method syntax is incorrect",
            "Should use colors.find('yellow') instead",
            "Missing parentheses in method call"
        ],
        correctBugChoice: 0,
        fixedCode: "colors = ['red', 'green', 'blue']\nprint('Green at:', colors.index('green'))\nif 'yellow' in colors:\n    position = colors.index('yellow')\n    print('Yellow at:', position)",
        explanation: "The .index() method returns the first index of an element, but raises ValueError if the element isn't in the list. Before calling .index(), check if the element exists using 'in': if 'yellow' in colors, or use try/except to handle the ValueError. Unlike .find() for strings (returns -1), .index() raises an error.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    },
    {
        id: "t2d-string-split-default",
        tier: 2,
        tags: ["strings", "methods", "split"],
        title: "Split With Wrong Delimiter",
        code: "data = 'apple banana cherry'\nitems = data.split(',')\nprint('First item:', items[0])\nprint('Count:', len(items))",
        bugLine: 2,
        bugDescription: "String has spaces but split uses comma; result is single item; use split() or split(' ')",
        bugChoices: [
            "String uses spaces but split(',') looks for commas; use split() (default whitespace) or split(' ')",
            "split() method syntax is incorrect",
            "Should use data.split(',', ' ') with multiple delimiters",
            "Missing parentheses in split call"
        ],
        correctBugChoice: 0,
        fixedCode: "data = 'apple banana cherry'\nitems = data.split()\nprint('First item:', items[0])\nprint('Count:', len(items))",
        explanation: "The .split() method splits on the specified delimiter. Using split(',') on a space-separated string returns the whole string as a single element. Call split() without arguments to split on any whitespace (spaces, tabs, newlines), or specify the correct delimiter: split(' ') for single spaces.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#str.split"
    },
    {
        id: "t2d-tuple-single-element",
        tier: 2,
        tags: ["tuples", "syntax", "literals"],
        title: "Missing Comma in Single-Element Tuple",
        code: "single = (42)\nprint('Type:', type(single))\nprint('Is tuple:', isinstance(single, tuple))",
        bugLine: 1,
        bugDescription: "(42) is int, not tuple; need comma for single-element tuple: (42,)",
        bugChoices: [
            "(42) is just int in parentheses; use (42,) with trailing comma for single-element tuple",
            "Tuple syntax requires square brackets",
            "Should use tuple(42) instead",
            "Missing quotes around the number"
        ],
        correctBugChoice: 0,
        fixedCode: "single = (42,)\nprint('Type:', type(single))\nprint('Is tuple:', isinstance(single, tuple))",
        explanation: "Parentheses alone don't create a tuple; the comma does. (42) is just an integer with parentheses. To create a single-element tuple, add a trailing comma: (42,). This is required because parentheses are also used for grouping expressions. Empty tuple () and multi-element tuples (1, 2) work as expected.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    },
    {
        id: "t2d-list-plus-equals",
        tier: 2,
        tags: ["lists", "operators", "concatenation"],
        title: "Adding Single Element Without List",
        code: "tasks = ['code', 'test']\ntasks += 'deploy'\nprint('Tasks:', tasks)",
        bugLine: 2,
        bugDescription: "+= iterates over string, adding each char as element; use tasks += ['deploy']",
        bugChoices: [
            "+= iterates string chars: ['code', 'test', 'd', 'e', 'p', 'l', 'o', 'y']; use tasks += ['deploy']",
            "Should use tasks.append('deploy') instead",
            "+= operator doesn't work with lists",
            "Missing parentheses around 'deploy'"
        ],
        correctBugChoice: 0,
        fixedCode: "tasks = ['code', 'test']\ntasks += ['deploy']\nprint('Tasks:', tasks)",
        explanation: "The += operator extends a list by iterating over the right operand. Using tasks += 'deploy' iterates over the string, adding each character: ['code', 'test', 'd', 'e', 'p', 'l', 'o', 'y']. To add a single item, use append() or wrap in a list: tasks += ['deploy'].",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    },
    {
        id: "t2d-dict-keys-order",
        tier: 2,
        tags: ["dictionaries", "ordering", "iteration"],
        title: "Assuming Dict Key Order",
        code: "person = {'name': 'Bob', 'age': 30, 'city': 'NYC'}\nkeys = list(person)\nif keys[0] == 'name' and keys[1] == 'age':\n    print('Correct order')\nelse:\n    print('Wrong order')",
        bugLine: 3,
        bugDescription: "Dict order is insertion order (Python 3.7+) but shouldn't rely on indices; use keys directly",
        bugChoices: [
            "Relying on dict key order by index is fragile; use 'name' in person or person['name'] directly",
            "list() doesn't work on dictionaries",
            "Should use keys[0] == 'Bob' to check values",
            "Comparison operators are incorrect"
        ],
        correctBugChoice: 0,
        fixedCode: "person = {'name': 'Bob', 'age': 30, 'city': 'NYC'}\nif 'name' in person and 'age' in person:\n    print('Correct order')\nelse:\n    print('Wrong order')",
        explanation: "While Python 3.7+ maintains insertion order for dicts, relying on positional indices is bad practice because: 1) code is less readable, 2) breaks if keys are added/removed elsewhere, 3) doesn't express intent clearly. Access dict values by key directly: person['name'], or check membership with 'name' in person.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#dict"
    },
    {
        id: "t2d-set-add-list",
        tier: 2,
        tags: ["sets", "type-error", "mutability"],
        title: "Adding Unhashable Type to Set",
        code: "tags = set()\ntags.add('python')\ntags.add(['web', 'api'])\nprint(tags)",
        bugLine: 3,
        bugDescription: "Lists are unhashable and cannot be added to sets",
        bugChoices: [
            "Lists are mutable/unhashable and can't be added to sets; use a tuple or add items individually",
            "The add() method only accepts numeric values",
            "Sets cannot contain string values",
            "The set() constructor requires initial values"
        ],
        correctBugChoice: 0,
        fixedCode: "tags = set()\ntags.add('python')\ntags.update(['web', 'api'])\nprint(tags)",
        explanation: "Sets require their elements to be hashable (immutable). Lists are mutable and therefore unhashable, causing TypeError. Use update() to add multiple items from a list, or add() with tuples/strings. Only immutable types (strings, numbers, tuples of immutables) can be set members.",
        conceptLink: "https://docs.python.org/3/library/stdtypes.html#set"
    },
    {
        id: "t2d-pop-empty-list",
        tier: 2,
        tags: ["lists", "methods", "index-error"],
        title: "Pop from Empty List",
        code: "stack = [1, 2, 3]\nwhile stack:\n    stack.pop()\nlast = stack.pop()\nprint(last)",
        bugLine: 4,
        bugDescription: "Popping from empty list raises IndexError; the while loop already emptied it",
        bugChoices: [
            "The while loop empties the list, then pop() on empty list raises IndexError",
            "The pop() method doesn't work after a while loop",
            "The variable 'last' conflicts with a built-in function",
            "The while condition should use len(stack) > 0"
        ],
        correctBugChoice: 0,
        fixedCode: "stack = [1, 2, 3]\nwhile len(stack) > 1:\n    stack.pop()\nlast = stack.pop()\nprint(last)",
        explanation: "The while loop condition 'while stack' is truthy as long as the list is non-empty. It pops all elements, leaving an empty list. The subsequent pop() on an empty list raises IndexError. Either stop the loop earlier (while len(stack) > 1) or check if the list is non-empty before the final pop.",
        conceptLink: "https://docs.python.org/3/tutorial/datastructures.html#using-lists-as-stacks"
    }
];
