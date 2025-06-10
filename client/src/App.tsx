import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import MainPage from './MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;