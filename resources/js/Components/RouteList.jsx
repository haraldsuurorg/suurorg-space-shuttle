import React, {useState, useEffect } from 'react';

import RouteItem from './RouteItem';
import PlanetSelector from './PlanetSelector';

export default function RouteList() {
    const [routesData, setRoutesData] = useState(null);
    const [filteredRoutes, setFilteredRoutes] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchRoutes = async () => {
            try {
                const response = await fetch('/api/travel-prices', { signal: signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${respnose.status}`);
                }

                const data = await response.json();
                setRoutesData(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Could not fetch travel prices:", error);
                }
            }
        };

        fetchRoutes();

        return () => {
            abortController.abort();
            console.log('Fetch aborted in cleanup');
        }
    }, []);

    useEffect(() => {
        if (routesData && selectedOrigin && selectedDestination) {
            const filteredLegs = routesData.legs.filter(leg => {
                return (
                    leg.routeInfo.from.name === selectedOrigin &&
                    leg.routeInfo.to.name === selectedDestination
                );
            });
            setFilteredRoutes(filteredLegs);
        } else if (routesData) {
            <p>Please select a your origin planet and destination planet!</p>
        }
    }, [selectedOrigin, selectedDestination, routesData])

    const handlePlanetsSelected = (origin, destination) => {
        setSelectedOrigin(origin);
        setSelectedDestination(destination);
    }

    if (!routesData) {
        return <p>Loading routes...</p>;
    }

    return (
        <div>
            <div>
                <PlanetSelector
                    onPlanetsSelected={handlePlanetsSelected}
                />
            </div>
            <div className='flex flex-col gap-8'>
                {filteredRoutes && filteredRoutes.map((leg, index) => (
                    leg.providers.map((provider, providerIndex) => (
                        <RouteItem
                            key={`${leg.id}-${provider.id}`}
                            route={leg}
                            provider={provider}
                            pricelistId={routesData.id}
                        />
                    ))
                ))}
            </div>
        </div>
    );
}