import styles from './selectUsers.module.scss';
import Choose from '../Choose/Choose'
import { useContext, useState, useEffect, memo } from 'react';
import axios from "axios";
import UserService from '../../../services/UserService'
import { Context } from '../../../index';
import helper from '../../../helper';
import { Users } from '../../../pages/Account/Account';


const SelectUsers = ({ sock, setCurrentChat }) => {
   const { store } = useContext(Context)
   const { users, setUsers } = useContext(Users)
   const [search, setSearch] = useState('')
   const [dataSearch, setDataSearch] = useState([]);
   const [isDataLoading, setIsDataLoading] = useState(false)
   const [source, setSource] = useState(null);

   console.log('asfasf');

   useEffect(() => {
      const getDataUsers = async () => {
         try {
            setIsDataLoading(true)
            const users = await UserService.getDataUsers({ id: store.user.id });
            setUsers(users.data)
            sock.emit('onlineUsers', users.data.map(el => el.id))
            setIsDataLoading(false)
         }
         catch (e) {
            alert('SystemError Try again Later')
         }
      }
      getDataUsers()
   }, []);
   useEffect(()=>{
      sock.on('findOnlineUsers', (arr) => {
         const dataSearchCopy = dataSearch.slice();
         helper.addOnlineUsers(dataSearchCopy, arr)
         setIsDataLoading(false)
         setDataSearch(dataSearchCopy)
      })
   },[dataSearch])

   useEffect(() => {
      const userSearch = async () => {
         try {
            if (search.length === 0 || search.trim().length===0) return
            if (source) source.cancel();

            const src = axios.CancelToken.source()
            setSource(src);
            setIsDataLoading(true)
            const users = await UserService.findUsers({ search: search.trim(), id: store.user.id }, { cancelToken: src.token })
            sock.emit('findOnlineUsers', users.data.map(el => el.id))
            setDataSearch(users.data);
            setIsDataLoading(false)
         } catch (e) {
            console.log(e);
         }
      }
      userSearch()
   }, [search]);

   const handleSearch = ({ target }) => {
      if (target.value.length > 15) return
      setSearch(target.value)
   }

   const handleSelect = ({ target }) => {
      const main = target.closest('[data-user]')
      if (!main) return
      const userId = main.dataset.user
      setSearch('')
      setCurrentChat(+userId);
   }

   return (
      <section className={styles.select}>
         <div className={styles.search}>
            <input placeholder="Search.."
               onChange={handleSearch}
               value={search} type="search"
               name="search"
               id="search"
            />
         </div>
         <section className={styles.users} onClick={handleSelect}>
            <Choose
               isDataLoading={isDataLoading}
               search={search}
               users={users}
               dataSearch={dataSearch}
            />
         </section>
      </section >)
}

export default memo(SelectUsers)