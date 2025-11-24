import React from "react";

export default function AddUser({ onAdd, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const change = (f, v) => setForm({ ...form, [f]: v });

  const submit = async () => {
    if (!form.name || !form.email) {
      alert("Tên và Email không được để trống");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: { city: form.city },
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Lỗi POST");

      // Cập nhật UI
      onAdd(newUser);
      onClose();
    } catch (err) {
      alert("Không thể thêm người dùng!");
    }
  };

  return (
    <div className="add-box">
      <h3>Thêm người dùng</h3>

      <input
        className="input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => change("name", e.target.value)}
      />

      <input
        className="input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => change("email", e.target.value)}
      />

      <input
        className="input"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => change("phone", e.target.value)}
      />

      <input
        className="input"
        placeholder="City"
        value={form.city}
        onChange={(e) => change("city", e.target.value)}
      />

      <button className="btn btn-primary" onClick={submit}>
        Thêm
      </button>
      <button className="btn" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
}
