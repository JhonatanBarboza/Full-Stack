import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TodosPage from './pages/TodosPage';
import DashboardPage from './pages/DashboardPage';
import './styles/globals.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<TodosPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
