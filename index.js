#!/usr/bin/env node

const axios = require('axios');
const {getCode} = require('country-list');

const arg = process.argv.slice(2);
const country = getCode(arg[0]);
let year = new Date().getFullYear();

if (arg.length > 1){
    year = arg[1];
}

const url = (countryCode, year) => {
    const url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`;
    return url;
};

const getHolidays = async () => {
    try {
        const response = await axios.get(url(country, year));
        let dayOff = response.data;
        dayOff.forEach(holiday => {
            console.log(`${holiday.date} (${holiday.name})`);
        })
    } catch (err) {
        console.error(err);
    }
};

getHolidays();