export const DOMAINS = [
  {
    id: 'linux',
    name: 'Linux & Systems',
    icon: '⬡',
    totalChapters: 36,
    nodes: [
      { id:'linux-01', label:'What Is the Shell?',                      sublabel:'Chapter 1 of 36', x:300, y:215, state:'active',  pdfPages:[26,29]  },
      { id:'linux-02', label:'Navigation',                               sublabel:'Chapter 2 of 36', x:445, y:148, state:'locked',  pdfPages:[30,35]  },
      { id:'linux-03', label:'Exploring the System',                     sublabel:'Chapter 3 of 36', x:155, y:142, state:'locked',  pdfPages:[36,45]  },
      { id:'linux-04', label:'Manipulating Files and Directories',       sublabel:'Chapter 4 of 36', x:172, y:308, state:'locked',  pdfPages:[46,61]  },
      { id:'linux-05', label:'Working with Commands',                    sublabel:'Chapter 5 of 36', x:446, y:305, state:'locked',  pdfPages:[62,71]  },
      { id:'linux-06', label:'Redirection',                              sublabel:'Chapter 6 of 36', x:298, y:100, state:'locked',  pdfPages:[72,83]  },
      { id:'linux-07', label:'Seeing the World as the Shell Sees It',   sublabel:'Chapter 7 of 36', x:120, y:260, state:'locked',  pdfPages:[84,93]  },
      { id:'linux-08', label:'Advanced Keyboard Tricks',                 sublabel:'Chapter 8 of 36', x:480, y:240, state:'locked',  pdfPages:[94,103] },
      { id:'linux-09', label:'Permissions',                              sublabel:'Chapter 9 of 36', x:240, y:360, state:'locked',  pdfPages:[104,121]},
      { id:'linux-10', label:'Processes',                                sublabel:'Chapter 10 of 36',x:380, y:370, state:'locked',  pdfPages:[122,145]},
    ],
    edges: [
      ['linux-01','linux-02'],['linux-01','linux-03'],['linux-02','linux-04'],
      ['linux-03','linux-04'],['linux-04','linux-05'],['linux-05','linux-06'],
      ['linux-06','linux-07'],['linux-07','linux-08'],['linux-08','linux-09'],
      ['linux-09','linux-10']
    ]
  }
]

export const UNLOCK_CHAIN = {
  'linux-01': ['linux-02', 'linux-03'],
  'linux-02': ['linux-04'],
  'linux-03': ['linux-04'],
  'linux-04': ['linux-05'],
  'linux-05': ['linux-06'],
  'linux-06': ['linux-07'],
  'linux-07': ['linux-08'],
  'linux-08': ['linux-09'],
  'linux-09': ['linux-10'],
  'linux-10': [],
}

export const getChapterFromPage = (page) => {
  const domain = DOMAINS[0]
  for (const node of domain.nodes) {
    const [start, end] = node.pdfPages
    if (page >= start && page <= end) return node.id
  }
  return null
}

export const getChapterTitle = (chapterId) => {
  const domain = DOMAINS[0]
  const node = domain.nodes.find(n => n.id === chapterId)
  return node ? node.label : null
}

export const getChapter = async (id) => {
  const modules = {
    'linux-01': () => import('./chapters/linux-01.js'),
    'linux-02': () => import('./chapters/linux-02.js'),
    'linux-03': () => import('./chapters/linux-03.js'),
    'linux-04': () => import('./chapters/linux-04.js'),
    'linux-05': () => import('./chapters/linux-05.js'),
    'linux-06': () => import('./chapters/linux-06.js'),
    'linux-07': () => import('./chapters/linux-07.js'),
    'linux-08': () => import('./chapters/linux-08.js'),
    'linux-09': () => import('./chapters/linux-09.js'),
    'linux-10': () => import('./chapters/linux-10.js'),
  }
  if (!modules[id]) return null
  const mod = await modules[id]()
  return mod.default
}
