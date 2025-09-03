import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { storeCurrentUserDetails } from "../redux/slices/currentUserDetailsSlice";
import { BASE_URL } from "../utils/constants";

const initialFormFields = {
  email: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({ ...initialFormFields });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = formFields;
      const response = await axios.post(BASE_URL + '/myMusic/auth/login', { ...payload },
        { withCredentials: true });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(storeCurrentUserDetails({ user: response.data.user }));
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.ERROR || "Something went wrong");
    }
  };

  return (
    <div className="mt-20 max-w-md mx-auto p-10 shadow-md bg-white rounded-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formFields.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-900 font-medium mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formFields.password}
            onChange={handleChange}
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="cursor-pointer w-25 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </form>
      <div className="text-center pt-8">New user? Please sign up <Link to="/SignUp" className="text-blue-700">here</Link></div>
    </div>
  );
};

export default Login;
