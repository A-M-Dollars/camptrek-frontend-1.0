import React from 'react'
import { landing, takeoff, fix, accomodation, driver } from '@/public/svgs/svgs-file'
import { Itinerary } from '@/constants/itinerary'


type SafariDetailsProps = {
    title:  Itinerary['title'];
    arrival_city: Itinerary['arrival_city'];
    departure_city: Itinerary['departure_city'];
    overview: Itinerary['overview'];
    tags: Itinerary['tags'];
}


const SafariDetails = ({title, arrival_city, departure_city, overview,tags }: SafariDetailsProps) => {

    return (
        <div>
            <div className='tags flex flex-row font-light text-[12px] opacity-75 mb-2'>
                <p className='uppercase' >{tags}</p>
            </div>
            <div className='title font-semibold text-[20px] mb-4'>
                <h1>
                    {title}
                </h1>
            </div>
            <div className='tripinfo flex flex-wrap gap-4 gap-y-2 font-light text-[10px] opacity-75'>
                <div className='flex flex-row gap-2 justify-between items-center'>
                    {landing}
                    <p>{arrival_city}</p>
                </div>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    {takeoff}
                    <p>{departure_city}</p>
                </div>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    {fix}
                    <p>You can customize this tour to your liking</p>
                </div>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    {accomodation}
                    <p>Midrange level lodges and camps</p>
                </div>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    {driver}
                    <p>You can get a private driver guide</p>
                </div>
            </div>
            <hr className='mt-6 mb-6' />
            <div className='tripsummary'>
                <h1 className='text-[14px] font-semibold text-transform: uppercase mb-4'>Tour Overview</h1>
                <p className='text-[12px] opacity-50'>{overview}</p>
            </div>
        </div >
    )
}

export default SafariDetails