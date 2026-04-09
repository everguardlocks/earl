export default {
  id: 'linux-02',
  domain: 'linux',
  title: 'Navigation',
  subtitle: 'Three commands. The entire filesystem opens up.',
  chapterLabel: 'Chapter 2 of 36 · Linux & Systems',
  nextChapter: 'linux-03',
  unlocks: ['linux-04'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Where You Are',
      title: 'pwd — print working directory.',
      body: 'Every time you open a terminal, you are somewhere in the filesystem. You have a location. pwd tells you that location. It prints the full path from the root of the system to wherever you are standing right now. This is the first thing you type when you are lost. And you will get lost.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'How You Move',
      title: 'cd — change directory.',
      body: 'cd is how you move. cd /home takes you to /home. cd .. takes you up one level. cd alone — no arguments — takes you home. Every directory is a room. cd is walking through doors. You will type this command more than any other command in your career.',
    },
    {
      id: 'c3',
      type: 'analogy',
      label: 'Analogy',
      body: 'The filesystem is a building. Every directory is a room. pwd is looking at the room number on the wall. cd is walking to a different room. ls is looking around the room you are standing in. You cannot interact with a file unless you know where it is. Navigation is not a feature. It is the prerequisite.',
    },
    {
      id: 'c4',
      type: 'concept',
      label: 'Two Ways to Describe Location',
      title: 'Absolute paths start from root. Relative paths start from here.',
      body: '/home/user/documents is an absolute path. It starts from / — the very top of the filesystem. documents/notes is a relative path. It starts from wherever you currently are. Both get you to the same place. Absolute paths are precise. Relative paths are fast. You will use both constantly.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'What You See',
      title: 'ls — list directory contents.',
      body: 'ls shows you what is in the current directory. Files, folders, everything visible. ls -l gives you the long format — permissions, owner, size, date. ls -a shows hidden files. Hidden files start with a dot. There are always more files than you think.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'The dot-dot notation (..) for parent directory comes from the original Unix filesystem design in the 1970s. Every directory contains two special entries: . (itself) and .. (its parent). The root directory / is the only place where .. points to itself.',
    },
  ],

  check: {
    question: 'What does cd .. do?',
    options: [
      { text: 'Changes to the home directory', correct: false },
      { text: 'Moves up one directory level', correct: true },
      { text: 'Lists the parent directory contents', correct: false },
    ],
    wrongResponse: "That answer tells me you are confusing two things.\n\ncd with no arguments takes you home. cd .. is different — the two dots mean \"the directory above this one.\" It is relative movement. You are not jumping to a known location. You are stepping one level up from wherever you currently stand.\n\nThat distinction matters everywhere in Linux. Try again.",
    correctResponse: "That is exactly right.\n\nTwo dots means parent. One dot means here. No dots means home. Three symbols, three meanings, zero ambiguity. The filesystem is precise because it has to be."
  },

  peak_moment: "You now know three commands — pwd, cd, ls.\n\nThat is enough to navigate any Linux machine on the planet. The same three commands work on a Raspberry Pi, a cloud server with 256 cores, and the International Space Station.\n\nYou are not learning commands. You are learning a language that works everywhere.",

  exit_hook: "Chapter 3 is where you stop just moving through the filesystem and start actually reading it.\n\nls has options you have not seen yet. There are flags that change everything about what the system tells you.\n\nThe filesystem has been talking this whole time. You are about to learn how to listen."
}
