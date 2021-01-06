import React, { useEffect, useRef } from "react";
import styles from "../app.module.css";

type InputWithLabelProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  label: string;
  type?: string;
  children: React.ReactNode;
  isFocused?: boolean;
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  children,
  isFocused,
}: InputWithLabelProps) => {
  const inputRef = useRef<HTMLElement>();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={label} className={styles.label}>
        {children}
      </label>
      &nbsp;
      <input
        id={id}
        type={type}
        onChange={onInputChange}
        value={value}
        className={styles.input}
      />
    </>
  );
};

export default InputWithLabel;
