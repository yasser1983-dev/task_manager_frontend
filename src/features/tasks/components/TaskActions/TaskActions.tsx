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
        handleCancelNewTask,
        handleSaveNewTaskActual
    } = useNewTaskDialog();


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