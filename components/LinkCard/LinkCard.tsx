import React from "react";
import Link from "../Link/Link";

// import styles from '../../styles/Home.module.css'
const styles: any = {};

const LinkCard = (props: any) => {
  const { href, title, description, tinafield } = props || {};
  return (
    <Link href={href || "#"} className={styles.card}>
      <h2 data-tinafield={[tinafield, "title"].filter(Boolean).join(".")}>
        {title} &rarr;
      </h2>
      <p data-tinafield={[tinafield, "description"].filter(Boolean).join(".")}>
        {description}
      </p>
    </Link>
  );
};

export default LinkCard;
