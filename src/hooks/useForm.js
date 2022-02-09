import {useState} from 'react';

function useForm(initialForm = {}) {
    const [form, setForm] = useState(initialForm)

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return {form, setForm, onChangeHandler}
}

export default useForm;