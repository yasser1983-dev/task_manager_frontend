"use client";

import { useState } from 'react';
import { Category } from '@/features/tasks/taskTypes';
import {AppDispatch, RootState} from "@/store";
import {useDispatch} from 'react-redux';
import {addTask} from "@/features/tasks/taskSlice";

/**
 * Custom hook to manage the state and actions related to the "New Task" dialog.
 * @returns {{
 * displayNewTaskDialog: boolean,
 * newTaskName: string,
 * setNewTaskName: Function,
 * newTaskDescription: string,
 * setNewTaskDescription: Function,
 * selectedCategory: Category | null,
 * setSelectedCategory: Function,
 * handleAddTaskClick: Function,
 * handleSaveNewTask: Function,
 * handleCancelNewTask: Function
 * }}
 */
export const useNewTaskDialog = () => {
    const [displayNewTaskDialog, setDisplayNewTaskDialog] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTaskClick = () => {
        setDisplayNewTaskDialog(true);
    };

    const resetTaskForm = () => {
        resetForm();
        setDisplayNewTaskDialog(false);
    };

    const handleCancelNewTask = () => {
        resetForm();
        setDisplayNewTaskDialog(false);
    };

    const resetForm = () => {
        setNewTaskName('');
        setNewTaskDescription('');
        setSelectedCategory(null);
    };

    const handleSaveNewTaskActual = (taskData: { title: string; description: string; category_id: 0 }) => {
        try {
            dispatch(addTask(taskData));
        } catch (error: unknown) {
            let errorMessage = `Fallido el intento para agregar la tarea.`;
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
        displayNewTaskDialog,
        newTaskName,
        setNewTaskName,
        newTaskDescription,
        setNewTaskDescription,
        selectedCategory,
        setSelectedCategory,
        handleAddTaskClick,
        handleCancelNewTask,
        handleSaveNewTaskActual
    };
};