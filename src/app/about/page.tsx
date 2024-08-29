import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          fill={true}
          alt="logo"
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Storytellers</h1>
          <h2 className={styles.imgDesc}>
            Handcrafting digital experiences that have meaningful impact.
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who we are?</h1>
          <p className={styles.desc}>
            Integer fringilla a est ut consequat. Donec in nulla arcu. Nam
            viverra nunc tellus, at pellentesque dolor egestas hendrerit.
            Integer dolor neque, lobortis vel rutrum quis, pulvinar eget diam.
            Vivamus mauris dolor, tincidunt nec ornare ac, vehicula sit amet
            sem. Suspendisse porttitor rutrum eros eu vehicula. Sed ut mauris
            nunc. Maecenas bibendum quam lorem, eu malesuada purus sollicitudin
            nec. Nulla faucibus mi eu ornare ultrices.
            <br />
            <br />
            Fusce finibus quis elit sagittis posuere. Curabitur vulputate
            sagittis lectus, dignissim venenatis purus vehicula vitae. Duis eu
            lobortis turpis. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Nunc fringilla, sem sed
            placerat porttitor, ante justo porta purus, euismod ornare ipsum
            libero vitae tortor.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What we do?</h1>
          <p className={styles.desc}>
            Integer fringilla a est ut consequat. Donec in nulla arcu. Nam
            viverra nunc tellus, at pellentesque dolor egestas hendrerit.
            Integer dolor neque, lobortis vel rutrum quis, pulvinar eget diam.
            Vivamus mauris dolor, tincidunt nec ornare ac, vehicula sit amet
            sem. Suspendisse porttitor rutrum eros eu vehicula. Sed ut mauris
            nunc. Maecenas bibendum quam lorem, eu malesuada purus sollicitudin
            nec. Nulla faucibus mi eu ornare ultrices.
            <br />
            <br /> - Dynamic Websites<br /> - Fast & Handy Mobile Apps<br /> - Dedicated services <br /> - Cross Platform Mobile Apps <br /> - Custom Web Development
          </p>
          <Button url="/contact" text="Contact" />
      </div>
      </div>
    </div>
  );
};

export default About;
