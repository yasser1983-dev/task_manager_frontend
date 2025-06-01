'use client';

import React from 'react';
import { Button } from 'primereact/button';
import NewTaskDialog from "@/features/tasks/components/NewTaskDialog/NewTaskDialog";
import { useNewTaskDialog } from "@/features/tasks/hooks/useNewTaskDialog";

import layoutStyles from '@/app/layout.module.css';

interface TaskActionsProps {
}

export default function TaskActions({}: TaskActionsProps) {
    const {
        displayNewTaskDialog,
        handleAddTaskClick,
        handleSaveNewTask,
        handleCancelNewTask
    } = useNewTaskDialog();

    const handleSaveNewTaskActual = async (taskData: { name: string; description: string; category: any }) => {
        console.log('Attempting to save new task:', taskData);
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Token ${yourAuthToken}`
                },
                body: JSON.stringify({
                    title: taskData.name,
                    description: taskData.description,
                    category: taskData.category.id,
                    status: "pending", // Default for new tasks
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Fallo al crear tarea.');
            }

            const result = await response.json();
            console.log('Tarea creada exitosamente:', result);
            handleSaveNewTask();
        } catch (error) {
            console.error('Error crando la tarea:', error);
        }
    };


    return (
        <div className={layoutStyles.headerContainer}>
            <label className={layoutStyles.titleLayout}> Mis tareas</label>
            <Button
                label="Agregar tarea"
                    className="p-button-primary p-button-sm"
                onClick={handleAddTaskClick}
            />

            <NewTaskDialog
                visible={displayNewTaskDialog}
                onHide={handleCancelNewTask}
                onSave={handleSaveNewTaskActual}
            />
        </div>
    );
}