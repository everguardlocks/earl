export default {
  id: 'linux-04',
  domain: 'linux',
  title: 'Manipulating Files and Directories',
  subtitle: 'You stop observing and start reshaping.',
  chapterLabel: 'Chapter 4 of 36 · Linux & Systems',
  nextChapter: 'linux-05',
  unlocks: ['linux-05'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'Creating',
      title: 'mkdir creates directories. touch creates files.',
      body: 'mkdir projects creates a directory called projects. mkdir -p projects/src/utils creates the entire nested path at once — even if the parent directories do not exist yet. touch creates empty files or updates timestamps on existing ones. These are the two commands that bring things into existence.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Copying and Moving',
      title: 'cp copies. mv moves and renames.',
      body: 'cp file.txt backup.txt creates a copy. cp -r copies entire directories recursively. mv file.txt /tmp/ moves a file. mv old.txt new.txt renames it. The same command moves and renames because on Linux, renaming is just moving a file to the same directory with a different name. Elegant.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'Destroying',
      title: 'rm removes files. rm -r removes directories. There is no undo.',
      body: 'rm file.txt deletes it. Not to a trash can. It is gone. rm -r directory/ removes the directory and everything inside it. rm -rf removes it without asking. No confirmation, no safety net. The system trusts you. If you tell it to delete everything, it will delete everything.',
    },
    {
      id: 'c4',
      type: 'analogy',
      label: 'Analogy',
      body: 'cp is a photocopier. mv is picking something up and putting it somewhere else. rm is a shredder. There is no unshredder. The filesystem gives you absolute power over its contents. That power includes the power to destroy. The system will not protect you from yourself.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'Linking',
      title: 'Hard links and symbolic links are two different things.',
      body: 'A hard link is a second name for the same file data on disk. Delete one name, the data survives under the other. A symbolic link is a pointer — a shortcut that says \"the real file is over there.\" Delete the original and the symlink breaks. Hard links share data. Symbolic links share location. ln creates hard links. ln -s creates symbolic links.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'The rm -rf / command would attempt to delete every file on the entire system. Modern Linux distributions have safeguards against this specific case, but the principle remains — the command line does exactly what you tell it. Respect that.',
    },
  ],

  check: {
    question: 'What is the difference between a hard link and a symbolic link?',
    options: [
      { text: 'Hard links work across filesystems, symbolic links do not', correct: false },
      { text: 'A hard link shares the same data on disk, a symbolic link is a pointer to a file location', correct: true },
      { text: 'They are the same thing with different syntax', correct: false },
    ],
    wrongResponse: "You have it backwards or blurred.\n\nA hard link is another name for the same physical data. Two names, one file. Delete one name, the data persists. A symbolic link is a signpost — it points to a location. If the original moves or gets deleted, the symlink breaks. It points to nothing.\n\nHard links are twins. Symbolic links are directions to someone else's house. Try again.",
    correctResponse: "That is the distinction.\n\nHard links share data. Symbolic links share location. This matters when you are managing servers, deploying code, or understanding how package managers wire things together. You will see both everywhere."
  },

  peak_moment: "You can now reshape a filesystem.\n\nCreate directories. Copy files across the system. Move things. Delete things permanently. Link them together in two fundamentally different ways.\n\nWith rm -rf you can delete everything. That is not a warning — that is the truth of what you have access to now. The system trusts you completely.\n\nEarn that trust.",

  exit_hook: "You know how to manipulate files. But you have been using commands without fully understanding them.\n\nChapter 5 is about the commands themselves — how to find them, how to read their manuals, how to learn any command from within the system.\n\nYou are about to stop needing tutorials."
}
