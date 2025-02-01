import React, { useState, useEffect } from 'react';

export default function PlanetSelector({ onPlanetsSelected }) {
    const [planets, setPlanets] = useState([]);
    const [originPlanet, setOriginPLanet] = useState('');
    const [destinationPlanet, setDestinationPlanet] = useState('');

    useEffect(() => {
        const fetchPlanetOptions = async () => {
            try {
                const response = await fetch('/api/travel-routes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: $response.status`);
                }
                const routesConfig = await response.json();
                setPlanets(Object.keys(routesConfig));
            } catch (error) {
                console.error("Could not fetch travel routes config:", error);
            }
        }
        fetchPlanetOptions();
    }, []);

    const handleOriginChange = (event) => {
        setOriginPLanet(event.target.value);
        onPlanetsSelected(event.target.value, destinationPlanet);
    };

    const handleDestinationChange = (event) => {
        setDestinationPlanet(event.target.value);
        onPlanetsSelected(originPlanet, event.target.value);
    };

    return (
        <div className='flex gap-8 mb-6'>
            <div>
                <label htmlFor='origin'></label>
                <select
                    id="origin"
                    value={originPlanet}
                    onChange={handleOriginChange}
                >
                    <option value="">-- Select Origin --</option>
                    {planets.map((planet) => (
                        <option key={planet} value={planet}>{planet}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='destination'></label>
                <select
                    id="destination"
                    value={destinationPlanet}
                    onChange={handleDestinationChange}
                >
                    <option value="">-- Select Destination --</option>
                    {planets.map((planet) =>
                        <option key={planet} value={planet}>{planet}</option>
                    )}
                </select>
            </div>
        </div>
    )
}