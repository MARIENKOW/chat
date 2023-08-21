import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Account from './pages/Account/Account.jsx';
import SignIn from './pages/SignIn/SignIn';
import OnlyLogoutUser from './privacyCheck/OnlyLogoutUser.jsx';
import OnlyLoginUser from './privacyCheck/OnlyLoginUser.jsx';
import styles from './app.module.scss'
import Remember from './pages/RememberPass/Remember.jsx'
import UndefinedPage from './pages/404/undefinedPage.jsx'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<OnlyLogoutUser><SignIn /></OnlyLogoutUser>} />
          <Route path='/SignUp' element={<OnlyLogoutUser><SignUp /></OnlyLogoutUser>} />
          <Route path='/Account' element={<OnlyLoginUser><Account/></OnlyLoginUser>} />
          <Route path='/RememberSendMail' element={<OnlyLogoutUser><Remember /></OnlyLogoutUser>} />
          <Route path='*' element={<UndefinedPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
