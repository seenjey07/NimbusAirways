# NimbusAirways

NimbusAirways is an airline ticket booking app developed with Ruby on Rails (backend) and ReactJS (frontend). The project utilizes Tailwind CSS and DaisyUI for a clean user interface and employs Devise and Devise-JWT for authentication. This project was deployed using Render (for Rails) and Vercel (for ReactJS/Vite).

Here's the live link: nimbusairways.vercel.app

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Backend**: Developed with Ruby on Rails to handle server-side logic and data management.
- **Frontend**: Utilizes ReactJS (version 18.2.0) for a dynamic and interactive user experience.
- **Responsive UI**: Utilizes Tailwind CSS and DaisyUI for a visually appealing user interface.
- **User Authentication**: Implemented using Devise and Devise-JWT for secure user authentication.

For Users

- **Website navigation/sections**: Users can navigate through the website’s Homepage, About Page, and Contact Us Page to learn more about NimbusAirways.

-**Email Confirmation**: With the developers using Action Mailer Configuration for Gmail, users will be receiving transaction confirmation emails to their registered email address like account registrations (for confirming) and booking confirmations. Users may also request for password resets if they forget their password.

- **Registration/Login**: Users can register for accounts with email address and phone numbers only used once. After registration, users will need to confirm their registration via the email they received and then they can login using their email address and password.

-**User Dashboard**: Registered users have access to their dashboard upon login, allowing them to view their registered information as well as edit some of their details. There is also a tab for bookings so users can see their existing bookings.

- **Flight Booking**: Registered users can search, view, and book flights based on their preferences of the available flights. Guests can search and flights but would be redirected to the login/registration page to continue booking.

For Admins

-\*\*

## Requirements

- [Ruby](https://www.ruby-lang.org/en/) (version 3.2.2)
- [Node.js](https://nodejs.org/) (version 20.11.0)
- [Rails](https://rubyonrails.org/) (version 7.1.3)
- [ReactJS](https://reactjs.org/) (version 18.2.0)
- [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) (installed as npm packages)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/seenjey07/NimbusAirways.git
   ```

2. Install dependencies:

   ```bash
   # Install Ruby gems
   bundle install

   # Install npm packages
   npm install
   ```

## Configuration

1. **Database Setup**:

   ```bash
   # Create and migrate the database
   rails db:create
   rails db:migrate
   ```

2. **Environment Variables**:
   Create a `.env` file in the project root and configure the necessary environment variables:

   ```dotenv
   SECRET_KEY_BASE=your_secret_key
   ```

3. **Additional Configuration**:

   Update your `config/application.rb` file to set the Rails application version and add any necessary gems.

   ```ruby
   config.version = '1.0.0' # Set your application version

   # Add gems to the Gemfile
   # ...
   ```

   Update your `config/routes.rb` file to define the routes of your application.

   ```ruby
   # Define your routes
   # ...
   ```

## Usage

1. Start the Rails server:

   ```bash
   rails server
   ```

2. Start the React development server:

   ```bash
   npm start
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the NimbusAirways app.

## Contributing

We welcome contributions! To contribute to NimbusAirways, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
