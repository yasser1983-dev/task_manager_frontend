import {LoginData} from "@/features/auth/authTypes";

export async function loginUser(data: LoginData) {
    const res = await fetch('/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Credenciales inválidas');
    }

    return res.json();
}
