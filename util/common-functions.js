import { Login } from '../pages/login-page';
import { Products } from '../pages/products-page';

export class CommonFunctions {
    constructor(page) {
        this.page = page;
    }

    async openBrowser() {
        const products_page = new Products(this.page);
        await products_page.open();
    }

    async openBrowserAndLogin(username, password) {
        const products_page = new Products(this.page);
        const login_page = new Login(this.page);
        await products_page.open();
        await products_page.clickSignIn();
        await login_page.login(username, password);
    }
}