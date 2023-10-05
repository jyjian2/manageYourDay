import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {
    id: 1,
    content: 'Content one',
    important: true
  },
  {
    id: 2,
    content: 'Content two',
    important: false
  },
  {
    id: 3,
    content: 'Content three',
    important: true
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App notes={notes}/>
  </React.StrictMode>,
)
