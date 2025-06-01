import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const backendUrl = process.env.DJANGO_BACKEND_URL;
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'No autenticado. Token no encontrado.' }, { status: 401 });
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

        // Si Django devuelve un objeto paginado, extrae los resultados para el frontend
        // O simplemente devuelve el data si tu backend ya no pagina aquí
        const categories = djangoData.results || djangoData;

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