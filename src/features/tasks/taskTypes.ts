export interface TaskTypes {
    id: string;
    title: string;
    status: string;
    category: Category;
    description: string;
}

export interface TaskState {
    tasks: TaskTypes[];
    loading: boolean;
    error: string | null;
}

export interface TaskCardProps {
    task: TaskTypes;
}

export interface Category{
    id: number;
    name: string;
    color: string;
}

export interface NewTaskDialogProps {
    visible: boolean;
    onHide: () => void;
    onSave: (taskData: { name: string; description: string; category: Category | null }) => void;
}

export interface NewTaskData {
    title: string;
    description: string;
    category_id: number; // El backend espera category_id, no el objeto Category completo
}