import React from "react";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { Container } from "@mui/material";
import Head from "next/head";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const mdfile = fs.readFileSync(`posts/${slug}.md`);
  const { data: frontMatter, content } = matter(mdfile);

  return {
    props: {
      frontMatter,
      content,
    },
  };
}

function BlogPage({ frontMatter, content }) {
  return (
    <Container>
      <Head>
        <title>Mentions légales</title>
        <meta name='description' content='Mentions légales' />
        <link rel='icon' href='/favicon.ico' />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>
      </Head>
      <div className='p-10'>
        <h1 className='text-2xl py-4'>{frontMatter.title}</h1>
        <article className='prose lg:prose-xl' dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </Container>
  );
}

export default BlogPage;
