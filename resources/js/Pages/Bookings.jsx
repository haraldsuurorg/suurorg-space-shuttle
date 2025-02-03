import { React } from 'react';
import { Head } from '@inertiajs/react';

import BookingList from '@/Components/BookingList';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Bookings() {
    return (
        <>
            <Head title="Bookings"/>
            <Header />
            <div className="bg-gray-50 text-black/50 dark:bg-[#111827] dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="mt-12 min-h-[85vh]">
                            <div className="flex justify-center">
                                <div className="flex flex-col gap-6 w-full max-w-[850px]">
                                    <h1 className="text-center text-lg">Your current bookings</h1>
                                    <BookingList />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}