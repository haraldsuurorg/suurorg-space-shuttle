import React from 'react';
import PrimaryButton from './PrimaryButton';

export default function RouteItem({ route, provider, pricelistId }) {
    if (!route) {
        return;
    }

    const routeInfo = route.routeInfo;
    // const provider = route.providers[1];

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedDate = date.toLocaleDateString('en-GB');

        return { time, date: formattedDate };
    };

    const departure = formatDateTime(provider.flightStart);
    const arrival = formatDateTime(provider.flightEnd);

    const duration = (departure, arrival) => {
        const departureDate = new Date(departure);
        const arrivalDate = new Date(arrival);
        const differenceInMilliseconds = arrivalDate - departureDate;
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

        return differenceInHours.toFixed(0);
    }

    return (
        <div className='w-full flex border border-white rounded-xl p-6'>
            <div className='w-8/12 items-center'>
                <div className='flex justify-between'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                            <p>{departure.time}</p>
                            <p>{departure.date}</p>
                        </div>
                        <div>
                            {routeInfo.from.name}
                        </div>
                    </div>
                    <div className='relative w-full flex justify-center'>
                        <div className='absolute bottom-1/2 w-5/6 px-4 flex justify-center border-b border-white'>
                            {duration(provider.flightStart, provider.flightEnd)}h
                        </div>
                        <div className='absolute top-1/2 w-5/6 px-4 flex justify-center'>
                            {routeInfo.distance}km
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                            <p>{arrival.time}</p>
                            <p>{arrival.date}</p>
                        </div>
                        <div>
                            {routeInfo.to.name}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-3/12'>
                <p className='font-bold'>{provider.company.name}</p>
                <p>{provider.price}€</p>
            </div>

            <div className='flex w-1/12 items-center justify-end'>
                <PrimaryButton>
                    Book
                </PrimaryButton>
            </div>
        </div>
    );
}
