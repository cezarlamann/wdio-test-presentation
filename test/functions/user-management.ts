import { expect, browser, $ } from "@wdio/globals";
import { Key } from "webdriverio";

export default class UserManagement {
    public async navigateToUserManagement() {
        const link = await $("=Admin");
        await expect(link).toHaveText("Admin");
        await expect(link).toHaveAttribute(
            "href",
            "/web/index.php/admin/viewAdminModule"
        );

        await link.click();
    }

    public async searchUserByUserName(username: string) {
        const userNameLabel = await $("label=Username");
        await userNameLabel.click();
        await browser.keys(Key.Tab);

        const userNameInput = await $(await browser.getActiveElement());
        await userNameInput.setValue(username);

        await browser.keys(Key.Enter);
    }

    public async userExists(username: string) {
        await browser.pause(1000);

        const noRecordsFound = await $("span=No Records Found");

        if (await noRecordsFound.isExisting()) {
            return false;
        }

        const userName = await $(`div=${username}`);
        const result = await userName.isExisting();
        await expect(userName).toHaveText(username);
        return result;
    }

    public async navigateToAddUserPage() {
        await $("button*=Add").click();
        const addUserHeaderText = "Add User";
        const addUserHeader = await $(`h6=${addUserHeaderText}`);

        await expect(addUserHeader).toHaveText(addUserHeaderText);
    }

    public async fillUserCreationForm(
        employeeName: string,
        userName: string,
        role: string,
        status: string = "Enabled"
    ) {
        const dropdownOptionsClass = "div.oxd-select-option";
        const autoCompleteOptionsClass = "div.oxd-autocomplete-option";
        const noRecordsFoundText = "No Records Found";
        const password = dropdownOptionsClass + "123";

        await this.focusOnFieldNextToLabel("User Role");

        const rolesList = await this.getDropdownItemElements(
            dropdownOptionsClass
        );
        const roleElement = await this.GetFirstElementOrDefaultByText(
            role,
            rolesList
        );
        await expect(roleElement).not.toBeNull();
        await roleElement!.click();

        const employeeNameInput = await this.getFocusedInputNextToLabel(
            "Employee Name"
        );
        await employeeNameInput.setValue(employeeName);
        await browser.pause(2000);
        const empNameOptions = await this.getDropdownItemElements(
            autoCompleteOptionsClass
        );
        const notFoundElement = await this.GetFirstElementOrDefaultByText(
            noRecordsFoundText,
            empNameOptions
        );

        await expect(notFoundElement).toBeNull();
        if (notFoundElement != null) {
            return;
        }
        const empNameElement = empNameOptions[0];
        await empNameElement.click();

        await this.focusOnFieldNextToLabel("Status");
        const statusList = await this.getDropdownItemElements(
            dropdownOptionsClass
        );
        const statusElement = await this.GetFirstElementOrDefaultByText(
            status,
            statusList
        );
        await expect(statusElement).not.toBeNull();
        await statusElement!.click();

        const usernameInput = await this.getFocusedInputNextToLabel("Username");
        await usernameInput.setValue(userName);

        const passwordInput = await this.getFocusedInputNextToLabel("Password");
        await passwordInput.setValue(password);

        const confirmPasswordInput = await this.getFocusedInputNextToLabel(
            "Confirm Password"
        );
        await confirmPasswordInput.setValue(password);

        await $('button[type="submit"]').click();
    }

    private async focusOnFieldNextToLabel(labelText: string) {
        const userRoleLabel = await $(`label*=${labelText}`);
        await userRoleLabel.click();
        await browser.keys(Key.Tab);
    }

    private async getFocusedInputNextToLabel(labelText: string) {
        await this.focusOnFieldNextToLabel(labelText);
        return await $(await browser.getActiveElement());
    }

    private async getDropdownItemElements(classSelector: string) {
        return await $$(classSelector).getElements();
    }

    private async GetFirstElementOrDefaultByText(
        text: string,
        array: WebdriverIO.ElementArray
    ): Promise<WebdriverIO.Element | null> {
        const filtered = await array.filter(
            async (f) => (await f.getText()) == text
        );
        if (filtered.length > 0) {
            return filtered[0];
        }
        return null;
    }
}
