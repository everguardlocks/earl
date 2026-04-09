export default {
  id: 'linux-10',
  domain: 'linux',
  title: 'Processes',
  subtitle: 'See everything running. Control all of it.',
  chapterLabel: 'Chapter 10 of 36 · Linux & Systems',
  nextChapter: null,
  unlocks: [],

  concepts: [
    {
      id: 'c1',
      type: 'concept',
      label: 'What Is Running',
      title: 'ps shows you processes. top shows you everything in real time.',
      body: 'ps lists processes. ps aux shows every process on the system — owner, CPU usage, memory, the command that started it. top is the live version — a real-time dashboard updating every few seconds. htop is the modern upgrade with colors and mouse support. These tools show you what the machine is actually doing right now.',
    },
    {
      id: 'c2',
      type: 'concept',
      label: 'Foreground and Background',
      title: 'Jobs run in the foreground or background. You control which.',
      body: 'When you run a command, it takes over your terminal — that is foreground. Ctrl+Z pauses it. bg resumes it in the background. fg brings it back to the foreground. Adding & to the end of a command starts it in the background immediately. jobs lists everything running in the current shell session. You are a job manager.',
    },
    {
      id: 'c3',
      type: 'concept',
      label: 'Signals',
      title: 'kill sends signals to processes. It does not always mean death.',
      body: 'kill is misnamed. It sends signals. kill PID sends SIGTERM — a polite request to shut down. kill -9 PID sends SIGKILL — immediate termination, no cleanup, no saving state. Ctrl+C sends SIGINT — interrupt. There are dozens of signals. SIGTERM and SIGKILL are the two you will use. One asks. One demands.',
    },
    {
      id: 'c4',
      type: 'analogy',
      label: 'Analogy',
      body: 'Processes are employees working in an office building. ps is the employee directory. top is the security cameras — live feed of who is doing what. kill -15 is tapping someone on the shoulder and asking them to leave. kill -9 is security escorting them out immediately. The building is your machine. You are the building manager.',
    },
    {
      id: 'c5',
      type: 'concept',
      label: 'Process IDs',
      title: 'Every process has a unique PID. That is how you address it.',
      body: 'When a process starts, the kernel assigns it a PID — a process ID. PID 1 is always the init system, the first process that starts everything else. Your shell has a PID. Every command you run creates a new process with its own PID. ps and top show PIDs so you can target specific processes with kill or other signals.',
    },
    {
      id: 'c6',
      type: 'marginnote',
      body: 'Zombie processes are not alive but not fully dead — they have finished executing but their parent has not collected their exit status. They consume no resources but appear in ps output. They are harmless in small numbers but indicate a parent process that is not managing its children properly.',
    },
  ],

  check: {
    question: 'What does kill -9 do?',
    options: [
      { text: 'Sends a polite shutdown request to a process', correct: false },
      { text: 'Immediately terminates a process without allowing cleanup', correct: true },
      { text: 'Restarts a process with a new PID', correct: false },
    ],
    wrongResponse: "That describes kill without the -9 flag.\n\nPlain kill sends SIGTERM — signal 15. It is a request. The process can catch it, clean up, save state, then exit gracefully. kill -9 sends SIGKILL — signal 9. The process cannot catch it, cannot ignore it, cannot clean up. The kernel terminates it immediately.\n\nSIGTERM asks. SIGKILL tells. That distinction matters when you are managing production systems. Try again.",
    correctResponse: "That is correct.\n\nkill -9 is the last resort. It gives the process no chance to save state or clean up. Use SIGTERM first. Only escalate to SIGKILL when the process refuses to stop. That discipline will serve you when the stakes are higher than a practice exercise."
  },

  peak_moment: "You can now see everything running on a machine and stop any of it.\n\nps, top, kill, jobs, bg, fg — these are not user tools. These are operator tools. The person monitoring processes, managing resources, killing runaway programs — that person keeps systems alive.\n\nThat is not a user skill. That is an operator skill. You just crossed that line.",

  exit_hook: "Ten chapters. Ten layers of understanding.\n\nYou started not knowing what a shell was. You now navigate filesystems, manipulate files, chain commands through pipelines, understand expansion, control permissions, and manage processes.\n\nThis is not the end. This is the foundation.\n\nEverything that comes next builds on what you just learned."
}
