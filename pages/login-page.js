export class Login {

    constructor(page) {
        this.page = page;
    }

    async login(username, password) {
        await this.page.locator("#username").click();
        await this.page.locator("#username").type(username);
        await this.page.keyboard.press('Enter');
        await this.page.locator("#password").click();
        await this.page.locator("#password").type(password);
        await this.page.keyboard.press('Enter');
        await this.page.locator("#login-btn").click();
    }

    async getLoginFailMessage() {
        const message = await this.page.locator(".api-error").innerText();
        return message;
    }
        
}