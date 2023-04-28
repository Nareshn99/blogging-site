# Blog API

This is a RESTful API for managing blog posts, built using Node.js, Express.js, and MongoDB. It allows users to create, read, update, and delete blog posts.

## Features

- Create, read, update, and delete blog posts
- Each blog post has a title, author, content, and timestamp
- Search for blog posts by keyword
- Filter blog posts by author or timestamp
- RESTful design principles and appropriate HTTP status codes
- JWT authentication
- Versioning using a custom header or URL parameter

## Setup

1. Install Node.js and MongoDB
2. Clone this repository
3. Install dependencies using `npm install`
4. Run the development server using `npm start`


# Environment Variables

The following environment variables should be set in the `.env` file located in the root folder:

- `PORT`: The port on which the application will be hosted
- `MONGO_URL`: The URL of the MongoDB server
- `SECRET`: A secret string used for authentication
- `accessKeyId`: The AWS access key ID
- `secretAccessKey`: The AWS secret access key
- `region`: The AWS region the application should use


## Endpoints

The following endpoints are available:
- /api/v1/user

## Register User
- POST /register

## Login User
- POST /login

## Create Blog
- POST /blog

## Get single Blog
- GET /blog/:bId

## Update blog
- PUT /blog/:bId

## Delete Blog
- DELETE /blog/:bId

## Get All Blog
- GET /blog/create

## filtered methods api's
- GET /blog/filtered/keyword
- GET /blog/filtered/author

## upload photo
- POST /photo-upload

## Error Handling

This API returns appropriate HTTP status codes for all requests. The error response will include a `message` field with a short description of the error.