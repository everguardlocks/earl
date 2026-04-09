export default {
  id: 'linux-01',
  domain: 'linux',
  title: 'What Is the Shell?',
  subtitle: 'What it is, why it matters, and why you are already more prepared than you think.',
  chapterLabel: 'Chapter 1 of 36 · Linux & Systems',
  nextChapter: 'linux-02',
  unlocks: ['linux-02', 'linux-03'],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'The Simple Version',
      title: 'Linux is an operating system.',
      body: 'It is the software layer between you and the hardware. Every command you type, every file you open, every program you run — Linux is managing that conversation. It is running on more devices than any other operating system on earth. Servers, phones, satellites, stock exchanges, submarines. The infrastructure of the modern world runs on Linux.',
    },
    {
      id: 'c2',
      type: 'analogy',
      label: 'Analogy',
      body: 'Think of your computer like a restaurant. The hardware — CPU, memory, disk — is the kitchen. The software you use — browser, text editor — is the food that comes out. Linux is the kitchen staff. You never see them. But nothing comes out without them. Every order goes through the kitchen. Every piece of food is their output. Linux is the kitchen.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'Why It Matters',
      title: 'The people who control infrastructure control everything.',
      body: 'Every company that runs at scale runs on Linux. AWS, Google Cloud, Azure — all Linux underneath. Every website you have ever visited was almost certainly served from a Linux machine. If you understand Linux, you understand the substrate of the modern internet. That is not a small thing.',
    },
    {
      id: 'c4',
      type: 'concept',
      label: 'What Makes It Different',
      title: 'Linux is open. Windows and macOS are not.',
      body: 'The source code is public. Anyone can read it, modify it, distribute it. This produced something unusual — thousands of engineers improving the same codebase for decades, for free, because they believed in it. The result is an operating system that is more stable, more secure, and more powerful than anything built behind closed doors.',
    },
    {
      id: 'c5',
      type: 'marginnote',
      body: 'The Linux kernel was written by Linus Torvalds in 1991. He was 21 years old. He announced it on a mailing list with: "I\'m doing a (free) operating system (just a hobby, won\'t be big and professional like gnu)." It now powers most of the internet.',
    },
    {
      id: 'c6',
      type: 'concept',
      label: 'The Mechanism',
      title: 'The kernel is the core.',
      body: 'Linux is technically just the kernel — the part that talks directly to hardware. What most people call "Linux" is actually a distribution: the kernel plus a collection of tools, a package manager, and sometimes a graphical interface. Ubuntu, Fedora, Debian, Arch — all Linux. Same kernel underneath, different choices on top.',
    },
  ],

  check: {
    question: 'What is the kernel?',
    options: [
      { text: 'The graphical interface you interact with', correct: false },
      { text: 'The core layer that communicates directly with hardware', correct: true },
      { text: 'A package manager for installing software', correct: false },
    ],
    wrongResponse: "Interesting. That answer tells me something specific.\n\nYou're thinking about the parts of Linux you can see — the interface, the tools. That's a reasonable place to look.\n\nHere's where that model breaks down — the kernel is invisible. It runs underneath everything. You never interact with it directly. It's the part that talks to the CPU, the memory, the disk. Everything else — including the interface — sits on top of it.\n\nTry it again.",
    correctResponse: "Exactly right.\n\nThe kernel is the part you never see and can't live without. Every distribution — Ubuntu, Fedora, Arch — is the kernel plus choices made on top of it. Same foundation. Different buildings."
  },

  peak_moment: "Here is what this means practically.\n\nWhen you SSH into a remote server at 2am because something is broken — and there is no graphical interface, no mouse, no familiar icons — just a blinking cursor and a command line — you will not panic.\n\nBecause you will know exactly where you are.\n\nYou are in the kitchen.",

  exit_hook: "Chapter 2 is the filesystem.\n\nThis is where Linux stops being abstract and starts being something you can touch.\n\nEvery file. Every directory. Every device. One unified structure.\n\nThere is a reason experienced engineers call it elegant."
}
