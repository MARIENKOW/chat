import { useContext } from "react"
import Button from "../../Button/Button"
import { Context } from "../../../index"
import styles from './header.module.scss'

const Header = () => {
   const {store} = useContext(Context)

   return <header className={styles.header}>
      <article>
         logined as : {store.user.username}
      </article>
      <Button name="logout" handleClick={store.logOut} />
   </header>
}

export default Header