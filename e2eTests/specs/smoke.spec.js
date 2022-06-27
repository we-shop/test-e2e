import { expect } from 'chai';
import Login from "../page-objects/login.page.js";
import testData from "../constants/testData.json"
import homePage from '../page-objects/home.page.js';
import newsFeed from '../page-objects/newsfeed.page';
import filterPage from '../page-objects/filter.page.js';
import postPage from '../page-objects/post.page.js';
import product from '../page-objects/product.page.js'
import productPage from '../page-objects/product.page.js';
import gmail from '../page-objects/gmail.page'

var price2=200;
var emailResert,h;
const path=require("path");

describe("WeShop - Login", () => {

  it("Verify that the user is redirected to the Login step when Login button is clicked", ()=>{
      browser.url(testData.weshop.homeurl);
      if(Login.cookieBtn.isVisible()){
         Login.cookieBtn.click();
      }
      expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
      Login.logInPageBtn.waitForVisible();
      Login.logInPageBtn.click();
      Login.welcomeText.waitForVisible();
      expect(Login.welcomeText.getText()).to.eql(testData.login.welcome);
    })
  
  it("Verify that user is able to login successfully using valid e-mail and password", ()=>{
      Login.login(testData.login.user1,testData.login.pw);
      newsFeed.logo.waitForVisible();
      expect(newsFeed.logo.isVisible()).to.eql(true);
      Login.logoutNewsfeed();    
  })   

  it("Verify that user is able to login successfully using valid username and password", ()=>{
      Login.login(testData.login.username,testData.share.password);
      browser.pause(2000);
      newsFeed.logo.waitForVisible();
      expect(newsFeed.logo.isVisible()).to.eql(true);
  })   

  it("Verify that user can logout successfully when user select Logout option", ()=>{
      browser.pause(2000);
      Login.logoutNewsfeed();    
  })
});

describe("WeShop - Product",()=>{

    it("Verify that the product price is displayed appropriately in the product details box", ()=>{
        Login.login(testData.login.username,testData.share.password);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue([testData.product.name, 'Enter']);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.pe-md-3 .product-wrapper.d-flex.justify-content-between.rounded:nth-child(1) '
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        expect(productPage.price(1).isVisible()).to.eql(true);
    })
 
    it("Verify that the user is able to create the new wishlist when new wish list name is submitted in the create wishlist popup",()=>{
      productPage.price(1).click();
      productPage.wishlistBtn.waitForVisible();
      productPage.wishlistBtn.click();
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.modal-header'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
      productPage.addWishlistName.waitForVisible();
      productPage.addWishlistName.addValue('shirt');
      productPage.addBtnWishlist.waitForVisible();
      productPage.addBtnWishlist.click();
    })
   

    

    it("Verify that the eBay home page is displayed when the user click on the 'Browse more products' button",()=>{

    })
    
});

describe("WeShop - Search",()=>{

    it("Verify that appropriate search results when suggested search keyword in the Search field is selected",()=>{
        expect(newsFeed.logo.isVisible()).to.eql(true);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue(testData.product.suggestion);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '#search-typeahead-top-pad-menu>li:nth-child(3)'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.suggestion(3).waitForVisible();
        filterPage.suggestion(3).click();
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.title-container .results-quantity'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
        );
        expect(product.resultCount.isVisible()).to.eql(true);
        product.showingResult.waitForVisible();
        expect(product.showingResult.getText()).to.eql(testData.product.resultforbag);
    })

    it("Verify that appropriate search results when a keyword is entered in the Search field",()=>{
        newsFeed.logo.waitForVisible();
        newsFeed.logo.click();
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue([testData.product.prdname1, 'Enter']);
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.title-container .results-quantity'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
        );
        expect(product.resultCount.isVisible()).to.eql(true);
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.title-container>h3'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
        );
        product.showingResult.waitForVisible();
        expect(product.showingResult.getText()).to.eql(testData.product.resultforhat);
        browser.pause(1000);
        newsFeed.logo.waitForVisible();
        newsFeed.logo.click();
        Login.logoutNewsfeed();    
    })
});

describe("WeShop - filter", ()=>{
    it("Verify that the results matching the specified price range are displayed when the search is filtered", ()=>{
        Login.login(testData.login.username,testData.share.password);
        browser.pause(2000);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue([testData.product.prdname, 'Enter']);
        browser.pause(4000);
        product.showingResult.waitForVisible();
        expect(product.showingResult.isVisible()).to.eql(true);
        filterPage.filter(100,200);
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        productPage.price(1).waitForVisible();
        var price1 = productPage.price(1).getText();
        price1 = price1.split("£");
        price1 = price1[1];
        price1 = parseFloat(price1);
        expect(price2 >= price1).to.eql(true);
        filterPage.clearAll(2).waitForVisible();
        filterPage.clearAll(2).click();
    })

    it("Verify that the results matching to the selected brand are displayed when the search is filtered", ()=>{
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.search-results-wrapper'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
        );
        filterPage.brandOption.waitForVisible();
        filterPage.brandOption.click();
        filterPage.brandOption.addValue('B');
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '#brands-item-0'
                ) === true
              );
            },
            70000,
            "add item input field not visible even after 10s"
        );
        filterPage.brandSelect.waitForVisible();
        filterPage.brandSelect.click();
        filterPage.brandDropdown.waitForVisible();
        filterPage.brandDropdown.click();
        browser.scroll(0,100);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.btn.btn-primary.w-50.rounded.text-nowrap'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        expect(filterPage.brandNameAfterFilter(1).getText()).to.eql(testData.filter.brand)
        filterPage.clearAll(2).waitForVisible();
        filterPage.clearAll(2).click();
    })

    it("Verify that the results matching to the selected retailer are displayed when the search is filtered", ()=>{
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.search-results-wrapper'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
        );
        filterPage.retailerOption.waitForVisible();
        filterPage.retailerOption.waitForVisible();
        filterPage.retailerOption.click();
        filterPage.retailerOption.addValue('Z');
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '#merchants-item-0'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.retailerSelect2.waitForVisible();
        filterPage.retailerSelect2.click();
        filterPage.retailerDropdown.waitForVisible();
        filterPage.retailerDropdown.click();
        browser.scroll(0,100);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.btn.btn-primary.w-50.rounded.text-nowrap'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        expect(filterPage.brandNameAfterFilter(1).getText()).to.eql(testData.filter.retailerName)
        filterPage.clearAll(2).waitForVisible();
        filterPage.clearAll(2).click();
        Login.logOut.waitForVisible();
        Login.logOut.click();
    })
});

describe("WeShop - Create post RAP", ()=>{

  it("Verify that the Recommend a product post created by the user are displayed appropriately in Newsfeed",()=>{
    Login.login(testData.login.username1,testData.login.userPw);
    postPage.createRap();
  })

  it("Verify that User is unable to submit the post without inlcuding a single product for RAP option",()=>{
      browser.pause(2000);
      postPage.plusIcon.waitForVisible();
      postPage.plusIcon.click();
      postPage.createPost(2).waitForVisible();
      postPage.createPost(2).waitForVisible();
      postPage.createPost(2).click();
      browser.pause(2000);
      postPage.serachInRap.waitForVisible();
      postPage.serachInRap.click();
      postPage.serachInRap.setValue([testData.product.prdname1, 'Enter']);
      browser.pause(2000);
      postPage.selectPrdRap.waitForVisible();
      postPage.selectPrdRap.click();
      postPage.selectPrdRap.click();
      postPage.disabledNextBtn.waitForVisible();
      expect(postPage.disabledNextBtn.isEnabled()).to.eql(false);
      postPage.crossIcon.waitForVisible();
      postPage.crossIcon.click();

  })
});

describe("WeShop - Create post AAQ - Asking about a specific product", ()=>{

  it("Verify that question can be created without Media and Caption",()=>{
      postPage.createQue();
  })

  it("Verify that time stamp of the edited post is updated with the edited time",()=>{

    var edited= postPage.newPost.getText();
    var y = edited.split('• ')
    var g=y[1];
   expect(g).to.eql(testData.post.editedPost);
  })

  it("Verify that question created about a specific product is displayed appropriately in Newsfeed", ()=>{
    postPage.createQuWithProduct();
    Login.logOut.waitForVisible();
    Login.logOut.click();
  })
});

describe("WeShop - NewsFeed", ()=> {

  it("Verify that feed is displayed appropriately when user scrolls through Newsfeed",()=>{
      //User 1
      Login.login(testData.login.user3,testData.resetEmail.pw);
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(4)'
            ) === true
          );
        },
        120000,
        "add item input field not visible even after 10s"
      );
      postPage.postNewsfeed(5).scroll();
      //browser.execute(function() {
      //document.querySelector('.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(5)').scrollIntoView()
      //})
      expect(postPage.postNewsfeed(5).isVisible()).to.eql(true);
      browser.scroll(0,500);
      expect(postPage.postNewsfeed(6).isVisible()).to.eql(true);
      browser.scroll(0,500);
      expect(postPage.postNewsfeed(7).isVisible()).to.eql(true);
    })

  it("Verify that comments added to posts by other users are displayed in Newsfeed",()=>{
    //User 2
    // browser.scroll(0,0);
    //   browser.waitUntil(
    //   function() {
    //     return (
    //       browser.isVisible(
    //         '.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(9)'
    //       ) === true
    //     );
    //   },
    //   60000,
    //   "add item input field not visible even after 10s"
    // );
    browser.execute(function() {
      document.querySelector('.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(8)').scrollIntoView()
    })
    newsFeed.addComment(8).waitForVisible();
    newsFeed.addComment(8).click();
    browser.pause(2000);
    var comment = "try RAP post";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.addCmtBtn.waitForVisible();
    Login.addCmtBtn.click();
    browser.pause(2000);
    newsFeed.postedComment(1).waitForVisible();
    expect(newsFeed.postedComment(1).getText()).to.eql(comment);
    Login.logoutOnComments.waitForVisible();
    Login.logoutOnComments.click();
    //User 3
    Login.login(testData.login.username1,testData.login.userPw);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(9)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.execute(function() {
      document.querySelector('.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(8)').scrollIntoView()
    })
    newsFeed.addComment(8).waitForVisible();
    newsFeed.addComment(8).click();
    newsFeed.postedComment(1).waitForVisible();
    expect(newsFeed.postedComment(1).getText()).to.eql(comment); 
  })

  it("Verify that comments added to own posts are displayed in Newsfeed",()=>{
    //Own User who created post
    var comment = "thanks for weshop";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.addCmtBtn.waitForVisible();
    Login.addCmtBtn.click();
    newsFeed.postedComment(2).waitForVisible();
    expect(newsFeed.postedComment(2).getText()).to.eql(comment); 
  })

  it("Verify that comments added to questions by other users are displayed in Newsfeed",()=>{
    //User 2
    Login.login(testData.login.user3,testData.resetEmail.pw);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(6)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.execute(function() {
      document.querySelector('.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(5)').scrollIntoView()
    })
    newsFeed.addComment(5).waitForVisible();
    newsFeed.addComment(5).click();
    browser.pause(2000);
    var comment = "try weshop AAQ";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.addCmtBtn.waitForVisible();
    Login.addCmtBtn.click();
    browser.pause(2000);
    newsFeed.postedComment(1).waitForVisible();
    expect(newsFeed.postedComment(1).getText()).to.eql(comment);
    Login.logoutOnComments.waitForVisible();
    Login.logoutOnComments.click();
    //User 3
    Login.login(testData.login.username1,testData.login.userPw);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(6)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.execute(function() {
      document.querySelector('.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(5)').scrollIntoView()
    })
    newsFeed.addComment(5).waitForVisible();
    newsFeed.addComment(5).click();
    newsFeed.postedComment(1).waitForVisible();
    expect(newsFeed.postedComment(1).getText()).to.eql(comment); 
  })

  it("Verify that comments added to own questions are displayed in Newsfeed",()=>{
    //Own User who created post
    var comment = "thanks";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.addCmtBtn.waitForVisible();
    Login.addCmtBtn.click();
    newsFeed.postedComment(2).waitForVisible();
    expect(newsFeed.postedComment(2).getText()).to.eql(comment); 
  })
});

describe("WeShop - Account",()=>{
  it("Verify that Change password button is activated when the user adds same password string in Password and Repeat password", ()=>{  
      browser.pause(2000);
      Login.setting.waitForVisible();
      Login.setting.click();
      Login.settingPage(3).waitForVisible();
      Login.settingPage(3).click();
      expect(Login.accountSettingLabel.getText()).to.eql(testData.login.accountsetting);
      browser.pause(2000);  
      browser.scroll(0,800)   
      Login.changePw.waitForVisible();
      Login.changePw.click();
      Login.changePw.setValue([testData.signup.password]);
      Login.repeatPw.waitForVisible();
      Login.repeatPw.click();
      Login.repeatPw.setValue([testData.signup.password]);
      expect(Login.changePwBtn.isVisible()).to.eql(true);
  })

  it("Verify that Change e-mail address button is enabled when user adds valid e-mail address", ()=>{
      browser.scroll(0,0);
      Login.emailaddress.waitForVisible();
      Login.emailaddress.click();
      Login.emailaddress.addValue('john@calibrecode.com')
      expect(Login.changePwBtn.isVisible()).to.eql(true);
  })

  it("Verify that user is automatically logged out after Deactivate account step", ()=>{
      browser.pause(2000);
      Login.backBtn.waitForVisible();
      Login.backBtn.click();
      Login.deactivateOption.waitForVisible();
      Login.deactivateOption.click();
      browser.scroll(0,100);
      Login.changePwBtn.waitForVisible();
      Login.changePwBtn.click();
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.dialog-content'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
      Login.confirmDeactivateBtn.waitForVisible();
      Login.confirmDeactivateBtn.click();
      browser.pause(1000);
      expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
  })

  it("Verify that new email address is updated in the user profile once the change in the email verification process is completed",()=>{
    Login.login(testData.resetEmail.resetEmailUn,testData.share.password);
    browser.pause(2000);
    Login.setting.waitForVisible();
    Login.setting.click();
    Login.settingPage(3).waitForVisible();
    Login.settingPage(3).click();
    expect(Login.accountSettingLabel.getText()).to.eql(testData.login.accountsetting);
    browser.pause(2000);  
    browser.scroll(0,300)   
    Login.emailaddress.waitForVisible();
    Login.emailaddress.click();
    var e=Login.emailAddress.getText();
    var y = e.split(':')[1];
    emailResert = Login.resetEmail()
    Login.emailaddress.setValue(emailResert);
    browser.pause(2000);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    browser.pause(2000);
    browser.scroll(0,0);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.link .MuiSvgIcon-root'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    Login.backBtn.click();
    browser.pause(2000);
    Login.logOut.waitForVisible();
    Login.logOut.click();
    browser.pause(2000);
    browser.newWindow('http://www.yopmail.com/en/')
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]); 
    //For jenkins note
    if(homePage.cookie.isVisible()){
      homePage.cookie.click();
    }
    browser.pause(3000)
    gmail.checkinbox_changeiframe_email([y, 'Enter']);
    Login.setNewPwd.waitForVisible();
    Login.setNewPwd.click();
    var tabId1=browser.getTabIds();
    browser.switchTab(tabId1[2]);
    browser.pause(2000);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(y);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.share.password);
    browser.scroll(0,200);
    browser.pause(4000);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.pause(2000);
    Login.settingPage(3).waitForVisible();
    Login.settingPage(3).click();
    browser.pause(2000);
    Login.emailaddress.waitForVisible();
    var newEmail=Login.emailAddress.getText();
    var w = newEmail.split(':')[1];
    //expect(w).to.eql(emailResert);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    Login.logoutNewsfeed();    
  })

  it("Verify that reset password email is delivered instantly to the registered user's email",()=>{
    browser.url(testData.weshop.homeurl);
    if(Login.cookieBtn.isVisible()){
        Login.cookieBtn.click();
    }
    Login.homePage.waitForVisible();
    expect(Login.homePage.getText()).to.eql(testData.login.homepage);
    Login.logInPageBtn.waitForVisible();
    Login.logInPageBtn.click();
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
    browser.switchTab(tabIds[3]); 
    gmail.checkinbox_changeiframe(testData.resetEmail.email);
  })

  it("Verify that user can successfully login with newly set password",()=>{
    // browser.url(testData.weshop.homeurl);
    // Login.logInPageBtn.waitForVisible();
    // Login.logInPageBtn.click();    
    browser.pause(2000);
    Login.setNewPwd.waitForVisible();
    Login.setNewPwd.click();
    //browser.close();
    browser.pause(3000);
    // var tabIds = browser.getTabIds();
    // browser.switchTab(tabIds[3]);
    // browser.waitUntil(
    //     function() {
    //       return (
    //         browser.isVisible(
    //           '.body-copy'
    //         ) === true
    //       );
    //     },
    //     60000,
    //     "add item input field not visible even after 10s"
    // );
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[4]); 
    Login.pass(1).waitForVisible();
    Login.pass(1).click();
    Login.pass(1).setValue(testData.resetEmail.pw);
    Login.pass(2).waitForVisible();
    Login.pass(2).click();
    Login.pass(2).setValue(testData.resetEmail.pw);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.header > h1'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
    );
    Login.success.waitForVisible();
    browser.pause(3000);
    expect(Login.success.getText()).to.eql(testData.resetPwd.successpopup);
    Login.hereLink.waitForVisible();
    Login.hereLink.click();
    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.body-copy'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
    );
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.login.user3);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.resetEmail.pw);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.pause(2000);
    Login.userName.waitForVisible();
    expect(productPage.userName.getText()).to.eql(testData.resetEmail.checkUn);
    browser.pause(2000);
    Login.setting.waitForVisible();
    Login.setting.click();
    Login.logOut.waitForVisible();
    Login.logOut.click();
    homePage.welcome.waitForVisible();
    expect(homePage.welcome.getText()).to.eql(testData.weshop.hometitle);
  })
});

describe("WeShop - Profile",()=>{
  it("Verify that Profile details updated successfully when user makes changes and tap on 'Save changes' button", ()=>{
      Login.login(testData.resetEmail.resetEmailUn,testData.share.password);
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.position-absolute.edit-button.btn-outline-primary.rounded.px-2.d-md-none.d-lg-block'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
      Login.visitProfile.waitForVisible();
      Login.visitProfile.click();
      expect(Login.editProfileHeading.getText()).to.eql(testData.profile.edit);
      Login.firstName.waitForVisible();
      Login.firstName.setValue("smita");
      browser.execute(function() {
        document.querySelector('.btn.btn-primary>span').scrollIntoView()
        })
      Login.saveBtnEnabled.waitForVisible();
      Login.saveBtnEnabled.click();
      Login.profileDetailsPopup.waitForVisible();
      expect(Login.profileDetailsPopup.getText()).to.eql(testData.profile.profileDetails)
      Login.profileDetailsCloseBtn.waitForVisible();
      Login.profileDetailsCloseBtn.click();
  })
});

describe("WeShop - Share",()=>{

  it("Verify that user can see post when Post link of user is launched",()=>{
    browser.waitUntil(
    function() {
      return (
        browser.isVisible( 
          '.content-block:nth-child(2)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
    );
    browser.scroll(0,1000);
    newsFeed.profilePost(4).waitForVisible();
    newsFeed.profilePost(4).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.copy-link-input'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    var s=browser.getValue('.copy-link-input');
    console.log("Logged-in user's Post" +s);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logoutNewsfeed();    
    browser.url(s);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.resetEmail.resetEmailUn);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.share.password);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.pause(4000);
    expect(productPage.postName.getText()).to.eql(testData.share.post);
  })

  it("Verify that user can see own profile when Profile link is launched", ()=>{
      browser.pause(2000);
      Login.backBtn.waitForVisible();
      Login.backBtn.click();
      browser.pause(4000);
      productPage.shareIcon.waitForVisible();
      productPage.shareIcon.click();
      var s=browser.getValue('.copy-link-input');
      console.log("Logged-in User Profile" +s);
      browser.url(s);
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.b9xfa1-0.gBarNF .name'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
      expect(productPage.userName.getText()).to.eql(testData.resetEmail.reset);
  }) 

  it("Verify that user can see profile of other user when Profile link of other user is launched",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.weshop.home, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    productPage.searchPeopleIcon.waitForVisible();
    productPage.searchPeopleIcon.click();
    browser.pause(2000);
    productPage.shareIcon.waitForVisible();
    productPage.shareIcon.click();
    var s=browser.getValue('.copy-link-input');
    console.log("Other User Profile" +s);
    productPage.crossProfileIcon.waitForVisible();
    productPage.crossProfileIcon.click();
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logoutNewsfeed();    
    browser.url(s);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.login.user2);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.login.user2PW);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.b9xfa1-0.gBarNF .name'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(productPage.otherUserName.isVisible()).to.eql(true);
  })

});
