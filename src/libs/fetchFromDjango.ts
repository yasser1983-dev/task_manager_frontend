import { NextRequest, NextResponse } from 'next/server';

type FetchFromDjangoOptions = {
    req: NextRequest;
    endpoint: string;
    method?: string;
    requireAuth?: boolean;
    body?: any;
    expectedField?: string;
    cache?: any;
    cacheKey?: string;
    handle204?: boolean;
};

export async function fetchFromDjango({
                                          req,
                                          endpoint,
                                          method = 'GET',
                                          requireAuth = true,
                                          body,
                                          expectedField,
                                          cache,
                                          cacheKey,
                                          handle204 = false,
                                      }: FetchFromDjangoOptions) {
    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;
    if (!DJANGO_BACKEND_URL) {
        console.error('DJANGO_BACKEND_URL no está definida.');
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');
    if (requireAuth && !authHeader) {
        return NextResponse.json({ error: 'Autorización requerida.' }, { status: 401 });
    }

    // Cache check
    if (cache && cacheKey) {
        const cached = cache.get(cacheKey);
        if (cached) {
            return NextResponse.json(cached);
        }
    }

    try {
        const res = await fetch(`${DJANGO_BACKEND_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader }),
            },
            ...(body && { body: JSON.stringify(body) }),
        });

        // Manejo especial para 204
        if (res.status === 204) {
            return handle204
                ? new NextResponse(null, { status: 204 })
                : NextResponse.json({ message: 'Sin contenido.' }, { status: 204 });
        }

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        if (expectedField && data[expectedField]) {
            if (cache && cacheKey) {
                cache.set(cacheKey, data[expectedField]);
            }
            return NextResponse.json(data[expectedField], { status: res.status });
        }

        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error(`Error en fetchFromDjango (${method} ${endpoint}):`, error);
        return NextResponse.json({ error: 'Error interno del servidor al conectar con Django.' }, { status: 500 });
    }
}
