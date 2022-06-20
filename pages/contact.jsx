import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ContactForm from "../Components/Contact-form";
import { motion } from 'framer-motion'


export default function Contact() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nous contacter</title>
          <meta name='description' content='Mentions légales' />
          <link rel='icon' href='/favicon.ico' />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>
        </Head>
  
        <main>
        <div className="container">
        <div className={styles.grid}>
          <div className={styles.card}>
            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    scale: .8,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1, 
                    transition: {
                    delay: .4
                    }
                }
            }}>
                <h3 className={styles.title}>Nous contacter</h3> 
            </motion.div>
            
            <ContactForm />
          </div>
        </div>
        </div>
        </main>
  
        <footer className={styles.footer}>
          <a
            href="contact"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ahref}
          >
            Contact
          </a>
          <a
            href="legal"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ahref}
          >
            Mentions légales
          </a>
          <a
            href="https://eemi.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ahref}
          >
            EEMI
          </a>
        </footer>
      </div>
    );
  }