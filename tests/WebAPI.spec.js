const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "mail@britta.de", userPassword: "Password1*"}
const orderPayLoad = {orders:[{country:"Germany",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
let orderId;
let apiUtils;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayLoad);
    orderId =await apiUtils.createOrder(orderPayLoad);
    console.log(orderId)
});


test('Test', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await apiUtils.getToken())

    await page.goto("https://rahulshettyacademy.com/client");
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