'use client'

import { useCallback } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = resolvedTheme ?? 'dark'

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.add('theme-transition')
    setTheme(next)
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 300)
  }, [theme, setTheme])

  return { theme, toggleTheme }
}
