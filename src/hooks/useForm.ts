import { useState } from 'react';

function useForm<T>(initialForm: T) {
    const [form, setForm] = useState<T>(initialForm)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return { form, setForm, onChangeHandler }
}

export default useForm;