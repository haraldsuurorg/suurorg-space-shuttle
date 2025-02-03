import React, {useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePage } from '@inertiajs/react'

import RouteItem from './RouteItem';
import PlanetSelector from './PlanetSelector';
import FlightProviderFilter from './FlightProviderFilter';

export default function RouteList() {
    const [routesData, setRoutesData] = useState(null);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortedAndFilteredRoutes, setSortedAndFilteredRoutes] = useState([]);

    const user = usePage().props.auth.user;

    const filterByCompanies = (legs, selectedCompanies) => {
        if (selectedCompanies.length === 0) {
            return legs;
        }

        return legs.filter(leg => {
            return leg.providers.some(provider => selectedCompanies.includes(provider.company.name));
        });
    }

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
        }
    }, []);

    useEffect(() => {
        if (routesData && selectedOrigin && selectedDestination) {
            let filteredLegs = routesData.legs.filter(leg => {
                return (
                    leg.routeInfo.from.name === selectedOrigin &&
                    leg.routeInfo.to.name === selectedDestination
                );
            });

            setFilteredRoutes(filteredLegs);

            filteredLegs = filterByCompanies(filteredLegs, selectedCompanies);

            if (sortBy) {
                filteredLegs.forEach(leg => {
                  if (sortBy === 'price') {
                    leg.providers.sort((a, b) => a.price - b.price);
                  } else if (sortBy === 'travel time') {
                    leg.providers.sort((a, b) => {
                      const durationA = new Date(a.flightEnd) - new Date(a.flightStart);
                      const durationB = new Date(b.flightEnd) - new Date(b.flightStart);
                      return durationA - durationB;
                    });
                  }
                });
              }
              const finalRoutes = filteredLegs.map(leg => ({
                ...leg,
                providers: leg.providers.filter(provider =>
                  selectedCompanies.length === 0 || selectedCompanies.includes(provider.company.name)
                )
              }));
            setSortedAndFilteredRoutes(finalRoutes);
        } else if (routesData) {
            setSortedAndFilteredRoutes([]);
        }
    }, [selectedOrigin, selectedDestination, selectedCompanies, routesData, sortBy])

    const handlePlanetsSelected = (origin, destination) => {
        setSelectedOrigin(origin);
        setSelectedDestination(destination);
        setSortBy(null);
    }

    const handleSortByChange = (value) => {
        setSortBy(value === sortBy ? null : value);
    };

    const handleCompanyToggle = (companyName, checked) => {
        setSelectedCompanies((prevCompanies) => {
          if (checked) {
            return [...prevCompanies, companyName];
          } else {
            return prevCompanies.filter((c) => c !== companyName);
          }
        });
    };

    if (!routesData) {
        return <p className='flex w-full justify-center mt-24'>Loading...</p>;
    }

    return (
        <div>
            <div className='flex justify-between items-center pb-6 mb-6 border-b border-white'>
                <PlanetSelector
                    onPlanetsSelected={handlePlanetsSelected}
                />

                <ToggleGroup type="single" value={sortBy} onValueChange={handleSortByChange}>
                    <ToggleGroupItem value="price" aria-label="Toggle orderby price">
                        Cheapest
                    </ToggleGroupItem>
                    <ToggleGroupItem value="travel time" aria-label="Toggle orderby travel time">
                        Shortest travel time
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='flex gap-8'>
                <div className='w-1/4'>
                    <FlightProviderFilter
                        filteredRoutes={filteredRoutes}
                        selectedCompanies={selectedCompanies}
                        onCompanyToggle={handleCompanyToggle}
                    />
                </div>

                <div className='flex flex-col gap-8 w-3/4'>
                    {filteredRoutes.length ? (
                        sortedAndFilteredRoutes.map((leg) => (
                            leg.providers.map((provider) => (
                                <RouteItem
                                    key={`${leg.id}-${provider.id}`}
                                    itemRoute={leg}
                                    provider={provider}
                                    pricelistId={routesData.id}
                                />
                            ))
                        ))
                    ) : user ? (
                            <p className='flex justify-center mt-4 text-center px-8'>Please select your origin and destination planet!</p>
                        ): (
                           <>
                            <p className='flex justify-center mt-4 text-center px-8'>Please select your origin and destination planet!</p>
                            <p className='flex justify-center text-center px-8 -mt-6'>To book a flight, we kindly request that you log in or create an account for a seamless experience. However, you are welcome to browse our available flights without logging in.</p>
                           </>
                    )}
                </div>
            </div>
        </div>
    );
}