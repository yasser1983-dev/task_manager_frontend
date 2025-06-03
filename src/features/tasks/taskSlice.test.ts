import reducer, {
    fetchTasksByCategory,
} from './taskSlice';
import { TaskState, TaskTypes } from '@/features/tasks/taskTypes';

describe('taskSlice reducer', () => {
    const initialState: TaskState = {
        tasks: [],
        loading: false,
        error: null,
    };

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle fetchTasksByCategory.pending', () => {
        const action = { type: fetchTasksByCategory.pending.type };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    const correctedData: TaskTypes[] = [ // You can explicitly type it here
        {
            id: '1',
            title: 'Task 1',
            status: 'pending',
            category: {
                id: 20000000,
                name: 'Work',
                color: '#FF0000',
            },
            description: 'Description 1',
        },
    ];

    it('should handle fetchTasksByCategory.fulfilled', () => {
        const tasks: TaskTypes[] = correctedData as TaskTypes[];

        const action = { type: fetchTasksByCategory.fulfilled.type, payload: tasks };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.tasks).toEqual(tasks);
    });

    it('should handle fetchTasksByCategory.rejected', () => {
        const action = { type: fetchTasksByCategory.rejected.type, payload: 'Error message' };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Error message');
    });
});
