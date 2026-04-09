export default {
  id: 'linux-07',
  domain: 'linux',
  title: 'Seeing the World as the Shell Sees It',
  subtitle: 'The shell rewrites your commands before running them. Learn what it sees.',
  chapterLabel: 'Chapter 7 of 36 · Linux & Systems',
  nextChapter: 'linux-08',
  unlocks: ['linux-08'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Expansion',
      title: 'The shell transforms your input before executing it.',
      body: 'When you type echo *, you do not see a literal asterisk. The shell expands * into a list of every file in the current directory before echo ever runs. This is expansion. The shell is a preprocessor. It reads what you typed, transforms it according to its rules, and then executes the result. You are never running exactly what you typed.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Globbing',
      title: '* matches everything. ? matches one character. [] matches a set.',
      body: '*.txt matches all text files. file?.txt matches file1.txt, fileA.txt — any single character. [abc]* matches anything starting with a, b, or c. These are called glob patterns. The shell expands them into lists of matching filenames before your command sees them. The command never knows you used a glob.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'Brace Expansion',
      title: 'Braces generate arbitrary strings.',
      body: 'echo {a,b,c} produces a b c. mkdir project/{src,bin,docs} creates three directories in one command. echo {1..10} produces 1 through 10. Brace expansion is not pattern matching — it generates strings from a template. It runs before glob expansion. The order of expansions matters.',
    },
    {
      id: 'c4',
      type: 'concept',
      label: 'Command Substitution',
      title: '$(command) inserts the output of one command into another.',
      body: 'echo "Today is $(date)" runs the date command and inserts its output into the echo string. ls -l $(which python) finds the path to python and then lists its details. Command substitution lets you use the output of any command as input to any other command. This is composability at its purest.',
    },
    {
      id: 'c5',
      type: 'analogy',
      label: 'Analogy',
      body: 'You are dictating a letter to an assistant. You say "send this to everyone on the list." The assistant does not write the word "everyone" — they look up the list, get the names, and send individual letters. The shell is that assistant. You speak in shorthand. The shell translates to specifics before acting.',
    },
    {
      id: 'c6',
      type: 'concept',
      label: 'Quoting',
      title: 'Quotes control what the shell expands.',
      body: 'Double quotes suppress most expansion but allow variable and command substitution. Single quotes suppress all expansion — what you type is exactly what the command receives. Backslash escapes a single character. Understanding quoting is understanding when you want the shell to interpret and when you want it to pass through literally.',
    },
  ],

  check: {
    question: 'What does * expand to?',
    options: [
      { text: 'The contents of the current file', correct: false },
      { text: 'All filenames in the current directory', correct: true },
      { text: 'All running processes', correct: false },
    ],
    wrongResponse: "That is not what the shell does with *.\n\nThe asterisk is a glob pattern. Before your command ever runs, the shell replaces * with a list of every filename in the current directory. echo * does not print an asterisk. It prints every file name. The command does not know you typed a glob — it just receives the expanded list.\n\nThis is expansion. The shell rewrites before executing. Try again.",
    correctResponse: "That is exactly right.\n\nThe shell sees * and replaces it with every filename before your command runs. This is the fundamental mechanism — the shell is an interpreter sitting between you and the commands, rewriting your input according to its rules."
  },

  peak_moment: "The shell is not running your commands. It is rewriting them first.\n\nYou just learned to see what the shell sees before it acts. Expansion, globbing, substitution, quoting — these are the rules of the preprocessor. Most people type commands and wonder why the output is unexpected. You now know why. You see the intermediate step.\n\nThat is a fundamentally different understanding.",

  exit_hook: "You understand what the shell does to your commands before executing them.\n\nChapter 8 is about speed. Keyboard shortcuts, history search, tab completion — the muscle memory that separates someone who uses the terminal from someone who lives in it.\n\nThis is where you get fast."
}
