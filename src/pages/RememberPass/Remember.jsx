import styles from './remember.module.scss';
import Form from '../../component/Form/Form'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper.js'
import userService from '../../services/UserService';



function Remember() {
  const defaultValue = helper.toObjec(shema.remember);

  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState({ message: '', badInputs: [] });
  const [sended,setSended] = useState(false)

  useEffect(() => {
    setError({ message: '', badInputs: [] })
  }, [value])


  async function sendInfo(e) {
    e.preventDefault();
    try {
      if (Object.values(value).includes('') || wrongValidation.length > 0 || error.length > 0) return

      const ans = await userService.rememberPassword(value)
      if (ans.status === 400) return setError({ message: 'Email Is Not Defined', badInputs: ['email'] })
      setSended(true)
    } catch (e) {
      console.log(e);
      alert('Server Error. Try  again later')
    }
  }

  if(sended) return 'check Your email'

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }


  return (
    <section className={styles.main}>
      <Form
        shema={shema.remember}
        button='send mail'
        value={value}
        handleInputChange={helper.inputChange(value, setValue)}
        onSubmit={sendInfo}
        wrongValidation={wrongValidation}
        err={error}
      />
      <section className={styles.links}>
        <Link to='/'>sign In</Link>
        <Link to='/SignUp'>sign up</Link>
      </section>
    </section>
  );
}

export default Remember;
