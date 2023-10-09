const { test, expect } = require('@playwright/test');
import { Products } from '../pages/products-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

test('Verify bag add, adjust qty, remove, cart total, and checkout', async ({ page }) => {
    const products_page = new Products(page);
    const common_functions = new CommonFunctions(page);

    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);

    await products_page.addToCart("iPhone 12");
    await products_page.addToCart("iPhone 12 Mini");
    await products_page.changeProductQty("iPhone 12", 3, "ADD");
    await products_page.changeProductQty("iPhone 12", 1, "REMOVE");
    
    const item_removed = await products_page.removeCartItem("iPhone 12 Mini");
    expect(item_removed).toBeTruthy();

    const cart_totals = await products_page.verifyCartTotal();
    expect(cart_totals).toBeTruthy();

    await products_page.closeCart();
    await products_page.viewCart();
    await products_page.clickCartCheckout();
    await expect(page).toHaveURL(/.checkout/);
});