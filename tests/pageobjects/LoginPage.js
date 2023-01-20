class LoginPage{

    constructor(page)
     {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
     }

     async validLogin(username, password)
     {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
     }

     async goTo(url)
     {
        await this.page.goto(url);
     }
}
module.exports = {LoginPage}