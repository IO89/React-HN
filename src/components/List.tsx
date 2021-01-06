import React, { useState } from "react";
import Item from "./Item";
import { sortBy, prop } from "ramda";
import { ReactComponent as Up } from "../assets/upload.svg";
import { ReactComponent as Down } from "../assets/download.svg";
import { Story } from "../App";

type ListProps = {
  list: Story[];
  onRemoveItem: (item: Story) => void;
};

type SortKey = "NONE" | "TITLE" | "AUTHOR" | "COMMENTS" | "POINTS";

const SORTS = {
  NONE: (list: Story[]) => list,
  TITLE: (list: Story[]) => sortBy(prop("title"))(list),
  AUTHOR: (list: Story[]) => sortBy(prop("author"))(list),
  COMMENTS: (list: Story[]) => sortBy(prop("num_comments"))(list).reverse(),
  POINTS: (list: Story[]) => sortBy(prop("points"))(list).reverse(),
};

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = useState<{ sortKey: SortKey; isReverse: boolean }>({
    sortKey: "NONE",
    isReverse: false,
  });

  const handleSort = (sortKey: SortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const renderSortingButton = () =>
    sort.isReverse ? (
      <Down style={{ marginLeft: "5px" }} height="12px" width="12px" />
    ) : (
      <Up style={{ marginLeft: "5px" }} height="12px" width="12px" />
    );

  const sortFn = SORTS[sort.sortKey];
  const sortedList = sort.isReverse ? sortFn(list).reverse() : sortFn(list);

  return (
    <>
      <div style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button type="button" onClick={() => handleSort("TITLE")}>
            Title
            {renderSortingButton()}
          </button>
        </span>
        <span style={{ width: "30%" }}>
          <button type="button" onClick={() => handleSort("AUTHOR")}>
            Author
            {renderSortingButton()}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button type="button" onClick={() => handleSort("COMMENTS")}>
            Comments
            {renderSortingButton()}
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button type="button" onClick={() => handleSort("POINTS")}>
            Points
            {renderSortingButton()}
          </button>
        </span>
        <span style={{ width: "10%" }} />
      </div>
      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </>
  );
};
export default List;
