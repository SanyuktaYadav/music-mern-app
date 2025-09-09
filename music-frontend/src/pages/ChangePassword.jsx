import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { changePassword } from "../actions/userActions";
import { decryptText } from "../utils/helpers";

const initialFormFields = {
  email: "",
  newPassword: "",
  confirmPassword: ""
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formFields, setFormFields] = useState({ ...initialFormFields });

  useEffect(() => {
    if (token) {
      const descryptedEmail = decodeURIComponent(decryptText(token));
      setFormFields(prevState => ({ ...prevState, email: descryptedEmail }));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formFields.newPassword !== formFields.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const payload = formFields;
    const response = await changePassword(payload);
    if (response) {
      toast.success(response.data.message);
      navigate("/Login");
    }
  };

  return (
    <div className="mt-20 w-4/5 max-w-md mx-auto p-4 md:p-10 shadow-md bg-white rounded-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Change Password</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-gray-900 font-medium mb-2">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formFields.newPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-900 font-medium mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="Re Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formFields.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="cursor-pointer w-25 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
