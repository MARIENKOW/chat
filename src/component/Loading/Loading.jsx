import gif from './loading.gif';
import styles from './Loading.module.scss'

const Loading = ()=>{

   return(
      <section className={styles.wrapper}>
         <img src={gif} alt="gif" />
      </section>
   )
}

export default Loading