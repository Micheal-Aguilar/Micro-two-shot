# Wardrobify

Team:

- Onkur - Which microservice? Shoes
- Micheal - Which microservice? Hats

## Design

## Shoes microservice

With in the shoes microservice there will be a model for the actual shoe and a mode for the bin that the shoe is in. The model for the bin will be a value object and will have fields for href, closet name, bin number and bin size. The shoe model will include fields for the manufacturer name, color, model name, a picture url, and which bin the shoe is in.

In the poller there will be a model for the bin as well. The poller will reach out to the wardrobe api at http://wardrobe-api:8000/api/bins/ to get the current list of bins. Each of the bins will then have an instance created in the shoe api.

The shoe api will have the following routes: - api/shoes : This route is to get the list of all shoes. - api/bin/bin_id/shoes : This route is used to get the list of all shoes contained in a specific bin. - api/shoes/shoe_id : This route will be used to delete a certain shoe.

## Hats microservice

The model will be tracking the hats fabric, its style name, its color, a URL for a picture, and the location in the wardrobe where it exists.Creating React components to show a list of all hats and their details, also show a form to create a new hat. ALso provide a way to delete a hat

## How to use this repo

- Clone this repo
- git clone https://gitlab.com/Onkurlal/microservice-two-shot.git
- Navigate to microservice-two-shot
  - cd microservice-two-shot
- Link volume
  - docker volume create two-shot-pgdata
- Build docker images
  - docker-compose build
- Build docker containers from images
  - docker-compose up
- Access the frontend react app on http://localhost:3000
