import styles from './remember.module.scss';
import Form from '../../component/Form/Form'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper.js'
import userService from '../../services/UserService';
import EmailSending from '../../component/EmailSending/EmailSending';



function Remember() {
  const defaultValue = helper.toObjec(shema.remember);

  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState({ message: '', badInputs: [] });
  const [sended, setSended] = useState(false)
  const [email, setEmail] = useState('')
  const [sending,setSending] = useState('')

  useEffect(() => {
    setError({ message: '', badInputs: [] })
  }, [value])


  async function sendInfo(e) {
    e.preventDefault();
    try {
      if (Object.values(value).includes('') || wrongValidation.length > 0 || sended) return
      setSended(true)
      const ans = await userService.rememberPassword(value)
      setSended(false)
      console.log('asdasd');
      if (ans.status === 400) return setError({ message: 'Email Is Not Defined', badInputs: ['email'] })
      setSending(true)
      setEmail(ans.data)
    } catch (e) {
      console.log(e);
      alert('Server Error. Try  again later')
    }
  }

  if (sending) return <EmailSending email={email} text={'change your password'} />

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }


  return (
    <section className={styles.wrapper}>
      <section className={styles.main}>
        <Form
          shema={shema.remember}
          button='send mail'
          value={value}
          handleInputChange={helper.inputChange(value, setValue)}
          onSubmit={sendInfo}
          wrongValidation={wrongValidation}
          err={error}
          sending={sended}
        />
        <section className={styles.links}>
          <Link to='/'>sign In</Link>
          <Link to='/SignUp'>sign up</Link>
        </section>
      </section>
    </section>
  );
}

export default Remember;
