export default {
  id: 'linux-08',
  domain: 'linux',
  title: 'Advanced Keyboard Tricks',
  subtitle: 'Double your speed without learning a single new command.',
  chapterLabel: 'Chapter 8 of 36 · Linux & Systems',
  nextChapter: 'linux-09',
  unlocks: ['linux-09'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Readline',
      title: 'The terminal has a text editing engine. You have been ignoring it.',
      body: 'Every time you type in the terminal, you are using a library called readline. It has cursor movement, word deletion, line editing — all without leaving the command line. Ctrl+A jumps to the start of the line. Ctrl+E jumps to the end. Ctrl+W deletes the word behind the cursor. Alt+F moves forward one word. These are not optional shortcuts. They are the interface.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'History',
      title: 'Every command you have ever typed is saved.',
      body: 'The up arrow scrolls through your history. But that is the slow way. history shows the entire list with numbers. !123 reruns command number 123. !! reruns the last command. !grep reruns the last command that started with grep. Your history is a searchable, replayable record of everything you have done.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'Reverse Search',
      title: 'Ctrl+R searches your command history as you type.',
      body: 'Press Ctrl+R and start typing. The shell searches backwards through your history for commands matching what you type. Found it? Press Enter to run it. Press Ctrl+R again to find the next match further back. This is the fastest way to find and rerun any command from your past. It is the single most useful keyboard shortcut in the terminal.',
    },
    {
      id: 'c4',
      type: 'analogy',
      label: 'Analogy',
      body: 'Using the terminal without keyboard shortcuts is like typing an essay with one finger. The result is the same but the process is agonizingly slow. Readline shortcuts are touch typing for the command line. They do not change what you can do. They change how fast you can do it. Speed in the terminal is a compounding advantage — every second saved multiplies across thousands of commands.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'Tab Completion',
      title: 'Tab finishes what you started typing.',
      body: 'Type the first few letters of a file or command name and press Tab. The shell completes it. If there are multiple matches, press Tab twice to see them all. This is not just convenience — it prevents typos, reveals available options, and confirms that a file or command exists. If Tab does not complete, what you are looking for is not there.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'Readline is used in more than just bash. Python, Node.js, PostgreSQL — any interactive prompt that feels responsive is probably using readline underneath. The shortcuts you learn here work in dozens of other tools.',
    },
  ],

  check: {
    question: 'What does Ctrl+R do?',
    options: [
      { text: 'Refreshes the terminal display', correct: false },
      { text: 'Searches backward through command history', correct: true },
      { text: 'Restarts the current shell session', correct: false },
    ],
    wrongResponse: "That is a reasonable guess but it is wrong.\n\nCtrl+R activates reverse incremental search. You press it and start typing any part of a previous command. The shell searches backward through your entire history and shows the most recent match. Press Ctrl+R again to go further back. Enter to execute. Escape to exit.\n\nThis will save you more time than any other shortcut. Try again.",
    correctResponse: "That is right.\n\nCtrl+R is reverse search. It is the fastest way to find any command you have ever typed. Once this becomes muscle memory, you will never scroll through history with the arrow key again."
  },

  peak_moment: "You just doubled your speed in the terminal without learning a single new command.\n\nReadline shortcuts, history search, tab completion — these are not extras. They are the difference between someone who uses the terminal and someone who moves through it like it is an extension of their hands.\n\nMuscle memory is a skill. Start building it now.",

  exit_hook: "Speed is solved. Now comes control.\n\nChapter 9 is permissions — who can do what, and why. This is the security model of the entire operating system.\n\nEvery breach, every misconfiguration, every locked-out user — it starts here."
}
