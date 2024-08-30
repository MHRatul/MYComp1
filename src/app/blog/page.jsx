import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function generateMetadata({ params }) {
  try {
    const post = await getData(params.id);

    if (!post || !post.title || !post.desc) {
      throw new Error("Invalid post data");
    }

    return {
      title: post.title,
      description: post.desc,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const BlogPost = async ({ params }) => {
  try {
    const data = await getData(params.id);

    if (!data) {
      throw new Error("No data found");
    }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.desc}>{data.desc}</p>
            <div className={styles.author}>
              {data.img && (
                <Image
                  src={data.img}
                  alt={data.username}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              )}
              <span className={styles.username}>{data.username}</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {data.img && (
              <Image
                src={data.img}
                alt={data.title}
                fill={true}
                className={styles.image}
              />
            )}
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.text}>{data.content}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default BlogPost;