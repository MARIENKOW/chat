import { makeAutoObservable } from 'mobx'
import userService from '../services/UserService';

class User {
   isAuth = false
   user = {}
   constructor() {
      makeAutoObservable(this)
   }
   setAuth(val) {
      this.isAuth = val
   }
   setUser(value) {
      this.user = value
   }
   async isAuthUser() {
      try {
         const ans = await userService.checkAuthUser()
         if (ans.status !== 200) return this.setAuth(false)
         this.setAuth(true)
         return ans
      } catch (e) {
         this.setAuth(false)
      }
   }
   async signInUser(value) {

      try {
         const ans = await userService.signIn(value)
         if (ans.status !== 200) {
            this.setAuth(false)
            return ans
         }
         this.setAuth(true)
         return ans
      } catch (e) {
         this.setAuth(false)
         alert('Server Error. Try again later')
         return e
      }
   }
   logOut = async () => {
      try {
         await userService.logOut();
         localStorage.removeItem('accessToken')
         this.setAuth(false)
      } catch (e) {
         localStorage.removeItem('accessToken')
         this.setAuth(false)
      }
   }
   aboutUser = async () => {
      try {
         const res = await userService.aboutUser()
         if (res.status !== 200) {
            this.setUser({})
            this.setAuth(false)
            return localStorage.removeItem('accessToken')
         }
         this.setUser(res.data)
         this.setAuth(true)
      }
      catch (e) {
         alert('Server Error. Try again later')
      }
   }
}

export default User;