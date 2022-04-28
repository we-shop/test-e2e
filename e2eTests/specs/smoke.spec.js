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
var emailResert;
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
      Login.logout();    
  })   

  it("Verify that user is able to login successfully using valid username and password", ()=>{
      Login.login(testData.login.username,testData.share.password);
      browser.pause(2000);
      newsFeed.logo.waitForVisible();
      expect(newsFeed.logo.isVisible()).to.eql(true);
  })   

  it("Verify that user can logout successfully when user select Logout option", ()=>{
      Login.logout();
  })
});

describe("WeShop - Product",()=>{
    it("Verify that the searched product name is displayed below the header Eg: showing results for Shirts", ()=>{
        Login.login(testData.login.username,testData.share.password);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue([testData.product.name, 'Enter']);
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
        expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
    })

    it("Verify that the product price is displayed appropriately in the product details box", ()=>{
        expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
        browser.scroll(0,100);
        product.price.waitForVisible();
        expect(product.price.isVisible()).to.eql(true);
    })

    it("Verify that the product name displayed appropriately", ()=>{
        expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
        expect(product.descp.isVisible()).to.eql(true);
    })

    it("Verify that the user is able to copy the product link when copy link button is clicked", ()=>{
        expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
        product.product1.waitForVisible();
        product.product1.click();
        browser.pause(2000);
        product.share.waitForVisible();
        product.share.click();
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '.modal-share-buttons__label'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
        );
        var s=browser.getValue('.copy-link-input');
        browser.url(s);
        browser.pause(2000);
        product.weShopLogo.waitForVisible();
        product.weShopLogo.click();
        expect(newsFeed.logo.isVisible()).to.eql(true);
    })
    
});

describe("WeShop - Search",()=>{

    it("Verify that appropriate search results when suggested search keyword in the Search field is selected",()=>{
        expect(newsFeed.logo.isVisible()).to.eql(true);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue(testData.product.prdname);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '#search-typeahead-item-2'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.suggestion.waitForVisible();
        filterPage.suggestion.click();
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
        Login.logout();
    })
});

describe("WeShop - filter", ()=>{
    it("Verify that the results matching the specified price range are displayed when the search is filtered", ()=>{
        Login.login(testData.login.username,testData.share.password);
        browser.pause(2000);
        filterPage.serachBar.waitForVisible();
        filterPage.serachBar.setValue([testData.product.name, 'Enter']);
        browser.pause(4000);
        product.showingResult.waitForVisible();
        expect(product.showingResult.isVisible()).to.eql(true);
        filterPage.filter(100,200);
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        productPage.price.waitForVisible();
        var price1 = productPage.price.getText();
        price1 = price1.split("£");
        price1 = price1[1];
        price1 = parseFloat(price1);
        expect(price2 >= price1).to.eql(true);
        filterPage.clearAll.waitForVisible();
        filterPage.clearAll.click();
    })

    it("Verify that the results matching to the selected brand are displayed when the search is filtered", ()=>{
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
        filterPage.brandOption.waitForVisible();
        filterPage.brandOption.click();
        filterPage.brandOption.addValue('boden');
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
        browser.scroll(0,100);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.bottom-buttons .sc-56f71l-0.iaChRu:nth-child(1)'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        filterPage.clearAll.waitForVisible();
        filterPage.clearAll.click();
    })

    it("Verify that the results matching to the selected retailer are displayed when the search is filtered", ()=>{
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
        filterPage.retailerOption.waitForVisible();
        filterPage.retailerOption.waitForVisible();
        filterPage.retailerOption.click();
        filterPage.retailerOption.addValue('boden');
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
        filterPage.filterBlock.waitForVisible();
        filterPage.filterBlock.click();
        browser.scroll(0,100);
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.bottom-buttons .sc-56f71l-0.iaChRu:nth-child(1)'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
        filterPage.updateResultsBtn.waitForVisible();
        filterPage.updateResultsBtn.click();
        browser.pause(2000);
        productPage.retailerName.waitForVisible();
        expect(productPage.retailerName.getText()).to.eql(testData.product.retailername);
        browser.pause(2000);
        newsFeed.logo.waitForVisible();
        newsFeed.logo.click();
        browser.pause(2000);
        Login.logout();
    })
});

describe("WeShop - Create post RAP", ()=>{
  it("Verify that the user is redirected to the Recommend a product step when Recommend a product button is clicked",()=>{
      Login.login(testData.login.username,testData.share.password);
      browser.pause(2000);
      postPage.plusIcon.waitForVisible();
      postPage.plusIcon.click();
      postPage.createPost(1).waitForVisible();
      postPage.createPost(1).waitForVisible();
      expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
      postPage.createPost(1).click();
      browser.pause(2000);
      postPage.recommendProductHeading.waitForVisible();
      expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.RAPHeading);
  })

  it("Verify that the Recommend a product post created by the user are displayed appropriately in Newsfeed",()=>{
      browser.pause(2000);
      postPage.createRap();
  })

  it("Verify that User is unable to submit the post without inlcuding a single product for RAP option",()=>{
      browser.pause(2000);
      postPage.plusIcon.waitForVisible();
      postPage.plusIcon.click();
      postPage.createPost(1).waitForVisible();
      postPage.createPost(1).waitForVisible();
      expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
      postPage.createPost(1).click();
      browser.pause(2000);
      postPage.recommendProductHeading.waitForVisible();
      expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.RAPHeading);
      browser.pause(2000);
      postPage.searchProductAaq.waitForVisible();
      postPage.searchProductAaq.click();
      postPage.searchProductAaq.setValue([testData.product.prdname, 'Enter']);
      browser.pause(2000);
      browser.scroll(0,200);
      expect(postPage.disabledNextBtn.isVisible()).to.eql(true);
      expect(postPage.nextBtn.isVisible()).to.eql(false);
      postPage.discaredpostBtn.waitForVisible();
      postPage.discaredpostBtn.click();
  })
});

describe("WeShop - Create post AAQ - Asking about a specific product", ()=>{

  it("Verify that the user is redirected to the Ask a Question step when Ask a question button is clicked",()=>{
      browser.pause(2000);
      postPage.plusIcon.waitForVisible();
      postPage.plusIcon.click();
      postPage.askAQuestion.waitForVisible();
      expect(postPage.askAQuestion.getText()).to.eql(testData.post.AAQname);
      postPage.askAQuestion.click();
      browser.pause(2000);
      expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.AAQ);
  })

  it("Verify that question created about a specific product is displayed appropriately in Newsfeed", ()=>{
      browser.pause(2000);
      postPage.createQue();
  })
});

describe("WeShop - Create a post AAQ - Looking for recommendations?", ()=>{

  it("Verify that question created about a recommendation is displayed appropriately in Newsfeed",()=>{
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    browser.pause(2000);
    postPage.askAQuestion.waitForVisible();
    expect(postPage.askAQuestion.getText()).to.eql(testData.post.AAQname);
    postPage.askAQuestion.click();
    browser.scroll(0,200);
    postPage.nextBtn.waitForVisible();
    const toUpload = path.join(__dirname, "..", "resources", "laptop.jpeg");
    console.log(toUpload);  
    browser.chooseFile('input[type="file"]', toUpload);    
    browser.pause(5000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.pause(4000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.dialog-header'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );
    postPage.aaqHelpMeText.waitForVisible();
    postPage.aaqHelpMeText.click();
    postPage.aaqHelpMeText.setValue('help');
    browser.pause(2000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu.blue'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.pause(2000);
    browser.scroll(0,200);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1hjjkgc-1.drskXq:nth-child(2) .sc-1hjjkgc-2.YldMF'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );
    postPage.productAaq.waitForVisible();
    postPage.productAaq.click();
    browser.pause(2000);
    postPage.searchProductAaq.waitForVisible();
    postPage.searchProductAaq.click();
    postPage.searchProductAaq.setValue([testData.product.prdname, 'Enter']);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1jtvvdw-0.cHQRzR .sc-195fhah-0.gLSDob .ao51ir-0.lfyyWF:nth-child(5) .productItem .MuiIconButton-label'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );      
    postPage.selectPrdAaq.waitForVisible();
    postPage.selectPrdAaq.click();
    browser.scroll(0,200);
    browser.pause(2000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(2000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(1)'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );    
    browser.scroll(0,1000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );    
    expect(postPage.newPost.getText()).eql(testData.post.newpost);
    browser.pause(2000);
    Login.logout();
  })
});

describe("WeShop - NewsFeed", ()=> {

  it("Verify that feed is displayed appropriately when user scrolls through Newsfeed",()=>{
      //User 1
      Login.login(testData.login.username1,testData.login.userPw);
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
      expect(postPage.postNewsfeed(3).isVisible()).to.eql(true);
      browser.scroll(0,500);
      expect(postPage.postNewsfeed(4).isVisible()).to.eql(true);
  })

  it("Verify that comments added to posts by other users are displayed in Newsfeed",()=>{
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.createPost(1).waitForVisible();
    postPage.createPost(1).waitForVisible();
    expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
    postPage.createPost(1).click();
    browser.pause(2000);
    postPage.recommendProductHeading.waitForVisible();
    expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.RAPHeading);
    browser.pause(2000);
    postPage.createRap();
    Login.logout();
    //User 2
    browser.pause(2000);
    Login.login(testData.login.user2,testData.login.user2PW);
    browser.pause(2000);
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
    postPage.newPost.waitForExist({ timeout: 6000 });
    browser.moveToObject(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)")
    browser.pause(2000);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    var comment = "try weshop RAP post";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    browser.pause(2000);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    browser.pause(2000);
    browser.scroll(0,200);
    newsFeed.postedComment.waitForVisible();
    expect(newsFeed.postedComment.getText()).to.eql(comment);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    browser.pause(2000);
    //User 3
    Login.login(testData.login.user3,testData.resetEmail.pw);
    browser.pause(2000);
    browser.scroll(0,1000);
    postPage.newPost.waitForVisible();
    expect(postPage.newPost.isVisible()).eql(true);
    browser.pause(2000);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    browser.pause(2000);
    browser.scroll(0,200);
    newsFeed.postedComment.waitForVisible();
    expect(newsFeed.postedComment.getText()).to.eql(comment);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
  })

  it("Verify that comments added to own posts are displayed in Newsfeed",()=>{
    //Own User who created post
    Login.login(testData.login.username1,testData.login.userPw);
    browser.pause(2000);
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
    expect(postPage.newPost.isVisible()).eql(true);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    var comment = "own user comment to RAP";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    browser.pause(2000);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    browser.pause(2000);
    browser.scroll(0,200);
    newsFeed.ownUserComment.waitForVisible();
    expect(newsFeed.ownUserComment.getText()).to.eql(comment);
  })

  it("Verify that comments added to questions by other users are displayed in Newsfeed",()=>{
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.askAQuestion.waitForVisible();
    expect(postPage.askAQuestion.getText()).to.eql(testData.post.AAQname);
    postPage.askAQuestion.click();
    browser.pause(2000);
    expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.AAQ);
    browser.pause(2000);
    postPage.createQue();
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    //User 2
    browser.url(testData.weshop.homeurl);
    browser.pause(2000);
    Login.login(testData.login.user2,testData.login.user2PW);
    browser.pause(20000);
    browser.scroll(0,1000);
    expect(postPage.newPost.isVisible()).eql(true);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    browser.pause(2000);
    var comment = "try weshop AAQ";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    browser.pause(2000);
    newsFeed.postedComment.waitForVisible();
    expect(newsFeed.postedComment.getText()).to.eql(comment);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    browser.pause(2000);
    //User 3
    browser.url(testData.weshop.homeurl);
    browser.pause(2000);
    Login.login(testData.login.user3,testData.resetEmail.pw);
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
    expect(newsFeed.addComment.isVisible()).eql(true);
    browser.pause(2000);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    newsFeed.postedComment.waitForVisible();
    expect(newsFeed.postedComment.getText()).to.eql(comment);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
  })

  it("Verify that comments added to own questions are displayed in Newsfeed",()=>{
    //Own User who created post
    Login.login(testData.login.username1,testData.login.userPw);
    browser.pause(2000);
    browser.scroll(0,500);
    postPage.newPost.waitForVisible();
    expect(postPage.newPost.isVisible()).eql(true);
    newsFeed.addComment.waitForVisible();
    newsFeed.addComment.click();
    var comment = "own user comment AAQ";
    newsFeed.writeCmt.waitForVisible();
    newsFeed.writeCmt.click();
    newsFeed.writeCmt.setValue(comment);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    browser.pause(2000);
    browser.scroll(0,1000);
    newsFeed.ownUserComment.waitForVisible();
    expect(newsFeed.ownUserComment.getText()).to.eql(comment);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
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
    Login.logout();
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
  it("Verify that user is redirected to the Edit profile Information step when Edit profile button is tapped", ()=>{
      Login.login(testData.resetEmail.resetEmailUn,testData.share.password);
      browser.pause(2000);
      browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.settings-button-small'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
      Login.setting.waitForVisible();
      Login.setting.click();
      browser.pause(2000);
      Login.visitProfile.waitForVisible();
      Login.visitProfile.click();
      expect(Login.editProfileHeading.getText()).to.eql(testData.profile.edit);
      Login.backBtn.waitForVisible();
      Login.backBtn.click();
      browser.pause(2000);
      newsFeed.logo.waitForVisible();
      newsFeed.logo.click();
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
    Login.logout();
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
    Login.logout();
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



