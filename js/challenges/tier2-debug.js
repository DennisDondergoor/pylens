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
    }
];
