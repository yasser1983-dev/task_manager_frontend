import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    console.log("req.nextUrl.searchParams");
    let status = req.nextUrl.searchParams.get('status');


    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;
    if (status !== 'pending' && status !== 'completed') {
        status = 'pending';
    }

    if (!DJANGO_BACKEND_URL) {
        return NextResponse.json({ error: 'No se ha definido la URL del backend Django.' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization') || '';

    try {
        const response = await fetch(`${DJANGO_BACKEND_URL}/api/tasks/${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { Authorization: authHeader }),
            },
        });
        console.log(response);
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
