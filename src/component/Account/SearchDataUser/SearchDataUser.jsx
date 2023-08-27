import Button from '../../Button/Button'
import styles from './searchDataUser.module.scss'

const SearchDataUser = ({user})=>{
   return <div className={styles.user}>
   <div className={styles.logo}>
      <img src={user.logo || "./logo.png"} alt="logo" />
   </div>
   <article data-user={JSON.stringify(user)} className={styles.info}>
      <div className={styles.top}>
         <h4 className={styles.username}>{user.username}</h4>
         <span>{user.name}</span>
      </div>
      <Button name={'write it now'}/>
   </article>
</div>
}

export default SearchDataUser