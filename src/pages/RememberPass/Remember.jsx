import styles from './remember.module.scss';
import Form from '../../component/Form/Form'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper.js'
// import userService from '../../services/UserService';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';



function Remember() {
  const defaultValue = helper.toObjec(shema.remember);

  const [value, setValue] = useState(defaultValue);
  const { store } = useContext(Context)

  useEffect(()=>{
    store.isAuthUser()
  },[])

  if(store.isAuth) return <Navigate to='/account'/>

  async function sendInfo(e) {
    e.preventDefault();
    // const resp = await store.signInUser(value);
    // if (resp.status === 200) {
    //   navigate('/account')
    // }
    console.log(value);
  }

  // if (!store.isLoading) return "...loading"

  return (
    <section className={styles.main}>
      <Form
        shema={shema.remember}
        button='send mail'
        value={value}
        handleInputChange={helper.inputChange(value, setValue)}
        onSubmit={sendInfo}
      />
      <section className={styles.links}>
        <Link to='/'>sign In</Link>
        <Link to='/SignUp'>sign up</Link>
      </section>
    </section>
  );
}

export default observer(Remember);
