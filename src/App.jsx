import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/Home.jsx'
import Trails from './components/Trails.jsx'
import Bookmarked from './components/Bookmarked.jsx'
import Sightseeing from './components/Sightseeing.jsx'
import Events from './components/Events.jsx'
import Blog from './components/Blog.jsx'
import SafetyTips from './components/SafetyTips.jsx'
import Login from './components/Login.jsx'
import Navigation from './components/Navigation.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { BookmarkProvider } from './contexts/BookmarkContext'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HashRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/trails" element={<Trails/>}></Route>
            <Route path="/sightseeing" element={<Sightseeing/>}></Route>
            <Route path="/events" element={<Events/>}></Route>
            <Route path="/bookmarked" element={<Bookmarked/>}></Route>
            <Route path="/blog" element={<Blog/>}></Route>
            <Route path="/safety-tips" element={<SafetyTips/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </HashRouter>
      </BookmarkProvider>
    </AuthProvider>
  )
}

export default App
