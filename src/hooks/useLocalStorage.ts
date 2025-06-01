import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isMounted, setIsMounted] = useState(false);

    // Leer localStorage solo después de montar en cliente
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const item = window.localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`Error al leer localStorage[${key}]:`, error);
        }

        setIsMounted(true);
    }, [key]);

    // Guardar en localStorage cuando el valor cambie
    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;

        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Error al guardar en localStorage[${key}]:`, error);
        }
    }, [key, storedValue, isMounted]);

    return [storedValue, setStoredValue] as const;
}
