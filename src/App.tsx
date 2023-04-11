import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { LoginSite } from './components/LoginSite';
import { SignupSite } from './components/SignupSite';

function App() {
  return (
    <div className="App">
      <div className="App__window">
        <Header />

        <Routes>
          <Route path="login" element={<LoginSite />} />
          <Route path="signup" element={<SignupSite />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
