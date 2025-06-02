'use client';

import {useTasks} from '@/features/tasks/hooks/useTasks';
import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskList.module.css';
import TaskFilterTabs from "@/features/tasks/components/TaskFilter/TaskFilterTabs";
import {ConfirmPopup} from "primereact/confirmpopup";


export default function TaskList() {
    const {tasks} = useTasks();

    return (
        <>
            <TaskFilterTabs />
            {!tasks ? (
                <div>Cargando tareas...</div>
            ) : !Array.isArray(tasks) || tasks.length === 0 ? (
                <div>No hay tareas para mostrar.</div>
            ) : (
                <div className={styles.gridContainer}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
            <ConfirmPopup />
        </>
    );
}
