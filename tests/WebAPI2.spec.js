const {test, expect} = require('@playwright/test');
let webContext;
test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').type("mail@britta.de");
    await page.locator('#userPassword').type("Password1*"); 
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

    
})

test('Test', async ()=>
{
    const productName = 'iphone 13 pro';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const count = await products.count()
    for(let i=0; i < count; i++){
        if(await products.nth(i).locator("b").textContent() == productName){
            await products.nth(i).locator("button").nth(1).click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
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