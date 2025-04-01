import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './utils/UserContext.jsx'
import { TaskProvider } from './utils/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <TaskProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskProvider>
  </UserProvider>
)
