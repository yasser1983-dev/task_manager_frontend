import { NextRequest } from 'next/server';
import { fetchFromDjango } from '@/libs/fetchFromDjango';

export async function DELETE(
    req: NextRequest,
    context: { params: { uuid: string } }
) {
    const uuid = context.params?.uuid;

    if (!uuid) {
        return Response.json({ error: 'UUID de tarea no proporcionado.' }, { status: 400 });
    }

    return fetchFromDjango({
        req,
        endpoint: `/api/tasks/${uuid}/`,
        method: 'DELETE',
        requireAuth: true,
        handle204: true, // Evitar error si Django responde con 204
    });
}
