;(function () {
  try {
    const key = document.documentElement.dataset.uvThemeKey || 'uv-theme'
    const stored = localStorage.getItem(key)
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.classList.add(theme + '-theme')
  } catch {
    document.documentElement.classList.add('light-theme')
  }
})()
