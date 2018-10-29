# image-transformer

[![Build Status](https://travis-ci.org/cmwen/image-transformer.svg?branch=master)](https://travis-ci.org/cmwen/image-transformer)

image-transformer is an exercise to utilize express and sharp to perform an on-the-fly image transformation

## Development

### Prereq

This project such some of javascript new features like `async` `await`. You need to at least have `node 8` installed.

You can use either `npm` or `yarn` to manage dependencies.

### Install dependencies

Run `npm install` or `yarn install` to download and install dependencies.

### Start up server

`npm start` will start up a express server on port 9999. This can be changed in `app.js` file.

### Unit testing

`npm test` will run the unit tests with `jest`. You can also run `npm run test-dev` to run unit tests in watch mode.

### Testing this API

Using a rest client is suggested. Or you can test with the sample test page by opening URL http://localhost:9999. Note: This test page only use the first API below. You can edit the file at `client\index.html` to switch the API.

When using rest client, simply post a image to http://localhost:9999/image. You will see the same image came back. Nothing interested here. Post to http://localhost:9999/image/filename will save the uploaded image at `upload` directory. You can get the image back by `GET` http://localhost:/999/image/filename. And if you hit http://localhost:9999/image/options/filename, you now have the power to resize and change the format of your image.

Options includes f_*format*, m_*maxEdge*, w_*width*, h_*height*.

With f_*format*, you can specify what format image is going to convert to. Supported format jpeg, png, webp. Default is jpeg. f_*format* can be used with other option independently. Example `f_jpeg`.

With w_*width*, h_*height*, you can specify the max width and height you want this image to fit. This API will try to fit new new image within the box and also keep the aspect ratio. Example `w_300,h_400`.

With m_*format*, you specify the max width or hight you want to convert your image, this api will try to fit the image for you. Aspect ratio is kept. Example `m_500`. NOTE: This option will be discard if w_*width*, h_*height* is provided.

To combine the options, using `,` to separate them. Example: `f_webp,w_1200,h_800`.

### Configuration

Few settings can be change by exporting environment variable.

- `NODE_PORT` Listening port. Default: `9999`
- `UPLOAD_LIMIT` Max upload file size. Default: `1000kb`.
- `UPLOAD_DIR` The directory that will store uploaded file. Default: `./upload`.

## Features

- Support raw POST request and multipart POST request.
- Base error handling.
- The abstraction should allows you changing 3rd party library easily.
- A simple test page.

## What's missing

- Logging
- Passing `options` in query parameters.
- Scripts to build docker image.
- More unit tests
