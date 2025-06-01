import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { TaskCardProps } from '@/features/tasks/taskTypes';
import Circle from '@/components/Circle/Circle';
import styles from './TaskCard.module.css';
import {useDispatch} from "react-redux";
import {markTaskAsCompleted} from "@/features/tasks/taskSlice";

export default function TaskCard({ task }: TaskCardProps) {
    const dispatch = useDispatch();

    const cardStyles = {
        border: `2px solid ${task.category.color}`,
        '--category-color': task.category.color,
    };

    const handleMarkCompleted = async () => {
        try {
            await dispatch(markTaskAsCompleted(task.id)).unwrap();
        } catch (error: unknown) {
            let errorMessage = `Fallido el intento para marcar la tarea ${task.id} como completada.`;
            if (error instanceof Error) {
                errorMessage += ` ${error.message}`;
            } else if (typeof error === 'string') {
                errorMessage += ` ${error}`;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage += ` ${(error as { message: string }).message}`;
            }
            console.error(errorMessage, error);
        }
    };

    return (
        <Card className={styles.card} style={cardStyles}>
            <div className={styles.title}>
                {task.title}
            </div>
            <p className={styles.description}>{task.description}</p>
            <div className={styles.footer}>
               <Circle color={task.category.color}></Circle>
                {task.category.color !== "completed" && (
                    <Button
                        label="Finalizar"
                        className="p-button-success p-button-sm"
                        onClick={handleMarkCompleted}
                    />
                )}
            </div>
        </Card>
    );
}
