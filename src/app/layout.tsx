import Providers from './providers';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css';
import Menu from "@/components/Menu/Menu";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";

import layoutStyles from './layout.module.css';
import TaskActions from "@/features/tasks/components/TaskActions/TaskActions";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="es">
        <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <Providers>
            <Banner />
            <div className={layoutStyles.mainContentWrapper}>
                <TaskActions />
                <div className="flex flex-1">
                    <Menu />
                    <main className={layoutStyles.mainContent}>
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
