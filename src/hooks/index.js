import {useState} from 'react';

export function useInput(initialState){
    const [value, setValue] = useState(initialState);

    function changeHandler(e){
        e.preventDefault();
        setValue(e.target.value)
    }

    return {value, onChange:changeHandler}
}