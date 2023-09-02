import { useContext } from 'react'
import styles from './message.module.scss'
import { Context } from '../../../index'

const Message = ({ nextMess, mess, user, prevMess }) => {
   const { store } = useContext(Context)
   const now = new Date()
   const messageTime = mess.time.slice(0, 5)
   const messageDate = mess.date
   const messageYear = mess.date.slice(6);
   const nowDate = `${`${now.getDate()}`.length !== 1 ? now.getDate() : `0${now.getDate()}`}.${`${now.getMonth()}`.length !== 1 ? now.getMonth() : `0${now.getMonth()}`}.${now.getFullYear()}`;
   const nowYear = `${now.getFullYear()}`
   const time = messageDate === nowDate ? messageTime : (nowYear === messageYear ? messageDate.slice(0, 5) : messageDate);
   let messageStyle = { borderRadius: '15px 15px 15px 15px' }
   if (mess.from === store.user.id) {
      if (!prevMess && nextMess?.from === mess.from || prevMess?.from !== mess.from && nextMess?.from === mess.from) {
         messageStyle = { borderRadius: '15px 15px 2px 15px' }
      } else if (!nextMess && prevMess?.from === mess.from || prevMess?.from === mess.from && nextMess?.from !== mess.from) {
         messageStyle = { borderRadius: '15px 2px 15px 15px' }

      } else if (prevMess?.from === mess.from && nextMess?.from === mess.from) {
         messageStyle = { borderRadius: '15px 2px 2px 15px' }
      }
   } else {
      if (!prevMess && nextMess?.from === mess.from || prevMess?.from !== mess.from && nextMess?.from === mess.from) {
         messageStyle = { borderRadius: '15px 15px 15px 2px' }
      } else if (!nextMess && prevMess?.from === mess.from || prevMess?.from === mess.from && nextMess?.from !== mess.from) {
         messageStyle = { borderRadius: '2px 15px 15px 15px' }

      } else if (prevMess?.from === mess.from && nextMess?.from === mess.from) {
         messageStyle = { borderRadius: '2px 15px 15px 2px' }
      }
   }

   return (
      <article
         data-from={mess.from}
         data-watched={mess.watched}
         data-id={mess.id}
         style={{ alignItems: mess.from === store.user.id ? 'end' : 'start' }}
         className={styles.article}
      >
         {prevMess?.from !== mess?.from && <span className={styles.who}>{mess.from === store.user.id ? 'you' : user.username}</span>}
         <section style={messageStyle} className={mess.from === store.user.id ? styles.message : styles.unMessage}>
            {mess.value}
            <sub className={styles.time}>{time}</sub>
         </section>
      </article>
   )
}

export default Message