import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getPostData(id) {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

export async function generateMetadata({ params: { id } }) {
  const post = await getData(id);
  if (!post || !post.title || !post.description) {
    return notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}

const BlogPost = async ({ params: { id } }) => {
  const postData = await getPostData(id);
  if (!postData) return <div>Post not found</div>;

  const { title, description, image, author, content } = postData;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.author}>
            <Image
              src={image}
              alt={author}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.authorName}>{author}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title}
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.textContent}>{content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
