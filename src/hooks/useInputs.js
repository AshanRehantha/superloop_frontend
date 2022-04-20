import React, { useState } from "react";

const useInputs = callback => {
    const [value, setValues] = useState(() => {});
    return {
        value,
        onChange:e => {
            setValues({
                ...value,
                [e.target.name]: e.target.value
            });
        },
    }
}
export default useInputs;