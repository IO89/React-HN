import React from "react";
import { Story } from "./App";
import { ReactComponent as Check } from "./check.svg";
import styles from "./app.module.css";

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => {
  return (
    <div className={styles.item} key={item.objectID}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSmall}`}
          onClick={() => onRemoveItem(item)}
        >
          <Check height="18px" width="18px" />
        </button>
      </span>
    </div>
  );
};

export default Item;
