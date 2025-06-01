'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Circle from '@/components/Circle/Circle';
import styles from './Menu.module.css';
import { Category} from '@/features/tasks/taskTypes';
import {useCategories} from "@/features/categories/useCategories";

export default function Menu() {
    const pathname = usePathname();
    const { categories, loading, error } = useCategories();

    if (pathname === '/login') return null;

    return (
        <nav className={styles.menuContainer}>
            <h1 className={styles.menuTitle}>Categorías</h1>
            <ul className={styles.menuList}>
                {loading && <li className={styles.loadingItem}>Cargando categorías...</li>}
                {error && <li className={styles.errorItem}>Error: {error}</li>}
                {!loading && categories.length === 0 && !error && (
                    <li className={styles.noCategories}>No hay categorías.</li>
                )}
                {categories.map((category: Category) => (
                    <li key={category.id} className={styles.categoryItem}>
                        <Link href={`/tasks?category=${category.id}`} className={styles.categoryLink}>
                            <Circle color={category.color} />
                            <span>{category.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}