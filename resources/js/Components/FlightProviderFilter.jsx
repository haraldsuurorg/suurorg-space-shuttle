import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function FlightProviderFilter({
  filteredRoutes,
  selectedCompanies,
  onCompanyToggle,
}) {

  const companies =
    filteredRoutes && Array.isArray(filteredRoutes)
      ? Array.from(
          new Set(filteredRoutes.flatMap(leg => leg.providers.map(p => p.company.name)))
        ).sort()
      : [];

  return (
    <Accordion type="single" defaultValue={companies.length ? 'flight-provider' : ''} collapsible>
      <AccordionItem value="flight-provider">
        <AccordionTrigger>Flight provider</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {companies.map((companyName) => (
            <div key={companyName} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${companyName}`}
                value={companyName}
                checked={selectedCompanies.includes(companyName)}
                onCheckedChange={(checked) => onCompanyToggle(companyName, checked)}
              />
              <label
                htmlFor={`company-${companyName}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {companyName}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
