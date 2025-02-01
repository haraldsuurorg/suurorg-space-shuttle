import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PlanetSelector({ onPlanetsSelected }) {
    const [originPlanets, setOriginPlanets] = useState([]);
    const [destinationPlanets, setDestinationPlanets] = useState([]);
    const [originPlanet, setOriginPLanet] = useState('');
    const [destinationPlanet, setDestinationPlanet] = useState('');
    const [routesConfigFromApi, setRoutesConfigFromApi] = useState(null);

    useEffect(() => {
        const fetchPlanetOptions = async () => {
            try {
                const response = await fetch('/api/travel-routes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: $response.status`);
                }
                const routesConfig = await response.json();
                setRoutesConfigFromApi(routesConfig);
                setOriginPlanets(Object.keys(routesConfig));
            } catch (error) {
                console.error("Could not fetch travel routes config:", error);
            }
        }
        fetchPlanetOptions();
    }, []);

    useEffect(() => {
        if (originPlanet && routesConfigFromApi) {
            setDestinationPlanets(routesConfigFromApi[originPlanet] || []);
        } else {
            setDestinationPlanets([]);
        }
        setDestinationPlanet('')
        onPlanetsSelected(originPlanet, '');
    }, [originPlanet]);

    const handleOriginChange = (value) => {
        setOriginPLanet(value);
    };

    const handleDestinationChange = (value) => {
        setDestinationPlanet(value);
        onPlanetsSelected(originPlanet, value);
    };

    return (
        <div className='flex gap-8'>
            <div>
                <label htmlFor='origin'></label>
                <Select
                    id="origin"
                    value={originPlanet}
                    onValueChange={handleOriginChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="From?" />
                    </SelectTrigger>
                    <SelectContent>
                        {originPlanets.map((planet) => (
                            <SelectItem key={planet} value={planet}>
                                {planet}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor='destination'></label>
                <Select
                    id="destination"
                    value={destinationPlanet}
                    onValueChange={handleDestinationChange}
                    disabled={!originPlanet}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="To?" />
                    </SelectTrigger>
                    <SelectContent>
                        {destinationPlanets.map((planet) => (
                            <SelectItem key={planet} value={planet}>
                                {planet}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}