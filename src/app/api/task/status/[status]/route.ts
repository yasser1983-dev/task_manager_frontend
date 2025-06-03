import { NextRequest } from 'next/server';
import { fetchFromDjango } from '@/libs/fetchFromDjango';

export async function GET(
    request: NextRequest,
    { params }: { params: { status: string } }
) {
    const { status } = params;

    const path = request.nextUrl.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || '';

    const finalStatus = status || lastSegment;

    return fetchFromDjango({
        req: request,
        endpoint: `/api/tasks/${finalStatus}`,
        method: 'GET',
        requireAuth: true,
        expectedField: 'results',
    });
}
