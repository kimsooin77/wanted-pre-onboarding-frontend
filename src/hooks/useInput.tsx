import { ChangeEvent, useCallback, useState } from "react"

export interface UserInfo {
    email : string;
    password : string;
}

const useInput = (inititalValue : UserInfo ) => {
    const [values, setValues] = useState(inititalValue);
    const onChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues({...values, [name] : value})
    },[values]);

    const reset = useCallback(() => {
        setValues(inititalValue);
    },[inititalValue]);
    
    return {values, onChange, reset};
}

export default useInput;