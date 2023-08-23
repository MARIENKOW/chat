import styles from './EmailSending.module.scss'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const EmailSending = ({ text, email }) => {
   return (
      <section className={styles.wrapper}>
         <div className={styles.main}>
            <section className={styles.block}>
               <h1>We've sent a letter to:{email}</h1>
               <p>check it and tap on the link to {text}</p>
               <Link to='/'><Button name={'first page'}/></Link>
            </section>
         </div>
      </section>
   )
}

export default EmailSending