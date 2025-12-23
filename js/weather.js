document.addEventListener('DOMContentLoaded', fetchWeather);

async function fetchWeather() {
    const tempEl = document.getElementById('temperature');
    const descEl = document.getElementById('description');
    
   
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-17.8146&longitude=-63.1561&current=temperature_2m,weather_code&timezone=America/La_Paz';

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        
        
        const weatherTypes = {
            0: 'Cielo Despejado',
            1: 'Mayormente Claro',
            2: 'Parcialmente Nublado',
            3: 'Nublado',
            61: 'Lluvia',
            80: 'Chubascos'
        };

        tempEl.textContent = `${temp}°C`;
        descEl.textContent = weatherTypes[code] || 'Variable';

    } catch (error) {
        console.log("Error API Clima", error);
        descEl.textContent = "No disponible";
    }
}