import styles from './signUp.module.scss';
import Form from '../../component/Form/Form'
import { Link } from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper';
import userService from '../../services/UserService';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';



function SignUp() {

  const defaultValue = helper.toObjec(shema.signUp);
  const [value, setValue] = useState(defaultValue);
  const {store} = useContext(Context)

  useEffect(()=>{
    store.isAuthUser()
  },[])

  if(store.isAuth) return <Navigate to='/account'/>

  async function sendInfo(e) {
    e.preventDefault();
    try{
      const ans = await userService.signUp(value);
    }catch(e){
      alert(e);
    }
  }
  // if (!store.isLoading) return "...loading"


  return (
    <section className={styles.main}>
      <Form
        shema={shema.signUp}
        value={value}
        handleInputChange={helper.inputChange(value,setValue)}
        onSubmit={sendInfo}
        button='Sign Up' />
      <Link to='/'>sign in</Link>
    </section>
  );
}

export default observer(SignUp);
