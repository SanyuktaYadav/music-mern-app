import { useState } from "react";
import { useNavigate } from "react-router";

const initialFormFields = {
  email: "",
  password: ""
};

const SignUp = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({ ...initialFormFields });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formFields;
    console.log("Logging in with: ", payload);
    navigate("/dashboard");
  };

  return (
    <div className="mt-20 max-w-md mx-auto p-10 shadow-md bg-white rounded-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>

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
            className="w-25 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
