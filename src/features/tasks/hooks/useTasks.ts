import {useSelector} from 'react-redux';
import {RootState} from '@/store';

export function useTasks() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return { tasks };
}