import React from "react";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";
import "./App.css";

function App() {
  const [keyword, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="container">
      <h1>React CRUD — JSONPlaceholder</h1>

      <SearchForm onChangeValue={setKeyword} />

      {/* Nút mở form */}
      <button className="btn btn-primary" onClick={() => setShowForm(true)}>
        Thêm mới
      </button>

      {/* Hiện form khi được bật */}
      {showForm && (
        <AddUser
          onAdd={(u) => setNewUser(u)}
          onClose={() => setShowForm(false)}
        />
      )}

      <ResultTable
        keyword={keyword}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;
