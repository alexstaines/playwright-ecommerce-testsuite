export class Checkout {

    constructor(page) {
        this.page = page;
    }

    async enterShipping(data) {
        await this.page.locator("#firstNameInput").type(data.fname);
        await this.page.locator("#lastNameInput").type(data.lname);
        await this.page.locator("#addressLine1Input").type(data.address);
        await this.page.locator("#provinceInput").type(data.province);
        await this.page.locator("#postCodeInput").type(data.postcode);
    }

    async clickSubmitShipping() {
        await this.page.locator('#checkout-shipping-continue').click();
    }

    async getOrderDetails() {
        let data = {
            orderNumber: await this.page.locator('.checkout-form strong').textContent(),
            orderItems: [],
            orderTotal: parseFloat((await this.page.locator('.cart-priceItem-value span').textContent()).substring(1))
        }
        const productItems = await this.page.locator('.productList-item');
        for (let i = 0; i < (await productItems.count()); i++) {
            const title = await productItems.nth(i).locator('.product-title').textContent();
            const price = parseFloat((await productItems.nth(i).locator('.product-price').textContent()).substring(1));
            data.orderItems.push({'itemTitle': title, 'itemPrice': price});
        }
        return data;
    }

    async clickContinueShopping() {
        await this.page.locator('.button').click();
    }
}
