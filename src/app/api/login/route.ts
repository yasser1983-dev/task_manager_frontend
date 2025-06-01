import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

        const djangoRes = await fetch(`${DJANGO_BACKEND_URL}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const djangoData = await djangoRes.json();

        if (!djangoRes.ok) {
            return NextResponse.json(djangoData, { status: djangoRes.status });
        }

        return NextResponse.json(djangoData, { status: 200 });
    } catch (error: any) {
        console.error('Error en Next.js API Route /api/login:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor en el login.', error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed for this route.' }, { status: 405 });
}
