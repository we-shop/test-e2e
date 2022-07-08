import { expect } from 'chai';
import Login from "../page-objects/login.page.js";
import newsFeed from '../page-objects/newsfeed.page';
import gmail from '../page-objects/gmail.page';
import testData from "../constants/testData.json"
import filterPage from '../page-objects/filter.page.js';

describe.skip("WeShop - Login", () => {
    
    it("Verify that user is able to login successfully using valid e-mail and password", ()=>{
        Login.login(testData.login.user1,testData.login.pw);
        newsFeed.logo.waitForVisible();
        expect(newsFeed.logo.isVisible()).to.eql(true);
        Login.logoutNewsfeed();    
    })   
  
    it("Verify that user is able to login successfully using valid username and password", ()=>{
        Login.login(testData.login.username,testData.login.pw);
        newsFeed.logo.waitForVisible();
        expect(newsFeed.logo.isVisible()).to.eql(true);
    })   
  
    it("Verify that user can logout successfully when user select Logout option", ()=>{
        Login.logoutNewsfeed();    
    })

    it("Verify that reset password email is delivered instantly to the registered user's email",()=>{
      Login.resetPasswordLabel.waitForVisible();
      Login.resetPasswordLabel.click();
      Login.forgotPwField.waitForVisible();
      Login.forgotPwField.click();
      Login.forgotPwField.setValue([testData.resetEmail.email, 'Enter']);
      Login.clickToContinueBtn.waitForVisible();
      Login.clickToContinueBtn.click();
      browser.newWindow('http://www.yopmail.com/en/')
      browser.pause(3000);
      var tabIds = browser.getTabIds();
      browser.switchTab(tabIds[1]); 
      gmail.checkinbox_changeiframe(testData.resetEmail.email);
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.yscrollbar:nth-child(2) tr:nth-child(1) td:nth-child(1) >div:nth-child(1)>h1 b:nth-child(1)'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );      
      expect(Login.setNewPwd.getText()).to.eql(testData.resetEmail.resetPwBtn);
    })

  

});

describe("WeShop - Search",()=>{

   it("Verify that appropriate search results are displayed when a keyword is entered in the Search field",()=>{
    Login.login(testData.login.user1,testData.login.pw);
    newsFeed.logo.waitForVisible();
    expect(newsFeed.logo.isVisible()).to.eql(true);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.prdname],'Enter');

   })

})