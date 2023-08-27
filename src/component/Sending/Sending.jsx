import src from '../../src/sending.gif'

const Sending = ({width})=>{
   return(
      <img style={{width:width ||'20px'}} src={src} alt="sending" />
   )
}

export default Sending