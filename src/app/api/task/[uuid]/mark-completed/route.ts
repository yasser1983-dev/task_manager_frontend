import { fetchFromDjango } from '@/libs/fetchFromDjango';
import { NextRequest } from 'next/server';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { uuid: string } }
) {
    return fetchFromDjango({
        req,
        endpoint: `/api/tasks/${params.uuid}/mark-completed/`,
        method: 'PATCH',
        requireAuth: true
    });
}