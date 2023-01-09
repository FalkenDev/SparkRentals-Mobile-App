# Mobile app for SparkRentals Project
## Content
- [About](#about)
- [Download](#download)
- [Usage](#usage)
- [License and Tools](#license-and-tools)
## About
This project is created by 4 students who attend Blekinge Institute of Technology in web programming. We were given the task of creating a system for a scooter company where we would, among other things, create a mobile-adapted web app for the customer, administrative web interface, a simulation program for the electric scooters, an intelligence program in the bicycle and a Rest API that distributes and retrieves information from the entire system and stores the information on a database.

The entire project is available at: https://github.com/FalkenDev/V-Team-SparkRentals

### Background
The mobile app will allow customers to rent electric scooters. Customers may need to log in or register before they can access the service. The app presents a map with all available scooters mapped by their position. In order to be able to rent an electric scooter, the customer needs to deposit money by inserting a prepaid card with a code that contains money to top up their balance. To start a trip with a bicycle, the QR code is scanned or the bicycle is selected on the map. The app also maps all the different parking zones so the user knows where it is best to park the electric scooter after the trip and where the customer is not allowed to park their scooter anywhere.

The app will be built with React Native and retrieve data from our REST API.


<img src="/assets/mobileDesign.png" alt="Mobile App Design" height="400"/>

## Download
### Required environment variables
***.env:***

    # Rest API
    API_KEY='Your API KEY'

***types/env.d.ts***

    declare module '@env' {
    export const API_KEY: 'Your API KEY'
    export const REST_API: 'http://localhost:8393/v1'
    }

### Run it localy
- Fork the project / donwload the project.

>npm install --legacy-peer-deps

- Create .env and types/env.d.ts file and insert the environment variables and change the inputs.

>expo start --tunnel

### Run it on Docker
***OPS! Don't forget to send your env files in docker run command***
> docker run -it oscaridberg/spark-rentals-mobile-app:latest

## Usage
To use the Mobile app you need to scan the qr code or enter the link in the mobile (Need to have the expo app). The link can be found in the terminal when running the mobile app.

## License and Tools
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Mobile-App/badges/quality-score.png?b=dev)](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Mobile-App/?branch=dev) [![Build Status](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Mobile-App/badges/build.png?b=dev)](https://scrutinizer-ci.com/g/FalkenDev/SparkRentals-Mobile-App/build-status/dev)