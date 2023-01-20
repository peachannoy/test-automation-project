const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "mail@britta.de", userPassword: "Password1*"}
const orderPayLoad = {orders:[{country:"Germany",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
let orderId;
let apiUtils;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayLoad);
    orderId =await apiUtils.createOrder(orderPayLoad);
});

test('Abort Network Calls', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await apiUtils.getToken())
    page.route("**/*.{jpg,png,jpeg}", route=> route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    

    await page.pause();

});

test('Screenshot', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "partialscreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.png"});
    await expect(page.locator("displayed-text")).toBeHidden();
})

test('Fake Answer', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await apiUtils.getToken())

    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63c56c2a568c3e9fb1f950d3",
    async route=>
    {
        //intercepting
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                response,
                body,
            }
        )
    });
    await page.pause();
    //Check ordernumber
    await page.locator("[routerlink*='myorders']").first().click();
    

    await page.pause();
});