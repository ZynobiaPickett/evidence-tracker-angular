# Evidence Tracker App
A full-stack-style Angular application for tracking case records using CRUD operations and a simulated REST API.

## Features
- View cases
- Add new cases
- Delete cases
- Search/filter cases
- Connect Angular frontend to a mock REST API

## Tech Stack
- Angular
- TypeScript
- HTML/CSS
- json-server
- db.json mock database

## Architecture
```Angular Component → Angular Service → REST API → json-server → db.json```

## API Endpoints
GET    /cases
POST   /cases
DELETE /cases/:id

## How to Run
Install dependencies: npm install

## Start the mock backend
npx json-server --watch db.json --port 3001

## Start the Angular app:
ng serve

## Open:
http://localhost:4200

## Notes:
This project uses json-server and db.json to simulate backend API behavior. In a production environment, the mock backend could be replaced with a Java Spring Boot API connected to PostgreSQL.

Future Improvements:
Add update/edit functionality
Add authentication
Add form validation
Connect to PostgreSQL
Add CI/CD pipeline
