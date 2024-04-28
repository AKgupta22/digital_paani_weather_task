import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'

export default function WeatherCard({ weatherData }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: "800" }} color="text.secondary" gutterBottom>
                        Place Name: {weatherData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "800" }} color="text.secondary" gutterBottom>
                        Temperature: {Math.ceil(weatherData?.main?.temp)} &deg;
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "800" }} color="text.secondary" gutterBottom>
                        Feels Like: {Math.ceil(weatherData?.main?.feels_like)} &deg;
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: "800" }} color="text.secondary" gutterBottom>
                        Wind: {weatherData?.wind?.speed} km/h
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
