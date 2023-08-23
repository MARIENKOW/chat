import styles from './signIn.module.scss';
import Form from '../../component/Form/Form'
import { Link, } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper.js'
// import userService from '../../services/UserService';
import { Context } from '../../index';



function SignIn() {
  const defaultValue = helper.toObjec(shema.signIn);

  const [value, setValue] = useState(defaultValue);
  const { store } = useContext(Context)
  const [error, setError] = useState({ message: '', badInputs: [],mainMessage:''});

  useEffect(() => {
    setError({ message: '', badInputs: [] ,mainMessage:''})
  }, [value])

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }


  async function sendInfo(e) {
    e.preventDefault();
    if (Object.values(value).includes('') || wrongValidation.length > 0) return;
    const ans = await store.signInUser(value);
    if (ans.status === 400) {
      console.log(ans);
      if (ans.data.accNotActivated) return setError({ ...error, mainMessage: 'your account is not activated' });
      if (ans.data.badValidation) return alert('bad Validation. Check your info');
      if (ans.data.emailNotDefined) return setError({message:'the email is not registered',badInputs:['email']});
      if (ans.data.passNotCorrect) return setError({message:'the password is not correct',badInputs:['password']});
    }
  }


  return (
    <section className={styles.main}>
      <Form
        shema={shema.signIn}
        button='sign in'
        value={value}
        handleInputChange={helper.inputChange(value, setValue)}
        onSubmit={sendInfo}
        wrongValidation={wrongValidation}
        err={error}
      />
      <section className={styles.links}>
        <Link to='/SignUp'>sign up</Link>
        <Link to='/RememberSendMail'>remember password</Link>
      </section>
    </section>
  );
}

export default SignIn;
