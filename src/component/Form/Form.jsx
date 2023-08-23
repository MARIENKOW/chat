import styles from './Form.module.scss'
import Button from '../Button/Button'
import helper from '../../helper'
import Sending from '../Sending/Sending'

export default function Login(props) {
   const inputs = props.shema ? props.shema.map((el, i) => {
      const vrongValidationClient = props.wrongValidation ? props.wrongValidation.includes(el.name): false;
      const vrongValidationServer = props.err?.badInputs ? props.err.badInputs.includes(el.name) : false;
      const isNotValid = vrongValidationServer || vrongValidationClient
      return (
         <section key={i} className={isNotValid ? styles.wrongInput : styles.block}>
            <span className={styles.name}>{el.name}</span>
            <input
               type={el.type}
               id={el.name}
               onChange={props.handleInputChange}
               value={props.value[el.name]}
               placeholder={`${el.name}`}
            />
            <p>{props?.err?.message || helper.wrongClientValidMessage(el.name)}</p>
         </section>
      )
   }) : 'dont have parametrs'

   return (
      <>
         <form
            onSubmit={props.onSubmit}
            className={styles.form}>
            {inputs}
            {props?.err?.mainMessage ? <section className={styles.apiError}>{props?.err?.mainMessage}</section> : null}
            <Button name={props.button} >{props.sending?<Sending/>:null}</Button>
         </form>
      </>
   )
}