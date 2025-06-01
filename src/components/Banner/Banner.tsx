'use client';

import React from 'react';
import {Button} from 'primereact/button';

import {usePathname} from 'next/navigation';
import styles from './Banner.module.css';
import {useBanner} from "@/hooks/useBanner";

export default function Banner() {
    const { handleLogout } = useBanner();
    const pathname = usePathname();

    if (pathname === '/login') return null;

    return (
        <div className={styles.banner}>
            <Button
                label="Cerrar sesión"
                onClick={handleLogout}
                className={`p-button-danger p-button-sm ${styles.logoutButton}`}
            />
        </div>
    );
}
