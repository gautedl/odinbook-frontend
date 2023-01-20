import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import UserPage from './components/UserPage/UserPage';
import ThemeProvider from './contexts/ThemeProvider';
import StartupRouter from './helpers/StartupRouter';

function App() {
  return (
    <ThemeProvider>
      <div className="body">
        <HashRouter>
          <Routes>
            {/* <Route path="/" element={<StartupRouter />} /> */}
            <Route path="/" element={<StartupRouter />} />
            <Route path="/odinbook-frontend" element={<StartupRouter />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/user/page/:id" element={<UserPage />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
