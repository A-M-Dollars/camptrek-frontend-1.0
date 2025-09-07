'use client'

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'


type CoordinatesProps = {
    center: {
        lat: number;
        lng: number;
    }
}

const ItineraryGoogleImage = ({center}: CoordinatesProps) => {

    const containerStyle = {
        width: '100%',
        height: '515px',
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    })


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
        >
            <></>
        </GoogleMap>
    ) : (
        <div className="w-full h-[515px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Loading map...</span>
        </div>
    )
}

export default ItineraryGoogleImage