import Page from "./page";
import { expect } from 'chai';
import testData from "../constants/testData.json";

class SignUp extends Page{

    get createAccountBtn(){
        return $(".sc-1ggrumc-0.kiLfAw");
    }

    get welcomeText(){
        return $(".header>h1")
    }

    get profileEdit(){ 
        return $("input[placeholder='First name']")
    }

    get enteredUn(){
        return $(".MuiInputBase-input.MuiInput-input");
    }

    get email(){
        return $("input[placeholder='Your e-mail']")
    }

    get clickToContinue(){
        return $(".sc-1ggrumc-0.iBHQMB")
    }

    get validClickBtn(){ //Enabled continue button
        return $(".sc-1ggrumc-0.lnHdUD")
    }

    get password(){
        return $(".MuiInputBase-input.MuiOutlinedInput-input")
    }

    get day(){
        return $(".sc-1xf132m-2.iRuHeJ .grid-day .MuiInputBase-root.MuiOutlinedInput-root")
    }

    get selectDay(){
        return $(".MuiList-root:nth-child(1) .MuiButtonBase-root:nth-child(1)")
    }

    get month(){
        return $(".sc-1xf132m-2.iRuHeJ .grid-month .MuiInputBase-root.MuiOutlinedInput-root")
    }

    get year(){
        return $(".sc-1xf132m-2.iRuHeJ .grid-year .MuiInputBase-root.MuiOutlinedInput-root")
    }

    get selectYear(){
        return $(".MuiList-root:nth-child(1) .MuiButtonBase-root:nth-child(3)")
    }

    get validYear(){
        return $(".MuiList-root:nth-child(1) .MuiButtonBase-root:nth-child(10)")
    }

    get profileDetailsPopupCloseIcon(){
        return $(".btn-close")
    }

    get profilesDetailsPopup(){
        return $(".flex-grow-1.text-break.m-0.pe-4.text-info")
    }

    get invaliAge(){
        return $(".MuiFormHelperText-root.helper-text.Mui-error")
    }

    get useragrement(){
        return $(".form .sc-1xf132m-3.dVYxTo:nth-child(1) .c-checkbox .sc-1xaceuu-0.ixWCuU")
    }

    get helloNewUser(){
        return $(".welcome-container>h1")
    }

    get errormsgFirst(){
        return $(".sc-1xf132m-0.jwTiyJ .form div.form-row:nth-child(1) .form-row-2:nth-child(1) .MuiFormControl-root .MuiFormHelperText-root")
    }

    get erromsgLast(){
        return $(".sc-1xf132m-0.jwTiyJ .form div.form-row:nth-child(1) .form-row-2:nth-child(2) .MuiFormControl-root .MuiFormHelperText-root")
    }

    get eyeIcon(){
        return $(".MuiIconButton-label .MuiSvgIcon-root")
    }

    get ageErrorMsg(){
        return $(".MuiFormHelperText-root.helper-text.Mui-error")
    }

    get selectedGender(){
        return $(".ejh0e8-1.kAyvWw");
    }

    get selectedGenderOption(){
        return $(".body>div:nth-child(2) .MuiIconButton-label .ejh0e8-1.cdgWSn");
    }

    get duplicateUnError(){
        return $(".MuiFormHelperText-root.helper-text")
    }

    get twoCharsError(){
        return $(".MuiFormHelperText-root.helper-text");
    }

    get letsgetStartedBtn(){
        return $(".sc-1irzl90-0.gBUZnW")
    }

    get retail(){
        return $(".jsx-2900606428.newsfeed-container")
    }

    get makeLifeEasierHeading(){
        return $(".sc-8pr30j-1.ewefdv .title")
    }

    get addProfilePicHeading(){
        return $(".copy-container .title");
    }

    get phoneVerifyHeading(){
        return $(".sc-8pr30j-1.ewefdv h1")
    }

    get invalidEmail(){
        return $(".body-copy.page-error")
    }

    get invalidUNandPw(){
        return $(".body-copy.page-error")
    }

    get selectGender(){
        return $(".form>div:nth-child(3)");
    }

    randomName() {
        var text = "";
        var prefix = "";
        var alphaNumeric = "a";
        var alphabets = "l";
        for (var i = 0; i < 1; i++)
          text += alphaNumeric.charAt(
            Math.floor(Math.random() * alphaNumeric.length)
        );
        prefix += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
        var ranNum = this.randomNumbers();
        return text + prefix + ranNum;
    }

    signup(){
        browser.url(testData.weshop.homeurl);
        this.createAccountBtn.waitForVisible();
        this.createAccountBtn.click();
        this.welcomeText.waitForVisible();
        expect(this.welcomeText.getText()).to.eql(testData.signup.welcome);
        browser.pause(2000);
        this.firstName.click();
        this.firstName.setValue([testData.signup.firstname,'Enter'])
        this.lastName.click();
        this.lastName.setValue([testData.signup.lastname, 'Enter'])
        var email = testData.signup.email + this.randomName() + "@yopmail.com";
        this.email.click();
        this.email.setValue([email, 'Enter'])
        browser.pause(4000);
        this.clickToContinue.waitForVisible();
        this.clickToContinue.click();
        expect(this.welcomeText.getText()).to.eql(testData.signup.createpassword);
        browser.pause(2000);
        this.password.waitForVisible();
        this.password.click();
        browser.pause(6000);
        this.password.setValue([testData.signup.password, 'Enter'])
        browser.pause(2000);
        expect(this.welcomeText.isVisible()).to.eql(true);
        this.day.waitForVisible();
        this.day.click();
        this.selectDay.waitForVisible();
        this.selectDay.click();
        browser.pause(1000);
        this.month.waitForVisible();
        this.month.click();
        this.selectDay.waitForVisible();
        this.selectDay.click();
        browser.pause(1000);
        this.year.waitForVisible();
        this.year.click();
        this.validYear.waitForVisible();
        this.validYear.click();
        browser.scroll(0,200);
        this.clickToContinue.click();
        browser.pause(6000);
        expect(this.welcomeText.getText()).to.eql(testData.signup.genderStep);
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.form>div:nth-child(3)'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
        );
        this.selectGender.waitForVisible();
        this.selectGender.click();
        this.clickToContinue.waitForVisible();
        this.clickToContinue.click();
        browser.pause(2000);
        expect(this.welcomeText.getText()).to.eql(testData.signup.usernameStep);
        browser.pause(2000);
        this.userName.waitForVisible();
        this.userName.click();
        var username = testData.signup.username + this.randomName();
        this.userName.setValue([username, 'Enter']);
        browser.pause(6000);
        this.clickToContinue.waitForVisible();
        this.clickToContinue.click();
        expect(this.welcomeText.getText()).to.eql(testData.signup.lastStep);
        this.useragrement.waitForVisible();
        this.useragrement.click();
        browser.pause(2000);
        this.clickToContinue.waitForVisible();
        this.clickToContinue.click();
        return email;
    }

    returnEmail(){
        var email = testData.signup.email + this.randomName() + "@maildrop.cc";
        return email;
    }
}

export default new SignUp();