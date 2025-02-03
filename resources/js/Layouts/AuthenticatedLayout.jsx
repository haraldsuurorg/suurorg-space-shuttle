import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
