const { test, expect } = require('@playwright/test');
import { Login } from '../pages/login-page';
import { Products } from '../pages/products-page';
import { test_data } from '../util/test-data';
import { CommonFunctions } from '../util/common-functions';

test('Verify successful login', async ({ page }) => {
    const common_functions = new CommonFunctions(page);
    const products_page = new Products(page);
    await common_functions.openBrowserAndLogin(test_data.username, test_data.password);
    await expect(await products_page.logoutButton()).toHaveCount(1);
});

test('Verify locked account login details', async ({ page }) => {
    const login_page = new Login(page);
    const common_functions = new CommonFunctions(page);
    await common_functions.openBrowserAndLogin(test_data.usernameLocked, test_data.password);
    expect(await login_page.getLoginFailMessage()).toMatch(/Your account has been locked./);
});