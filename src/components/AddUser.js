import React from "react";

const initial = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: { street: "", suite: "", city: "" },
};

export default function AddUser({ onAdd }) {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState(initial);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser((u) => ({ ...u, address: { ...u.address, [id]: value } }));
    } else {
      setUser((u) => ({ ...u, [id]: value }));
    }
  };

  const handleAdd = () => {
    if (!user.name || !user.username)
      return alert("Vui lòng nhập Name và Username!");
    onAdd(user);
    setUser(initial);
    setShow(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShow(true)}>
        Thêm
      </button>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm người dùng</h3>
            <input
              id="name"
              className="input"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
            <br />
            <input
              id="username"
              className="input"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
            <br />
            <input
              id="email"
              className="input"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            <br />
            <input
              id="phone"
              className="input"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
            />
            <br />
            <input
              id="city"
              className="input"
              placeholder="City"
              value={user.address.city}
              onChange={handleChange}
            />
            <br />
            <button className="btn" onClick={() => setShow(false)}>
              Hủy
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
