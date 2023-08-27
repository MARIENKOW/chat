import { useEffect, useContext, useState } from "react"
import { Navigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Loading from "../component/Loading/Loading";


function OnlyLogoutUser({ children }) {
   const { store } = useContext(Context)
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const whaitAnswer = async()=>{
         await store.aboutUser()
         setIsLoading(false)
      }
      if(store.isAuth) return setIsLoading(false);
      whaitAnswer()
   }, [])

   if (isLoading) return <Loading/>

   return store.isAuth ?children : <Navigate to='/' replace />

}

export default observer(OnlyLogoutUser);