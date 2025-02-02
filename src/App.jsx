import './App.css'
import Button from './components/Button';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Quiz from './components/Quiz';
import { QuizProvider } from './utils/quizContext.jsx';
import Results from './components/Results.jsx';

function App() {

  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Button/>}></Route>
          <Route path="/quiz" element={<Quiz/>}></Route>
          <Route path="/results" element={<Results/>}></Route>
        </Routes>
      </Router>
    </QuizProvider>
  )
}

export default App
