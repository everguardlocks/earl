export default {
  id: 'linux-03',
  domain: 'linux',
  title: 'Exploring the System',
  subtitle: 'The filesystem talks. These commands teach you how to listen.',
  chapterLabel: 'Chapter 3 of 36 · Linux & Systems',
  nextChapter: 'linux-04',
  unlocks: ['linux-04'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Seeing More',
      title: 'ls is deeper than you think.',
      body: 'ls alone gives you names. ls -l gives you the full story — permissions, owner, group, size, modification date. ls -a reveals hidden files that start with a dot. ls -t sorts by time. ls -S sorts by size. ls -h makes sizes human-readable. These flags combine. ls -lah gives you everything, including files the system does not want you to see by default.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Identifying Files',
      title: 'file tells you what something actually is.',
      body: 'On Linux, file extensions are optional. A file named data could be text, could be a binary, could be an image. The file command reads the actual content and tells you what it is. file data might return "ASCII text" or "ELF 64-bit executable." Do not trust extensions. Trust the file command.',
    },
    {
      id: 'c3',
      type: 'analogy',
      label: 'Analogy',
      body: 'Imagine a warehouse with no labels on any of the boxes. ls is walking in and seeing the boxes. ls -l is reading the shipping labels. file is opening a box and looking inside. less is reading the entire contents page by page. Each tool gives you a different depth of information about the same thing.',
    },
    {
      id: 'c4',
      type: 'concept',
      label: 'Reading Files',
      title: 'less lets you read without drowning.',
      body: 'cat dumps the entire file to your screen at once. For a 10,000 line config file, that is useless. less opens the file and lets you scroll through it. Space moves forward. b moves back. / lets you search. q quits. less is how professionals read files in the terminal. Learn it now.',
    },
    {
      id: 'c5',
      type: 'marginnote',
      body: 'The name "less" is a Unix joke. The original pager was called "more" because it showed you more of the file. "less" was written as an improvement — and the name stuck because "less is more."',
    },
  ],

  check: {
    question: 'What does the -a flag show when used with ls?',
    options: [
      { text: 'Files sorted alphabetically', correct: false },
      { text: 'All files, including hidden ones starting with a dot', correct: true },
      { text: 'Files with their absolute paths', correct: false },
    ],
    wrongResponse: "You are thinking about what -a could mean by guessing from the letter. Stop guessing.\n\nThe -a flag means \"all.\" And \"all\" on Linux specifically means including hidden files — files whose names start with a dot. These files exist in almost every directory. Your home directory has dozens of them right now. Without -a, you never see them.\n\nThat is the difference. Try again.",
    correctResponse: "Exactly.\n\nHidden files are not protected files. They are just files that start with a dot. The system hides them to reduce noise, not to keep secrets. Now you know they are there."
  },

  peak_moment: "Hidden files are not hidden from you anymore.\n\nThat is a different level of access than you had an hour ago. Most people who use computers daily have never seen a hidden file. They do not know their home directory has dozens of configuration files quietly shaping every tool they use.\n\nYou see them now. That changes everything.",

  exit_hook: "You can see the filesystem. You can read it. You can identify what things are.\n\nChapter 4 is where you start changing it.\n\nCreating. Moving. Deleting. Linking.\n\nThis is where it gets real."
}
