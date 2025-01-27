## Phase 1: Backend - Setting up Laravel and API Interaction ##

1. Set up your Laravel Project:

    + Install Laravel on your computer (if you haven't already). Laravel's documentation has a great guide for this.

    + Create a new Laravel project using the Laravel installer or Composer.

    + Configure your database connection in Laravel (you can start with SQLite for simplicity, or use MySQL/PostgreSQL if you are familiar).

    + Run Laravel's database migrations (initially, these will be basic migrations that come with Laravel).

2. Create a Service to Fetch Travel Prices:

    + In Laravel, create a new folder in app/ called Services.

    + Inside Services, create a PHP file (e.g., TravelPriceService.php).

    + This service will be responsible for:

        + Making the HTTP request to the external API (https://cosmosodyssey.azurewebsites.net/api/v1.0/TravelPrices).

        + Handling the API response (getting the JSON data).

        + Potentially handling errors if the API is down.

3. Create a Laravel Controller to Expose API Data:

    + Use Artisan (Laravel's command-line tool) to create a controller (e.g., php artisan make:controller TravelPricesController). This will create a file in app/Http/Controllers/.

    + In this controller, create an action (a function) that:

        + Uses your TravelPriceService to fetch the data from the external API.

        + Returns this data as a JSON response. This is what your React frontend will consume.

    + Define an API route in routes/api.php that points to this controller action (e.g., /api/travel-prices).

4. Test your Backend API:

    + Start your Laravel development server (e.g., php artisan serve).

    + Use a tool like your web browser, Postman, or curl to access the API endpoint you created (e.g., http://localhost:8000/api/travel-prices).

    + Verify that you are getting the JSON data from the external API back as a response.

5. Implement Pricelist Fetching and Storage (Database & Scheduled Task):

    - Database Migration for Pricelists Table: (Columns: id (auto-incrementing), data (JSON/text), validUntil, timestamps).

    - Artisan Command (FetchAndStorePricelistCommand):

        - Use TravelPriceService to fetch pricelist.

        - Store pricelist in Pricelists table.

        - Implement logic to keep only last 15 pricelists (delete oldest if needed).

    - Laravel Scheduler: Schedule FetchAndStorePricelistCommand to run periodically (e.g., hourly).

6. Update TravelPricesController to Use Database:

    - index() action:

        - Fetch the latest active pricelist from the Pricelists database.

        - Retrieve route data from this pricelist.

        - Return as JSON.
7. Implement Hardcoded Travel Routes:

    - Create config/travel_routes.php (or data/travel_routes.json) to store possible routes (origin/destination pairs).
    - Load and use this data in backend for filtering and frontend data.

## Phase 2: Frontend - React Setup and Displaying Data ##

1. Set up React Project (within /resources/js/):

    - Utilize existing Breeze React structure in /resources/js/.

2. Create React Components for Displaying Routes:

    - RouteList component (list of routes).

    - RouteItem component (details for a single route).

    - PlanetSelector component (origin/destination dropdowns).

3. Fetch Data from Laravel Backend API in React:

    - Use fetch (or axios) to call /api/travel-prices.

    - Store data in React component state.

4. Display Basic Route Information in React:

    - Render route data (origin, destination, price, etc.) in RouteList and RouteItem.

5. Create Planet Selection UI (React):

    - Implement PlanetSelector component using hardcoded routes for options.

    - Update React state with selected planets.

6. Filter Routes based on Planet Selection (Frontend Logic Initially):

    - Filter route data in React based on selected origin/destination.

7. Add Filtering and Sorting Controls (React):

    - UI for filtering by company, sorting by price, distance, time.

8. Implement Filtering and Sorting Logic (React - Frontend):

    - Implement filtering/sorting in React components.


## Phase 3: Backend - Reservations and Database ##

1. Database Migrations and Models for Reservations:

    - Reservation Model and Migration (columns: reservation details, pricing snapshot, pricelist_id foreign key).

2. Update Backend to Store Pricelists (Laravel): (Already planned in Phase 1, Step 5)

3. Create Reservation Controller and Route (Laravel):

    - ReservationController with store(Request $request) action.

    - POST /api/reservations route.

    - Validation, data storage in Reservations table, JSON response.

4. Create Reservation Form in React:

    - ReservationForm component to collect user details and route info.

5. Submit Reservation Data to Backend API (React):

    - Send POST request to /api/reservations with form data.

    - Handle success/error responses.

6. "Manage Bookings" Page (React):

    - Create a page to display user's booking history from Reservations table.

## Phase 4: Advanced Features and Refinements (Future Enhancements) ##

1. Backend Filtering and Sorting (Laravel):

2. Pricelist Expiration and Validation (Laravel - Already partially addressed).

3. Reservation Readability and Pricelist Storage (Laravel - Addressed by design).

4. Error Handling and User Feedback (Both Frontend and Backend).

5. Styling and User Experience (React).


































## Phase 2: Frontend - Setting up React and Displaying Data ##

1. Create React Components for Displaying Routes:

    - Think about the UI. You'll need components to:

        - Display a list of routes.

        - Display details for each route (origin, destination, price, time, company).

        - Potentially a component for planet selection later.

2. Fetch Data from your Laravel Backend API in React:

    - In your React components, use fetch (or a library like axios) to make a request to your Laravel API endpoint (http://localhost:8000/api/travel-prices).

    - When you get the data back, store it in your React component's state.

    - Render the route data in your components. For now, just display the raw data to make sure the connection works.

3. Display Basic Route Information:

    - Iterate through the data you fetched from the API in your React component.

    - Display basic information for each route (like origin, destination, and price) in a simple list or table.


## Phase 3: Frontend - User Interface and Filtering/Sorting ##

1. Create Planet Selection UI (React):

    - Add dropdowns or buttons in your React app for users to select origin and destination planets.

    - Update your React component's state when the user selects planets.

2. Filter Routes based on Planet Selection (Frontend Logic First):

    - In your React component, when the user selects origin and destination planets, filter the route data you already fetched to only show routes that match the selected origin and destination. (Initially, do the filtering on the frontend for simplicity. Later, we can move this to the backend for better performance).

3. Add Filtering and Sorting Controls (React):

    - Add UI elements (e.g., dropdowns, checkboxes, radio buttons) to allow users to filter by travel company and sort by price, distance, or time.

4. Implement Filtering and Sorting Logic (React):

    - Implement the logic in your React components to filter and sort the displayed routes based on the user's selected criteria. Again, do this on the frontend for now to keep things simpler.


## Phase 4: Backend - Reservations and Database ##

1. Create Database Migrations and Models for Pricelists and Reservations (Laravel):

    - Use Artisan to create models and migrations for:

        - Pricelist (to store the pricelist data, including validUntil). You might store the entire JSON response from the API in a text column for simplicity initially, or you could normalize it into separate columns if you are comfortable with database design.

        - Reservation (to store reservation details: first name, last name, route details, price, time, company).

    - Run the migrations to create the tables in your database (php artisan migrate).

2. Update Backend to Store Pricelists (Laravel):

    - Modify your TravelPriceService to not just fetch the pricelist, but also to store it in the Pricelists table in your database. Think about how you will manage the "last 15 pricelists" requirement. You could use timestamps or an auto-incrementing ID to keep track and delete older ones when a new one comes in.

    - Update your TravelPricesController to fetch the current pricelist from your database instead of directly from the external API (after you have stored it).

3. Create a Reservation Controller and Route (Laravel):

    - Use Artisan to create a ReservationController.

    - Create an action in this controller to handle reservation submissions. This action will:

        - Validate the incoming reservation data from the frontend.

        - Store the reservation data in the Reservations table.

        - Return a success or error response as JSON.

    - Define an API route in routes/api.php for making reservations (e.g., /api/reservations).

4. Create Reservation Form in React:

    - Add a form in your React app to collect reservation information (first name, last name, route details - you'll need to pass the selected route data to this form).

5. Submit Reservation Data to Backend API (React):

    - When the user submits the reservation form in React, use fetch to send a POST request to your Laravel /api/reservations endpoint, sending the reservation data as JSON in the request body.

    - Handle the response from the backend (success or error) and display a confirmation message or error message to the user.


## Phase 5: Advanced Features and Refinements ##

1. Backend Filtering and Sorting (Laravel):

    - Move the filtering and sorting logic from the React frontend to your Laravel backend controllers. This is more efficient, especially with larger datasets.

    - Modify your API endpoints to accept filter and sort parameters (e.g., in the query string).

    - Update your React frontend to send these parameters to the backend API when fetching routes.

2. Pricelist Expiration and Validation (Laravel):

    - Implement logic in your Laravel backend to check the validUntil date in the pricelist.

    - Ensure that users cannot make reservations if the current pricelist is expired. Display an appropriate message in the frontend.

    - Consider using Laravel's scheduler to periodically fetch new pricelists from the external API automatically.

3. Reservation Readability and Pricelist Storage (Laravel):

    - Implement logic to retrieve reservations related to the active pricelist (or the last 15 pricelists).

    - Make sure you can display reservation details as long as the associated pricelist is still stored in your system.

4. Error Handling and User Feedback:

    - Improve error handling in both your backend and frontend.

    - Provide clear and helpful error messages to the user if something goes wrong (e.g., API errors, validation errors).

    - Add loading indicators while data is being fetched from the API.

5. Styling and User Experience:

    - Improve the visual design and user experience of your React application. Use CSS or a CSS framework (like Tailwind CSS or Material UI) to style your components.



## Code Structure Guidance (Laravel - More Detail) ##

app/Http/Controllers/TravelPricesController.php:

index(): Fetches and returns the current active pricelist and routes (possibly filtered and sorted).

app/Http/Controllers/ReservationController.php:

store(Request $request): Handles reservation submissions, validates data, saves to the database, and returns a response.

app/Services/TravelPriceService.php:

fetchPricelistFromApi(): Makes the HTTP request to the external API and returns the raw data.

storePricelist(array $pricelistData): Stores the pricelist data in the pricelists table.

getCurrentPricelist(): Retrieves the most recent active pricelist from the database.

app/Models/Pricelist.php:

Eloquent model for the pricelists table.

app/Models/Reservation.php:

Eloquent model for the reservations table.

database/migrations/YYYY_MM_DD_create_pricelists_table.php:

Migration to create the pricelists table (columns: id, data (text/json), validUntil, created_at, updated_at).

database/migrations/YYYY_MM_DD_create_reservations_table.php:

Migration to create the reservations table (columns: id, first_name, last_name, route_details (text/json), total_price, total_time, company_names (text/json), pricelist_id, created_at, updated_at).

routes/api.php:

Route::get('/travel-prices', [TravelPricesController::class, 'index']);

Route::post('/reservations', [ReservationController::class, 'store']);

## Code Structure Guidance (React - More Detail) ##

src/components/PlanetSelector.js: Components for origin and destination planet dropdowns/selectors.

src/components/RouteList.js: Component to display a list of routes.

src/components/RouteItem.js: Component to display details for a single route.

src/components/FilterControls.js: Components for filtering and sorting options.

src/components/ReservationForm.js: Form for users to enter reservation details.

src/pages/HomePage.js: Main page that combines planet selection, route display, filtering, and potentially the reservation form (or links to it).

src/App.js: Sets up React Router (if you use routing) and renders the main layout and pages.