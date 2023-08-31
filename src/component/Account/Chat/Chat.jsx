import { useContext, useEffect, useRef, useState, useMemo } from 'react'
import styles from './chat.module.scss'
import { Context } from '../../../index'
import Message from '../Message/Message.jsx'
import helper from '../../../helper';
import { Sock } from '../../../pages/Account/Account';
import { observer } from 'mobx-react-lite';

const Chat = ({ setWatchedMess, currentUser, currentChat }) => {
   const { store } = useContext(Context);
   const sock = useContext(Sock)
   const [write, setWrite] = useState('');
   const view = useRef()
   const unWatched = useRef()
   const sortedMessage = helper.sortMessages(currentUser?.message, store.user.id);

   useEffect(() => {
      const scroll = view.current.scrollHeight
      const wrapp = view.current.clientHeight
      view.current.scrollTo(0, scroll - wrapp)
      if(!unWatched.current) return
      const unMessages = [...unWatched.current.children].filter((el) => {
         if (!el.dataset.from) return
         const from = +el.dataset.from
         const watched = +el.dataset.watched
         if (from !== store.user.id && !watched) return true
      })
      const checkScroll = (e) => {
         const point = view.current.getBoundingClientRect().bottom;
         const arr = []
         unMessages.forEach((el) => {
            const bot = el.getBoundingClientRect().top;
            if (bot + 50 < point) {
               arr.push({ id: +el.dataset.id, from: +el.dataset.from })
            }
         })
         setWatchedMess(arr)
      }
      checkScroll()
      view.current.addEventListener('scroll', checkScroll)
      return () => {
         view.current.removeEventListener('scroll', checkScroll)
      }
   },)

   const handleSendMessage = (e) => {
      e.preventDefault();
      sock.emit('private message', { message: write, to: currentChat });
      setWrite('');
   }

   const handleWrite = ({ target }) => {
      if (target.value.includes("'")) return target.value = target.value.slice(-1);
      setWrite(target.value)
   }
   return (<section className={styles.chat}>
      {currentChat && (
         <section className={styles.currentChat}>
            <div ref={view} className={styles.view}>
               <section className={styles.watched}>
                  {sortedMessage?.watched?.map((el, i, arr) => <Message key={i} mess={el} user={currentUser} />)}
               </section>
               {sortedMessage?.unWatched.length > 0 && (<section ref={unWatched} className={styles.unWatched}>
                  {sortedMessage?.unWatched?.map((el, i, arr) => <Message key={i} mess={el} user={currentUser} />)}
               </section>)}
            </div>
            <form
               onSubmit={handleSendMessage}
               className={styles.write}>
               <input onChange={handleWrite} type="text" name="write" id="write" value={write} />
            </form>
         </section>
      )}
   </section>)
}
export default observer(Chat)