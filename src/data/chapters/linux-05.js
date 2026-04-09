export default {
  id: 'linux-05',
  domain: 'linux',
  title: 'Working with Commands',
  subtitle: 'Stop memorizing. Start knowing how to find anything.',
  chapterLabel: 'Chapter 5 of 36 · Linux & Systems',
  nextChapter: 'linux-06',
  unlocks: ['linux-06'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'What Is a Command',
      title: 'type tells you what kind of command you are running.',
      body: 'Not all commands are the same kind of thing. Some are built into the shell itself — cd, echo, exit. Some are executable programs on disk — ls, cp, grep. Some are shell functions. Some are aliases. type ls tells you which kind ls is. This matters because it changes where the documentation lives and how the command behaves.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Finding Commands',
      title: 'which shows you where the executable lives.',
      body: 'which python tells you the path to the python binary the shell would execute. If you have multiple versions installed, which tells you which one wins. It searches your PATH — the list of directories the shell checks when you type a command name.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'The Manual',
      title: 'man is the manual. It is the single most important command you will learn.',
      body: 'man ls opens the manual page for ls. Every flag, every option, every behavior — documented. man pages are dense. They are not tutorials. They are reference material written by the people who built the tools. Learning to read them is a skill. It is the skill that separates people who know Linux from people who understand it.',
    },
    {
      id: 'c4',
      type: 'analogy',
      label: 'Analogy',
      body: 'Google is asking a stranger for directions. man is reading the architect\'s blueprint. The stranger might be wrong. The blueprint cannot be. Every command ships with its own documentation. You are carrying the answers with you. You just did not know where to look.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'When You Do Not Know the Command',
      title: 'apropos searches man pages by keyword.',
      body: 'You do not always know the command name. apropos "copy files" searches all man page descriptions for those words. It returns a list of commands related to your search. This is how you discover commands you have never heard of. The system documents itself. You just need to ask it the right question.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'The help command works for shell builtins — commands built into bash itself. help cd gives you documentation that man cd might not. Two different documentation systems for two different kinds of commands.',
    },
  ],

  check: {
    question: 'What does man do?',
    options: [
      { text: 'Manages installed packages', correct: false },
      { text: 'Opens the manual page for a command', correct: true },
      { text: 'Shows the command history', correct: false },
    ],
    wrongResponse: "You are guessing from the word instead of knowing the tool.\n\nman is short for manual. man ls opens the manual for ls. man cp opens the manual for cp. It is the built-in documentation system for every command on the system. It has been there since 1971. It is not optional knowledge — it is the foundation of self-directed learning on Linux.\n\nTry again.",
    correctResponse: "That is right.\n\nman is not a nice-to-know command. It is the command that makes all other commands learnable. Everything you need to know about any tool is already on your machine. man is how you access it."
  },

  peak_moment: "You do not need to memorize commands. You need to know how to find them.\n\nThat is the difference between someone who knows Linux and someone who understands it. The person who memorizes will run out of memory. The person who can read man pages, search with apropos, and identify command types with type — that person is unlimited.\n\nYou just became that person.",

  exit_hook: "You now know how commands work, how to find them, how to read their documentation.\n\nChapter 6 introduces the most powerful idea in Unix — the pipeline. Stdin, stdout, stderr. Redirection. The ability to chain commands together like building blocks.\n\nThis is where Linux stops being a tool and starts being a language."
}
