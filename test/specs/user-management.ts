import LoginPage from "../functions/login";
import UserManagement from "../functions/user-management";

describe("User Administration Page tests", () => {
    const umPage = new UserManagement();

    beforeAll(async () => {
        await LoginPage.loginWithDefaultAdminCredentials();
    });

    beforeEach(async () => {
        await umPage.navigateToUserManagement();
    });

    it("Search for an existing user", async () => {
        const username = "Admin";
        await umPage.searchUserByUserName(username);
        const result = await umPage.userExists(username);

        await expect(result).toBeTrue();
    });

    it("Search for an inexisting user and navigate to add user page", async () => {
        const employeeName = await $(".oxd-userdropdown-name").getText();
        const username = employeeName.replaceAll(" ", "") + "_" + Math.random();
        await umPage.searchUserByUserName(username);
        let result = await umPage.userExists(username);

        await expect(result).toBeFalse();
        if (result) {
            return;
        }

        await umPage.navigateToAddUserPage();

        await umPage.fillUserCreationForm(employeeName, username, "ESS");
        await browser.pause(1000);
        await umPage.navigateToUserManagement();
        await umPage.searchUserByUserName(username);
        result = await umPage.userExists(username);

        await expect(result).toBeTrue();
        if (!result) {
            return;
        }
    });
});
