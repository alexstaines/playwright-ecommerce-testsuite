export class Offers {
    constructor(page) {
        this.page = page;
    }

    async verifyNoOffers() {
        await this.page
            .getByText("We've promotional offers in your location.", { exact: true })
            .waitFor({ state: "hidden" });

        const offers = await this.page
            .getByText("Sorry we do not have any promotional offers in your city.", { exact: true })
            .count();

        return offers == 1;
    }
}