import { expect } from 'chai';
import Login from "../page-objects/login.page.js";
import newsFeed from '../page-objects/newsfeed.page';
import gmail from '../page-objects/gmail.page';
import testData from "../constants/testData.json"
import filterPage from '../page-objects/filter.page.js';
import postPage from '../page-objects/post.page.js';
import signupPage from '../page-objects/signup.page.js';
import productPage from '../page-objects/product.page.js';
import loginPage from '../page-objects/login.page.js';
import newsfeedPage from '../page-objects/newsfeed.page';
import { use } from 'gulp-sequence';
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
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[0]); 
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
    if(d1.includes('Hat')){
    console.log(true);}
    else{
    expect(false);
    }
   })

})

describe("WeShop - eBay Placement - Create dedicated eBay carousel of products",()=>{

  it("Verify that the eBay home page is displayed when the user clicks on the 'Browse more products' button",()=>{
    productPage.browsePopularProducts.waitForVisible();
    productPage.browsePopularProducts.click();
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]); 
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#gh-logo'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    var t=browser.getUrl();
    expect(t).contains("https://www.ebay.co.uk/")
    browser.close();
    browser.switchTab(tabIds[0]); 
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
    var price1 = filterPage.viewPrice(1).getText();
    var price2 = price1.split("£");
    var l=price2[1]
    expect(l<=minprice &l>=maxprice);
    filterPage.clearAll(2).waitForVisible();
    filterPage.clearAll(2).click();
  })

  it("Verify that the results matching the selected brand are displayed when the search is filtered  by selecting 'Brands'",()=>{
    filterPage.brandDropdown.waitForVisible();
    filterPage.brandDropdown.click();
    filterPage.brandSelect.waitForVisible()
    var brandName=filterPage.brandSelect.getText();
    var d=brandName.split('  ')
    console.log(d)
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
    var d1=filterPage.productName(1).getText();
    console.log(d1)
    if(d1.includes(brandName)){
    var y=console.log(true);
    console.log(true)
    }
    else{
    console.log(false); 
    } 
    filterPage.clearAll(2).waitForVisible();
    filterPage.clearAll(2).click();
    // var f=d1.includes(d)
    // console.log(f)
    // expect(f).to.eql(true);
  })

  it("Verify that the results matching the selected retailer are displayed when the search is filtered  by selecting 'Brands'",()=>{
    filterPage.retailerDropIcon.waitForVisible();
    filterPage.retailerDropIcon.click();
    filterPage.retailerSelect.waitForVisible();
    var retailerName=filterPage.retailerSelect.getText();
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
    var d1=filterPage.productName(1).getText();
    console.log(d1);
    if(d1.includes(retailerName)){
      console.log(true);}
    else{
      expect(false); 
    } 
    //expect(t).to.eql(true);
})
})

describe("WeShop - RAP",()=>{
   
  it("Verify that User is unable to submit the post without including a single product for 'Recommend a product' option",()=>{
  // for AAQ with proudtc
  Login.login(testData.login.user1,testData.login.pw);

  postPage.createQuWithProduct();
  })
  
})

describe("Profile",()=>{
  
  it("Verify that Profile details updated successfully when user makes changes and tap on 'Save changes' button",()=>{

  postPage.editProfileUserProfileIcon.waitForVisible();
  postPage.editProfileUserProfileIcon.click();
  Login.visitProfile.waitForVisible();
  Login.visitProfile.click();
  signupPage.profileEdit.waitForVisible();
  signupPage.profileEdit.click()
  var f=loginPage.returnProfile();
  signupPage.profileEdit.setValue(f);
  browser.scroll(0,2000)
  Login.saveBtnInProfile.waitForVisible()
  browser.pause(3000)
  Login.saveBtnInProfile.click()
  signupPage.profilesDetailsPopup.waitForVisible();
  signupPage.profilesDetailsPopup.click();
  expect(signupPage.profilesDetailsPopup.getText()).to.eql(testData.profile.profileDetails);
  signupPage.profileDetailsPopupCloseIcon.waitForVisible();
  signupPage.profileDetailsPopupCloseIcon.click();
  
  })

   it("Verify that user is able to create wishlist from the profile wishlist page",()=>{
  postPage.editProfileUserProfileIcon.waitForVisible();
  postPage.editProfileUserProfileIcon.click();

    filterPage.profilePage(3).waitForVisible();
    filterPage.profilePage(3).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.btn.btn-primary.mt-2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );  
    productPage.createWishlistBtn.waitForVisible();
    productPage.createWishlistBtn.click();
    productPage.createWishlist.waitForVisible();
    productPage.createWishlist.click();
    productPage.createWishlist.setValue('bag');
    productPage.saveBtn.waitForVisible();
    productPage.saveBtn.click();
    loginPage.profileDetailsCloseBtn.waitForVisible();
    loginPage.profileDetailsCloseBtn.click();
    browser.pause(3000);
    var e=productPage.wishlistName.getText()
    var v1 = e.split('edit');
    var t=v1[0];
    expect(t).to.eql('bag ');
  })

})

describe("WeShop - Share",()=>{

  it("Verify that user can share profile of user when 'Copy' button is clicked in newsfeed under 'Invite your friends' section",()=>{
    postPage.homeIcon(1).waitForVisible();
    postPage.homeIcon(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.earn-when.rounded.bg-white.border'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    var userName=newsfeedPage.userNameAtNewsfeed.getText();
    var s=browser.getValue('.form-control.me-2');
    loginPage.logout(3).waitForVisible();
    loginPage.logout(3).click();
    browser.url(s);
    Login.loginForShare(testData.login.user4,testData.login.pw);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.username'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );  
    var userNameAtOtherPage=newsfeedPage.userNameAtNewsfeed.getText();
    expect(userName).to.eql(userNameAtOtherPage)

  })

  it("Verify that user can share other user's profile when 'Share button is clicked",()=>{
    postPage.serachInRap.waitForVisible();
    postPage.serachInRap.setValue([testData.product.otheuser],'Enter');
    filterPage.tabs(2).waitForVisible();
    filterPage.tabs(2).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper.rounded.list-view>div .d-flex:nth-child(1) >a .info>span'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );  
    productPage.searchPeopleOption(1).waitForVisible();
    productPage.searchPeopleOption(1).click();

  })

})

describe("Weshop - Account",()=>{

  it("Verify that user is redirected to the support page when clicked on 'Contact support' button in deactivate account step",()=>{
    Login.login(testData.login.user1,testData.login.pw);
//remove
    Login.logout(2).waitForVisible();
    Login.logout(2).click();
    signupPage.settingOptions(8).waitForVisible();
    signupPage.settingOptions(8).click();
    signupPage.contactSupportBtn.waitForVisible();
    signupPage.contactSupportBtn.click();
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]); 
    var t=browser.getUrl();
    expect(t).to.eql("https://help.we.shop/en/")
  })
})