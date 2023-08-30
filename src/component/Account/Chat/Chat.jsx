import { useContext, useEffect, useRef } from 'react'
import styles from './chat.module.scss'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite';
import Message from '../Message/Message.jsx'

const Chat = ({send,write,handleWrite,currentUser,currentChat}) => {
   const {store} = useContext(Context);
   const view = useRef()
   useEffect(()=>{
      if(!view.current) return
      const scroll = view.current.scrollHeight
      const wrapp = view.current.clientHeight
      view.current.scrollTo(0,scroll-wrapp)
   },)
   return (<section className={styles.chat}>
      {currentChat && (
         <section className={styles.currentChat}>
            <div ref = {view} className={styles.view}>
               {currentUser?.message?.map((el, i, arr) =><Message key = {i} mess = {el} user = {currentUser}/>)}
            </div>
            <form onSubmit={send} className={styles.write}>
               <input onChange={handleWrite} type="text" name="write" id="write" value={write} />
            </form>
         </section>
      )}
   </section>)
}

export default observer(Chat)