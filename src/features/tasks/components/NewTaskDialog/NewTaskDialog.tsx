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

    const [taskNameError, setTaskNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const { categories} = useCategories();

    useEffect(() => {
        if (visible) {
            setNewTaskName('');
            setNewTaskDescription('');
            setSelectedCategory(null);
            setTaskNameError('');
            setCategoryError('');
        }
    }, [visible]);

    const validate = () => {
        let valid = true;

        if (!newTaskName.trim()) {
            setTaskNameError('El nombre de la tarea es obligatorio.');
            valid = false;
        } else {
            setTaskNameError('');
        }

        if (!selectedCategory) {
            setCategoryError('Debes seleccionar una categoría.');
            valid = false;
        } else {
            setCategoryError('');
        }

        return valid;
    };

    const handleSave = () => {
        if (!validate()) return;

        onSave({
            name: newTaskName,
            description: newTaskDescription,
            category: selectedCategory,
        });
        onHide();
    };

    const renderFooter = () => (
        <div className={styles.dialogFooter}>
            <Button label="Cancelar" onClick={onHide} severity="secondary" className={styles.cancelButton} />
            <Button label="Guardar" onClick={handleSave} className={styles.saveButton} autoFocus />
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
            headerClassName={styles.dialogHeader}
        >
            <div className="p-fluid">
                <div className="mb-4">
                    <label htmlFor="taskName" className="block mb-2">Nombre de la Tarea</label>
                    <InputText
                        id="taskName"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        className={taskNameError ? 'p-invalid' : ''}
                    />
                    {taskNameError && <small className="p-error block">{taskNameError}</small>}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2">Categoría</label>
                    <Dropdown
                        id="category"
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => setSelectedCategory(e.value)}
                        optionLabel="name"
                        placeholder="Selecciona una categoría"
                        filter
                        appendTo="self"
                        className={categoryError ? 'p-invalid' : ''}
                    />
                    {categoryError && <small className="p-error block">{categoryError}</small>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Descripción</label>
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