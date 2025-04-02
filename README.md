##### AgriConnect

##### Project Overview

![landing page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example.jpg)

AgriConnect is a web application designed to empower farmers with real-time information about weather patterns, market data, and sustainable farming practices.

## Deployed site link

http://web-01.allnmj.tech/
https://www.linkedin.com/in/john-nyange-majanga-830915188


This README provides guidance on navigating the codebase and understanding the file structure.

#### File Structure
agriconnect/
├── app/
│   ├── __init__.py           # Initialize Flask application
│   ├── config.py             # Application configuration
│   ├── models/               # Database models
│   │   ├── __init__.py
│   │   ├── user.py           # User model
│   │   ├── crop.py           # Crop model
│   │   ├── location.py       # Location model
│   │   ├── soil_data.py      # Soil data model
│   │   ├── weather.py        # Weather model
│   │   ├── market_data.py    # Market data model
│   │   └── recommendation.py # Recommendation model
│   │
│   ├── routes/               # Application routes
│   │   ├── __init__.py
│   │   ├── auth.py           # Authentication routes
│   │   ├── market.py         # Market data routes
│   │   ├── farming.py        # Farming advice routes
│   │   └── main.py           # Main/index routes
│   │
│   ├── services/             # Business logic services
│   │   ├── __init__.py
│   │   ├── market_service.py
│   │   ├── weather_service.py
│   │   ├── soil_service.py
│   │   └── recommendation_engine.py
│   │
│   ├── static/               # Static assets
│   │   ├── css/              # Stylesheets
│   │   ├── js/               # JavaScript files
│   │   │   ├── home.js
│   │   │   ├── market-data.js
│   │   │   └── farming-advice.js
│   │   └── images/           # Image assets
│   │
│   ├── templates/            # HTML templates (Jinja2)
│   │   ├── base.html         # Base template
│   │   ├── index.html        # Home page
│   │   ├── market/
│   │   │   └── data.html     # Market data page
│   │   ├── farming/
│   │   │   └── advice.html   # Farming advice page
│   │   ├── auth/
│   │   │   ├── login.html    # Login page
│   │   │   └── register.html # Registration page
│   │   └── partials/
│   │       ├── header.html   # Header component
│   │       └── footer.html   # Footer component
│   │
│   └── utils/                # Helper functions
│       ├── __init__.py
│       ├── api_connector.py  # External API connections
│       └── data_formatter.py # Data formatting utilities
│
├── migrations/               # Database migrations (Flask-Migrate)
│
├── tests/                    # Automated tests
│   ├── __init__.py
│   ├── conftest.py           # Test configuration
│   ├── test_models.py        # Model tests
│   ├── test_routes.py        # Route tests
│   └── test_services.py      # Service tests
│
├── venv/                     # Virtual environment (should be in .gitignore)
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── requirements.txt          # Python dependencies
├── run.py                    # Application entry point
└── README.md                 # This file

### Key Components

#### Frontend Components

Home Page (app/static/js/home.js)
Handles hero section interactions
Manages the feature cards animations
Market Data Module (app/static/js/market-data.js)
Renders price trend charts using Chart.js
Handles crop selection and timeframe filtering
Updates market insights dynamically
Farming Advice Module (app/static/js/farming-advice.js)
Processes location input
Displays weather patterns, soil data, and crop recommendations
Manages tab switching between food crops and cash crops

#### Backend Components
## Routes
auth.py: Handles user registration, authentication, and profile management
market.py: Provides market data endpoints
farming.py: Processes farming advice requests
main.py: Handles main page routes
## Models
Database interaction layers using SQLAlchemy ORM
Each model corresponds to a table in the database
## Services
market_service.py: Fetches and processes market data
weather_service.py: Retrieves weather information
soil_service.py: Processes soil data
recommendation_engine.py: Generates farming recommendations

#### Getting Started
Prerequisites
Python 3.8 or higher
MySQL 5.7 or higher (or SQLite for development)
pip for Python dependencies
Virtual environment for isolated dependencies

#### Installation
Clone the repository:
Copy
git clone https://github.com/your-username/agriconnect.git
cd agriconnect
Create a virtual environment:
Copy
python -m venv venv
Activate the virtual environment:
##Windows:
Copy
venv\Scripts\activate
## macOS/Linux:
Copy
source venv/bin/activate
Install Python dependencies:
basic
Copy
pip install -r requirements.txt
Create a .env file with your configuration:

Copy
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URI=mysql+pymysql://username:password@localhost/agriconnect

Initialize the database:
Copy
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
Run the application:
Copy
flask run
Visit http://localhost:5000 in your browser
Database Configuration
The database is configured in app/config.py which reads from environment variables. You can set your database URI in the .env file:

Copy
# For MySQL
DATABASE_URI=mysql+pymysql://username:password@localhost/agriconnect

# For SQLite (development)
DATABASE_URI=sqlite:///agriconnect.db
API Documentation
The application provides the following API endpoints:

#### Market Data
GET /api/market/crops: Returns list of available crops
GET /api/market/prices/<crop>/<timeframe>: Returns price data for specific crop and timeframe
GET /api/market/demand: Returns current demand levels for popular crops
GET /api/market/projections/<crop>: Returns price projections for specific crop
Farming Advice
POST /api/farming/advice: Accepts location data and returns farming recommendations
GET /api/weather/<location_id>: Returns weather patterns for a specific location
GET /api/soil/<location_id>: Returns soil data for a specific location
GET /api/crops/recommended/<location_id>: Returns crop recommendations for a location

### Development Workflow
Working on Features
Create a new branch for each feature: git checkout -b feature/feature-name
Make your changes, following the coding standards
Write tests for your code
Create a pull request for review

### Database Changes
Create migrations for database structure changes: flask db migrate -m "Description of changes"
Apply migrations: flask db upgrade
Revert if needed: flask db downgrade

### Testing
Run tests before submitting changes: pytest
Ensure your code passes all existing tests
Key Files to Understand
1. Entry Points
run.py: Main entry point for the application
app/__init__.py: Flask application initialization
app/routes/: Contains all application routes
2. Core Functionality
app/services/recommendation_engine.py: Contains the core algorithm for generating farming recommendations
app/services/market_service.py: Handles market data processing and projections
3. Main Templates
app/templates/index.html: Landing page template
app/templates/market/data.html: Market data visualization template
app/templates/farming/advice.html: Farming advice template

### Troubleshooting
Common issues and their solutions:

## Database Connection Errors
Verify your database service is running
Check credentials in your .env file
Ensure you've run migrations with flask db upgrade

# Missing Dependencies
Activate virtual environment and run pip install -r requirements.txt
API Data Not Loading
Check your internet connection for external APIs
Verify API keys in the .env file

# Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

# Contact

For hosting this are the commands used

John Nyange Majanga - Project Manager & Lead Developer


### Inspiration
Growing up in a rural community, I witnessed firsthand the challenges farmers face in accessing accurate market data and farming advice. My family relied on farming for our livelihood, and I saw how unpredictable crop prices and lack of information often led to financial struggles. This inspired me to create AgriConnect—a platform that empowers farmers with real-time market insights, personalized recommendations, and predictive analytics to optimize their yields and profits.

Agriconnect is more than just a project; it’s a solution to a problem I’ve seen affect countless families. Over the past few months, we’ve worked tirelessly to bring this vision to life, leveraging technology to bridge the gap between farmers and the resources they need. This project is also a Portfolio Project for ALX Africa, where I’ve honed my skills in software development and problem-solving.

I'am proud to present AgriConnect as a tool that can make a real difference in the agricultural sector. Whether you’re a small-scale farmer or part of a larger operation, we’re here to help you succeed.

#### Technical details
@market_bp.route('/api/market/prices/<crop>/<timeframe>')
def get_prices(crop, timeframe):
    # Return static sample data for now
    return jsonify(sample_price_data)
reccomendation algorithm


#### Emotional context
mmediate Action Plan
To accelerate progress, I recommend:
Prioritize MVP Authentication:


Implement a minimal working login/registration system using Flask-Login
Defer additional auth features like password reset, profile management
Use Development Shortcuts:


Populate the database with sample data rather than waiting for API integrations
Create static JSON files to mimic API responses for front-end development
Sequential Feature Development:


Focus on completing one feature path entirely (e.g., the market data visualization)
Complete that feature end-to-end before moving to the next feature
Consider Using Flask Extensions:


Flask-Admin for quick admin interface setup
Flask-RESTful for faster API development

#### Visuals
![landing page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example2.jpg)
![landing page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example3.jpg)
![landing page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example4.jpg)
![login page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example5.jpg)
![dashboard page](https://github.com/Majangajohn/Agriconnect/tree/main/agriconnect/static/Profile_Pics/example6.jpg)
