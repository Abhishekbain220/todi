import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../utils/UserContext'
import { toast } from 'react-toastify'

const Signup = () => {
    let { username, setUsername, email, setEmail, password, setPassword, token } = useContext(UserContext)
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const user = { username, email, password }
            let signupData = await axios.post("/user/signup", user)
            setEmail("")
            setPassword("")
            setUsername("")
            console.log(user)
            navigate("/login")
            setLoading(false)

            setTimeout(() => {
                toast.success(signupData.data.message)
            }, 1000);

        } catch (error) {
            console.log(error)
            setTimeout(() => {
                toast.error(error.response.data.message)
            }, 1000);
        }

    }

    useEffect(() => {
        if (token) navigate("/")
    }, [token, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={submitHandler}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

                <div className="mb-4">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
                <p class="text-sm mt-5 text-center text-gray-600">
                    Already have an account?
                    <a onClick={() => navigate("/login")} class="text-blue-500 hover:underline font-medium"> Log in</a>
                </p>

            </form>
        </div>
    )
}

export default Signup
