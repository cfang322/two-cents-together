# two-cents-together
A collaborative finance dashboard for couples to track expenses, savings, and contributions.


ctrl + c to stop running backend server

### Tech Stack

#### Frontend
- React - UI library for building dynamic components
- Next.js - Full-stack React framework with:
    - Server-side rendering (SSR)
    - File-based routing
    - API routes
    - Built-in image optimization
    - Easy deployment to Vercel
- TypeScript - Adds static type checking for better develope experience
- Tailwind CSS - Utility-first CSS framework for fast, repsonsive design

#### Backend
- Node.js - JavaScript runtime for server-side development
<!-- 
- Normally, JavaScript runs in the browser (front-end).
- Node.js lets you run JavaScript outside the browser, on a server.
- This means you can build the “back-end” of a web app with the same language you use for the front-end.
-->
- Express - Minimal and flexible Node.js web application framework
<!-- 
- Express is a small framework for Node.js that makes it easier to handle requests and responses.
- Instead of writing a lot of low-level code to handle incoming data, routing, and responses, Express gives you a clean and simple API for it.
-->
- PostgreSQL - Relational database, ideal for financial and transactional data
<!-- 
- PostgreSQL is a relational database — it stores data in structured tables with rows and columns.
- It’s good for complex data relationships and ensures accuracy and consistency, which is important for things like financial transactions.
-->
- Prisma - Modern ORM for data modeling and database interaction
<!-- 
- Prisma is an ORM (Object-Relational Mapping) tool.
- It lets you interact with your database (like PostgreSQL) using JavaScript/TypeScript code instead of writing raw SQL queries.
- It also generates types and models automatically, reducing errors and making it easier to work with your data.
-->

<!-- 
Tech Stack Workflow:

1. Node.js - Runs server-side JS code.
2. Express - Handles routing and HTTP requests/responses.
3. PostgreSQL - Stores data in relational tables.
4. Prisma - ORM that lets us talk to PostgreSQL using JS/TS code.

Flow:
Front-end → Node.js/Express → Prisma → PostgreSQL
-->

We chose this stack for full control, scalability, easy developer collaboration, and real-world applicability in full-stack developer roles. 