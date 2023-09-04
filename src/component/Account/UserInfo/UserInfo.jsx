import styles from './userInfo.module.scss'
import Online from '../Online/Online';

const UserInfo = ({ currentUser, usersAllUnreadMess, handleBack }) => {
   return (
      <section className={styles.userInfo}>
         <div onClick={handleBack} className={styles.back}>
            {'<'}
            {usersAllUnreadMess !== 0 && <span className={styles.unWatched}>{usersAllUnreadMess}</span>}
         </div>
         <div className={styles.current}>
            <article>{currentUser?.username}</article>
            {currentUser && (currentUser.online ? <Online /> : <span>offline</span>)}
         </div>
         <div className={styles.logo}>
            <img src={currentUser?.logo || "./logo.png"} alt="logo" />
         </div>
      </section>
   )
}

export default UserInfo;