import { Route, Routes, Navigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AccountActivationPage } from './pages/AccountActivationPage';
import { RequireAuth } from './components/RequireAuth';
import { MainPage } from './pages/MainPage';
import { RequireNoAuth } from './components/RequireNoAuth';
import { Loader } from './components/Loader';
import { AuthContext } from './components/AuthContext';

function App() {
  const {
    isChecked,
    checkAuth,
  } : any = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <div className="App__window">
        <Header />

        {!isChecked ? (
          <Loader />
        ) : (
          <main className="App__content">
            <Routes>
              <Route path="/" element={<RequireNoAuth />}>
                <Route path="login" element={<LoginPage />} />

                <Route path="signup" element={<SignupPage />} />
              </Route>

              <Route
                path="activate/:activationToken"
                element={<AccountActivationPage />}
              />

              <Route path="/" element={<RequireAuth />}>
                <Route path="/chats">
                  <Route
                    index
                    element={<MainPage />}
                  />
                  <Route
                    path=":chatId"
                    element={<MainPage />}
                  />
                </Route>
              </Route>

              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
