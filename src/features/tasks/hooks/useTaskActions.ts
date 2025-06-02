import { markTaskAsCompleted, deleteTask } from '@/features/tasks/taskSlice';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";

export const useTaskActions = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMarkCompleted = (taskId: string) => {
        try {
            dispatch(markTaskAsCompleted(taskId));

        } catch (error: unknown) {
            let errorMessage = `Fallido el intento para marcar la tarea ${taskId} como completada.`;
            if (error instanceof Error) {
                errorMessage += ` ${error.message}`;
            } else if (typeof error === 'string') {
                errorMessage += ` ${error}`;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                if (typeof (error as { message: unknown }).message === 'string') {
                    errorMessage += ` ${(error as { message: string }).message}`;
                } else {
                    errorMessage += ` ${JSON.stringify(error)}`;
                }
            }
            console.error(errorMessage, error);
        }
    };

    const handleDeleteTask = (taskId: string) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            return;
        }

        try {
            dispatch(deleteTask(taskId));
            console.log(`Tarea ${taskId} eliminada exitosamente.`);
        } catch (error: unknown) {
            let errorMessage = `Fallido el intento para eliminar la tarea ${taskId}.`;
            if (error instanceof Error) {
                errorMessage += ` ${error.message}`;
            } else if (typeof error === 'string') {
                errorMessage += ` ${error}`;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                if (typeof (error as { message: unknown }).message === 'string') {
                    errorMessage += ` ${(error as { message: string }).message}`;
                } else {
                    errorMessage += ` ${JSON.stringify(error)}`;
                }
            }
            console.error(errorMessage, error);
        }
    };

    return {
        handleMarkCompleted,
        handleDeleteTask,
        loading: false,
        error: null,
    };
};