# Canvassing Web Application 
A simple web application for canvassers to take and review notes about their interactions.

## Tech Stack
1. Frontend React (Next.js) with typescript
1. Prisma for persistent storage

## Prerequisites 
1. Node.js must be installed 
1. npm must be installed (comes with Node)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page. 

## Development 
To see the homepage of the application, simply run `npm run dev` and navigate to http://localhost:3000/


### Prisma 
To get started with Prisma, you can run: 
```
npx prisma generate
```

#### Extending the Schema 

If you are attempting to extend the existing data schema, please note that you will need to migrate the existing data schema.

You should run a command as follows:

```
npx prisma migrate dev --name <description of the changes>

#### Debugging issues with Prisma
You can run `npx risma studio` and inspect `dev.db` in the Web UI (localhost:3000). 
```