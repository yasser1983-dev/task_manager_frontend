import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { uuid: string } }
) {
    const { uuid } = params; // Captura el UUID del path
    const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

    if (!uuid) {
        return NextResponse.json({ error: 'UUID de tarea no proporcionado.' }, { status: 400 });
    }
    if (!DJANGO_BACKEND_URL) {
        console.error('DJANGO_BACKEND_URL no está definida.');
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const authHeader = req.headers.get('authorization');
    const djangoEndpoint = `${DJANGO_BACKEND_URL}/api/tasks/${uuid}/`; // URL de Django para eliminar una tarea

    try {
        const response = await fetch(djangoEndpoint, {
            method: 'DELETE',
            headers: {
                ...(authHeader && { 'Authorization': authHeader }),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error del backend Django al eliminar:', errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        if (response.status === 204) {
            return new NextResponse(null, { status: 204 }); // No Content
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        console.error('Error al reenviar la petición DELETE a Django:', error);
        return NextResponse.json({ error: 'Error interno del servidor al procesar la solicitud de eliminación.' }, { status: 500 });
    }
}