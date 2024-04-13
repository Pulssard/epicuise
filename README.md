# Epicuise

Epicuise is a web application that allows users to search for recipes, view recipe details, add new recipes and save their favorite ones for later reference.

## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Features

- Search for recipes using keywords (e.g: pasta, pizza, avocado).
- View recipe details including ingredients and cooking instructions.
- Save favorite recipes for quick access.
- Responsive design for mobile and desktop users(using @media, flex/grid layouts, relative units).
- Dinamically changes the ingredients' quantity based on chosen number of servings. (cloning nodes and comparing them to render only the updated part of the DOM tree)

## Demo

https://epicuise.netlify.app/
## Installation

To run Forkify locally, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/Pullsard/epicuise.git`.
2. Navigate to the project directory using `cd epicuise`.
3. Install the necessary dependencies by running `npm install`.
4. Start the application using `npm start`.
5. Open your web browser and navigate to `http://localhost:8080`.

## Usage

- Upon loading the application, users are presented with a search bar where they can enter keywords to search for recipes.
- Clicking on a recipe thumbnail displays detailed information about the recipe including ingredients and cooking instructions.
- Users can save their favorite recipes by clicking on the heart icon(the bookmarked recipes are saved using localStorage).


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## API Used

Epicuise utilizes the [Forkify API](https://forkify-api.herokuapp.com/v2) for retrieving recipe data. The Food2Fork API provides access to a vast collection of recipes from various sources. 

To use the Food2Fork API, you will need to sign up for an API key (https://forkify-api.herokuapp.com/v2) and insert your API key in the appropriate configuration file or environment variable.

## Project Background

This project was originally created as final project, part of the [The Complete JavaScript Course 2024: From Zero to Expert!
] course by [Jonas Schmedtmann]. It served as a learning exercise to implement various concepts and technologies taught throughout the course such as OOP(Classes, prototypal inheritance), asynchronious JS(promises, async/await, DOM Manipulation, Observer API, etc).

## Modifications

After completing the course, I have made several modifications and enhancements to the original project, such as responsiveness, as well as the name and logo. These changes were made to further personalize the project and improve its functionality.



