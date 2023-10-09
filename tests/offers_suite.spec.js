const { test, expect } = require('@playwright/test');
import { Offers } from '../pages/offers-page';
import { Products } from '../pages/products-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

test('Verify that no offers can be found for current geolocation', async ({ page, context }) => {
    const products_page = new Products(page);
    const offers_page = new Offers(page);
    const common_functions = new CommonFunctions(page);

    context.setGeolocation(test_data.noOfferLocation);

    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);
    await products_page.clickOffers();
    const verify_offers = await offers_page.verifyNoOffers();
    expect(verify_offers).toBeTruthy();
});