import { useContext, useEffect, useRef, useState, useMemo, memo } from 'react'
import styles from './chat.module.scss'
import { Context } from '../../../index'
import Message from '../Message/Message.jsx'
import helper from '../../../helper';
import { Sock } from '../../../pages/Account/Account';
import { observer } from 'mobx-react-lite';
import UserService from '../../../services/UserService'


const Chat = ({currentMessages, messageLength, setWatchedMess, currentUser, currentChat }) => {
   const { store } = useContext(Context);
   const sock = useContext(Sock)
   const [write, setWrite] = useState('');
   const view = useRef()
   const unWatched = useRef()
   const watched = useRef()
   const sortedMessage = useMemo(() => helper.sortMessages(currentUser?.message, store.user.id), [ currentChat]);
   const liveUnWatched = useMemo(() =>{
      if(currentMessages.length === 0){
         return [...sortedMessage.unWatched];
      }
      return [...sortedMessage.unWatched,...currentMessages]
   }, [currentMessages,sortedMessage])

   useEffect(() => {
      if(currentMessages.length === 0) return;
      const scroll = view.current.scrollHeight
      const wrapp = view.current.clientHeight
      if (currentMessages[currentMessages.length - 1].from !== store.user.id && view.current.scrollTop + 100 < scroll - wrapp) {
      } else {
         view.current.scrollTo(0, scroll - wrapp)
      }
   }, [currentMessages])

   useEffect(() => {
      const scroll = view.current.scrollHeight
      const wrapp = view.current.clientHeight
      if (!unWatched.current) {
         view.current.scrollTo(0, scroll - wrapp)
      } else {
         const unWatchedHeight = unWatched.current.clientHeight
         if (unWatchedHeight > wrapp) {
            view.current.scrollTo(0, scroll - unWatchedHeight - 10)
         } else {
            view.current.scrollTo(0, scroll - wrapp)
         }
      }
   }, [currentChat])


   useEffect(() => {
      if (!unWatched.current) return
      const unMessages = helper.unWatchedMessages(unWatched, store.user.id);

      const cache = []

      const checkScroll = (e) => {
         const point = view.current.getBoundingClientRect().bottom;
         const toSend = []
         unMessages.forEach((el) => {
            const bot = el.getBoundingClientRect().top;
            if (bot + 50 < point) {
               const isAdded = cache.find(e => e.id === +el.dataset.id);
               if (!isAdded) {
                  toSend.push({ id: +el.dataset.id, from: +el.dataset.from })
                  cache.push({ id: +el.dataset.id, from: +el.dataset.from })
               }
            }
         })
         if (toSend.length === 0) return;
         const watchedMessage = async () => {
            try {
               await UserService.addWatchedMessage({ id: toSend.map(el => el.id) });
               setWatchedMess([...cache])
            } catch (e) {
               alert('SystemError, Try again later');
            }
         }
         watchedMessage()
      }
      checkScroll()

      view.current.addEventListener('scroll', checkScroll)

      return () => {
         view.current.removeEventListener('scroll', checkScroll)
      }

   }, [currentChat, liveUnWatched])

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
               <section ref={watched} className={styles.watched}>
                  {sortedMessage?.watched?.map((el, i, arr) => <Message key={i} mess={el} user={currentUser} />)}
               </section>
               {liveUnWatched?.length > 0 && (
                  <section ref={unWatched} className={styles.unWatched}>
                     {sortedMessage.unWatched.length>0 && <h3>new message</h3>}
                     {liveUnWatched?.map((el, i, arr) => <Message key={i} mess={el} user={currentUser} />)}
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