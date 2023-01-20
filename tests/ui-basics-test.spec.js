const {test, expect} = require('@playwright/test');


test('First playwright test', async ({browser,page})=>
{
    await page.goto("https://bequalified-gmbh.personio.de/");
    console.log(await page.title());
    await page.locator('#email').type("david.spasow@bequalified.de");
    await page.locator('#password').type("passwort123");
    await page.locator("div[class='_2M5r2']").type("passwort123");
    await page.locator("div[class='_2M5r2']").click();
    console.log(await page.locator("div[class='_3eTCz']").textContent())
});

test('UI Controls', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName= page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    await page.pause();

});

test('Child window', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName= page.locator('#username');


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    await userName.type(domain);
    await page.pause();
})

test('Inspector test', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByRole('button', { name: 'Alle akzeptieren' }).click();
    await page.getByRole('combobox', { name: 'Suche' }).click();
    await page.getByRole('combobox', { name: 'Suche' }).click();
    await page.getByRole('combobox', { name: 'Suche' }).fill('Rahul Shetty academy');
    await page.getByRole('combobox', { name: 'Suche' }).press('Enter');
    await page.getByRole('link', { name: 'Rahul Shetty Academy https://rahulshettyacademy.com' }).click();
    await page.getByRole('link', { name: ' Access to All Courses Grab Life time access to all current and future courses on one single subscription. ' }).click();
  });