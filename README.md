# Metadata Fetcher

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Security](#security)
- [API Endpoints](#endpoints)
- [Design Choices](#design)
- [Author](#author)

## Overview <a name="overview"></a>

The **Metadata Fetcher** is a full-stack application that allows users to input a list of URLs and fetches metadata (title, description, and an image) for each URL. The application is built with a React front-end and a Node.js back-end. It handles multiple URLs, ensures security, and includes error handling and rate limiting.

## Features <a name="features"></a>

- **Front-End (React)**
  - Simple and user-friendly form for inputting multiple URLs (minimum of 3).
  - Metadata fetched is displayed in a visually appealing format.
  - Error handling for invalid URLs or failed metadata retrieval.

- **Back-End (Node.js)**
  - Endpoint `/urls` accepts a list of URLs and returns metadata in JSON format.
  - Robust error handling for network issues and invalid URLs.
  - Rate limiting to handle up to 5 requests per second.

- **Security**
  - Protection against XSS and CSRF attacks.
  
- **Testing**
  - Unit tests for both front-end and back-end with 5 test cases each.



## Installation <a name="installation"></a>

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Back-End Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ItamarBenAri/Metadata-Fetcher.git
   cd metadata-fetcher/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Node.js server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:4000`.

### Front-End Setup

1. Navigate to the front-end directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage <a name="usage"></a>

1. Open the application in your browser.
2. Enter at least 3 URLs in the form provided.
3. Click the "Submit" button to fetch metadata.
4. The metadata (title, description, image) will be displayed for each URL.

## Testing <a name="testing"></a>

### Back-End Tests

- Run back-end tests using Mocha and Chai:
  ```bash
  cd backend
  npm test
  ```

### Front-End Tests

- Run front-end tests using React Testing Library:
  ```bash
  cd frontend
  npm test
  ```

## Security <a name="security"></a>

- **XSS Protection**: Implemented using `helmet` middleware.
- **CSRF Protection**: Implemented using `csurf` middleware with a CSRF token sent via a cookie.
- **Rate Limiting**: Implemented with `express-rate-limit` to limit requests to 5 per second.

## API Endpoints <a name="endpoints"></a>

- `POST /api/urls`
  - **Description**: Accepts an array of URLs and returns metadata for each URL.
  - **Request Body**: `{ "urls": ["https://example.com", "https://example2.com", "https://another.com"] }`
  - **Response**: `[{ "url": "https://example.com", "metadataItems": [{ "title": "Example", "description": "Example Description", "imageUrl": "https://example.com/image.png" }], .... }]`

## Design Choices <a name="design"></a>

- **Error Handling**: Extensive error handling for both front-end and back-end ensures robust application performance.
- **Rate Limiting**: Essential to prevent abuse and ensure fair usage.
- **Security**: Ensuring the application is secure against common web vulnerabilities was a priority.

## Author <a name="author"></a>
**Itamar Ben Ari**
- My Website: [Itamar Ben Ari](https://itamar-ben-ari.com)
- GitHub: [Itamar Ben Ari](https://github.com/ItamarBenAri)
- LinkedIn: [Itamar Ben Ari](https://www.linkedin.com/in/itamar-ben-ari-69678b28b/)

Feel free to explore the projects and contact me at [etamar234@gmail.com](mailto:etamar234@gmail.com) if you have any questions or collaboration ideas!
