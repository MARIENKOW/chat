import styles from './signUp.module.scss';
import Form from '../../component/Form/Form'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper';
import userService from '../../services/UserService';


function SignUp() {

  const defaultValue = helper.toObjec(shema.signUp);
  const [value, setValue] = useState(defaultValue);
  const [registrationOk,setRegistrationOk] = useState(false)
  const [error, setError] = useState({message:'',badInputs:[]});

  useEffect(() => {
    setError({message:'',badInputs:[]})
  }, [value])

  async function sendInfo(e) {
    e.preventDefault();
    try {
      
      if(Object.values(value).includes('') || wrongValidation.length>0)return

      const ans = await userService.signUp(value);
      if(ans.status === 400){
        if(ans.data.badValidation) return alert('bad Validation check your info')
        if(ans.data.notUniqueEmail) return setError({message:'the email is already registered',badInputs:['email']})
      }
      setRegistrationOk(true);
    } catch (e) {
      console.log(e);
      alert('Server Error. Try  again later');
    }
  }

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }

  if(registrationOk) return 'checkYourEmail'

  return (
    <section className={styles.main}>
      <Form
        shema={shema.signUp}
        value={value}
        handleInputChange={helper.inputChange(value, setValue)}
        onSubmit={sendInfo}
        wrongValidation={wrongValidation}
        err={error}
        button='Sign Up' />
      <Link to='/'>sign in</Link>
    </section>
  );
}

export default SignUp;
