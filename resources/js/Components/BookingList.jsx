import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import BookingItem from './BookingItem';

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const user = usePage().props.auth.user;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {

            const response = await fetch('/api/reservations', {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'X-User-ID': user.id
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed to fetch bookings';
                    throw new Error(errorMessage);
            }

            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div className='flex items-center flex-col gap-8'>
            {bookings.length === 0 ? (
                <p>No bookings</p>
            ) : (
                bookings.map((booking) => (
                    <BookingItem
                        key={booking.id}
                        itemRoute={{
                            routeInfo: {
                                from: { name: booking.origin_planet },
                                to: { name: booking.destination_planet },
                            },
                        }}
                        provider={{
                            flightStart: booking.flight_start_time,
                            flightEnd: booking.flight_arrival_time,
                            price: booking.price,
                            company: { name: booking.company_name },
                        }}
                        pricelistId={booking.pricelist_id}
                    />
                ))
            )}
        </div>
    )
}