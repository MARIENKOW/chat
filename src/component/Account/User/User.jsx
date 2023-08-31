import styles from './user.module.scss'
import helper from '../../../helper';
import { useContext } from 'react';
import { Context } from '../../../index';

const User = ({ user }) => {
   const { store } = useContext(Context)

   const correctTime = helper.showCorrectTime(user);

   const countUnWatched = user?.message.reduce((acc, el) => {
      if (el.from !== store.user.id && !el.watched) return ++acc;
      return acc
   }, 0)

   return (<div data-user={user.id} className={styles.user}>
      <div className={styles.logo}>
         <img src={user.logo || "./logo.png"} alt="logo" />
         {user.online && <span></span>}
      </div>
      <article className={styles.info}>
         <div className={styles.top}>
            <h4 className={styles.name}>{user.username}</h4>
            <span className={styles.time}>{correctTime}</span>
         </div>
         <p className={styles.message}>
            <span className={styles.value}>
               {user.message[user.message.length - 1].value}
            </span>
            {countUnWatched !== 0 && <span className={styles.unWatched}>{countUnWatched}</span>}
         </p>
      </article>
   </div>)
}


export default User;