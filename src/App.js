import logo from "./logo.svg";
import "./App.css";

import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";

export default function App() {
  const [keyword, setKeyword] = React.useState("");
  const [addedUser, setAddedUser] = React.useState(null);

  return (
    <div className="container">
      <div className="header">
        <h1>Quản lý người dùng - React CRUD</h1>
        <p className="small">Demo CRUD sử dụng React Hooks</p>
      </div>
      <div className="toolbar">
        <SearchForm onChangeValue={setKeyword} />
        <AddUser onAdd={setAddedUser} />
      </div>
      <ResultTable
        keyword={keyword}
        user={addedUser}
        onAdded={() => setAddedUser(null)}
      />
    </div>
  );
}
