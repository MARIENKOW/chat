import { BrowserRouter as Router, Routes, Route, useNavigate, useNavigation } from 'react-router-dom';
import Account from '../Account/Account';
import SignUp from '../SignUp/SignUp';
import { useContext, useEffect } from 'react';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import SignIn from '../SignIn/SignIn';


function Main() {
  const { store } = useContext(Context)
  // const nav = useNavigation()
  useEffect(() => {
    // store.isAuthUser()
    if (true) {

    }
  }, [])
  return (
    <>
        <Routes>
          <Route onEnter path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Account' element={<button onClick={() => store.logOut()}>LOGOUT</button>} />
        </Routes>
    </>
  );
}

export default Main;
