export class Favourites {
    constructor(page) {
        this.page = page;
    }

    async unfavouriteItem(product) {
        await this.page
            .locator('.shelf-item')
            .filter({ has: this.page.getByText(product, { exact: true }) })
            .locator('.MuiButtonBase-root').click();
    }

    async verifyFavourites(product) {
        return await this.page.getByText(product, { exact: true }).count() == 1;
    }
}