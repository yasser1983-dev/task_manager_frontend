import { NextRequest } from 'next/server';
import { fetchFromDjango } from '@/libs/fetchFromDjango';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const taskDataForBackend = {
            title: body.name,
            description: body.description || '',
            status: 'pending',
            category_id: body.category.id,
        };

        return fetchFromDjango({
            req,
            endpoint: '/api/tasks/',
            method: 'POST',
            body: taskDataForBackend,
            requireAuth: true,
        });

    } catch (error: any) {
        console.error('Error al procesar la petición POST para adicionar tarea:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor al adicionar la tarea.' }),
            { status: 500 }
        );
    }
}