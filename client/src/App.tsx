import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import MainPage from './MainPage';
import RegisterForm from './RegisterForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;