# Suurorg Space Shuttle - Installation and Setup

This project is a Laravel application with a React front-end built using Laravel Breeze.  Follow these instructions to get it up and running on your local machine.

## Prerequisites

* **PHP:** You'll need PHP installed on your system. 
* **Composer:**  PHP's dependency manager.
* **Node.js and npm (or yarn):** You need Node.js and npm (or yarn) to manage JavaScript dependencies.  While npm is commonly used, you can use other package managers like yarn. Brew can help manage Node.js installation, but the package manager (npm, yarn) is separate.
    * **Using Brew to install Node:** `brew install node`
    * **Verify installation:** `node -v` and `npm -v` (or `yarn -v`)


## Installation Steps

1. **Clone the repository:**

   ```bash
   git clone git@github.com:haraldsuurorg/suurorg-space-shuttle.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd suurorg-space-shuttle
   ```

3. **Install PHP dependencies:**

   ```bash
   composer install
   ```

4. **Install JavaScript dependencies:**

   ```bash
   npm install  # or yarn install
   ```

5. **Copy the environment file:**

   ```bash
   cp .env.example .env
   ```

6. **Generate an application key:**

   ```bash
   php artisan key:generate
   ```


7. **Run database migrations:**

   ```bash
   php artisan migrate
   ```


8. **Start the development servers:**

   * **Laravel development server:**
     ```bash
     php artisan serve
     ```

   * **Laravel scheduler (to fetch and manage data from API):**  (in a separate terminal window)
     ```bash
     php artisan schedule:work
     ```
     
   * **React development server:**  (in a separate terminal window)
     ```bash
     npm run dev # or yarn dev
     ```


## Accessing the Application

Once both servers are running, you can access your application in your web browser at the URL provided by `php artisan serve` (usually `http://127.0.0.1:8000`). 
Happy travelling!
