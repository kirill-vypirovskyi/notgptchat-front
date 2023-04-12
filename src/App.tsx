import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AccountActivationPage } from './pages/AccountActivationPage';
import { RequireAuth } from './components/RequireAuth';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <div className="App__window">
        <Header />

        <main className="App__content">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="/" element={<RequireAuth />}>
              <Route
                path="/main"
                element={<MainPage />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
