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
   https://github.com/Farouk-Echaref/ft_transcendence

## How To Use

### 1. Setup dependencies

```bash
# Install dependencies
yarn

### 2. Run dev scripts
```bash
# run the application through docker containers (frontend, backend, postgresql and redis)
docker-compose up --build -d

## Contributing

* We welcome and appreciate contributions to this project. To contribute, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top of the repository on GitHub. This will create a copy of the repository in your GitHub account.

2. **Clone the Repository**: Clone your forked repository to your local machine using `git clone`.

    ```shell
   git clone https://github.com/your-username/repository.git

3. **Create a New Branch**: Create a new branch for your contribution. Choose a meaningful branch name that describes your work `git checkout -b`.

    ```shell
    git checkout -b feature/your-feature-name

4. **Make Changes**: Make the necessary code changes and additions in your branch.

5. **Test Your Changes**: Ensure your changes are working as expected. Write tests if applicable.

6. **Commit Your Changes**: Commit your changes with clear and concise commit messages.

    ```shell
    git commit -m "(feat/fix/chore...) Your commit message here"

7. **Push Your Changes**: Push your changes to your fork on GitHub.

    ```shell
    git push origin feature/your-feature-name


8. **Create a Pull Request (PR)**: Go to the original repository on GitHub and click "New Pull Request." Describe your changes and submit the PR.

9. **Review and Discuss**: After submitting the PR, your changes will be reviewed by project maintainers. Be prepared to address any feedback and make necessary adjustments.

10. **Merge**: Once your PR is approved, it will be merged into the project. Congratulations!


    => Please make sure to follow the project's code of conduct and contribution guidelines. By contributing, you agree to abide by them.

If you have questions or need help with the process, feel free to open an issue..

Thank you for contributing to our project!

