class DashboardPage{

    constructor(page)
     {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

     }

     async searchProduct(productName)
     {
        const titles = await this.productsText.allTextContents();
        const count = await this.products.count()
    for(let i=0; i < count; i++){
        if(await this.products.nth(i).locator("b").textContent() == productName){
            await this.products.nth(i).locator("button").nth(1).click();
            break;
        }
    }

     }

     async gotoCard()
     {
        await this.page.locator("[routerlink*='cart']").click();
    }
}
module.exports = {DashboardPage}