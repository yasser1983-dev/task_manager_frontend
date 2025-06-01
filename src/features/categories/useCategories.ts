import { useState, useEffect } from 'react';
import { Category } from '@/features/tasks/taskTypes';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useLocalStorage} from "@/hooks/useLocalStorage"; // Asegúrate de que esta ruta sea correcta

/**
 * Custom hook para obtener las categorías desde el backend a través de la API Route de Next.js.
 * @returns {{categories: Category[], loading: boolean, error: string}} Un objeto con las categorías, estado de carga y mensaje de error.
 */
export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const reduxToken = useSelector((state: RootState) => state.auth.token);
    const [localToken] = useLocalStorage<string>('token', '');
    const token = reduxToken || localToken;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories',
                    {
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `No se pudieron obtener las categorías: ${res.statusText}`);
                }

                const data = await res.json();
                setCategories(data.results || data);
            } catch (err: unknown) {
                let errorMessage = 'Ha ocurrido un error inesperado al cargar las categorías.';

                if (err instanceof Error) {
                    errorMessage = err.message;
                } else if (typeof err === 'string') {
                    errorMessage = err;
                } else if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
                    errorMessage = (err as { message: string }).message;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // El array de dependencias vacío asegura que el efecto se ejecute solo una vez al montar el componente

    return { categories, loading, error };
};