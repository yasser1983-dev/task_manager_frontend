import { fetchFromDjango } from '@/libs/fetchFromDjango';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

export async function GET(request: Request) {
    return fetchFromDjango({
        req: request,
        endpoint: '/api/categories/',
        cache,
        cacheKey: `categories:${request.headers.get('authorization')}`,
        expectedField: 'results',
        requireAuth: true
    });
}