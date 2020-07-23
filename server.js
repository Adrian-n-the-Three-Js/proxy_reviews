const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const httpProxy = require('http-proxy');
const port = 3000;
const apiProxy = httpProxy.createProxyServer();

const calendarServer = 'http://calendar-304481554.us-east-2.elb.amazonaws.com';
// const photosServer = 'http://ec2-18-217-154-181.us-east-2.compute.amazonaws.com/';
const photosServer = 'http://54.219.179.19';
// const aboutServer = 'http://ec2-54-241-67-8.us-west-1.compute.amazonaws.com/';
const aboutServer = 'http://54.215.236.205';
const reviewsServer = 'http://54.193.182.157';

app.use('/:id', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CALENDAR

app.all('/api/calendar/db/*', (req, res) => {
  console.log('redirecting to calendar server');
  apiProxy.web(req, res, { target: calendarServer, changeOrigin: true });
});

// PHOTOS

app.all('/api/*/photos', (req, res) => {
  console.log('redirecting to photos-carousel server');
  apiProxy.web(req, res, { target: photosServer, changeOrigin: true });
});

// ABOUT
app.all('/api/photos/*', (req, res) => {
  console.log('redirecting to about server');
  apiProxy.web(req, res, { target: aboutServer, changeOrigin: true });
});

// REVIEWS
app.all('/*/reviews', (req, res) => {
  console.log('redirecting to reviews server');
  apiProxy.web(req, res, { target: reviewsServer, changeOrigin: true });
});

// ALL
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server is running at port ${port}`));