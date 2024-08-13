import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'

const App : React.FC = () => {
      return (
          <Router>
            <div className='App'>
                  <Routes>
                        <Route path='/' element= {<MainPage/>} />
                  </Routes>
            </div>
          </Router>
      )
}

export default App
