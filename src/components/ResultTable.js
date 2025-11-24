import React from "react";

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // 📦 Load data with async/await
  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        alert("Không thể tải dữ liệu người dùng!");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ➕ Add new user
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user, onAdded]);

  // 🔍 Filtering (Search)
  const filtered = React.useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [users, keyword]);

  // ⚙ Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filtered.slice(indexOfFirst, indexOfLast);

  // ❌ Delete user
  const removeUser = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Lỗi DELETE");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Không thể xóa người dùng!");
    }
  };

  // ✏️ Edit user
  const editUser = (u) => setEditing({ ...u, address: { ...u.address } });

  const handleEditChange = (field, value) => {
    if (["city", "street"].includes(field)) {
      setEditing((e) => ({
        ...e,
        address: { ...e.address, [field]: value },
      }));
    } else {
      setEditing((e) => ({ ...e, [field]: value }));
    }
  };

  const saveUser = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${editing.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        }
      );

      if (!res.ok) throw new Error("Lỗi PUT");

      setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
      setEditing(null);
    } catch (err) {
      alert("Không thể cập nhật người dùng!");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u, index) => (
            <tr key={u.id}>
              <td>{indexOfFirst + index + 1}</td> {/* STT */}
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.address.city}</td>
              <td>
                <button className="btn" onClick={() => editUser(u)}>
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeUser(u.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination UI */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} / {totalPages}
        </span>

        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Popup */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Sửa người dùng</h3>

            <input
              className="input"
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <br />

            <input
              className="input"
              value={editing.email}
              onChange={(e) => handleEditChange("email", e.target.value)}
            />
            <br />

            <input
              className="input"
              value={editing.phone}
              onChange={(e) => handleEditChange("phone", e.target.value)}
            />
            <br />

            <input
              className="input"
              value={editing.address.city}
              onChange={(e) => handleEditChange("city", e.target.value)}
            />
            <br />

            <button className="btn" onClick={() => setEditing(null)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={saveUser}>
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
