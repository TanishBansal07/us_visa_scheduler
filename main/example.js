
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
let maxSessions= process.env.MAX_SESSIONS;
let retryPerSession = process.env.RETRY_PER_SESSION;
let maxTime =process.env.MAX_TIME;
let retryDelay=process.env.RETRY_DELAY;
let sessionDelay = process.env.SESSION_DELAY;
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
  setTimeout(() => {}, 5000);
  let latest_date = await visa.get_available_dates(page);
  setTimeout(() => {}, 5000);
  let time = await visa.get_available_times(page, latest_date);

  let authToken = await page.getAttribute('input[name="authenticity_token"]', 'value');
// Send the POST request
  setTimeout(() => {}, 5000);
//   let response = await page.request.post('https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment', {
//   headers: {
//       accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//       "accept-language": "en-US,en;q=0.9",
//       "cache-control": "max-age=0",
//       "content-type": "application/x-www-form-urlencoded",
//       "sec-ch-ua": "\"Not:A-Brand\";v=\"24\", \"Chromium\";v=\"134\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"Windows\"",
//       "sec-fetch-dest": "document",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "same-origin",
//       "sec-fetch-user": "?1",
//       "upgrade-insecure-requests": "1",
//       Referer: "https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment",
//       "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   form: {
//       "authenticity_token": authToken,
//       "confirmed_limit_message": "1",
//       "use_consulate_appointment_capacity": "true",
//       "appointments[consulate_appointment][facility_id]": "95",
//       "appointments[consulate_appointment][date]": latest_date,
//       "appointments[consulate_appointment][time]": time
//   }
// });

}
sign_in()
