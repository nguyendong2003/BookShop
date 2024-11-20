# Tech stack
- React 18
- React Router 6
- Redux Tookit
- Vite 4
- Ant design

### Project Environment: Node.js v16.13.1
https://nodejs.org/download/release/v16.13.1/

- Steps to set up the project (Development mode):
1. Clone the repository.
2. Install dependencies: npm install
3. Update the .env.development file (if necessary).
4. Run the project: npm run dev.
===

- Steps to run in Production mode:
1. Clone the repository.
2. Install dependencies: npm install
3. Update the .env.production file (if necessary).
4. Build the project: npm run build.
5. Run the project: npm run preview.


# Account login to test:
- User role:
    guest@gmail.com
    123456
- Admin role:
    admin@gmail.com
    123456


# Project description
- This project is a website to buy books

# Role:
- Admin:
    + Manage books
    + Manage users
    + Manager orders

- User:
    + Login/logout/register
    + View books page, view detail books
    + Filter books by category, price range
    + Search books
    + Paginate books
    + Add books to cart, purchase books
    

# Features:
- Authentication: Handle JWT (JSON Web Token) access token, refresh token logic
- API Integration: Use Axios for making HTTP requests to the backend.
- Pagination: Used Ant Design Pagination by integrating with backend to fetch paginated data.
- Filter by Multiple Criteria: Category, Price Range, Title, Author
- Using Redux Toolkit to manage app state