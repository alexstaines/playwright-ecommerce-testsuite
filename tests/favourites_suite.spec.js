const { test, expect } = require('@playwright/test');
import { Favourites } from '../pages/favourites-page';
import { Products } from '../pages/products-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

test('Verify products and favourites pages, product favourite and unfavourite visibility', async ({ page }) => {
    const products_page = new Products(page);
    const favourites_page = new Favourites(page);
    const common_functions = new CommonFunctions(page);

    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);

    await products_page.favourite_item("iPhone 12");
    await products_page.favourite_item("iPhone 12 Mini");
    await products_page.clickFavourites();

    let check_favourites_page = await favourites_page.verifyFavourites("iPhone 12");
    expect(check_favourites_page).toBeTruthy();

    await favourites_page.unfavouriteItem("iPhone 12");

    check_favourites_page = await favourites_page.verifyFavourites("iPhone 12");
    expect(check_favourites_page).toBeFalsy();
    
    await products_page.clickSignOut();
});