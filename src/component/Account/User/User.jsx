import styles from './user.module.scss'
import helper from '../../../helper';

const User = ({user}) => {
   const correctTime = helper.showCorrectTime(user);

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
            {user.message[user.message.length-1].value}
         </p>
      </article>
   </div>)
}


export default User;