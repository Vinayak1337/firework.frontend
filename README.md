# Firework Frontend

This repository contains the frontend for the Firework application. It provides a user-friendly interface to interact with the backend services and functionalities.

Written in ReactJs, utilizing technologies such as React-Router for mimicking like multi-page website, redux-toolkit for global state management.

## Overview

Before diving into the frontend, ensure that the backend is set up and running. For backend setup, refer to [firework.backend](https://github.com/Vinayak1337/firework.backend).

## Live Demo

You can view the live version of the frontend [here](https://firework-website.netlify.app/).

## Getting Started

1. **Backend Setup**: Before starting with the frontend, ensure the backend server is up and running. Follow the instructions [here](https://github.com/Vinayak1337/firework.backend) to set up the backend.

2. **Frontend Setup**:
   - Clone the frontend repository:
     ```bash
     git clone https://github.com/Vinayak1337/firework.frontend.git
     ```
   - Navigate to the project directory:
     ```bash
     cd firework.frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Before starting the frontend server, ensure you update the `baseUrl` in [api/index.js](https://github.com/Vinayak1337/firework.frontend/blob/master/src/api/index.js) to `localhost:5000`.
   - Start the development server:
     ```bash
     npm start
     ```

This will launch the frontend on a local development server, and you can view it in your browser.

## License

This project is licensed under the MIT License. You can view the license [here](https://github.com/Vinayak1337/firework.frontend/blob/master/LICENSE.md).
