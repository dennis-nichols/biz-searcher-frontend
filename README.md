# Business Search Tool

A tool to search and filter businesses in a specific area of the US, using the Google Place Search and Place Details APIs. This tool was built to help the client, [Radman Company](https://www.radmancompany.net/), with acquisition research adn deal sourcing for private equity firms.

## Frontend

The UI is built with [Next.js](https://nextjs.org/), [Typescript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/), and [React Table](https://react-table-v7.tanstack.com/). The frontend application is hosted on [Vercel](https://vercel.com/).

## Backend

The backend is built with [Python](https://www.python.org/) and the [FastAPI](https://fastapi.tiangolo.com/) framework. It is hosted on [Google Cloud Run](https://cloud.google.com/run). See the backend repo [here](https://github.com/dennis-nichols/radman_business_searcher).

## Features

- Search businesses in a specific area of the US
- Filter businesses by the total number of reviews
- Responsive and mobile friendly UI
- Quick evaluation of candidate businesses for acquisition research

## Getting started

1. Clone the repository: `git clone https://github.com/<your-username>/business-search-tool.git`
2. Navigate to the project directory: `cd business-search-tool`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Access the application at `http://localhost:3000`

## Deployment

The frontend is hosted on Vercel and the backend is hosted on Google Cloud Run. Follow the documentation for each platform to deploy the application.

## Contributing

This project is open for contributions. Feel free to open an issue or submit a pull request.
