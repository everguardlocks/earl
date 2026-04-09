export default {
  id: 'linux-09',
  domain: 'linux',
  title: 'Permissions',
  subtitle: 'Who can do what. And why it matters more than anything else.',
  chapterLabel: 'Chapter 9 of 36 · Linux & Systems',
  nextChapter: 'linux-10',
  unlocks: ['linux-10'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'The Model',
      title: 'Every file has an owner, a group, and permissions for each.',
      body: 'Linux permissions answer three questions for every file: what can the owner do, what can the group do, what can everyone else do. The answers are read, write, and execute — in that order. ls -l shows this as a string like rwxr-xr-- which means owner can read/write/execute, group can read/execute, others can only read.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'The Numbers',
      title: 'chmod uses octal notation. Learn the pattern once.',
      body: 'Read is 4. Write is 2. Execute is 1. Add them together for each position. chmod 755 means owner gets 7 (4+2+1 = rwx), group gets 5 (4+0+1 = r-x), others get 5 (r-x). chmod 644 means owner reads and writes, everyone else only reads. These are the two most common permission sets you will ever use. 755 for executables. 644 for files.',
    },
    {
      id: 'c3',
      type: 'analogy',
      label: 'Analogy',
      body: 'Permissions are a building access system. The owner has the master key. The group has a department key. Everyone else has whatever access the front door policy allows. chmod is changing the locks. chown is transferring the master key to someone else. sudo is the override card that opens every door.',
    },
    {
      id: 'c4',
      type: 'concept',
      label: 'Changing Ownership',
      title: 'chown changes who owns a file. chgrp changes the group.',
      body: 'chown alice file.txt makes alice the owner. chown alice:developers file.txt sets both owner and group. Only root can change ownership — a regular user cannot give their files to someone else. This is intentional. Ownership transfer is a privileged operation because it changes who has ultimate control.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'Elevation',
      title: 'sudo executes a command as root. Use it deliberately.',
      body: 'sudo stands for "superuser do." It temporarily elevates your privileges to root — the account that can do anything. sudo apt install, sudo systemctl restart — any command that changes the system requires sudo. The password prompt is not an obstacle. It is a moment of confirmation. Am I sure I want to do this with full power?',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'umask sets the default permissions for new files. A umask of 022 means new files get 644 (rw-r--r--) and new directories get 755 (rwxr-xr-x). Most users never change their umask, which means most files are created readable by everyone on the system.',
    },
  ],

  check: {
    question: 'What does chmod 755 mean?',
    options: [
      { text: 'Owner: read/write/execute, group: read/execute, others: read/execute', correct: true },
      { text: 'Everyone gets full access to the file', correct: false },
      { text: 'The file becomes hidden from other users', correct: false },
    ],
    wrongResponse: "Break down the numbers.\n\n7 is 4+2+1 — read, write, execute. That is full access for the owner. 5 is 4+0+1 — read and execute, no write. That is for the group. The second 5 is the same for everyone else. So 755 means the owner controls the file completely, but others can read and run it without changing it.\n\nThis is the standard permission for executable programs. Try again.",
    correctResponse: "That is the correct breakdown.\n\n755 is the most common permission set for programs and directories. The owner has full control. Everyone else can read and execute but not modify. This is the balance between access and protection that most of Linux runs on."
  },

  peak_moment: "Permissions are the security model of the entire operating system. Every breach starts with a misconfigured permission. Every locked-out user is a permission problem. Every file you create has permissions right now.\n\nYou now understand the mechanism. When you hear about a security vulnerability that exploits incorrect file permissions, you will know exactly what went wrong and exactly how to fix it.\n\nThat is not a user skill. That is an engineer skill.",

  exit_hook: "You control access. You understand ownership. You know what sudo really means.\n\nChapter 10 is processes — everything that is currently running on the machine. How to see it, how to control it, how to stop it.\n\nYou are about to see the machine in motion."
}
