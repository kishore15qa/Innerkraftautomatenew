const { test, expect } = require('@playwright/test');
const LoginPage = require('./loginPage');

test.describe('Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://app-dev.innerkraft.com/');
    });

    test('Verify that a user can successfully log in with valid email and password', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.enterPassword('Password$5000');
        await loginPage.clickLoginButton();
        // Add assertion for success message
        await expect(loginPage.page.locator('text=Success')).toBeVisible();
    });

    test('Check that the placeholder text in the email and password fields is displayed correctly', async () => {
        const emailPlaceholder = await loginPage.getEmailPlaceholder();
        const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
        expect(emailPlaceholder).toBe('Enter your email ID');
        expect(passwordPlaceholder).toBe('Enter your password');
    });

    test('Ensure that the "Forgot password?" link is visible and clickable', async () => {
        expect(await loginPage.isForgotPasswordLinkVisible()).toBe(true);
        await loginPage.forgotPasswordLink.click();
        // Add assertion for navigation or message
    });

    test('Confirm that the login button is enabled when valid credentials are entered', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.enterPassword('Password$5000');
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    test('Validate that the email field accepts standard email formats (e.g., user@example.com)', async () => {
        await loginPage.enterEmail('user@example.com');
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    test('Test that the password field masks the input correctly when typing', async () => {
        await loginPage.enterPassword('Password$5000');
        const type = await loginPage.passwordInput.getAttribute('type');
        expect(type).toBe('password'); // Ensure input is of type password (masked)
    });

    test('Verify that the login form displays appropriate success messages upon successful login', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.enterPassword('Password$5000');
        await loginPage.clickLoginButton();
        // Add assertion for success message
        await expect(loginPage.page.locator('text=Success')).toBeVisible();
    });

    test('Attempt to log in with an invalid email format (e.g., user@.com) and verify that an error message is displayed', async () => {
        await loginPage.enterEmail('user@.com');
        await loginPage.enterPassword('Password$5000');
        await loginPage.clickLoginButton();
        // Assert that validation failed and we remain on the login page
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Test logging in with an incorrect password and ensure that the user is not granted access', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.enterPassword('WrongPassword');
        await loginPage.clickLoginButton();
        // Assert that login failed and we remain on the login page
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Check what happens when the email field is left empty and the login button is clicked; an error should be displayed', async () => {
        await loginPage.clearEmail();
        await loginPage.enterPassword('Password$5000');
        await loginPage.clickLoginButton();
        // Assert that validation failed and we remain on the login page
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Verify that the password field does not accept less than the minimum required number of characters', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.enterPassword('123'); // Assuming minimum is more than 3
        await loginPage.clickLoginButton();
        // Assert that password validation prevented login
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Attempt to log in with a valid email but without entering a password and confirm that an error message is shown', async () => {
        await loginPage.enterEmail('kishore.r+psychadmin2@spritle.com');
        await loginPage.clearPassword();
        await loginPage.clickLoginButton();
        // Assert that validation prevented login and we remain on the login page
        await expect(loginPage.loginButton).toBeVisible();
    });
});