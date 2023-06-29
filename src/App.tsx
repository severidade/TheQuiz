import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/home';
import Trivia from './pages/trivia';
import Feedback from './pages/feedback';
import NotFound from './pages/not-found';
import Register from './pages/register';
import Ranking from './pages/ranking';

function App() {
  return (
    <Provider store={ store }>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/trivia" element={ <Trivia /> } />
        <Route path="/feedback" element={ <Feedback /> } />
        <Route path="/ranking" element={ <Ranking /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Provider>
  );
}

export default App;
