import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { uuid: string } }
) {
    const { uuid } = params; // Captura el UUID del path
    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

    if (!uuid) {
        return NextResponse.json({ error: 'UUID de tarea no proporcionado.' }, { status: 400 });
    }

    if (!DJANGO_BACKEND_URL) {
        console.error('DJANGO_BACKEND_URL no está definida en las variables de entorno.');
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');

    const djangoEndpoint = `${DJANGO_BACKEND_URL}/api/tasks/${uuid}/mark-completed/`;

    try {
        const response = await fetch(djangoEndpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader }),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del backend Django:', errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        console.error('Error al reenviar la petición a Django:', error);
        return NextResponse.json({ error: 'Error interno del servidor al procesar la solicitud.' }, { status: 500 });
    }
}