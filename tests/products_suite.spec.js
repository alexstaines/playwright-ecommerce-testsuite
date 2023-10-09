const { test, expect } = require('@playwright/test');
import { Products } from '../pages/products-page';


test('Verify product sort', async ({ page }) => {
    const products_page = new Products(page);
    await products_page.open();

    await products_page.selectOrderBy("highestprice");
    await products_page.waitSpinner();
    let verify_sort = await products_page.verifySort("highestprice");
    expect(verify_sort).toBeTruthy();

    await products_page.selectOrderBy("lowestprice");
    await products_page.waitSpinner();
    verify_sort = await products_page.verifySort("lowestprice");
    expect(verify_sort).toBeTruthy();
});