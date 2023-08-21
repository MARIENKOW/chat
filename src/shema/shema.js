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

   ]
}

export default shema;