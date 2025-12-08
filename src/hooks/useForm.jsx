import { useState } from 'react'

export const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))

        if (validate) {
            setErrors((prev) => ({ ...prev, [name]: validate[name] ? validate[name](value) : '' }))
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
        setTouched({})
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        resetForm,
        setValues,
    }
}
