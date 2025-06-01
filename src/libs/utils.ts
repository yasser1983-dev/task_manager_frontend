export function getTokenFromLocalStorage(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}