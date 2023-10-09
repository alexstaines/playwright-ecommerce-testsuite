export class Products {

    constructor(page) {
        this.page = page;
    }

    async open() {
        await this.page.goto("https://bstackdemo.com/");
        //await expect(page).toHaveTitle(/StackDemo/);
    }

    // Navbar =====================================================================

    async clickSignIn() {
        await this.page.locator("#signin").click();
    }

    async logoutButton() {
        return await this.page.locator("#logout");
    }

    async clickSignOut() {
        await this.page.locator("#logout").click();
    }

    async clickLogo() {
        await this.page.locator("a[href='/']").click();
    }

    async clickOffers() {
        await this.page.locator("#offers").click();
    }

    async clickOrders() {
        await this.page.locator("#orders").click();
    }

    async clickFavourites() {
        await this.page.locator("#favourites").click();
    }

    // Shelf container ===========================================================

    async selectOrderBy(sort) {
        // option values: lowestprice | highestprice
        await this.page.locator(".sort select").selectOption(sort);
    }

    async viewCart() {
        await this.page.locator(".bag.bag--float-cart-closed").click();
    }

    async addToCart(product) {
        const product_label = await this.page.getByText(product, { exact: true });
        //get parent from product label
        const product_item = await this.page.locator('.shelf-item').filter({ has: product_label });
        await product_item.locator(".shelf-item__buy-btn").click();
    }

    async waitSpinner() {
        await this.page.locator('.spinner').waitFor({ state: 'hidden' });
    }

    async favourite_item(product) {
        const shelf_item = await this.page
            .locator('.shelf-item')
            .filter({ has: this.page.getByText(product, { exact: true }) });

        //click delay added, as default is flaky. Default potentially too fast for favourite button.
        await shelf_item.locator('.MuiButtonBase-root').click({ delay: 150 });
        await shelf_item.locator('.clicked').waitFor();
    }

    async verifySort(sort) {
        const price_int = await this.page.locator('.shelf-item .val b').allTextContents();
        const price_fraction = await this.page.locator('.shelf-item .val span').allTextContents();
        //concat e.g. "399" and ".00" 
        const prices = price_int.map((e, i) => parseFloat(e.concat(price_fraction[i])));
        if (sort == "highestprice") {
            return prices.every((e, i) => {
                if (i===0) return true;
                return e <= prices[i-1];
            });
        } else if (sort == "lowestprice") {
            return prices.every((e, i) => {
                if (i===0) return true;
                return e >= prices[i-1];
            });
        } else {
            return false;
        }
    }

    // Cart ======================================

    async clickCartCheckout() {
        await this.page.getByText("Checkout", { exact: true }).click();
    }

    async removeCartItem(product) {
        const shelf_item = await this.page.locator(".float-cart__shelf-container > .shelf-item", { has: this.page.getByText(product, { exact: true }) });
        await shelf_item.locator(".shelf-item__del").click();

        const product_count = await this.page
            .locator(".float-cart__shelf-container")
            .getByText(product, { exact: true })
            .count();
        return product_count == 0;
    }

    async changeProductQty(product, qty, change) {
        const titles = await this.page.locator(".shelf-item__details > p[class='title']");
        const title = await titles.getByText(product, { exact: true });
        const shelf_item = await title.locator('xpath=../..');
        if (change == "ADD") {
            for (let i = 0; i < qty; i++) {
                await shelf_item.getByText("+").click();
            }
        } else if (change == "REMOVE") {
            for (let i = 0; i < qty; i++) {
                await shelf_item.getByText("-").click();
            }
        } else {
            return false;
        }
    }

    async verifyCartTotal() {
        const cart_totals = await this.page.locator('.shelf-item__price > p');
        const cart_qtys = await this.page.locator(".shelf-item__details > p[class='desc']");
        const cart_total = await this.page.locator('.sub-price__val');
        const count = await cart_totals.count();
        let total = 0;

        for (let i = 0; i < count; i++) {
            // multiply qty by price
            const price = parseFloat((await cart_totals.nth(i).textContent()).substring(2));
            const qty_text_count = (await cart_qtys.nth(i).textContent()).length;
            total += price * parseFloat((await cart_qtys.nth(i).textContent()).substring(qty_text_count - 1));
        }
        return total == parseFloat((await cart_total.textContent()).substring(2));
    }

    async closeCart() {
        await this.page.locator(".float-cart__close-btn").click();
    }
}