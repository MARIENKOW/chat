import styles from './undefinedPage.module.scss'
export default function UndefinedPage() {
   return (
      <section>
         <section className={styles.wrapper}>
            <h1 className={styles.header}>404</h1>
            <div className={styles.cloak__wrapper}>
               <div className={styles.cloak__container}>
                  <div className={styles.cloak}></div>
               </div>
            </div>
            <div className={styles.info}>
               <h2 className={styles.title}>We can't find that page</h2>
               <p>We're fairly sure that page used to be here, but seems to have gone missing.
                  We do apologise on it's behalf.</p>
            </div>
         </section>
      </section>
   )
}