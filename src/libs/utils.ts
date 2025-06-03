import { RootState } from '@/store';

export function getTokenFromLocalStorage(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

// Helper para obtener el token
const getAuthToken = (state: RootState) => {
    return state.auth.token || getTokenFromLocalStorage();
};

// Helper genérico para hacer fetch con token y manejar errores comunes
export async function authorizedFetch<T>(
    url: string,
    options: RequestInit,
    thunkAPI: any,
): Promise<T> {
    const state: RootState = thunkAPI.getState();
    const token = getAuthToken(state);

    if (!token) {
        return thunkAPI.rejectWithValue('No token encontrado.');
    }

    const headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
    };

    try {
        const res = await fetch(url, { ...options, headers });

        if (!res.ok) {
            let errorMessage = `Error ${res.status}: ${res.statusText}`;
            try {
                const errorData = await res.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch {

            }
            throw new Error(errorMessage);
        }

        if (res.status === 204) {
            // Retorna valor vacío, en DELETE manejamos aparte
            return null as unknown as T;
        }

        const data = await res.json();
        return data as T;
    } catch (error: any) {
        console.error('Fetch error:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error en la solicitud.');
    }
}