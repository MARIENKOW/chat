import { useContext } from 'react'
import styles from './chat.module.scss'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite';
import Message from '../Message/Message.jsx'

const Chat = ({send,write,handleWrite,currentUser,currentChat}) => {
   console.log(currentUser);
   const {store} = useContext(Context);
   console.log(store.user.id);
   return (<section className={styles.chat}>
      {currentChat && (
         <section className={styles.currentChat}>
            <div className={styles.view}>
               {currentUser?.message?.map((el, i, arr) =><Message mess = {el} user = {currentUser}/>)}
            </div>
            <form onSubmit={send} className={styles.write}>
               <input onChange={handleWrite} type="text" name="write" id="write" value={write} />
            </form>
         </section>
      )}
   </section>)
}

export default observer(Chat)