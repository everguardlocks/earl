export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, val) => localStorage.setItem(key, val),
  remove: (key) => localStorage.removeItem(key),
  isOnboarded: () => !!localStorage.getItem('earl_onboarded'),
  getDayOne: () => localStorage.getItem('earl_day_one_answer'),
  reset: () => {
    localStorage.removeItem('earl_onboarded')
    localStorage.removeItem('earl_day_one_answer')
  }
}
