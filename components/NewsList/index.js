import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "../../utils/axios";
import styles from "./styles.module.scss";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);

  useEffect(async () => {
    setLoadingNews(true);
    const res = await axios.get("/api/news", {
      params: {
        pageSize: 20,
      },
    });
    setLoadingNews(false);
    if (res.data.success) {
      setNewsList(res.data.data.rows);
    }
  }, []);

  const showShare = async (index) => {
    // no comments to show
    if (newsList[index].shares === 0) {
      return;
    }
    const res = await axios.get("/api/comments", {
      params: { news_id: newsList[index].id, pageSize: 20 },
    });

    if (!res.data.success || res.data.data.rows.length === 0) {
      return;
    }
    setNewsList((prev) => {
      let prevItem = JSON.parse(JSON.stringify(prev[index]));
      prevItem.shareList = res.data.data.rows;
      prevItem.showShare = !prevItem.showShare;
      prev[index] = prevItem;
      return [...prev];
    });
  };
  return (
    <div className="container bgImgContainer">
      <img
        className="bgImg"
        src="/img/logo.jpg"
        alt=""
      ></img>
      <ol className={styles.newsList}>
        {newsList.length === 0 && loadingNews && (
          <div className={styles.loadingNews}>loading...</div>
        )}
        {newsList.length === 0 && !loadingNews && (
          <div className={styles.loadingNews}>No news yet</div>
        )}

        {newsList.map((item, index) => (
          <li className={styles.newsItem} key={index}>
            <div className={styles.index}>{index + 1}.</div>
            <div>
              <a
                target="_blank"
                className={styles.title}
                href={`${item.article_url}`}
              >
                {item.title}
              </a>
              <a
                target="_blank"
                className={styles.brand}
                href={`${item.url}`}
              >
                {item.url}
              </a>
            </div>
            <div className={styles.bottomInfo}>
              {/* <span className={styles.icon}><img src="/img/icons/heart.svg" /></span>
             */}
              <span className={styles.icon}><img src="/img/icons/share.svg" /></span>
              <a className={styles.shares} onClick={() => showShare(index)}>
                {item.shares} shares
              </a>
              <span className={styles.icon}><img src="/img/icons/clock.svg" /></span>
              <span className={styles.time}>
                {moment(item.publish_at).fromNow()}
              </span>
            </div>
            {item.showShare && (
              <div className={styles.sharesList}>
                {item.shareList.map((shareInfo) => (
                  <div className={styles.shareItem}>
                    <div className={styles.shareTop}>
                      <a
                        href={`${shareInfo.url}`}
                        target="_blank"
                        className={styles.shareName}
                      >
                        {shareInfo.username}
                      </a>
                      <div className={styles.sharePoint}>
                        {shareInfo.point} points
                      </div>
                    </div>
                    <div className={styles.shareContent}>
                      {shareInfo.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
