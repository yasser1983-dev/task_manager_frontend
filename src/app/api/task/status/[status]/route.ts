import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { status: string } }
) {
    const { status } = params;

    const path = request.nextUrl.pathname;
    const pathSegments = path.split('/').filter(segment => segment !== '');
    const lastSegment = pathSegments[pathSegments.length - 1] || '';

    console.log(status, "status");
    console.log(lastSegment, "lastSegment");

    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

    if (!DJANGO_BACKEND_URL) {
        return NextResponse.json({ error: 'No se ha definido la URL del backend Django.' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization') || '';

    try {
        const response = await fetch(`${DJANGO_BACKEND_URL}/api/tasks/${status || lastSegment}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { Authorization: authHeader }),
            },
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data.results || data);
    } catch (error: any) {
        console.error('Error al hacer fetch a Django:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
