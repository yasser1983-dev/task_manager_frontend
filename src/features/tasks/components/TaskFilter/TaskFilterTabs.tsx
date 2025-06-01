'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasksByCategory } from '@/features/tasks/taskSlice';
import styles from './TaskFilterTabs.module.css';
import {AppDispatch} from "@/store";


export default function TaskFilterTabs() {
    const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (tab: 'pending' | 'completed') => {
        setActiveTab(tab);
        dispatch(fetchTasksByCategory(tab));
    };

    useEffect(() => {
        // Carga inicial de tareas pendientes
        dispatch(fetchTasksByCategory('pending'));
    }, [dispatch]);

    return (
        <div className={styles.tabsContainer}>
            <button
                className={`${styles.tabButton} ${activeTab === 'pending' ? styles.active : ''}`}
                onClick={() => handleClick('pending')}
            >
                Tareas pendientes
            </button>
            <button
                className={`${styles.tabButton} ${activeTab === 'completed' ? styles.active : ''}`}
                onClick={() => handleClick('completed')}
            >
                Tareas finalizadas
            </button>
        </div>
    );

}
