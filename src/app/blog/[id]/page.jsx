import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  try {
    const post = await getData(params.id);

    if (!post || !post.title || !post.desc) {
      throw new Error("A blog post is missing one of the required properties: title, desc");
    }

    return {
      title: post.title,
      description: post.desc,
    };
  } catch (error) {
    if (error.status === 404) {
      notFound();
    } else if (error instanceof Error) {
      console.error(error);
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  if (!data) return <div>Post not found</div>;
  if (!data.title) return <div>Post title is missing</div>;
  if (!data.desc) return <div>Post description is missing</div>;
  if (!data.img) return <div>Post image is missing</div>;
  if (!data.username) return <div>Post author is missing</div>;
  if (!data.content) return <div>Post content is missing</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt={data.username}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt={data.title}
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
