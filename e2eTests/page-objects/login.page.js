import Page from "./page";
import { expect } from 'chai';
import testData from "../constants/testData.json";
import homePage from "../page-objects/home.page.js";
import newsFeed from '../page-objects/newsfeed.page';
import gmail from '../page-objects/gmail.page'


class Login extends Page{

    get logInPageBtn(){
        return $(".sc-1v1uga8-10.gUkcAx.navigation-buttons .sc-1ggrumc-0.iuuklY .sc-1v1uga8-7.cObbhT");
    }

    get emailOrUsername(){
        return $("input[placeholder='Email address or username']")
    }

    get password(){
        return $("input[placeholder='Password']");
    }

    get pwdAfterEntered(){
        return $(".MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd")
    }

    get clickToContinueBtn(){
        return $(".sc-1ggrumc-0.lnHdUD");
    }

    get peopleYouMayKnow(){
        return $(".u4v11l-2.kcwxTJ")
    }

    get continueBtn(){
        return $$(".small-only")
    }

    get aaqCaption(){
        return $("#captionTextarea")
    }

    get resetContinueBtn(){
        return $(".sc-1ggrumc-0.kuCdAe");
    }

    get setting(){
        return $(".settings-button-small");
    }

    get logOut(){
        return $(".white-wrapper:nth-child(2) .ocus78-1.eTeGUs.dark:nth-child(12)")
    }

    get welcomeText(){
        return $(".header >h1")
    }

    settingPage(index){
        return $(`.ocus78-1.eTeGUs.accent:nth-child(${index})`)
    }

    get transactionRadioBtn(){
        return $(".MuiFormControlLabel-root.ljb5s6-1.eUviHN.MuiFormControlLabel-labelPlacementStart.Mui-disabled .MuiSwitch-root.ljb5s6-0.fDHWjM")
    }

    get forgotPwField(){
        return $("input[placeholder='Your email address']")
    }

    get homePage(){
        return $(".section-title")
    }

    get accountSettingLabel(){
        return $(".sc-1etxv8z-0.jtnmbR.settings-section>h1")
    }

    get logInDetails(){
        return $(".sc-1x1x871-0 .w9h3q4-0.kbYroH.icon")
    }

    get emailaddress(){
        return $("input[placeholder='email@email.com']")
    }

    get backBtn(){
        return $(".link .MuiSvgIcon-root")
    }

    get changePw(){
        return $("input[placeholder='Enter new password']")
    }
 
    get chnageEmail(){  //Disabled email button
        return $(".sc-1etxv8z-0.jtnmbR.settings-section form:nth-child(2) > div:nth-child(4) .sc-56f71l-0.bBbvaW")
    }

    get changePass(){  //Disabled password button
        return $(".sc-1etxv8z-0.jtnmbR.settings-section form:nth-child(3)  .sc-56f71l-0.bBbvaW")
    }

    get repeatPw(){
        return $("input[placeholder='Repeat new password']")
    }

    get changePwBtn(){
        return $(".sc-56f71l-0.iaChRu")
    }

    get chnageEmailBtn(){
        return $(".MuiPaper-root:nth-child(3) .MuiAccordionDetails-root .sc-1wjn1q5-2:nth-child(1) .MuiButton-label")
    }

    get deactivateAccount(){
        return $(".sc-1x1x871-0.gHedX .w9h3q4-0.dHziTN.icon")
    }

    get deactivateOption(){
        return $(".white-wrapper:nth-child(2) .ocus78-1.eTeGUs.dark:nth-child(11)")
    }

    get deactivateBtn(){
        return $(".ctahve-0.cbqGim")
    }

    get confirmDeactivateBtn(){
        return $(".sc-56f71l-0.iaChRu:nth-child(1)")
    }

    get cookieBtn(){
        return $(".sc-1cwhfm1-1.eWnqOl.styled-button-wrapper .MuiButton-label")
    }

    get editProfileInfo(){
        return $(".full-text")
    }

    get visitProfile(){
        return $(".ocus78-1.eTeGUs.accent.mobile-component")
    }

    get editProfileHeading(){
        return $(".diihmy-2.TzjXq.settings-section>h1")
    }

    get changePhoto(){
        return $(".sc-9w5sn9-3.eYSOsN")
    }

    get saveBtnOnProfile(){
        return $(".dialog-content .buttons .save .MuiButtonBase-root.MuiButton-root > .MuiButton-label")
    }

    get editProfile(){
        return $(".MuiButtonBase-root.MuiIconButton-root.ks5vpi-13")
    }

    get firstName(){
        return $(".MuiFormControl-root.MuiTextField-root.sc-81oy72-0.kOYlWr .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-fullWidth > input.MuiInputBase-input.MuiOutlinedInput-input")
    }

    get lastName(){
        return $(".form-row:nth-child(5) .MuiFormControl-root.MuiTextField-root .MuiInputBase-root > input.MuiInputBase-input.MuiOutlinedInput-input")
    }

    get saveChangeBtn(){
        return $(".sc-1cwhfm1-1.iYrMDW.styled-button-wrapper:nth-child(1) .MuiButtonBase-root:nth-child(1) .MuiButton-label")
    }

    get posts(){
        return $(".sc-14p0gny-1.jBnCZP:nth-child(1)")
    }

    get wishLists(){
        return $(".sc-14p0gny-1.jBnCZQ:nth-child(2)")
    }

    get followers(){
        return $(".sc-14p0gny-1.jBnCZQ:nth-child(3)")
    }

    get following(){ 
    return $(".sc-14p0gny-1.jBnCZQ:nth-child(4)")
    }

    get profileDetails(){
        return $(".gs61pw-0.kEbIaA .MuiPaper-root .MuiSnackbarContent-message.message")
    }

    get followingLabel(){
        return $(".MuiTypography-root.sc-1nn4qnz-1")
    }

    get chnageEmailaddress(){
        return $(".credentionals-section.settings-section form:nth-child(2) > h3:nth-child(1)")
    }

    get postslabel(){
        return $(".sc-19teajy-2.daVcHg")
    }

    get wishlistlabel(){
        return $(".xm759p-1.YtuzD")
    }

    get followersLabel(){
        return $(".MuiTypography-root.sc-1nn4qnz-1")
    }

    get resetPasswordLabel(){
        return $(".form-row .reset-link")
    }

    get yopmail(){
        return $("input[placeholder='Enter your inbox here']")
    }

    get setNewPwd(){
        return $(".yscrollbar:nth-child(2) tr:nth-child(1) td:nth-child(1) a:nth-child(1) span:nth-child(1) > b:nth-child(1)")    
    }

    pass(index){
        return $(`.content-container .form-row:nth-child(${index}) input`)
    }

    get success(){
        return $(".sc-1l4kr5a-0.bLfmnt >h1")
    }

    get confirmPopup(){
        return $(".body .body-copy")
    }

    get hereLink(){
       return $(".body .body-copy > a ")
    }

    get userName(){
       return $(".name-username .name")
    }

    get clearTextUn(){
        return $("input[placeholder='@natacha-oceane']");
    }

    get peopleIcon(){
        return $(".mfiyyj-0.hSJwqF")
    }

    get setNewEmail(){
        return $("//*[text()='Confirm your email address']")
    }

    get pwErrorMsg(){
        return $(".MuiFormHelperText-root.helper-text");
    }

    get cookieBtn(){
        return $(".accept")
    }

    get emailAddress(){
        return $(".white-wrapper .sc-1etxv8z-0.jtnmbR.settings-section>form:nth-child(2) >h3")
    }

    get pwdText(){
        return $(".header>h1")
    }

    errorMsgOfProfile(index){
        return $(`.form-row:nth-child(${index}) .MuiFormHelperText-root.helper-text.MuiFormHelperText-contained.Mui-error.MuiFormHelperText-filled`);
    }

    profileOptions(index){ //Followers, Following, Posts, Questions, Wishlists
        return $(`.user-info-counts:nth-child(2) .count:nth-child(${index}) .number:nth-child(1)`)
    }

    yourInterestsOptions(index){
        return $(`.diihmy-3.bzfXVz .MuiFormControlLabel-root:nth-child(${index})`)
    }

    get post(){ //In "Posts"
       return $(".sc-1mu0syi-1.dVdpBC:nth-child(1)")
    }

    get question(){
        return $(".sc-46bwpg-0.fNShBN:nth-child(1)")
    }

    get followingCount(){
        return $(".user-info-counts:nth-child(2) .count:nth-child(2) .number:nth-child(1)")
    }

    get followerHeading(){
        return $(".followers-wrapper>h1")
    }

    get intro(){
        return $(".MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline");
    }

    get saveBtn(){ //Disabled save button
        return $(".sc-56f71l-0.bBbvaW.blue")
    }

    get saveBtnEnabled(){  //Enabled save button
        return $(".sc-56f71l-0.iaChRu.blue")
    }

    followerUsers(index){ 
        return $(`.white-wrapper .followers-wrapper ul:nth-child(2) li:nth-child(${index}) > .followers-list`)
    }

    get profileImg(){ //Profile image on newsfeed page
        return $(".sc-1v1uga8-0 .nav-main .sc-1v1uga8-8 .mfiyyj-3> img.mfiyyj-0")
    }

    get profilePage(){
        return $(".b9xfa1-0.gBarNF .name");
    }

    get profileDetailsPopup(){
        return $(".MuiSnackbarContent-message.message")
    }

    get unfollowBtn(){
        return $(".sc-7rqm9q-1.boUzQl .sc-7rqm9q-0.eZZypw:nth-child(1) .sc-56f71l-0.iaChRu.blue")
    }

    get postARecommendBtn(){
        return $(".no-posts-view .hy4rz0-0.gCuAwB >a")
    }

    get wishlistCount(){
        return $(".left-column .sc-1ldthaf-0.jFUhUQ .count:nth-child(3) > .number")
    }

    get settingBtnOnProfile(){
        return $(".sc-9j83u1-1.xdx9mf-0.uGjeU.jdnclC .user-info-main button.settings-button-small > img:nth-child(1)")
    }

    get backBtn(){
        return $(".sc-9jt9lg-0.eiUGAE .link")
    }
    
    login(email,password){
        browser.pause(2000);
        browser.url(testData.weshop.homeurl);
        if(this.cookieBtn.isVisible()){
            this.cookieBtn.click();
        }
        expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
        this.logInPageBtn.waitForVisible();
        this.logInPageBtn.click();
        browser.pause(4000);
        this.emailOrUsername.waitForVisible();
        this.emailOrUsername.click();
        this.emailOrUsername.setValue(email);
        this.password.waitForVisible();
        this.password.click();
        this.password.setValue(password);
        browser.scroll(0,200);
        browser.pause(4000);
        this.clickToContinueBtn.waitForVisible();
        this.clickToContinueBtn.click();
    }
    
    logout(){
        browser.pause(2000);
        this.setting.waitForVisible();
        this.setting.click();
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.white-wrapper:nth-child(2) .ocus78-1.eTeGUs.dark:nth-child(12)'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
          );
        this.logOut.waitForVisible();
        this.logOut.click();
        homePage.welcome.waitForVisible();
        expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
    }
    
    resetEmail() {
        var emailReset = testData.signup.resetEmail + this.randomName() + "@yopmail.com";
        return emailReset;
    }

    previousEmail(){
        var previousEmail = testData.signup.previousEmail + this.randomName() + "@yopmail.com";
        return previousEmail ;
    }

    loginWithError(email,password){
        browser.url(testData.weshop.homeurl);
        if(this.cookieBtn.isVisible()){
            this.cookieBtn.click();
        }
        expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
        this.logInPageBtn.waitForVisible();
        this.logInPageBtn.click();
        browser.pause(4000);
        this.emailOrUsername.waitForVisible();
        this.emailOrUsername.click();
        this.emailOrUsername.setValue(email);
        this.password.waitForVisible();
        this.password.click();
        this.password.setValue(password);
    }

}


export default new Login();
