# BlogSphere
![Screenshot 2024-06-19 021608](https://github.com/sourav-sm/BlogSphere/assets/116539402/04b56120-6669-404e-bcb8-8f1b31a3234f)

## Hosted Links--
For More INFO Check out This--> [BlogSphere](https://medium-clone-mauve-delta.vercel.app/)


## Overview

BlogSphere is a full-stack platform where multiple users can create and read blog posts, sharing their experiences and thoughts. The project is built with modern web technologies to ensure a smooth and responsive user experience.

## Features

-   **User Authentication:** Secure login and signup functionality using JWT.
-   **Responsive Design:** Fully responsive layout with skeleton styling for a better user experience while loading.
-   **Create and Read Blog Posts:** Users can create new blog posts and read posts from other users.
-   **Local Setup:** Easy to set up the project locally for development and contribution.

## Technologies Used

-   **Frontend:**
    -   React
-   **Backend:**
    -   Cloudflare Workers
-   **Validation:**
    -   Zod
-   **Language:**
    -   TypeScript
-   **Database:**
    -   Prisma
    -   PostgreSQL
   - **Deployment:**
       -   Vercel 

## Installation and Setup

### Prerequisites

-   Node.js (v14 or later)
-   PostgreSQL

### Steps to Setup Locally

1.**Clone the repository:**
 
    `git clone https://github.com/yourusername/BlogSphere.git`

    `cd BlogSphere`


 2.**Install dependencies:**
 
     `npm install` 
 
    
3.**Set up the environment variables:** 

  Create a `.env` file in the root directory and add the following:

     `DATABASE_URL=postgresql://user:password@localhost:5432/blogsphere`
    `JWT_SECRET=your_jwt_secret_key` 

    
4.**Migrate the database:**

    `npx prisma migrate dev --name init`
    
    
5.**Start the development server:**

    `npm run dev` 
    
6.**Access the application:**
Open your browser and go to 

    `http://localhost:3000`.  


## Contribution
We welcome contributions from the community! Follow these steps to contribute:

1.  Fork the repository on GitHub.
2.  Create a new branch with a descriptive name.
3.  Make your changes and commit them with clear and concise messages.
4.  Push your changes to your fork.
5.  Create a pull request to the `main` branch of the original repository.

## Contact

For any questions or suggestions, feel free to open an issue or contact here.
-   Sourav Mohanta - developersourav135@gmail.com
-   Project Link: https://sourav-mohanta.vercel.app/
