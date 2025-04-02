import React from 'react'
import { motion } from 'framer-motion'

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="flex flex-col items-center">
                <motion.div
                    className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                ></motion.div>
                <motion.p
                    className="mt-4 text-lg font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                    Loading...
                </motion.p>
            </div>
        </div>
  )
}

export default LoadingPage