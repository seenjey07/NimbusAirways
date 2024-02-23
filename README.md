# NimbusAirways

Project Duration: 3 weeks

NimbusAirways is a airline system booking app developed with Ruby on Rails (backend) and ReactJS (frontend) compiled using VITE. The project utilizes Tailwind CSS, DaisyUI and ShadCN for a clean user interface and employs Devise and Devise-JWT for authentication. This project was deployed using Render (for Rails) and Vercel (for ReactJS/Vite).

Here's the live link: [NimbusAirways](https://nimbusairways.vercel.app/)

We'd love to receive stars if you love the project.

## Table of Contents

- [NimbusAirways](#nimbusairways)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Users Feature](#users-feature)
    - [Admins Feature](#admins-feature)
  - [Requirements](#requirements)
    - [Ruby](#ruby)
    - [React](#react)
      - [Development](#development)
        - [Ruby development](#ruby-development)
        - [React development](#react-development)
  - [Current Schema Tables](#schema)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Backend**: Developed with Ruby on Rails to handle server-side logic and data management.
- **Frontend**: Utilizes ReactJS (version 18.2.0) for a dynamic and interactive user experience.
- **Responsive UI**: Utilizes Tailwind CSS, DaisyUI and ShadCN for a visually appealing user interface.
- **User Authentication**: Implemented using Devise and Devise-JWT for secure user authentication.

### Users Feature

- **Website navigation/sections**
  - Users can navigate through the website's Homepage, About page and Contact Us page

- **SMTP Mailer using Gmail**
  - Users will receive confirmation email after registration.
  - Users will receive booking confirmation on their email with their specific flight details and informations.
  - Users can request for forgot password and an email reset link will be sent. User will be directed to the password path and may change the password accordingly.

- **Registration/Login**
  - Users can register for accounts with unique email address and phone numbers.
  - After registration, users will need to confirm their registration via the email they received and then they can login using their email address and password.

- **User Dashboard**
  - Registered users have access to their dashboard upon login, allowing them to view their registered information as well as edit some of their details.
  - Users can also see their existing bookings.

- **Flight Booking**
  - Registered users can search, view, and book pre-existing or generated flights based on their preferences of the available flights.
  - Guests can search flights but would be redirected to the login/registration page to continue booking.
  - Flight bookings also has an integrated seat selection dependent on the aircraft and dynamic passenger forms.

### Admins Feature

- **Users**
  - Admins can view all current user, update their information, and delete selected user.
  - Admins may also override email confirmation of other users.

- **Admin Dashboard**
  - Admins can view the general state of the airline and system. User, flight, booking and revenue (based on quantity to price) datas are all available in the dashboard.

- **Flights**
  - Generate single or range of flights from a daily, weekly or monthly basis.
  - View all concurrent flights in a calendar form with complete flight details.

- **Routes**
  - Create routes based on a preexisting airport data of the Philippines. Locations listed are places with runways.
  - Routes are also dynamic on displaying images on flight search.
  - Automatic assignment of routes on an aircraft based on their routes.

- **Aircrafts**
  - Admins can create aircraft based on a preexisting data.
  - Admins can track aircrafts whether they are landing, taking-off, inactive, on-air or boarding. This is based on a backend logic.
  - Admin can see current and upcoming flights of an aircraft. Admins can also see the current age of the aircraft based on when it was created. Number of flights are also displayed.
  - Aircraft details also shows the current seat capacity and availability.

- **Bookings**
  - Admins can see all the bookings made by the users including passenger, route and aircraft information.

## Requirements

### Ruby

- [Ruby](https://www.ruby-lang.org/en/) (version 3.2.2)
- [Rails](https://rubyonrails.org/) (version 7.1.3)
- [devise](https://rubygems.org/gems/devise/versions/4.9.3?locale=en)
- [devise-jwt](https://rubygems.org/gems/devise-jwt)
- [omniauth](https://rubygems.org/gems/omniauth) *(Including [github-oauth](https://rubygems.org/gems/github-oauth) and [googleauth](https://rubygems.org/gems/googleauth))*

### React

- [Node.js](https://nodejs.org/) (version 20.11.0)
- [ReactJS](https://reactjs.org/) (version 18.2.0)
- [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [axios](https://www.npmjs.com/package/axios)
- [react-big-calendar](https://www.npmjs.com/package/react-big-calendar)
- [react-oauth](https://www.npmjs.com/package/@react-oauth/google)

#### Development

##### Ruby development

- [faker](https://rubygems.org/gems/faker) *For generating user seeds, you may refer on our seeds.db for generation of data*
- [dotenv](https://rubygems.org/gems/dotenv)

##### React development

- [concurrently](https://www.npmjs.com/package/concurrently)

## Schema
![Schema Table](https://i.ibb.co/THd8Gzg/SCHEMA.png)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/seenjey07/NimbusAirways.git
   ```

2. Install dependencies:

   ```bash
   # Install Ruby gems on backend
   bundle install

   # Install npm packages on frontend
   npm install
   ```

## Configuration

1. **Database Setup**:

   ```bash
   # Create and migrate the database
   rails db:create
   rails db:migrate

   # Optional: if you will utilized seeds on the seeds.rb. You may uncomment the seed generation
   rails db:seed
   ```

2. **Environment Variables**:
   Create a `.env` file in the project root and configure the necessary environment variables:

   ```dotenv
   SECRET_KEY_BASE=your_secret_key
   ```

   *You may want to contact us if you want run the project locally for the master key*

## Usage

We have created custom scripts where you can run your server on the frontend using concurrently.

1. Start the Rails server:

   ```bash
   npm run backend
   ```

2. Start the React development server:

   ```bash
   npm run frontend
   ```

3. Start both React development server and Rails server simultaneously:

   ```bash
   npm run dev
   ```

4. To run rails server independently (Run on the backend or rails directory):

   ```bash
   rails s
   ```

Visit [http://localhost:3000](http://localhost:3000) to run rails and [http://localhost:5173](http://localhost:5173) in your browser to access the NimbusAirways app.

## Contributing

We welcome contributions! To contribute to NimbusAirways, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
