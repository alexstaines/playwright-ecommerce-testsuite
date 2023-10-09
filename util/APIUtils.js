export class APIUtils {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(loginData) {
        const loginResponse = await this.apiContext.post("https://bstackdemo.com/api/signin", {
            data: loginData
        });
        expect(loginResponse.ok()).toBeTruthy();
        //mock site does not use authenticate token. API testing using login token not possible
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token
    }
}