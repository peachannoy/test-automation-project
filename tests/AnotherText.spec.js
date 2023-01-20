const {test, expect} = require('@playwright/test');

test("PopUpValidations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");

    //Check visibility
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //PopUp Notification, wird zu jedem Zeitpunkt ausgeführt
    page.on('dialog', dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();

    //Hover
    await page.locator("#mousehover").hover();

    //Childframe-pages 
    const framesPage = page.frameLocator("#courses-iframe");
    framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(' ')[1]);
    
    await page.pause();
})