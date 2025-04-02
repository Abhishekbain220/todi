import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../utils/UserContext'
import { toast } from 'react-toastify'

const Profile = () => {
  
  const navigate = useNavigate()
  let {token,username,setUsername,email,setEmail,setPassword,password}=useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/user/currentUser", {
        withCredentials: true
      })
      setUsername(data.user.username)
      setEmail(data.user.email)
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch user data:", err)
    }
  }

  useEffect(() => {
    if(token)getUserData()
        if(!token) navigate("/login")
  }, [token])


  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = { username, email, password }

      let {data}=await axios.put("/user/updateUser", user, {
        withCredentials: true
      })

      setUsername("")
      setEmail("")
      setPassword("")
      setTimeout(() => {
        toast.success(data.message)
    }, 500);
      navigate("/")
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Update Profile
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  )
}

export default Profile
