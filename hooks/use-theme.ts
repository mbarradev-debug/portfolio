'use client'

import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'dark' | 'light'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark'
}

function getServerSnapshot(): Theme {
  return 'dark'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.add('theme-transition')
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 300)
  }, [theme])

  return { theme, toggleTheme }
}
