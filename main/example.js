
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
  const response = await context.request.get(
    'https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment/days/95.json?appointments[expedite]=false',
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Not:A-Brand";v="24", "Chromium";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
    
        'x-requested-with': 'XMLHttpRequest',
        Referer: 'https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    }
  );
  let date = await response.json();
  date = date[0].date;
  console.log(date);
  const respons = await context.request.get(
    `https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment/times/95.json?date=${date}appointments[expedite]=false`,
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'if-none-match': 'W/"62dd646c2a044710db761d074d0c5953"',
        'sec-ch-ua': '"Not:A-Brand";v="24", "Chromium";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrf-token': '9jmEwwf+43hJuCDBe18Cwk26kHzyKx1ZIEpJ2S7SZeHVQSFu449RJIezch6X9ir+6yejfh+/RFvapzHhoqIMsA==',
        'x-requested-with': 'XMLHttpRequest',
        Referer: 'https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    }
  );
  let time = await respons.json();
  time = time.available_times[0];
  console.log(time);
};

sign_in()
