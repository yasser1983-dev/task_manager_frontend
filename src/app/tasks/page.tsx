    'use client';

    import ProtectedRoute from '@/components/ProtectedRoute';
    import TaskList from '@/features/tasks/components/TaskList/TaskList';

    export default function TasksPage() {
        return (
            <ProtectedRoute>
                <main className="p-4">
                    <TaskList />
                </main>
            </ProtectedRoute>
        );
    }
