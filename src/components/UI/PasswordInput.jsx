import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from './Input'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const PasswordInput = ({ label, error, touched, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <Input label={label} type={showPassword ? 'text' : 'password'} error={error} touched={touched} {...props} />
            <button type="button" className="absolute right-3 top-1/2 transform -translateY-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300" onClick={() => setShowPassword(!showPassword)}>
                <motion.i whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {showPassword ? <BsEye className='size-5 cursor-pointer' /> : <BsEyeSlash className='size-5 cursor-pointer' />}
                </motion.i>
            </button>
        </div>
    )
}

export default PasswordInput
