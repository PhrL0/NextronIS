"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Atualizar a lista de temas disponíveis
type Theme = "light" | "dark" | "material" | "cupertino" | "synthwave" | "minimal" | "custom"

// Definir a interface para temas personalizados
export interface CustomTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    card: string
    cardForeground: string
    border: string
    muted: string
    mutedForeground: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      base: string
      small: string
      large: string
    }
  }
  borderRadius: string
}

// Adicionar suporte para tema personalizado
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
  customTheme: CustomTheme | null
  setCustomTheme: (theme: CustomTheme) => void
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

// Atualizar o estado inicial para incluir os novos temas
const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  themes: ["light", "dark", "material", "cupertino", "synthwave", "minimal", "custom"],
  customTheme: null,
  setCustomTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Função corrigida para converter hex para HSL
const hexToHSL = (hex: string) => {
  try {
    // Remove the # if present
    hex = hex.replace("#", "")

    // Convert hex to rgb
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin
    let h = 0
    let s = 0
    let l = 0

    // Calculate hue
    if (delta === 0) h = 0
    else if (cmax === r) h = ((g - b) / delta) % 6
    else if (cmax === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)
    if (h < 0) h += 360

    // Calculate lightness
    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Convert to percentages
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return `${h} ${s}% ${l}%`
  } catch (error) {
    console.error("Error converting hex to HSL:", error, "for hex value:", hex)
    return "0 0% 0%"
  }
}

// Atualizar o ThemeProvider para suportar temas personalizados
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme
    } catch {
      return defaultTheme
    }
  })

  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(() => {
    try {
      const savedTheme = localStorage.getItem("custom-theme")
      return savedTheme ? JSON.parse(savedTheme) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      const root = window.document.documentElement

      // Remove all theme classes
      root.classList.remove(
        "theme-light",
        "theme-dark",
        "theme-material",
        "theme-cupertino",
        "theme-synthwave",
        "theme-minimal",
        "theme-custom",
      )

      // Add the current theme class
      root.classList.add(`theme-${theme}`)

      // Add dark class for dark themes
      if (theme === "dark" || theme === "synthwave") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }

      localStorage.setItem(storageKey, theme)

      // Apply custom theme if selected
      if (theme === "custom" && customTheme) {
        applyCustomTheme(customTheme, root)
      }
    } catch (error) {
      console.error("Error applying theme:", error)
    }
  }, [theme, customTheme, storageKey])

  // Function to apply custom theme CSS variables
  const applyCustomTheme = (theme: CustomTheme, root: HTMLElement) => {
    try {
      // Set CSS variables
      root.style.setProperty("--primary", hexToHSL(theme.colors.primary))
      root.style.setProperty("--secondary", hexToHSL(theme.colors.secondary))
      root.style.setProperty("--accent", hexToHSL(theme.colors.accent))
      root.style.setProperty("--background", hexToHSL(theme.colors.background))
      root.style.setProperty("--foreground", hexToHSL(theme.colors.foreground))
      root.style.setProperty("--card", hexToHSL(theme.colors.card))
      root.style.setProperty("--card-foreground", hexToHSL(theme.colors.cardForeground))
      root.style.setProperty("--border", hexToHSL(theme.colors.border))
      root.style.setProperty("--muted", hexToHSL(theme.colors.muted))
      root.style.setProperty("--muted-foreground", hexToHSL(theme.colors.mutedForeground))

      // Set typography
      root.style.setProperty("--font-family", theme.typography.fontFamily)
      root.style.setProperty("--font-size-base", theme.typography.fontSize.base)
      root.style.setProperty("--font-size-small", theme.typography.fontSize.small)
      root.style.setProperty("--font-size-large", theme.typography.fontSize.large)

      // Set border radius
      root.style.setProperty("--radius", theme.borderRadius)
    } catch (error) {
      console.error("Error applying custom theme:", error)
    }
  }

  // Save custom theme to localStorage when it changes
  useEffect(() => {
    if (customTheme) {
      try {
        localStorage.setItem("custom-theme", JSON.stringify(customTheme))
      } catch (error) {
        console.error("Error saving custom theme to localStorage:", error)
      }
    }
  }, [customTheme])

  const value = {
    theme,
    setTheme,
    themes: initialState.themes,
    customTheme,
    setCustomTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

