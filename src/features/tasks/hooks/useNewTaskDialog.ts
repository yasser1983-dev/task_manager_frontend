"use client";

import { useState } from 'react';
import { Category } from '@/features/tasks/taskTypes';

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

    // Function to open the dialog
    const handleAddTaskClick = () => {
        setDisplayNewTaskDialog(true);
    };

    // Function to handle saving the new task (placeholder logic)
    const handleSaveNewTask = () => {
        console.log('Nueva tarea desde hook:', {
            name: newTaskName,
            description: newTaskDescription,
            category: selectedCategory,
        });
        // You would typically call an API here to save the task
        // After successful save, reset and close
        resetForm();
        setDisplayNewTaskDialog(false);
    };

    // Function to handle cancelling or hiding the dialog
    const handleCancelNewTask = () => {
        resetForm();
        setDisplayNewTaskDialog(false);
    };

    // Helper function to reset the form fields
    const resetForm = () => {
        setNewTaskName('');
        setNewTaskDescription('');
        setSelectedCategory(null);
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
        handleSaveNewTask,
        handleCancelNewTask,
    };
};