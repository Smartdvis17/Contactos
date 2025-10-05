
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Obtener tema guardado del localStorage o usar dark por defecto
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  // Objeto con todas las clases de tema
  const theme = {
    // Contenedores principales
    container: isDarkMode 
      ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-black min-h-screen'
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen',
    
    // Headers
    header: isDarkMode
      ? 'bg-zinc-800 border-zinc-700 text-white'
      : 'bg-gray-200 border-gray-400 text-gray-700',
    
    headerSubtext: isDarkMode ? 'text-zinc-400' : 'text-gray-500',
    
    // Cards y contenedores
    card: isDarkMode
      ? 'bg-zinc-900 border-zinc-700 shadow-2xl'
      : 'bg-white border-gray-200 shadow-lg',
    
    cardHeader: isDarkMode
      ? 'bg-zinc-800 border-zinc-700'
      : 'bg-gray-200 border-gray-400',
    
    // Formularios
    input: isDarkMode
      ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 focus:ring-zinc-500 focus:border-zinc-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-400',
    
    label: isDarkMode ? 'text-zinc-300' : 'text-gray-700',
    
    // Botones
    buttonPrimary: isDarkMode
      ? 'bg-white text-black hover:bg-zinc-200 focus:ring-white focus:ring-offset-zinc-900'
      : 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-600 focus:ring-offset-white',
    
    buttonSecondary: isDarkMode
      ? 'bg-zinc-800 text-zinc-300 border-zinc-600 hover:bg-zinc-700'
      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
    
    buttonDelete: isDarkMode
      ? 'text-red-500 bg-red-100 hover:bg-red-200 border-red-300 hover:border-red-400'
      : 'text-red-600 bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300',
    
    // Tablas
    table: isDarkMode ? 'bg-zinc-900 divide-zinc-700' : 'bg-white divide-gray-200',
    tableHeader: isDarkMode ? 'bg-zinc-700 border-zinc-600' : 'bg-gray-200 border-gray-400',
    tableHeaderText: isDarkMode ? 'text-zinc-200' : 'text-gray-700',
    tableRow: isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-50',
    tableText: isDarkMode ? 'text-white' : 'text-gray-900',
    tableSecondaryText: isDarkMode ? 'text-zinc-300' : 'text-gray-600',
    tableTertiaryText: isDarkMode ? 'text-zinc-400' : 'text-gray-500',
    
    // Iconos
    icon: isDarkMode ? 'text-zinc-300' : 'text-gray-600',
    iconSecondary: isDarkMode ? 'text-zinc-500' : 'text-gray-400',
    
    // Estados vacíos
    emptyState: isDarkMode ? 'text-zinc-400' : 'text-gray-500',
    emptyStateIcon: isDarkMode ? 'text-zinc-600' : 'text-gray-300',
    
    // Toggle button específico
    toggleButton: isDarkMode
      ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 border-zinc-600'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300'
  }

  const value = {
    isDarkMode,
    toggleTheme,
    theme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}