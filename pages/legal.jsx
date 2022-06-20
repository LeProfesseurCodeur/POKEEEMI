import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Container } from "@mui/material";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFiles = fs.readFileSync(`posts/${filename}`);
    const { data: frontMatter } = matter(readFiles);

    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Legal({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mentions légales</title>
        <meta name='description' content='Mentions légales' />
        <link rel='icon' href='/favicon.ico' />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>
      </Head>

      <main>
        <div className='p-10 mt-3'>
          {posts?.map((post) => {
            return (
              <Container>
                <div className="card mt-5 mb-5 p-3">
                  <Link key={`${post.slug}`} href={`/blog/${post.slug}`}>
                      <a>
                          <div className='mb-4'>
                              <h1 className='text-xl py-3'>{post.frontMatter.title}</h1>
                              <p>{post.frontMatter.metaDesc}</p>
                          </div>
                      </a>
                  </Link>
                  </div>
              </Container>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="contact"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ahref}
        >
          Nous contacter
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
