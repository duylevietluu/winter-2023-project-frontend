import { useState } from 'react'

const useTextArea = (name, rows="20") => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue("")
    }

    return {
        name,
        value,
        onChange,
        rows,
        style: {resize: "none"},
        reset,
    }
}

export default useTextArea