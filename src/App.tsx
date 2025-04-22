import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/success" element={<Success message="You're all set!" onClose={() => { } } type={'success'} />} />
      <Route path="/error" element={<ErrorPage message="An error occurred." />} />
    </Routes>
  );
}
