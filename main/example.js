
import process from 'process';
import { us_visa } from './us_visa_scheduler.js';
import dotenv from 'dotenv';
import { chromium } from 'playwright'
dotenv.config();
let userEmail = process.env.USER_EMAIL;
let userPassword = process.env.USER_PASSWORD;
let userCountryCode = process.env.USER_COUNTRY_CODE;
let userConsulate = process.env.USER_CONSULATE;
let signInLink = process.env.SIGN_IN_LINK;
console.log('USER_EMAIL:', process.env.USER_EMAIL);
console.log('USER_PASSWORD:', process.env.USER_PASSWORD);
console.log('USER_COUNTRY_CODE:', process.env.USER_COUNTRY_CODE);
console.log('USER_CONSULATE:', process.env.USER_CONSULATE);
console.log('SIGN_IN_LINK:', process.env.SIGN_IN_LINK);

async function sign_in () {
  
  const browser = await chromium.launch({ headless: false }); // Set headless to false if you want to see the browser
  const context = await browser.newContext();
  const page = await context.newPage();
  let visa = new us_visa(signInLink, userEmail, userPassword, userCountryCode, userConsulate);
  await visa.sign_in(page);
  await visa.go_to_appointment_page(page);
  let latest_date = await visa.get_available_dates(page);
  let time = await visa.get_available_times(page, latest_date);
};

sign_in()
