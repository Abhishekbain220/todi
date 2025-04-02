import React, { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

const Loading = ({text}) => {
    let {loading}=useContext(UserContext)

    
    return (
        <div>
            <button
                
                className={`px-4 py-2 flex items-center gap-2 bg-blue-600 text-white font-semibold rounded-lg transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                disabled={loading}
            >
                {loading && (
                    <svg
                        className="w-5 h-5 animate-spin text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                )}
                {loading ? "Loading..." : `${text}`}
            </button>
        </div>
    )
}

export default Loading

