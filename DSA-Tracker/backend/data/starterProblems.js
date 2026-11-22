const starterProblems = [
  {
    title: 'Two Sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/two-sum/',
    status: 'Solved',
    notes: 'Used hash map to store complement and index for O(n) time complexity.'
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    topic: 'Arrays',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    status: 'Solved',
    notes: 'Track minimum buying price and calculate max profit on the fly.'
  },
  {
    title: 'Product of Array Except Self',
    topic: 'Arrays',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/product-of-array-except-self/',
    status: 'Unsolved',
    notes: 'Prefix and suffix products in O(n) without using division operator.'
  },
  {
    title: 'Valid Palindrome',
    topic: 'Strings',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/valid-palindrome/',
    status: 'Solved',
    notes: 'Two-pointer approach after filtering out alphanumeric characters.'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Strings',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    status: 'Unsolved',
    notes: 'Sliding window technique using a Set/Map to track character indices.'
  },
  {
    title: 'Reverse Linked List',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/reverse-linked-list/',
    status: 'Solved',
    notes: 'Iterative approach using prev, curr, and next pointers.'
  },
  {
    title: 'Merge Two Sorted Lists',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    status: 'Solved',
    notes: 'Dummy node technique to simplify edge cases.'
  },
  {
    title: 'Valid Parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/valid-parentheses/',
    status: 'Solved',
    notes: 'Use stack to push expected closing brackets.'
  },
  {
    title: 'Min Stack',
    topic: 'Stack',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/min-stack/',
    status: 'Unsolved',
    notes: 'Maintain an auxiliary stack for minimum values.'
  },
  {
    title: 'Implement Queue using Stacks',
    topic: 'Queue',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    status: 'Solved',
    notes: 'Use two stacks: input stack for push, output stack for pop/peek.'
  },
  {
    title: 'Binary Search',
    topic: 'Binary Search',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/binary-search/',
    status: 'Solved',
    notes: 'Standard binary search on sorted array: mid = low + (high - low)/2.'
  },
  {
    title: 'Search in Rotated Sorted Array',
    topic: 'Binary Search',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    status: 'Unsolved',
    notes: 'Identify which half is sorted first, then narrow down.'
  },
  {
    title: 'Merge Sort',
    topic: 'Sorting',
    difficulty: 'Medium',
    problemLink: 'https://www.geeksforgeeks.org/merge-sort/',
    status: 'Solved',
    notes: 'Divide and conquer algorithm with O(n log n) stable sorting.'
  },
  {
    title: 'Climbing Stairs',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/climbing-stairs/',
    status: 'Solved',
    notes: 'Equivalent to Fibonacci numbers. dp[i] = dp[i-1] + dp[i-2].'
  },
  {
    title: 'Coin Change',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/coin-change/',
    status: 'Unsolved',
    notes: 'Bottom-up DP: dp[i] = min(dp[i], dp[i - coin] + 1).'
  },
  {
    title: 'Trapping Rain Water',
    topic: 'Arrays',
    difficulty: 'Hard',
    problemLink: 'https://leetcode.com/problems/trapping-rain-water/',
    status: 'Unsolved',
    notes: 'Two pointers approach tracking left_max and right_max.'
  },
  {
    title: 'Maximum Depth of Binary Tree',
    topic: 'Trees',
    difficulty: 'Easy',
    problemLink: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    status: 'Solved',
    notes: 'Simple recursion: 1 + max(depth(left), depth(right)).'
  },
  {
    title: 'Validate Binary Search Tree',
    topic: 'Binary Search Trees',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/validate-binary-search-tree/',
    status: 'Unsolved',
    notes: 'Pass lower and upper bounds through recursive traversal.'
  },
  {
    title: 'Number of Islands',
    topic: 'Graphs',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/number-of-islands/',
    status: 'Unsolved',
    notes: 'BFS or DFS traversal marking visited land cells.'
  },
  {
    title: 'Kth Largest Element in an Array',
    topic: 'Heap',
    difficulty: 'Medium',
    problemLink: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    status: 'Unsolved',
    notes: 'Min-heap of size k or QuickSelect algorithm.'
  }
];

module.exports = starterProblems;
