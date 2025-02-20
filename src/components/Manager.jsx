import { useState, useEffect } from "react";
import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from "../assets/eye-off.svg";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const notifySave = () => toast.dark("Password is saved!");
  const notifyDelete = () => toast.dark("Password is deleted!");
  const [errors, setErrors] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visibility, setVisibility] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const changeEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000");
    let password = await req.json();
    setPasswordArray(password);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const toggleVisibility = (id) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      if (!form.site) setErrors({ ...errors, site: "Site is required" });
      if (!form.username)
        setErrors({ ...errors, username: "Username is required" });
      if (!form.password)
        setErrors({ ...errors, password: "Password is required" });
    } else {
      const newPassword = {
        ...form,
        id: uuidv4(),
        password: form.password,
        site: form.site,
        username: form.username,
      };
      const updatedPasswords = [...passwordArray, newPassword];
      await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Add this
        body: JSON.stringify(newPassword),
      });

      setPasswordArray(updatedPasswords);
      setForm({ site: "", username: "", password: "" });
      setErrors({ site: "", username: "", password: "" });
      notifySave();
    }
  };

  const handleDelete = async (id) => {
    const updatedPasswords = passwordArray.filter((entry) => entry.id !== id);
    await fetch("http://localhost:3000", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setPasswordArray(updatedPasswords);
  };

  const handleEdit = (id) => {
    const entry = passwordArray.find((entry) => entry.id === id);
    setForm({ ...entry });
    handleDelete(id);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 md:p-4 shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold">
          Pass<span className="text-yellow-300">Fort</span>
        </h1>
        <div className="flex gap-2 md:gap-4 text-sm md:text-lg">
          <a
            href="https://github.com/lilithCode"
            target="_blank"
            className="hover:text-yellow-300 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/miss-lilith-b863432a4/"
            target="_blank"
            className="hover:text-yellow-300 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="relative px-4 py-6 md:px-8 md:py-10 flex flex-col space-y-4 md:space-y-6 w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Pass<span className="text-blue-600">Fort</span>
          </h1>
          <p className="text-gray-500">Secure your passwords</p>
        </div>
        <div className="bg-white text-black border-gray-300 border-2 rounded-full focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-300">
          <input
            name="site"
            value={form.site}
            type="text"
            placeholder="Enter website URL"
            className="p-2 md:p-3 w-full rounded-full px-4 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>
        {errors.site && <p className="text-red-500 text-sm">{errors.site}</p>}
        <div className="flex flex-col gap-y-2 md:gap-y-4 justify-between md:flex-row">
          <div className="w-full bg-white text-black border-gray-300 border-2 rounded-full md:w-[45%] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-300">
            <input
              name="username"
              value={form.username}
              type="text"
              placeholder="Enter username"
              className="p-2 md:p-3 w-full rounded-full px-4 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
          <div className="w-full flex items-center bg-white text-black border-gray-300 border-2 rounded-full md:w-[45%] px-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-300">
            <input
              name="password"
              value={form.password}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter password"
              required
              className="p-2 md:p-3 w-full rounded-full focus:outline-none"
              onChange={handleChange}
            />
            <img
              className="cursor-pointer ml-2"
              src={eyeIcon}
              alt="toggle password visibility"
              width="20px"
              height="20px"
              onClick={changeEyeIcon}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              savePassword();
            }}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-2 rounded-full text-lg gap-2 shadow-md hover:from-blue-700 hover:to-purple-700 transition"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="flex justify-center items-center mt-8">
          <table className="table-auto border-collapse w-full text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-2 py-1 md:px-4 md:py-2">Site</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Username</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Password</th>
                <th className="px-2 py-1 md:px-4 md:py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.length <= 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-2 py-2 md:px-4 md:py-4 text-gray-500 text-lg text-center"
                  >
                    No passwords saved yet
                  </td>
                </tr>
              )}
              {passwordArray.map((entry,index) => (
                <tr key={index} className="bg-blue-200">
                  <td
                    key={`site-${entry.id}`}
                    className="border border-blue-600 px-2 py-1 md:px-4 md:py-2 text-center"
                  >
                    {entry.site}
                  </td>
                  <td
                    key={`username-${entry.id}`}
                    className="border border-blue-600 px-2 py-1 md:px-4 md:py-2 text-center"
                  >
                    {entry.username}
                  </td>
                  <td
                    key={`password-${entry.id}`}
                    className="border border-blue-600 px-2 py-1 md:px-4 md:py-2 text-center"
                  >
                    <div className="flex flex-row justify-between items-center px-2 md:px-4">
                      <span>
                        {visibility[entry.id]
                          ? entry.password
                          : "•".repeat(entry.password.length)}
                      </span>
                      <img
                        className="cursor-pointer ml-2"
                        src={visibility[entry.id] ? eyeCloseIcon : eyeIcon}
                        alt="toggle password visibility"
                        width="20px"
                        height="20px"
                        onClick={() => toggleVisibility(entry.id)}
                      />
                    </div>
                  </td>
                  <td
                    key={`actions-${entry.id}`}
                    className="border border-blue-600 px-2 py-1 md:px-4 md:py-2 text-center"
                  >
                    <div className="flex flex-row justify-around items-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEdit(entry.id)}
                      ></lord-icon>
                      <lord-icon
                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                        trigger="hover"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(entry.id);
                          notifyDelete();
                        }}
                      ></lord-icon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Manager;
