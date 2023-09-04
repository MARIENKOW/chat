import styles from './writeMessages.module.scss'
import Button from '../../Button/Button'

const WriteMessages = ({handleSendMessage,handleWrite,write}) => {
   return (
      <form
         onSubmit={handleSendMessage}
         className={styles.write}>
         <input onChange={handleWrite} type="text" name="write" id="write" value={write} />
         {write.length > 0 && <Button name='send' />}
      </form>
   )
}

export default WriteMessages