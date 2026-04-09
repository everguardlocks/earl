export default {
  id: 'linux-06',
  domain: 'linux',
  title: 'Redirection',
  subtitle: 'The pipeline is the most powerful idea in Unix.',
  chapterLabel: 'Chapter 6 of 36 · Linux & Systems',
  nextChapter: 'linux-07',
  unlocks: ['linux-07'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Three Streams',
      title: 'Every command has three connections: stdin, stdout, stderr.',
      body: 'Standard input (stdin) is where a command reads data from — usually your keyboard. Standard output (stdout) is where it sends results — usually your screen. Standard error (stderr) is where it sends error messages — also your screen by default. These three streams are the foundation of everything that follows. Every command reads from one place and writes to two.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Redirecting Output',
      title: '> writes to a file. >> appends to a file.',
      body: 'ls > filelist.txt takes the output of ls and writes it into a file instead of the screen. If the file exists, > overwrites it completely. >> appends — adds to the end without destroying what was there. This is not a convenience feature. This is how you save data, create logs, build configuration files, and automate output.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'The Pipe',
      title: '| connects the output of one command to the input of another.',
      body: 'ls | grep txt takes the output of ls and feeds it directly into grep, which filters for lines containing "txt." The pipe is the Unix philosophy in one character — small tools that do one thing well, connected together to do complex things. Every command becomes a building block.',
    },
    {
      id: 'c4',
      type: 'analogy',
      label: 'Analogy',
      body: 'Think of commands as stations on an assembly line. Each station does one job. The pipe is the conveyor belt between them. > is boxing the product and shipping it to a specific address. >> is adding to an existing shipment. /dev/null is the incinerator — anything sent there disappears. The Unix philosophy is an assembly line where every station is interchangeable.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'The Black Hole',
      title: '/dev/null consumes anything sent to it.',
      body: 'Sometimes you want to throw output away. command > /dev/null discards stdout. command 2> /dev/null discards errors. command > /dev/null 2>&1 discards everything. /dev/null is not a file. It is a device that accepts input and does nothing with it. Silent execution.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'The pipe was invented by Doug McIlrath at Bell Labs in 1973. Ken Thompson added it to Unix overnight. It changed everything about how people thought about software — instead of building monolithic programs, you build small tools and connect them.',
    },
  ],

  check: {
    question: 'What does > do differently from >>?',
    options: [
      { text: '> appends to a file, >> overwrites it', correct: false },
      { text: '> overwrites a file, >> appends to it', correct: true },
      { text: '> redirects stderr, >> redirects stdout', correct: false },
    ],
    wrongResponse: "You have them backwards.\n\nOne arrow — > — is destructive. It replaces everything in the file with the new output. Two arrows — >> — is additive. It keeps what was there and adds to the end. This distinction matters every time you write to a log file, every time you build a script that saves output.\n\nGetting this backwards means losing data. Try again.",
    correctResponse: "That is the distinction that protects you.\n\nOne arrow replaces. Two arrows add. You will use >> far more often in practice because most of the time you do not want to destroy what already exists. Remember this when you start writing scripts."
  },

  peak_moment: "The pipeline is the most powerful idea in Unix. Every command becomes a building block. You just learned how to chain them.\n\nls | grep | sort | head — four simple commands that together answer complex questions. This is not just a technique. This is a philosophy. Small tools, loosely joined, doing extraordinary things.\n\nYou now think like a Unix engineer.",

  exit_hook: "You understand redirection and pipes. You can chain commands and save output.\n\nBut the shell is doing something before your commands even run. It is rewriting them.\n\nChapter 7 is about expansion — what the shell sees before you see the results. This is where things get strange."
}
