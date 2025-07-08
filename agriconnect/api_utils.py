from flask import request
from datetime import datetime

def get_weather(latitude, longitude, api_key='your_openweather_api_key'):
    url = f'http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}'
    try:
        response = request.get(url)
        response.raise_for_status()
        data = response.json()
        return {
            'temperature': data['main']['temp'] - 273.15,  # Convert Kelvin to Celsius
            'humidity': data['main']['humidity'],
            'description': data['weather'][0]['description']
        }
    except request.RequestException:
        return None

def get_market_price(crop_name, api_key='your_commodities_api_key'):
    url = f'https://commodities-api.com/api/latest?access_key={api_key}&symbols={crop_name}'
    try:
        response = request.get(url)
        response.raise_for_status()
        data = response.json()
        return data['data']['rates'].get(crop_name, None)
    except request.RequestException:
        return None