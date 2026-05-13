import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { AllContext } from "../App.jsx";

export default function Register() {

  const { register, setRegister } = useContext(AllContext);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/user/auth/register-admin",
        {
          name: register.name,
          username: register.username,
          password: register.password,
          role: register.role
        }
      );

      alert(res.message);

      window.location.href = "/";

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Terjadi kesalahan"
      );
    }
  };

  return (
    <div className="py-8 flex items-center justify-center bg-warm-gray font-poppins">

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-teal">
          Register Account
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-teal font-bold">
              Name
            </label>

            <input
              required
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={register.name || ""}
              onChange={(e) =>
                setRegister((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

          </div>

          <div className="mb-4">

            <label className="block text-teal font-bold">
              Username
            </label>

            <input
              required
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={register.username || ""}
              onChange={(e) =>
                setRegister((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />

          </div>

          <div className="mb-4">

            <label className="block text-teal font-bold">
              Password
            </label>

            <input
              required
              type="password"
              className="mt-1 p-2 w-full border rounded"
              value={register.password || ""}
              onChange={(e) =>
                setRegister((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

          </div>

          <div className="mb-4">

            <label className="block text-teal font-bold">
              Role
            </label>

            <input
              required
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={register.role || ""}
              onChange={(e) =>
                setRegister((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            />

          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal text-xl text-white rounded hover:bg-white hover:text-teal hover:border hover:border-teal"
          >
            Register
          </button>

        </form>

        <div className="flex justify-center mt-4">

          <h1 className="text-teal">
            Sudah punya akun?{" "}

            <Link
              to={"/login"}
              className="font-bold underline"
            >
              Login
            </Link>

          </h1>

        </div>

      </div>

    </div>
  );

}