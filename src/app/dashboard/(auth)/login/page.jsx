"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginPage = ({ title: pageTitle }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  useEffect(() => {
    setLoginError(searchParams.get("error") ?? "");
    setLoginSuccess(searchParams.get("success") ?? "");
  }, [searchParams]);

  if (status === "loading") {
    return <p className="text-center text-7xl text-white font-bold mt-10">Loading...</p>;
  }

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = event.currentTarget[0].value;
    const password = event.currentTarget[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pageTitle || loginSuccess || "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleLoginSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>
      <button
        onClick={() => signIn("google")}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
