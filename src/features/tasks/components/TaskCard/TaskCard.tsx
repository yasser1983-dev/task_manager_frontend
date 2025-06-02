import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { TaskCardProps } from '@/features/tasks/taskTypes';
import Circle from '@/components/Circle/Circle';
import styles from './TaskCard.module.css';
import {useTaskActions} from "@/features/tasks/hooks/useTaskActions";


export default function TaskCard({ task }: TaskCardProps) {
    const { handleMarkCompleted, handleDeleteTask } = useTaskActions();

    const cardStyles = {
        border: `2px solid ${task.category.color}`,
        '--category-color': task.category.color,
    };

    return (
        <Card className={styles.card} style={cardStyles}>
            <div className={styles.cardContent}>
                <Button
                    icon="pi pi-times"
                    rounded
                    text
                    severity="danger"
                    aria-label="Eliminar"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(task.id)}
                />
                <div className={styles.title}>
                    {task.title}
                </div>
                <p className={styles.description}>{task.description}</p>
                <div className={styles.footer}>
                    <Circle color={task.category.color} />
                    {task.status !== "completed" && (
                        <Button
                            label="Finalizar"
                            className="p-button-success p-button-sm"
                            onClick={() =>handleMarkCompleted(task.id)}
                        />
                    )}
                </div>
            </div>
        </Card>

    );
}
