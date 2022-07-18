import { expect } from 'chai';
import Login from "../page-objects/login.page.js";
import newsFeed from '../page-objects/newsfeed.page';
import gmail from '../page-objects/gmail.page';
import testData from "../constants/testData.json"
import filterPage from '../page-objects/filter.page.js';
import { filter } from 'async';
import postPage from '../page-objects/post.page.js';
import signupPage from '../page-objects/signup.page.js';
var minprice=100, maxprice=200;

describe("WeShop - Login", () => {
    
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
    //var tabIds = browser.getTabIds();
    //browser.switchTab(tabIds[0]); 
    Login.login(testData.login.user1,testData.login.pw);
    newsFeed.logo.waitForVisible();
    expect(newsFeed.logo.isVisible()).to.eql(true);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.prdname,'Enter']);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.pe-md-3.col-12 .product-wrapper.d-flex.justify-content-between.border:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );  
    filterPage.productName(1).waitForVisible();
    var d=filterPage.productName(1).getText();
    var st=d.toString();
    if(st.includes('Bag')){
    console.log(true);}
    else{
      expect(false);
    }
    })

   it("Verify that appropriate search results are displayed when suggestion from the search keyword in the Search field is selected",()=>{
     postPage.homeIcon(1).waitForVisible();
     postPage.homeIcon(1).click();
     filterPage.serachBar.waitForVisible();
     filterPage.serachBar.setValue(testData.product.prdname1);
     browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.dropdown-menu.rounded.mt-1.p-0.cursor-pointer.show .dropdown-item.rounded:nth-child(2)'
          ) === true
        );
      },
      6000,
      "add item input field not visible even after 10s"
    );  
    postPage.suggestion(2).waitForVisible();
    var d=postPage.suggestion(2).getText();
    postPage.suggestion(2).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.pe-md-3.col-12 .product-wrapper.d-flex.justify-content-between.border:nth-child(1) .title.text-truncate'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    var d1=filterPage.productName(1).getText();
    
   })

})

describe("WeShop - Filter",()=>{

  it("Verify that the results matching the specified price range is displayed when user enters min and max value price range",()=>{
     filterPage.filter(100,200);
     filterPage.updateResultsBtn.waitForVisible();
     filterPage.updateResultsBtn.click();
     browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.pe-md-3.col-12 .product-wrapper.d-flex.justify-content-between.border:nth-child(1) .price.m-0'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    var d1=filterPage.viewPrice(1).getText();
    console.log(d1)
    expect(d1>=minprice & d1<=maxprice).to.eql(true);
  })

  it("Verify that the results matching the selected brand are displayed when the search is filtered  by selecting 'Brands'",()=>{
    filterPage.brandDropdown.waitForVisible();
    filterPage.brandDropdown.click();
    filterPage.brandSelect.waitForVisible()
    filterPage.brandSelect.click()
    filterPage.brandDropdown.waitForVisible();
    filterPage.brandDropdown.click();
    filterPage.updateResultsBtn.waitForVisible();
    filterPage.updateResultsBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.pe-md-3.col-12 .product-wrapper.d-flex.justify-content-between.border:nth-child(1) .price.m-0'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    var d1=filterPage.viewPrice(1).getText();
    console.log(d1)
    if(st.includes('Bag')){
      console.log(true);}
      else{
        expect(false); }  
  })

  it("Verify that the results matching the selected retailer are displayed when the search is filtered  by selecting 'Brands'",()=>{
    filterPage.retailerDropIcon.waitForVisible();
    filterPage.retailerDropIcon.click();
    filterPage.retailerSelect.waitForVisible()
    filterPage.retailerSelect.click()
    filterPage.retailerDropIcon.waitForVisible();
    filterPage.retailerDropIcon.click();
    filterPage.updateResultsBtn.waitForVisible();
    filterPage.updateResultsBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.pe-md-3.col-12 .product-wrapper.d-flex.justify-content-between.border:nth-child(1) .price.m-0'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    if(st.includes('Bag')){
      console.log(true);}
      else{
        expect(false); }
})

describe("Profile",()=>{
  
  it("Verify that Profile details updated successfully when user makes changes and tap on 'Save changes' button",()=>{

  Login.login(testData.login.user1,testData.login.pw);
  Login.visitProfile.waitForVisible();
  Login.visitProfile.click();
  signupPage.profileEdit.waitForVisible();
  signupPage.profileEdit.click()
  signupPage.profileEdit.setValue(testData.profile.firstname)
  browser.scroll(0,10000);
  Login.clickToContinueBtn.waitForVisible();
  Login.clickToContinueBtn.click();
  signupPage.profilesDetailsPopup.waitForVisible();
  signupPage.profilesDetailsPopup.click();
  expect(signupPage.profilesDetailsPopup.getText()).to.eql(testData.profile.profileDetails);
  signupPage.profileDetailsPopupCloseIcon.waitForVisible();
  signupPage.profileDetailsPopupCloseIcon.click();
})

})
})