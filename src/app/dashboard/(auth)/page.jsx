"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      title: event.currentTarget[0].value,
      desc: event.currentTarget[1].value,
      img: event.currentTarget[2].value,
      content: event.currentTarget[3].value,
      username: session.data.user.name,
    };

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
      });
      mutate();
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? (
            "Loading..."
          ) : (
            data?.map((post) => (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image src={post.img} alt="" width={200} height={100} />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(post._id)}
                >
                  X
                </span>
              </div>
            ))
          )}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;