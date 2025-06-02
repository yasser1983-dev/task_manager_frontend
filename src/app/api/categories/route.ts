import { NextResponse } from 'next/server';

import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // TTL en segundos

export async function GET(request: Request) {
    try {
        const backendUrl = process.env.DJANGO_BACKEND_URL;
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'No autenticado. Token no encontrado.' }, { status: 401 });
        }

        const cacheKey = `categories:${authHeader}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return NextResponse.json(cachedData, { status: 200 });
        }

        const djangoRes = await fetch(`${backendUrl}/api/categories/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authHeader}`,
            },
        });

        const djangoData = await djangoRes.json();

        if (!djangoRes.ok) {
            return NextResponse.json(djangoData, { status: djangoRes.status });
        }

        const categories = djangoData.results || djangoData;

        // Guardar en caché
        cache.set(cacheKey, categories);

        return NextResponse.json(categories, { status: 200 });

    } catch (error: unknown) {
        console.error('Error en Next.js API Route /api/categories:', error);
        let errorMessage = 'Error interno del servidor al obtener categorías.';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
            errorMessage = (error as { message: string }).message;
        }

        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}