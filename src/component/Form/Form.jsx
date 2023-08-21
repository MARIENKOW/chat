import styles from './Form.module.scss'
import Button from '../Button/Button'

export default function Login(props) {

   const inputs = props.shema ? props.shema.map((el, i) => {
      return (
         <section key={i} className={styles.block}>
            <span className={styles.name}>{el.name}</span>
            <input
               type={el.type}
               id={el.name}
               onChange={props.handleInputChange}
               value={props.value[el.name]}
               placeholder={`${el.name}`}
            />
         </section>
      )
   }) : 'dont have parametrs'

   return (
      <>
         <form
            onSubmit={props.onSubmit}
            className={styles.form}>
            {inputs}
            <Button name={props.button} />
         </form>
      </>
   )
}