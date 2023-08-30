import { useContext } from 'react'
import styles from './message.module.scss'
import { Context } from '../../../index'

const Message = ({ mess, user }) => {
   const { store } = useContext(Context)
   const now = new Date()
   const messageTime = mess.time.slice(0, 5)
   const messageDate = mess.date
   const messageYear = mess.date.slice(6);
   const nowDate = `${`${now.getDate()}`.length !== 1 ? now.getDate() : `0${now.getDate()}`}.${`${now.getMonth()}`.length !== 1 ? now.getMonth() : `0${now.getMonth()}`}.${now.getFullYear()}`;
   const nowYear = `${now.getFullYear()}`
   const time = messageDate === nowDate ? messageTime : (nowYear === messageYear ? messageDate.slice(0, 5) : messageDate);
   return (
      <article
         style={{ alignItems: mess.from === store.user.id ? 'end' : 'start' }}
         className={styles.article}
      >
         <span className={styles.who}>{mess.from === store.user.id ? 'you' : user.username}</span>
         <section className={mess.from === store.user.id ? styles.message : styles.unMessage}>
            {mess.value}
            <sub className={styles.time}>{time}</sub>
         </section>
      </article>
   )
}

export default Message