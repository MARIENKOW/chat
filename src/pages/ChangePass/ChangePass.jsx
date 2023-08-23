import styles from './ChangePass.module.scss';
import Form from '../../component/Form/Form'
import { useEffect, useState } from 'react';
import shema from '../../shema/shema.js'
import helper from '../../helper.js'
import userService from '../../services/UserService';
import { useNavigate, useParams } from 'react-router';
import Loading from '../../component/Loading/Loading';



function ChangePass() {
  const defaultValue = helper.toObjec(shema.changePass);

  const [value, setValue] = useState(defaultValue);
  const { link } = useParams()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sended,setSended] = useState(false);

  const [error, setError] = useState({ message: '', badInputs: [] });

  useEffect(() => {
    setError({ message: '', badInputs: [] })
  }, [value])

  useEffect(() => {
    const checkLink = async () => {
      const response = await userService.checkChangePassLink({ rememberPassLink: link });
      if (response.status !== 200) {
        alert('request is not valid')
        return navigate('/')
      }
      setIsLoading(false)
    }
    checkLink()
  }, [])

  if (isLoading) return <Loading />

  async function sendInfo(e) {
    e.preventDefault();
    try {
      if (Object.values(value).includes('') || wrongValidation.length > 0 || sended) return
      setSended(true)
      const ans = await userService.changePassword({ rememberPassLink: link, ...value })
      setSended(false)
      if (ans.status === 400) {
        alert(ans.data)
      }
      if (ans.status === 200) return navigate('/')
    } catch (e) {
      console.log(e);
      alert('Server Error. Try again later')
    }
    navigate('/')
  }

  const wrongValidation = []

  for (let key in value) {
    if (helper.checkValid(key, value)) wrongValidation.push(key)
  }


  return (
    <section className={styles.wrapper}>
      <section className={styles.main}>
        <Form
          shema={shema.changePass}
          button='change password'
          value={value}
          handleInputChange={helper.inputChange(value, setValue)}
          onSubmit={sendInfo}
          wrongValidation={wrongValidation}
          err={error}
          sending={sended}
        />
      </section>
    </section>
  );
}

export default ChangePass;
