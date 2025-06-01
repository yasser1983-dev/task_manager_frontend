import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { RootState, AppDispatch } from '@/store';

export function useLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const token = useSelector((state: RootState) => state.auth.token);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            router.push('/tasks');
        }
    }, [token, router]);

    const handleLogin = async () => {
        if (!username || !password) return;

        await dispatch(login({ username, password }));
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
    };
}
