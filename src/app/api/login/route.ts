import { fetchFromDjango } from '@/libs/fetchFromDjango';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const credentials = await request.json();

        return fetchFromDjango({
            req: request,
            endpoint: '/api-token-auth/',
            method: 'POST',
            body: credentials,
            requireAuth: false,
        });

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
