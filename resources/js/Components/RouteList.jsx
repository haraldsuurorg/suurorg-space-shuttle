import React, {useState, useEffect } from 'react';

import RouteItem from './RouteItem';

export default function RouteList() {
    const [routesData, setRoutesData] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch('/api/travel-prices');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${respnose.status}`);
                }

                const data = await response.json();
                setRoutesData(data);
            } catch (error) {
                console.error("Could not ferch travel prices:", error);
            }
        };

        fetchRoutes();
    }, []);

    if (!routesData) {
        return <p>Loading routes...</p>;
    }

    return (
        <div className='flex flex-col gap-8'>
            {routesData.legs.map((leg, index) => (
                <RouteItem
                    key={leg.id}
                    route={leg}
                    pricelistId={routesData.id}
                />
            ))}
        </div>
    );
}