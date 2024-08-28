import LoginPage from "../functions/login";

describe("Orange HRM Login", () => {
    it("should login with valid credentials", async () => {
        await LoginPage.loginWithDefaultAdminCredentials();
    });
});
