import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import Problems from './pages/Problems'
import Learn from './pages/Learn'
import LessonPlay from './pages/LessonPlay'
import Profile from './pages/Profile'
import Social from './pages/Social'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/lesson/:id" element={<LessonPlay />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/social" element={<Social />} />
    </Routes>
  )
}
