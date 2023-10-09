const { test, expect } = require('@playwright/test');
import { Checkout } from '../pages/checkout-page';
import { Favourites } from '../pages/favourites-page';
import { Orders } from '../pages/orders-page';
import { Products } from '../pages/products-page';
import { Offers } from '../pages/offers-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

//test.describe.configure({ mode: 'parallel' });

test('Verify end-to-end user journey', async ({ page, context }) => {
    const common_functions = new CommonFunctions(page);
    const products_page = new Products(page);
    const favourites_page = new Favourites(page);
    const checkout_page = new Checkout(page);
    const offers_page = new Offers(page);
    const orders_page = new Orders(page);
    context.setGeolocation(test_data.noOfferLocation);
    context.setDefaultTimeout(60000);

    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);
    await expect(await products_page.logoutButton()).toHaveCount(1);
    await products_page.clickOffers();
    const verify_offers = await offers_page.verifyNoOffers();
    expect(verify_offers).toBeTruthy();

    await products_page.clickLogo();

    await products_page.selectOrderBy("highestprice");
    await products_page.waitSpinner();
    let verify_sort = await products_page.verifySort("highestprice");
    expect(verify_sort).toBeTruthy();
    await products_page.selectOrderBy("lowestprice");
    await products_page.waitSpinner();
    verify_sort = await products_page.verifySort("lowestprice");
    expect(verify_sort).toBeTruthy();

    await products_page.favourite_item("iPhone 12");
    await products_page.favourite_item("iPhone 12 Mini");
    await products_page.clickFavourites();
    let check_favourites_page = await favourites_page.verifyFavourites("iPhone 12");
    expect(check_favourites_page).toBeTruthy();
    await favourites_page.unfavouriteItem("iPhone 12");
    check_favourites_page = await favourites_page.verifyFavourites("iPhone 12");
    expect(check_favourites_page).toBeFalsy();

    await products_page.clickLogo();

    await products_page.addToCart("iPhone 12");
    await products_page.addToCart("iPhone 12 Mini");
    await products_page.addToCart("Galaxy S20 Ultra");
    await products_page.changeProductQty("iPhone 12", 3, "ADD");
    await products_page.changeProductQty("iPhone 12", 1, "REMOVE");
    const item_removed = await products_page.removeCartItem("Galaxy S20 Ultra");
    expect(item_removed).toBeTruthy();
    const cart_totals = await products_page.verifyCartTotal();
    expect(cart_totals).toBeTruthy();

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


