import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function fetchPostData(id) {
  const url = `http://localhost:3000/api/posts/${id}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
}

async function getPostMetadata({ params: { id } }) {
  try {
    const postData = await fetchPostData(id);

    if (!postData || !postData.title || !postData.description) {
      throw new Error("Invalid post data");
    }

    return {
      title: postData.title,
      description: postData.description,
    };
  } catch (error) {
    throw error;
  }
}

const BlogPost = async ({ params: { id } }) => {
  const data = await getData(id);

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.author}>
            {data.avatar && (
              <Image
                src={data.avatar}
                alt={data.author}
                width={40}
                height={40}
                className={styles.avatar}
              />
            )}
            <span className={styles.authorName}>{data.author}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {data.image && (
            <Image
              src={data.image}
              alt={data.title}
              fill={true}
              className={styles.image}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.textContent}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;