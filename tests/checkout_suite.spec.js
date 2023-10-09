const { test, expect } = require('@playwright/test');
import { Checkout } from '../pages/checkout-page';
import { Orders } from '../pages/orders-page';
import { Products } from '../pages/products-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

test('Verify order processed and present under orders page', async ({ page }) => {
    const products_page = new Products(page);
    const checkout_page = new Checkout(page);
    const orders_page = new Orders(page);
    const common_functions = new CommonFunctions(page);

    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);
    await products_page.addToCart("iPhone 12");
    await products_page.addToCart("iPhone 12 Mini");
    await products_page.clickCartCheckout();

    await checkout_page.enterShipping(test_data.shippingData);
    await checkout_page.clickSubmitShipping();
    const order_details = await checkout_page.getOrderDetails();
    await checkout_page.clickContinueShopping();

    await products_page.clickOrders();

    const order_verify = await orders_page.verifyOrder(order_details);
    expect(order_verify).toBeTruthy();

    await products_page.clickSignOut();
});