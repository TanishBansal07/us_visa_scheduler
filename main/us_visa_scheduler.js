class us_visa {
    constructor(sign_in_link,email,password,user_countryCode,userConsulate) {
      this.sign_in_link = sign_in_link;
      this.email = email;
      this.password = password;
      this.country_code = user_countryCode;
      this.userConsulate = userConsulate;
  
    }
    async sign_in(page) {
      await page.goto(this.sign_in_link);
      await page.getByRole('textbox', { name: 'Email *' }).fill(this.email);
      await page.getByRole('textbox', { name: 'Password' }).fill(this.password);
      await page.locator('label').filter({ hasText: 'I have read and understood' }).locator('div').check()
      await page.getByRole("Button", {name:'Sign in'}).click()
  
    }
    async go_to_appointment_page(page) {
        await page.getByRole('link', { name: 'Continue' }).click()
        await page.getByRole('tab', { name: ' Reschedule Appointment' }).click()
        await page.getByRole('link', { name: 'Reschedule Appointment' }).click()

  }
  async get_available_dates(page) {
    const available_dates = await page.request.get(
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
    let data = await available_dates.json();
    let latest_date = data[0].date;
    // console.log(latest_date);
    return latest_date;
  }
  async get_available_times(page,latest_date) {
    let available_times = await page.request.get(
      `https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment/times/95.json?date=${latest_date}appointments[expedite]=false`,
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
          'x-requested-with': 'XMLHttpRequest',
          Referer: 'https://ais.usvisa-info.com/en-ca/niv/schedule/66236035/appointment',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      }
    );
    let time = await available_times.json();
    time = time.available_times[0];
    // console.log(time);
    return time;
  }
}
    export { us_visa };