import React from "react";

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Lấy dữ liệu từ API khi component mount
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Không thể tải dữ liệu người dùng!");
        setLoading(false);
      });
  }, []);

  // Lắng nghe khi thêm user mới
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user, onAdded]);

  // Lọc danh sách theo từ khóa
  const filtered = React.useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.username.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [users, keyword]);

  // Hàm xóa
  const removeUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // Hàm sửa
  const editUser = (u) => setEditing({ ...u, address: { ...u.address } });

  const handleEditChange = (field, value) => {
    if (["street", "city"].includes(field)) {
      setEditing((e) => ({ ...e, address: { ...e.address, [field]: value } }));
    } else {
      setEditing((e) => ({ ...e, [field]: value }));
    }
  };

  const saveUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };

  // Nếu đang tải dữ liệu
  if (loading) return <div>Đang tải dữ liệu...</div>;

  // ✅ RETURN phải nằm bên trong function ở đây
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
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
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
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
