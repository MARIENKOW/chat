import styles from './button.module.scss'

export default function Button({name,color='red',handleClick}){
   const btnStyle = {
      padding:'7px 35px',
      backgroundColor:color,
      textTransform:'uppercase',
      color:'#fff',
      borderRadius:'10px'
   }
   return <button className={styles.btn} onClick={handleClick} style={btnStyle}>{name}</button>
}