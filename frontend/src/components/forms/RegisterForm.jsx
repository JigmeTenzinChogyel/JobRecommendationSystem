import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    user_type: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await api.post("/api/user/register/", form);
      console.log(`res: ${res.data}`);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user_type">User Type:</label>
        <select
          id="user_type"
          name="user_type"
          value={form.user_type}
          onChange={handleChange}
        >
          <option value="">Select user type</option>
          <option value="seeker">Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
