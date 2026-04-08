export const DOMAINS = [
  {
    id: 'linux',
    name: 'Linux & Systems',
    icon: '⬡',
    totalChapters: 36,
    nodes: [
      { id: 'linux-01', label: 'Introduction to Linux', sublabel: 'Chapter 1 of 36', x: 300, y: 215, state: 'active' },
      { id: 'linux-02', label: 'The Filesystem',        sublabel: 'Chapter 2 of 36', x: 445, y: 148, state: 'locked' },
      { id: 'linux-03', label: 'Terminal Basics',       sublabel: 'Chapter 3 of 36', x: 155, y: 142, state: 'locked' },
      { id: 'linux-04', label: 'Shell Scripting',       sublabel: 'Chapter 4 of 36', x: 172, y: 308, state: 'locked' },
      { id: 'linux-05', label: 'Processes',             sublabel: 'Chapter 5 of 36', x: 446, y: 305, state: 'locked' },
      { id: 'linux-06', label: 'Text Editors',          sublabel: 'Chapter 6 of 36', x: 298, y: 100, state: 'locked' },
    ],
    edges: [
      ['linux-01','linux-02'],['linux-01','linux-03'],['linux-01','linux-04'],
      ['linux-01','linux-05'],['linux-01','linux-06']
    ]
  }
]

export const getChapter = async (id) => {
  const modules = {
    'linux-01': () => import('./chapters/linux-01.js'),
  }
  if (!modules[id]) return null
  const mod = await modules[id]()
  return mod.default
}
