//import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import styles from "./Tokens.module.scss";

export default function Tokens() {
  const [tokensList, setTokensList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get("/api/tokens", {
      params: {
        pageSize: 100,
      },
    });
    console.log(res, " ress");
    setLoading(false);
    if (res.data.success) {
      setTokensList(res.data.data.rows);
    }
  }, []);

  return (
    <div className="container">
      {tokensList.length === 0 && loading && (
        <div className={styles.loadingNews}>loading...</div>
      )}
      {tokensList.length === 0 && !loading && (
        <div className={styles.loadingNews}>No tokens yet</div>
      )}

      <div className={styles.tokensTable}>
        <div className={styles.header}>
          <div />
          <div />
          <div>Number of shares today</div>
          <div>Kontext points</div>
        </div>
        <div className={styles.body}>
          {tokensList.map((item) => (
            <div className={styles.row}>
              <div className={styles.name}>{item.name}</div>
              <div>${item.symbol}</div>
              <div>{item.shares}</div>
              <div>{item.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
