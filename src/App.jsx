import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Account from './pages/Account/Account.jsx';
import SignIn from './pages/SignIn/SignIn';
import OnlyLogoutUser from './privacyCheck/OnlyLogoutUser.jsx';
import OnlyLoginUser from './privacyCheck/OnlyLoginUser.jsx';
import styles from './app.module.scss'
import Remember from './pages/RememberPass/Remember.jsx'
import UndefinedPage from './pages/404/undefinedPage.jsx'
import ChangePass from './pages/ChangePass/ChangePass.jsx'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='chat-client/' element={<OnlyLogoutUser><SignIn /></OnlyLogoutUser>} />
          <Route path='chat-client/SignUp' element={<OnlyLogoutUser><SignUp /></OnlyLogoutUser>} />
          <Route path='chat-client/RememberSendMail' element={<OnlyLogoutUser><Remember /></OnlyLogoutUser>} />
          <Route path='chat-client/ChangePass/:link' element={<OnlyLogoutUser><ChangePass /></OnlyLogoutUser>} />
          <Route path='chat-client/Account' element={<OnlyLoginUser><Account/></OnlyLoginUser>} />
          <Route path='*' element={<UndefinedPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
