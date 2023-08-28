import styles from './user.module.scss'

const User = ({user}) => {
   return (<div data-user={JSON.stringify(user)} className={styles.user}>
      <div className={styles.logo}>
         <img src={user.logo || "./logo.png"} alt="logo" />
         {user.online && <span></span>}
      </div>
      <article className={styles.info}>
         <div className={styles.top}>
            <h4 className={styles.name}>{user.username}</h4>
            <span className={styles.time}>{user.time || "22:30"}</span>
         </div>
         <p className={styles.message}>
            {user.message || 'Hi,how are you?'}
         </p>
      </article>
   </div>)
}


export default User;