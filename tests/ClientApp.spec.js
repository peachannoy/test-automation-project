const {test, expect} = require('@playwright/test');
const {POManager} = require('./pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("./utils/placeorderTestData")));
const {customtest} = require('./utils/test-base');


for(const data of dataSet){
test.only(`Test ${data.productName}`, async ({page})=>
{
    const products = page.locator(".card-body");
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    await loginPage.goTo("https://rahulshettyacademy.com/client");
    await loginPage.validLogin(data.username, data.password)

    
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.gotoCard();
    await page.locator("div li").nth(0).waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();
    await page.getByRole('button', { name: 'Checkout❯' }).click();
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('Britta Filter');
    await page.locator("[placeholder*='Country']").type("ger", {delay:100})
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " Germany"){
           await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.getByText('mail@britta.de')).toHaveText("mail@britta.de");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //Check ordernumber
    await page.locator("[routerlink*='myorders']").first().click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();
    let orderFoundBool = false;
    for(let i=0;i<orderCount; ++i){
        const currentOrderId = await orders.locator("th").nth(i).first().textContent();
        if(orderId.includes(currentOrderId)){
            orderFoundBool = true;
            await orders.nth(i).locator("button").first().click();
            break;
        }
    }
    expect(orderFoundBool).toBeTruthy();

    await page.pause();

});
}

customtest.only(`Test custom`, async({page, testDataForOrder})=>
{
    console.log(testDataForOrder);
});