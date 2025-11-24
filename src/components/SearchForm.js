import React from "react";

export default function SearchForm({ onChangeValue }) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => onChangeValue(value), 300);
    return () => clearTimeout(timer);
  }, [value, onChangeValue]);

  return (
    <input
      className="input"
      placeholder="Tìm theo tên..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
