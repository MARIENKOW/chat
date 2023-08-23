import ChangePass from "../pages/ChangePass/ChangePass";

const shema = {
   signIn: [
      {
         name: 'email',
         type: 'mail'
      },
      {
         name: 'password',
         type: 'password'
      },
   ],
   signUp: [
      {
         name: 'username',
         type: 'text'
      },
      {
         name: 'email',
         type: 'mail'
      },
      {
         name: 'password',
         type: 'password'
      },
      {
         name: 're-enter password',
         type: 'password'
      },
   ],
   remember: [
      {
         name: 'email',
         type: 'mail'
      },

   ],
   changePass:[
      {
         name: 'password',
         type: 'password'
      },
      {
         name: 're-enter password',
         type: 'password'
      },
   ]
}

export default shema;