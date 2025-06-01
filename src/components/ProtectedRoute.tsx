'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RootState } from '@/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!token) {
            router.replace('/login');
        }
    }, [token, router]);

    // Evitar renderizar en servidor o antes de montar
    if (!isMounted) return null;

    if (!token) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="ml-4">Redirigiendo a la autenticación...</p>
            </div>
        );
    }

    return <>{children}</>;
}
