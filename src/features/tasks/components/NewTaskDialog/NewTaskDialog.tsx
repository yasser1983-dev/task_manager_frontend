'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { useCategories } from '@/features/categories/useCategories';
import { Category, NewTaskDialogProps } from '@/features/tasks/taskTypes';
import styles from './NewTaskDialog.module.css';

export default function NewTaskDialog({ visible, onHide, onSave }: NewTaskDialogProps) {
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const { categories, loading, error } = useCategories();

    // Resetear el formulario cada vez que el diálogo se haga visible
    useEffect(() => {
        if (visible) {
            setNewTaskName('');
            setNewTaskDescription('');
            setSelectedCategory(null);
           // setError(''); // Asegúrate de que este error se maneje localmente o lo remueves
        }
    }, [visible]);

    const handleSave = () => {
        // Validación básica
        if (!newTaskName.trim()) {
            alert('El nombre de la tarea es obligatorio.'); // Considera usar un Message de PrimeReact en su lugar
            return;
        }
        if (!selectedCategory) {
            alert('Debes seleccionar una categoría.'); // Considera usar un Message de PrimeReact en su lugar
            return;
        }

        // Llamar a la función onSave pasada por las props
        onSave({
            name: newTaskName,
            description: newTaskDescription,
            category: selectedCategory,
        });
        onHide(); // Cerrar el diálogo después de guardar
    };

    const renderFooter = () => (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog
            header="Agregar tarea"
            visible={visible}
            className={styles.customDialog}
            modal
            footer={renderFooter}
            onHide={onHide}
        >
            <div className="p-fluid">
                <div className="p-field mb-4">
                    <label htmlFor="taskName" className="mb-2 block">Nombre de la Tarea</label>
                    <InputText
                        id="taskName"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="p-field mb-4">
                    <label htmlFor="category" className="font-bold mb-2 block">Categoría</label>
                    <Dropdown
                        id="category"
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        optionLabel="name"
                        placeholder="Selecciona una categoría"
                        filter
                        // loading={categoriesLoading}
                        // disabled={categoriesLoading || categoriesError}
                    />
                    {/*{categoriesError && <small className="p-error block mt-1">{categoriesError}</small>}*/}
                </div>
                <div className="p-field mb-4">
                    <label htmlFor="description" className="font-bold mb-2 block">Descripción</label>
                    <InputTextarea
                        id="description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        rows={5}
                        cols={30}
                    />
                </div>
            </div>
        </Dialog>
    );
}