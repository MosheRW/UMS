



Here is the updated README file:


# UMS (User Management System)

## Description

UMS is a client-side application for managing users. It provides a responsive interface that supports both dark and light modes, and is optimized for use on desktops, laptops, and mobile devices.

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* npm (version 6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MosheRW/ums.git
```

2. Install dependencies:
```bash
cd ums
npm i
```

3. Build the project:
```bash
npm run build
```

### Running the Project

Once the project is built, you can serve the `build` folder using any HTTP server. Here are a few options:

#### Option 1: Using `http-server`

1. Install `http-server` globally:
```bash
npm install -g http-server
```

2. Navigate to the `build` folder:
```bash
cd ums/build
```

3. Start the server:
```bash
http-server
```

#### Option 2: Using a local development server

1. Install a local development server of your choice (e.g., `serve`, `live-server`, etc.).

2. Navigate to the `build` folder:
```bash
cd ums/build
```

3. Start the server:
```bash
serve
```

Alternatively, you can also download the `build` folder and serve it using any HTTP server.

## Features

* Create, delete, and edit single and multiple users from the database.
* Supports dark and light modes.
* Responsive design for desktops, laptops, and mobile devices.

## Structure

The project is organized into the following main components:

* **Pages:** This directory contains the main pages of your application, such as the main page, login page, edit page, and dashboard page. Each page is a separate component that handles its own specific functionality.
* **Components:** This directory contains reusable UI components that can be used across different pages. For example, it includes a `Modal` component for displaying modals, a `TopBar` component for the top navigation bar, and an `EditUserComponent` for editing user information.
* **API:** This directory contains the API service that handles requests to the server. It includes functions for handling different types of requests, such as login, logout, and user management.
* **Redux:** This directory contains the Redux store and related files for managing the state of your application.
* **Style:** This directory contains the styles for your components, including global styles, themes, and specific styles for different components.
* **Types:** This directory contains type definitions for your application, such as the `User` type.

## Capabilities

The project has the following capabilities:

* **User Management:** The project allows you to create, delete, and edit users from the database.
* **Authentication:** The project includes a login page that allows users to authenticate themselves with a username and password. It also includes a logout feature to log out users.
* **Redux Store:** The project uses Redux to manage the state of the application, including user data and authentication status.
* **API Integration:** The project includes an API service that handles requests to the server, allowing you to interact with the database and perform CRUD operations on users.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Open a pull request against the main repository.

## Authors

* Moshe Winberg(https://www.linkedin.com/in/mosherwinberg)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Thanks to the [React](https://reactjs.org/) team for providing the foundation for this project.
* Thanks to the [Material-UI](https://material-ui.com/) team for providing the UI components used in this project.