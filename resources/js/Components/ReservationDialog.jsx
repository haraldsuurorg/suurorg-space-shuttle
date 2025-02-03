import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

export default function ReservationDialog ({ routeDetails }) {
    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [booked, setBooked] = useState(false);

    const { routeInfo, provider, duration, departure, arrival, pricelistId, } = routeDetails;

    const handleBooking = async () => {
        setLoading(true);
        setNotification('');

        const reservationData = {
            user_id: auth.user.id,
            origin_planet: routeInfo.from.name,
            destination_planet: routeInfo.to.name,
            price: provider.price,
            travel_duration: duration,
            flight_start_time: provider.flightStart,
            flight_arrival_time: provider.flightEnd,
            company_name: provider.company.name,
            pricelist_id: pricelistId
        };

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                credentials: 'include',
                body: JSON.stringify(reservationData),

            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Booking failed');
            }

            const data = await response.json();
            setNotification('Booking successful!');
        } catch (error) {
            setNotification(error.message);
        } finally {
            setLoading(false);
            setBooked(true)
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='nline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300'>
                BOOK
            </AlertDialogTrigger>
            <AlertDialogContent>
                {auth.user ? (
                <>
                    <AlertDialogHeader>
                        <AlertDialogCancel className='absolute right-4 top-4 p-0 h-fit border-none bg-transparent hover:bg-transparent'>
                        <svg className="!h-6 !w-6" width="147px" height="147px" viewBox="0 0 24 24"         fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="white"></path>
                            </g>
                        </svg>
                        </AlertDialogCancel>
                        <AlertDialogTitle className='text-lg'>
                            {booked ? 'Congratulations! Booking successfully confirmed!' : 'Do you want to confirm your booking?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                <div className='flex justify-between pt-8 pb-6 text-base'>
                                    <div className='flex flex-col items-center text-white'>
                                        <span>{departure.time}</span>
                                        <span>{departure.date}</span>
                                        <span>{routeInfo.from.name}</span>
                                    </div>

                                    <div className='relative w-full flex justify-center'>
                                        <div className='absolute bottom-1/2 w-5/6 px-4 flex justify-center border-b border-white'>
                                            {duration}h
                                        </div>
                                        <div className='absolute top-1/2 w-5/6 px-4 flex justify-center'>
                                            {routeInfo.distance}km
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-center text-white'>
                                        <span>{arrival.time}</span>
                                        <span>{arrival.date}</span>
                                        <span>{routeInfo.to.name}</span>
                                    </div>
                                </div>

                                <div className='pt-2 text-base'>
                                    <div className='flex gap-1'>
                                        Flight provider: <span className='text-white'>{provider.company.name}</span>
                                    </div>
                                    <div className='flex gap-1'>
                                        Price: <span className='text-white'>{provider.price}€</span>
                                    </div>
                                </div>

                                {/* {notification && (
                                    <div className='mt-4 text-white'>
                                        {notification}
                                    </div>
                                )} */}
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={booked}>CANCEL</AlertDialogCancel>
                        <PrimaryButton onClick={handleBooking} disabled={loading || booked}>
                            {booked ? 'BOOKED' : loading ? 'BOOKING...' : 'CONFIRM BOOKING'}
                        </PrimaryButton>
                    </AlertDialogFooter>
                </>
                ) : (
                <>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Please log in</AlertDialogTitle>
                    <AlertDialogDescription>
                        You need to be logged in to book a flight.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>CANCEL</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link href={route('login')}>LOG IN</Link>
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};