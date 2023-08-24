import styles from './signUp.module.scss';
import Form from '../../component/Form/Form'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper';
import userService from '../../services/UserService';
import EmailSending from '../../component/EmailSending/EmailSending';


function SignUp() {

  const defaultValue = helper.toObjec(shema.signUp);
  const [value, setValue] = useState(defaultValue);
  const [registrationOk, setRegistrationOk] = useState(false)
  const [error, setError] = useState({ message: '', badInputs: [] });
  const [email, setEmail] = useState('');
  const [sended,setSended] = useState(false)

  useEffect(() => {
    setError({ message: '', badInputs: [] })
  }, [value])

  async function sendInfo(e) {
    e.preventDefault();
    try {

      if (Object.values(value).includes('') || wrongValidation.length > 0 || sended) return
      setSended(true);
      const ans = await userService.signUp(value);
      setSended(false)
      if (ans.status === 400) {
        if (ans.data.badValidation) return alert('bad Validation check your info')
        if (ans.data.notUniqueEmail) return setError({ message: 'the email is already registered', badInputs: ['email'] })
        if (ans.data.notUniqueUsername) return setError({ message: 'username is already registered select another', badInputs: ['username'] })
      }
      setRegistrationOk(true);
      setEmail(ans.data)
    } catch (e) {
      console.log(e);
      alert('Server Error. Try  again later');
    }
  }

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }

  if (registrationOk) return <EmailSending email={email} text={'activate your account'}/>

  return (
    <section className={styles.wrapper}>
      <section className={styles.main}>
        <Form
          shema={shema.signUp}
          value={value}
          handleInputChange={helper.inputChange(value, setValue)}
          onSubmit={sendInfo}
          wrongValidation={wrongValidation}
          err={error}
          sending={sended}
          button='Sign Up' />
        <Link to='chat-client/'>sign in</Link>
      </section>
    </section>
  );
}

export default SignUp;
