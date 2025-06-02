import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

    if (!DJANGO_BACKEND_URL) {
        console.error('DJANGO_BACKEND_URL no está definida.');
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Autorización requerida.' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const taskDataForBackend = {
            title: body.name,
            description: body.description || '',
            status: 'pending',
            category_id: body.category.id,
        };

        const djangoEndpoint = `${DJANGO_BACKEND_URL}/api/tasks/`; // Endpoint de Django para POST

        const response = await fetch(djangoEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader, // Pasa el token del frontend a Django
            },
            body: JSON.stringify(taskDataForBackend),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del backend Django al adicionar tarea:', errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status }); // Devuelve la tarea creada por Django

    } catch (error: any) {
        console.error('Error al procesar la petición POST para adicionar tarea:', error);
        return NextResponse.json({ error: 'Error interno del servidor al adicionar la tarea.' }, { status: 500 });
    }
}