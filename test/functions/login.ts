import { expect, browser, $ } from "@wdio/globals";

export default class LoginPage {
    public static async loginWithCredentials(user: string, password: string) {
        await browser.url("/");

        await $('input[name="username"]').setValue(user);
        await $('input[name="password"]').setValue(password);
        await $('button[type="submit"]').click();

        await expect($(".oxd-userdropdown")).toBeExisting();
    }

    public static async loginWithDefaultAdminCredentials(): Promise<void> {
        await this.loginWithCredentials("Admin", "admin123");
    }
}
