import styles from './undefinedPage.module.scss'
export default function UndefinedPage() {
   return (
      <section className={styles.wrapper}>
         <section className={styles.block}>
            <h1>404</h1>
            <p>Page not found</p>
         </section>
      </section>
   )
}