import styles from './button.module.scss'

export default function Button({name,handleClick,children}){
   const btnStyle = {
      padding:'7px 15px',
      textTransform:'uppercase',
      color:'#fff',
      borderRadius:'10px'
   }
   return <button className={styles.btn} onClick={handleClick} style={btnStyle}>{name}{children}</button>
}