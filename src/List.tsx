import React from "react";
import { Story } from "./App";
import Item from "./Item";

type ListProps = {
  list: Story[];
  onRemoveItem: (item: Story) => void;
};

const List = ({ list, onRemoveItem }: ListProps) => (
  <>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </>
);

export default List;
