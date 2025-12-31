class LoginPage {
    constructor(page) {
        this.page = page;
    }

    get emailInput() {
        return this.page.locator('input[name="email"]');
    }

    get passwordInput() {
        return this.page.locator('input[name="password"]');
    }

    get loginButton() {
        return this.page.locator('button[type="submit"]');
    }

    get forgotPasswordLink() {
        return this.page.locator('text=Forgot password?');
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isLoginButtonEnabled() {
        return await this.loginButton.isEnabled();
    }

    async isForgotPasswordLinkVisible() {
        return await this.forgotPasswordLink.isVisible();
    }

    async getEmailPlaceholder() {
        return await this.emailInput.getAttribute('placeholder');
    }

    async getPasswordPlaceholder() {
        return await this.passwordInput.getAttribute('placeholder');
    }

    async clearEmail() {
        await this.emailInput.fill('');
    }

    async clearPassword() {
        await this.passwordInput.fill('');
    }
}
  module.exports = LoginPage;
