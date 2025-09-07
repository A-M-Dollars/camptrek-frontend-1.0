import { Itinerary, ItineraryProps, ImageProps } from '@/constants/itinerary'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from 'react'


export const TripItineraryCalltoAction = () => {
    return (
        <div className="flex items-center justify-center h-[250px] xl:h-[515px] bg-gray-50">
            <p className="text-gray-400">Select a day Itinerary to view images</p>
        </div>
    )
}

export const TripItinerary = ({ safariData, onImageChange }: ItineraryProps) => {
    return (
        <Accordion
            type="single"
            collapsible
            onValueChange={(value) => {
                const selectedDay = safariData.days.find((day) => day.id === value);
                if (selectedDay) {
                    // send first image URL to parent
                    onImageChange(selectedDay.images);
                }
            }}
        >
            {safariData.days.map((day) => (
                <AccordionItem key={day.id} value={day.id}>
                    <AccordionTrigger>
                        Day {day.day_number}: {day.title}
                    </AccordionTrigger>
                    <AccordionContent>{day.details}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

type TripItineraryContainerProps = {
    onImageChange: React.Dispatch<React.SetStateAction<ImageProps[] | null>>;
    safari: Itinerary;
    isLoading: boolean;
    error: boolean;
};

export default function TripItineraryContainer({
    onImageChange,
    safari,
    isLoading,
    error,
}: TripItineraryContainerProps) {

    if (isLoading) return <div>Loading...</div>;
    if (error || !safari) return <div>Failed to load itinerary</div>;

    return <TripItinerary safariData={safari} onImageChange={onImageChange} />;
}
