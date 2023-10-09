export class Orders {
    constructor(page) {
        this.page = page;
    }

    async verifyOrder(data) {
        const order_total = parseFloat((await this.page.locator('.order-info span').nth(3).textContent()).substring(1));
        const order_items = await this.page.locator('.a-fixed-left-grid.a-spacing-none');
        
        if (data.orderTotal != order_total)
            return false;

        for (let i = 0; i < Object.keys(data.orderItems).length; i++) {
            const title = (await order_items.nth(i).locator('.a-row').nth(0).textContent()).split('Title: ').pop();
            const price = parseFloat((await order_items.nth(i).locator('.a-row').nth(2).textContent()).substring(1));
            if (title != data.orderItems[i]['itemTitle'])
                return false;
            if (price != data.orderItems[i]['itemPrice'])
                return false;
        }
        return true;
    }
}