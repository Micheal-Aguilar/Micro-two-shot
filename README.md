# Wardrobify

Team:

- Onkur - Which microservice? Shoes
- Micheal - Which microservice? Hats

## Design

## Shoes microservice

With in the shoes microservice there will be a model for the actual shoe and a mode for the bin that the shoe is in. The model for the bin will be a value object and will have fields for href, closet name, bin number and bin size. The shoe model will include fields for the manufacturer name, color, model name, a picture url, and which bin the shoe is in.

In the poller there will be a model for the bin as well. The poller will reach out to the wardrobe api at `http://wardrobe-api:8000/api/bins/` to get the current list of bins. Each of the bins will then have an instance created in the shoe api.

The shoe api will have the following routes:

- `http:localhost:8080/api/shoes` This route is used to get the list of all shoes.
- `http:localhost:8080/api/bin/bin_id/shoes` This route is used to get the list of all shoes contained in a specific bin.
- `http:localhost:8080/api/shoes/shoe_id` This route will be used to delete a certain shoe.

## Hats microservice

The Hats Microservice is a RESTful API that provides information about various types of hats. This service allows users to retrieve data on different hat styles, their attributes, and related information.It also provides a RESTful API for retrieving information about hats. You can make HTTP requests to the provided endpoints to access the data.The Poller file will get data from the wardrobe api to get the list of locations the hats are in. Each location will be created in the hats api.

The Hats api will have the following routes :
- `http:localhost:8090/api/hats` This route goes into the data and gets the list of all the hats.
- `http:localhost:8090/api/location/location_id/hats`  To get the route for the hats in a specific location
- `http:localhost:8090/api/hats/hat_id` To be able to delete a hat from the database you would use this route to be able to do that.

## How to use this repo

- Clone this repo
  - `git clone https://gitlab.com/Onkurlal/microservice-two-shot.git`
- Navigate to microservice-two-shot
  - `cd microservice-two-shot`
- Link volume
  - `docker volume create two-shot-pgdata`
- Build docker images
  - `docker-compose build`
- Build docker containers from images
  - `docker-compose up`
- Access the frontend react app on `http://localhost:3000`
