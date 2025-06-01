import { markTaskAsCompleted, deleteTask } from '@/features/tasks/taskSlice'; // Importa ambos thunks
import { useCallback } from 'react';
import {useDispatch} from "react-redux"; // Para memoizar las funciones de callback

interface UseTaskActionsResult {
    handleMarkCompleted: (taskId: string) => Promise<void>;
    handleDeleteTask: (taskId: string) => Promise<void>;
    loading: boolean; // Opcional: si quieres exponer el estado de carga desde el hook
    error: string | null; // Opcional: si quieres exponer errores
}

export const useTaskActions = (): UseTaskActionsResult => {
    const dispatch = useDispatch();

    const handleMarkCompleted = useCallback(async (taskId: string) => {
        try {
            await dispatch(markTaskAsCompleted(taskId)).unwrap();
            console.log(`Tarea ${taskId} marcada como completada.`);
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
    }, [dispatch]);

    const handleDeleteTask = useCallback(async (taskId: string) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            return;
        }

        try {
            await dispatch(deleteTask(taskId)).unwrap();
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
    }, [dispatch]);

    return {
        handleMarkCompleted,
        handleDeleteTask,
        loading: false, // Reemplazar con el estado de carga real si lo necesitas
        error: null,    // Reemplazar con el estado de error real si lo necesitas
    };
};