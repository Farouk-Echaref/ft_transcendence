# ft_transcendence

## Introduction

"ft_transcendence" is a Full Stack Web Application that involves the creation of a classic Pong Game, with additional features
including 2FA (Two-Factor Authentication) and a user interface that encompasses player information,
ranking, and scoring. The application also includes a chat interface that supports group chats with
defined roles and one-on-one chats. The main objective of the application is the game itself, which
comprises two essential components: the Matchmaking System (based on the ELO Algorithm commonly
used in online gaming) and the gameplay, designed to faithfully replicate the original Pong game.
Technology stack is below (I mainly worked on the backend and anything related to it):
+ Next.js for a responsive front-end
+ NestJS for the backend
+ PostgreSQL for database management
+ Prisma for ORM
+ Socket.IO for real-time features
+ TailwindCSS for an elegant design
+ Docker for containerization


## Table of Contents

- [Getting Started](#getting-started)
- [Preview](#preview)
- [How To Use](#how-to-use)
- [Development and Testing](#development-and-testing)
- [Contributing](#contributing)
- [License](#license)


## Preview

+ The Application in action: 


https://github.com/Farouk-Echaref/ft_transcendence/assets/66710845/15f9b306-3767-41c1-8039-8d993477cacd


## Getting Started

1. Clone this repository to your local machine:

   ```shell
   https://github.com/Farouk-Echaref/transcendence

## How To Use

### 1. Setup dependencies

```bash
# Install dependencies
yarn

# Configure environment variables
# /apps/api
cp .env.example .env
# /apps/frontend
cp .env.example .env.local
# /packages/db
cp .env.example .env

# Push the Prisma migrations to the database
yarn db:push
```

### 2. Run dev scripts
```bash
# run docker containers (postgresql and redis)
docker-compose up --build -d

# run backend
yarn api:dev

# run frontend
yarn frontend:dev
```

## Docker
- change redis host in ./apps/api/.env
```diff
-   REDISHOST="localhost"
+   REDISHOST="redis"
```
- change db host in ./packages/db/.env
```diff
-   DATABASE_URL="postgresql://postgres:$POSTGRES_PASSWORD@localhost:5432/postgres"
+   DATABASE_URL="postgresql://postgres:$POSTGRES_PASSWORD@db:5432/postgres"
```
