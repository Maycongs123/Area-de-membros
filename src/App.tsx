import React from 'react'
import GlobalStyle from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { RouterProvider } from 'react-router-dom'
import { router } from './Routes'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
