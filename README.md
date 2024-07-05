# Bookshelf Application - Frontend

## Overview
This frontend application allows users to manage their bookshelves and favorite books. Users can perform tasks such as searching for books, adding them to specific bookshelves, creating new bookshelves, and viewing their profile information.

## Features
- **User Authentication:** Login and signup functionalities.
- **Book Search:** Utilizes the Google Books API to search for books based on user queries.
- **Bookshelf Management:** Users can view their bookshelves, add books to existing bookshelves, and create new bookshelves.
- **User Profile:** Displays user information including name, avatar, and list of bookshelves.
- **Responsive Design:** Designed with Bootstrap for a mobile-first experience.

## Technologies Used
- Angular
- TypeScript
- Bootstrap

## Getting Started
### Prerequisites
- Node.js and npm installed
- Angular CLI installed

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/clarissa1110/epicode-capstone-frontend
   ```
2. Navigate to the project directory:
    ```
   cd epicodeCapstoneFrontend
   ```

3. Install dependencies:
    ```
    npm install
    ```

### Running the Application

1. Start the development server:
    ```
    npm run fullstack
    ```

2. Open your browser and navigate to http://localhost:4200.

## Project Structure

- **src/app**: Contains the main application files.

- **components**: Contains Angular components.
- **services** : Contains Angular services for handling business logic and HTTP requests.
- **models**: Contains TypeScript interfaces for data models.
- **auth**: Contains services and components for handling registration, login and authentication.

### Services
#### AuthService
Handles user authentication, login, signup, and token management.

#### SearchService
Handles book search functionality using the Google Books API.

#### UserService
Manages operations related to the user and their bookshelves, including retrieval, creation, and updating bookshelves and associated books.

### Components
#### DashboardComponent
Main interface for users to search for books and manage their bookshelves.

#### UserProfileComponent
Displays user profile information, including bookshelves and favorite books. Allows users to create new bookshelves and view books within them.

## API Endpoints
This application communicates with a backend API. For backend implementation details, visit the [Backend Repository](https://github.com/clarissa1110/Epicode-capstone).
