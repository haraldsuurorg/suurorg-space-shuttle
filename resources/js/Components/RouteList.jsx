import React, {useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Checkbox } from "@/Components/ui/checkbox";

import RouteItem from './RouteItem';
import PlanetSelector from './PlanetSelector';

export default function RouteList() {
    const [routesData, setRoutesData] = useState(null);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortedAndFilteredRoutes, setSortedAndFilteredRoutes] = useState([]);

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
            // let sortedRoutes = [...filteredLegs];
            setFilteredRoutes(filteredLegs);

            filteredLegs = filterByCompanies(filteredLegs, selectedCompanies);

            if (sortBy) {
                console.log('new sortby')
                filteredLegs.forEach(leg => {
                  if (sortBy === 'price') {
                    console.log('new sortby price');
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

    if (!routesData) {
        return <p>Loading routes...</p>;
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
                    <Accordion type="single" defaultValue='flight-provider' collapsible>
                        <AccordionItem value="flight-provider">
                            <AccordionTrigger>Flight provider</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2">
                                {filteredRoutes && Array.isArray(filteredRoutes) ? (
                                    Array.from(new Set(filteredRoutes.flatMap(leg => leg.providers.map(p => p.company.name)))).sort().map(companyName => (
                                          <div key={companyName} className='flex items-center space-x-2'>
                                              <Checkbox
                                                  id={`company-${companyName}`}
                                                  value={companyName}
                                                  checked={selectedCompanies.includes(companyName)}
                                                  onCheckedChange={(checked) => {
                                                      setSelectedCompanies(prevCompanies => {
                                                          if (checked) {
                                                              return [...prevCompanies, companyName];
                                                          } else {
                                                              return prevCompanies.filter(c => c !== companyName)
                                                          }
                                                      });
                                                  }}
                                              />
                                              <label
                                                  htmlFor={`company-${companyName}`}
                                                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                              >
                                                  {companyName}
                                              </label>
                                          </div>
                                      ))
                                ) : (
                                    ''
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className='flex flex-col gap-8 w-3/4'>
                    {sortedAndFilteredRoutes.map((leg) => (
                        leg.providers.map((provider) => (
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
        </div>
    );
}