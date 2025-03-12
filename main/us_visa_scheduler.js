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
}
    export { us_visa };