```markdown
# Microservice Application

This project is a microservice-based application built with Nest.js. It uses various technologies like Docker, Mongoose, MySQL, RabbitMQ, Redis, BullMQ, and CQRS for scalable and efficient service management. Additionally, it includes a Mail microservice, 2FA, backup database, OAuth2 Google, refresh tokens, and reset password functionalities. The application also utilizes RxJS, dynamic modules, validation, role-based security, pagination, logging, and adheres to clean code principles.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Microservices Architecture](#microservices-architecture)
- [Modules Overview](#modules-overview)
- [Security](#security)
- [Logging](#logging)
- [Clean Code Practices](#clean-code-practices)
- [Contributing](#contributing)

## Features

- **Dockerized Microservices**: The application is containerized using Docker for easy deployment.
- **Mongoose Integration**: Uses Mongoose for MongoDB operations.
- **MySQL Support**: Utilizes MySQL for relational database operations.
- **RabbitMQ for Messaging**: Implements RabbitMQ for messaging between services.
- **Redis and BullMQ for Queue Management**: Uses Redis and BullMQ for background processing and task queues.
- **CQRS Pattern**: Implements the CQRS pattern for handling commands and queries separately.
- **Mail Microservice**: A dedicated microservice for handling email operations.
- **2FA (Two-Factor Authentication)**: Enhances security by requiring a second authentication factor.
- **Database Backup**: Regular database backup functionality for disaster recovery.
- **OAuth2 with Google**: Supports OAuth2 authentication via Google.
- **Refresh Tokens**: Implements refresh token functionality for maintaining session validity.
- **Reset Password**: Allows users to reset their password securely.
- **RxJS Integration**: Reactive programming using RxJS for handling asynchronous operations.
- **Dynamic Modules**: Dynamic module loading for flexibility and scalability.
- **Validation**: Input validation using class-validator and custom validation pipes.
- **Role-Based Security**: Secure operations using role-based access control.
- **Pagination**: Efficient data retrieval with pagination support.
- **Logging**: Comprehensive logging using built-in and custom loggers.
- **Clean Code**: Adheres to clean code principles for maintainability and readability.

## Technologies

- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Docker**: Containerization for microservices.
- **Mongoose**: MongoDB object modeling for Node.js.
- **MySQL**: A relational database management system.
- **RabbitMQ**: A message broker for asynchronous communication.
- **Redis**: In-memory data structure store used as a database, cache, and message broker.
- **BullMQ**: A Node.js library for handling jobs and message queues.
- **CQRS**: Command Query Responsibility Segregation for separating read and write operations.
- **RxJS**: A library for reactive programming using Observables.
- **JWT**: JSON Web Token for authentication.
- **i18n**: Internationalization support.
- **class-validator**: A library for data validation.
- **Passport.js**: Middleware for handling authentication.
- **Winston**: A logger for generating and managing logs.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/bedonassef02/e-commerce-microservices
   cd e-commerce-microservices
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Docker:**

   Ensure Docker is installed and running on your system. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

## Running the Application

The application can be started using Docker or directly with Node.js.

### Using Docker:

```bash
docker-compose up
```

### Using Node.js:

```bash
npm run start:dev <microservice_name>
```

## Environment Variables

The application relies on the following environment variables. Create a `.env` file in the root directory and configure the variables as needed:

```env
# Mongo DATABASE
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_URI=mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.pyyzclc.mongodb.net

SQL_DB_TYPE=mysql
SQL_DB_USERNAME=username
SQL_DB_PASSWORD=password
SQL_DB_PORT=3306
SQL_DB_HOST=localhost

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Payment
STRIPE_SECRET_KEY=yourstripe_secret
STRIPE_SUCCESS_URL=http://localhost:3000/payment/success
STRIPE_CANCEL_URL=http://localhost:3000/payment/cancel

# 2FA
TWO_FACTOR_AUTHENTICATION_APP_NAME=YourAppName

# Backup
BACKUP_SCHEDULE=0 0 * * * # Daily at midnight

APP_URL=http://localhost:3000

# NEST_DEBUG=true

SERVICE_NAME=gmail
EMAIL_ADDRESS=email
EMAIL_PASSWORD=password
```

## Microservices Architecture

The application is divided into multiple microservices, each handling a specific domain:

- **Gateway**: Acts as the entry point to the application.
- **Category Service**: Manages product categories.
- **Product Service**: Manages products.
- **Auth Service**: Handles authentication, authorization, 2FA, OAuth2, and refresh tokens.
- **Cart Service**: Manages user carts.
- **Order Service**: Processes and manages orders.
- **Wishlist Service**: Manages user wishlists.
- **Coupon Service**: Handles discount coupons.
- **Review Service**: Manages product reviews.
- **Payment Service**: Handles payment processing.
- **Mail Service**: Manages email notifications and communications.
- **Backup Service**: Manages regular database backups.

## Modules Overview

- **CategoryModule**: Manages product categories.
- **ProductModule**: Handles products data and operations.
- **AuthModule**: Provides authentication, authorization, 2FA, OAuth2, refresh tokens, and password reset functionalities.
- **CartModule**: Manages user carts.
- **OrderModule**: Processes orders and manages order history.
- **WishlistModule**: Manages user wishlists.
- **CouponModule**: Manages discount coupons and offers.
- **ReviewModule**: Handles product reviews.
- **PaymentModule**: Integrates payment gateways and processes payments.
- **MailModule**: Manages sending emails, including dynamic templates and background processing.
- **BackupModule**: Manages database backups and restore operations.

### Example Dynamic Module with RxJS

## Interceptors

- **TimeoutInterceptor**: A global interceptor that handles request timeouts.
- **LoggingInterceptor**: Intercepts requests and logs important details for debugging and monitoring.

## Custom Services

- **TokenService**: Manages JWT tokens, refresh tokens, and related operations.
- **TwoFactorService**: Handles 2FA secret generation, validation, and QR code creation.
- **GoogleOAuthService**: Manages OAuth2 authentication with Google.
- **PasswordService**: Handles password reset operations securely.
- **BackupService**: Manages database backup and restore operations.
- **MailService**: Sends emails using predefined templates and dynamic data.
- **CustomI18nService**: Handles internationalization and localization.

## Validation

The application uses `class-validator` for validation. Example usage:

## Security

The application uses Passport.js for authentication, role-based security, 2FA, and OAuth2 with Google:

## Pagination

Pagination is implemented using a simple query parameter approach:

## Logging

Logging is implemented using the `winston` library:

## Clean Code Practices

The project follows clean code principles by:

- **Modularizing** the application into small, single-responsibility modules.
- **Splitting large methods** into smaller, more manageable functions.
- **Using Dependency Injection** to manage dependencies and enhance testability.
- **Writing meaningful and consistent naming** for variables, functions, and classes.
- **Adding comments** only where necessary to explain complex logic.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow for contributing to this project.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.