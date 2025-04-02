import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const { email, setEmail, password, setPassword, token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const user = { email, password };
            const loginUser = await axios.post("/user/login", user, {
                withCredentials: true
            });

            localStorage.setItem("authToken", JSON.stringify(loginUser.data.token));
            setToken(loginUser.data.token);

            setEmail("");
            setPassword("");
            navigate("/");
            setLoading(false)
            setTimeout(() => {
                toast.success(loginUser.data.message)
            }, 1000);
        } catch (error) {
            console.log(error.response.data.message);
            setTimeout(() => {
                toast.error(error.response.data.message)
            }, 1000);
        }
    };

    useEffect(() => {
        if (token) navigate("/");
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={submitHandler}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                <p class="text-sm mt-5 text-center text-gray-600">
                    Don't have an account?
                    <a onClick={() => navigate("/signup")} class="text-blue-500 hover:underline font-medium"> Sign up</a>
                </p>
            </form>

        </div>
    );
};

export default Login;
