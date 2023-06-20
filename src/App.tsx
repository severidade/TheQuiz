import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Trivia from './pages/trivia';
import Feedback from './pages/feedback';
import NotFound from './pages/not-found';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/trivia" element={ <Trivia /> } />
      <Route path="/feedback" element={ <Feedback /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
