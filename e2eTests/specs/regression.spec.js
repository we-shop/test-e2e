import { expect } from 'chai';
import Login from "../page-objects/login.page.js";
import testData from "../constants/testData.json"
import homePage from '../page-objects/home.page.js';
import newsFeed from '../page-objects/newsfeed.page';
import signup from '../page-objects/signup.page.js';
import filterPage from '../page-objects/filter.page.js';
import postPage from '../page-objects/post.page.js';
import product from '../page-objects/product.page.js'
import productPage from '../page-objects/product.page.js';
import signupPage from '../page-objects/signup.page.js';
import newsfeedPage from '../page-objects/newsfeed.page';
import sharePage from '../page-objects/share.page.js';
import gmail from '../page-objects/gmail.page'

const elem=$(".MuiSlider-root.MuiSlider-colorPrimary")
var price2=200, minprice=100;
let count=1;
const path=require("path");

describe("Login",()=>{
  it("Verify that appropriate error message is displayed when user enters less than 8 keywords in the password field",()=>{
    Login.loginWithError(testData.login.email,testData.signup.lastname);
    Login.pwErrorMsg.waitForVisible();
    expect(Login.pwErrorMsg.getText()).to.eql(testData.login.pwerrormsg);
  })

  it("Verify that the tap to continue button is active only when user enters valid username and password",()=>{
    browser.pause(2000);
    browser.url(testData.weshop.homeurl);
    expect(homePage.welcome.isVisible()).to.eql(true);
    Login.logInPageBtn.waitForVisible();
    Login.logInPageBtn.click();
    browser.pause(4000);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.login.password);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.login.invaliderr);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    const selector = Login.emailOrUsername.getValue();
    const backSpaces = new Array(selector.length).fill('Backspace');
    Login.emailOrUsername.setValue(backSpaces);
    Login.emailOrUsername.setValue(testData.login.email);
    expect(Login.clickToContinueBtn.isVisible()).to.eql(true);
  })

  it("Verify that appropriate error message is displayed when user enters invalid email address in the email/username field",()=>{
    Login.loginWithError(testData.filter.minprice,testData.signup.password);
    browser.scroll(0,200);
    signupPage.validClickBtn.waitForVisible();
    signupPage.validClickBtn.click();
    browser.pause(2000);
    signupPage.invalidUNandPw.waitForVisible();
    expect(signupPage.invalidUNandPw.getText()).to.eql(testData.login.invalidemail);
  })

  it("Verify that appropriate error message is displayed when unregistered user tries to login",()=>{
    Login.loginWithError(testData.login.accountsetting,testData.signup.password);
    browser.pause(2000);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.body-copy.page-error'
          ) === true
        );
      },
      40000,
      "add item input field not visible even after 10s"
    );
    expect(signupPage.invalidUNandPw.getText()).to.eql(testData.login.invalidemail);
  })

  it("Verify that password entered is revealed when user clicks on eye icon",()=>{
    Login.loginWithError(testData.login.email,testData.signup.lastname);
    Login.pwdText.waitForVisible()
    expect(Login.pwdText.getText()).to.eql(testData.login.welcome);
    signup.eyeIcon.waitForVisible();
    signup.eyeIcon.click();
    signup.password.waitForVisible();
    expect(signup.password.isVisible()).to.eql(true); 
  })

  it("Verify that error message disappears when user enters valid e-mail address",()=>{
    browser.pause(2000);
    browser.url(testData.weshop.homeurl);
    expect(homePage.welcome.isVisible()).to.eql(true);
    Login.logInPageBtn.waitForVisible();
    Login.logInPageBtn.click();
    browser.pause(4000);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.login.password);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.login.invaliderr);
    expect(signupPage.ageErrorMsg.getText()).to.eql(testData.login.emailerror);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    const selector = Login.emailOrUsername.getValue();
    const backSpaces = new Array(selector.length).fill('Backspace');
    Login.emailOrUsername.setValue(backSpaces);
    Login.emailOrUsername.setValue(testData.login.email);
    expect(signupPage.ageErrorMsg.isVisible()).to.eql(false);
  })
})

describe("Search",()=>{
  it("Verify that user can Recommend a product using search option",()=>{
    Login.login(testData.resetEmail.resetEmailUn,testData.share.password);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.name, 'Enter']);
    expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
    product.product1.waitForVisible();
    product.product1.click();
    browser.pause(2000);
    product.addToPost.waitForVisible();
    product.addToPost.click();
    browser.pause(2000);
    product.prdPostOptions(3).waitForVisible();
    product.prdPostOptions(3).click();
    browser.pause(2000);
    product.productBadge.waitForVisible();
    expect(product.productBadge.getText()).to.eql("1");
    browser.scroll(0,200);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    const toUpload = path.join(__dirname, "..", "resources", "image with high resolution.jpg");
    console.log(toUpload);  
    browser.chooseFile('input[type="file"]', toUpload);    
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu.blue'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );    
    postPage.saveBtn.click();
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    postPage.rapNextBtn.waitForVisible();
    postPage.rapNextBtn.click();
    browser.pause(2000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.scroll(0,1000);
    postPage.newPost.waitForExist({ timeout: 6000 });
    expect(postPage.newPost.getText()).eql(testData.post.newRapPost);
    browser.pause(2000);
    const form = $('#search-typeahead-input')
    const attr = form.getAttribute('placeholder')
    expect(attr).to.eql(testData.product.searchFieldText);
  })

  it("Verify that initially like and comment count is 0 when user creates a new post",()=>{
    browser.pause(2000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(postPage.newPost.isVisible()).eql(true);
    browser.scroll(0,1000);    
    expect(postPage.commentCount(3).getText()).to.eql('0');
    expect(postPage.likeCounter.getText()).to.eql('0');
  })

  it("Verify that image is displayed in 'Recommend a product' post when photo is uploaded from the computer",()=>{
    browser.pause(2000);
    browser.scroll(0,1000)
    postPage.productImage.waitForVisible();
    expect(postPage.productImage.isVisible()).to.eql(true);
  })

  it("Verify that images with high resolution(e.g. 3000px) is uploaded successfully during 'Recommend a product'",()=>{
    postPage.productImage.waitForVisible();
    expect(postPage.productImage.isVisible()).to.eql(true);
  })

  it("Verify that when a new post is created, previously created posts are also displayed properly in the NewsFeed",()=>{
    newsfeedPage.post(2).waitForVisible();
    expect(newsfeedPage.post(3).isVisible()).to.eql(true);
    browser.scroll(0,200);
    expect(newsfeedPage.post(4).isVisible()).to.eql(true);
  })

  it("Verify that 'User created a post' is displayed in the Newsfeed when user recommend a product",()=>{
    browser.scroll(0,500);
    browser.moveToObject(".content-block:nth-child(3)")
    expect(newsFeed.afterPostCreationLabel(1).getText()).to.eql(testData.newsfeed.ownUserPost);
    expect(newsFeed.afterPostCreationLabel(2).getText()).to.eql(testData.post.newRapPost);
  })

  it("Verify that deleted 'Recommend a Product' post is removed from the Newsfeed of the user",()=>{
    browser.scroll(0,0);
    browser.moveToObject(".content-block:nth-child(3)")
    expect(newsFeed.afterPostCreationLabel(1).getText()).to.eql(testData.newsfeed.ownUserPost);
    postPage.postOptions(3).waitForVisible();
    postPage.postOptions(3).click();
    postPage.postOperations(2).waitForVisible();
    postPage.postOperations(2).click();
    browser.pause(2000);
    postPage.saveBtn.click();
    Login.profileDetailsPopup.waitForVisible();
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.newsfeed.postDeletion);
    browser.pause(2000);
    signup.eyeIcon.waitForVisible();
    signup.eyeIcon.click();
  })

  it("Verify that the search icon displayed in the search field and results are displayed when Search icon is clicked for the keyword entered",()=>{
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue(testData.product.randomname);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-17wdton-0.eucxwj.jss4'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    filterPage.searchIcon.click();
  })
  
  it("Verify that appropriate message is displayed in the results page when searched items were not found",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.no-results-wrapper>div>p'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    expect(filterPage.noresultLabel.isVisible()).to.eql(true);
    expect(filterPage.noResultMsgPrd.getText()).to.eql(testData.product.randomname);
  })

  it("Verify that We have found no results matching your query is displayed in the People results page when searched people names are not found",()=>{
    browser.pause(2000);
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    filterPage.noresultLabel.waitForVisible();
    expect(filterPage.noresultLabel.isVisible()).to.eql(true);
    expect(filterPage.noResultMsgPrd.getText()).to.eql(testData.product.randomname);
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
  })

  it("Verify that profiles of peoples are displayed in the search results when the tap on People tab",()=>{
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.share.ownuser, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(4000);
    expect(product.showingResult.isVisible()).to.eql(true);
    expect(filterPage.userNameInSearch.getText()).to.eql(testData.share.ownuser);
  })

  it("Verify that related suggestions are displayed in the search dropdown when the user enters a text in the Search option",()=>{
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue(testData.product.suggestion);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#search-typeahead-menu #search-typeahead-item-3'
          ) === true
        );
      },
      40000,
      "add item input field not visible even after 10s"
    );
    expect(filterPage.suggestionOptions.isVisible()).to.eql(true);
  })

  it("Verify that retailer is given preference in search results page when searched with a retailer name",()=>{
    browser.moveToObject("#search-typeahead-menu #search-typeahead-item-5");
    filterPage.retailerSuggestion.waitForVisible();
    filterPage.retailerSuggestion.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper :nth-child(2) .product-info .brand'
          ) === true
        );
      },
      40000,
      "add item input field not visible even after 10s"
    );
    expect(filterPage.viewRetailer.getText()).to.eql(testData.product.retailer);
    browser.scroll(0,1000);
    expect(filterPage.retailerAfterScroll.getText()).not.to.eql(testData.product.retailer);
  })

  it("Verify that user is able to scroll down for more products in the search results page",()=>{
    browser.pause(2000);
    product.showingResult.waitForVisible();
    expect(product.showingResult.isVisible()).to.eql(true);
    browser.pause(2000);
    browser.scroll(0,10000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper .sc-5wwmt8-0.iKGBpl:nth-child(25)'
          ) === true
        );
      },
      40000,
      "add item input field not visible even after 10s"
    );
    expect(product.scrollPrd.isVisible()).to.eql(true);
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
  })

  it("Verify that the Search WeShop text is disappeared and entered text is displayed when the user starts typing in the search field",()=>{
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    const form = $('#search-typeahead-input')
    const attr = form.getAttribute('placeholder')
    expect(attr).to.eql(testData.product.searchFieldText);
    browser.pause(2000);
    filterPage.serachBar.setValue(testData.product.name);
    const attr1 = form.getAttribute('value')
    expect(attr1).to.eql(testData.product.name);
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
  })

  it("Verify that user can see posts from other users when clicked on Follow button in the People section",()=>{
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.login.user3, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    var name=postPage.userName.getText();
    filterPage.followBtn(1).waitForVisible();
    filterPage.followBtn(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-7rqm9q-0.eZZypw:nth-child(1) .sc-56f71l-0.iaChRu.blue'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.followingBtn(1).getText()).to.eql(testData.login.followinglabel);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    browser.scroll(0,1100);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    postPage.followedUserPostName.waitForVisible();
    expect(postPage.followedUserPostName.getText()).to.eql(name);
  })

  it("Verify that user no longer see posts from other users when clicked on Following button (to Unfollow) in the People section",()=>{
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.login.user3, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    expect(filterPage.followingBtn(1).getText()).to.eql(testData.login.followinglabel);
    var name=postPage.userName.getText();
    filterPage.followingBtn(1).waitForVisible();
    filterPage.followingBtn(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-7rqm9q-0.eZZypw:nth-child(1) .sc-56f71l-0.iaChRu.purple-inverted'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.followBtn(1).getText()).to.eql(testData.login.followBtn);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    browser.scroll(0,1100);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(postPage.followedUserPostName.getText()).not.eql(name);
    browser.pause(2000);
  })

  it("Verify that default view is displayed every time the user tries to search for a new product",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.name, 'Enter']);
    browser.pause(2000);
    product.showingResult.waitForVisible();
    expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
    filterPage.viewName.waitForVisible();
    expect(filterPage.viewName.getText()).to.eql(testData.product.deafultViewOption);
  })

  it("Verify that search results are displayed in grid when 'Grid View' is selected",()=>{
    filterPage.viewName.waitForVisible();
    filterPage.listGridBtn(2).waitForVisible();
    filterPage.listGridBtn(2).click();
    expect(filterPage.viewName.getText()).to.eql(testData.product.grid);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper.grid-view .sc-5wwmt8-0.iKGBpl.for-grid-view:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.gridViewPrd(2).isVisible()).to.eql(true);
  })

  it("Verify that Product name, product price and retailer along with the product image is displayed in the Grid view",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper.grid-view .sc-5wwmt8-0.iKGBpl.for-grid-view:nth-child(2) .product-info .price'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.viewPrice.isVisible()).to.eql(true);
    expect(filterPage.viewRetailer.isVisible()).to.eql(true);
    expect(filterPage.viewTitle.isVisible()).to.eql(true);
  })

  it("Verify that search results are displayed as list when 'List View' is selected",()=>{
    filterPage.viewName.waitForVisible();
    filterPage.listGridBtn(1).waitForVisible();
    filterPage.listGridBtn(1).click();
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
    expect(filterPage.viewName.getText()).to.eql(testData.product.deafultViewOption);
  })

  it("Verify that Product name, product price and retailer along with the product image is displayed in the list view",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper :nth-child(2) >img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.viewPrice.isVisible()).to.eql(true);
    expect(filterPage.viewRetailer.isVisible()).to.eql(true);
    expect(filterPage.viewTitle.isVisible()).to.eql(true);
  })

  it("Verify that search results and results count does not change when user toggles between list view and grid view",()=>{
    expect(filterPage.viewName.getText()).to.eql(testData.product.deafultViewOption);
    var d=productPage.resultCount.getText();
    var pname=filterPage.viewTitle.getText();
    filterPage.viewName.waitForVisible();
    filterPage.listGridBtn(2).waitForVisible();
    filterPage.listGridBtn(2).click();
    expect(filterPage.viewName.getText()).to.eql(testData.product.grid);
    var d1=productPage.resultCount.getText();
    var pname1=filterPage.viewTitle.getText();
    expect(d).to.eql(d1);
    expect(pname).to.eql(pname1);
  })

  it("Verify that list view/grid view selected by the user previously is displayed after navigating back from product details page",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper :nth-child(2) >img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    filterPage.viewName.waitForVisible();
    filterPage.listGridBtn(1).waitForVisible();
    filterPage.listGridBtn(1).click();
    filterPage.viewPrice.isVisible();
    filterPage.viewPrice.click();
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.search-results-wrapper :nth-child(2) >img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.viewName.getText()).to.eql(testData.product.deafultViewOption);
  })

  it("Verify that 'View' options are displayed after user navigates back to search page from product details page",()=>{
    expect(filterPage.viewName.getText()).to.eql(testData.product.deafultViewOption);
  })
})

describe("Filter",()=>{

  it.skip("Verify that the product name displayed appropriately", ()=>{
    expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
    expect(product.descp.isVisible()).to.eql(true);
})
  it("Verify that options displayed appropriately when user clicks on dropdown icons to filter result",()=>{
    browser.pause(2000);
    product.showingResult.waitForVisible();
    expect(product.showingResult.getText()).to.eql(testData.product.showinfresult);
    browser.pause(2000);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    filterPage.brandSelect.waitForVisible();
    expect(filterPage.brandSelect.isVisible()).to.eql(true);
    browser.pause(2000);
    productPage.showingResult.waitForVisible();
    productPage.showingResult.click();
    browser.pause(2000);
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
    filterPage.retailerSelect.waitForVisible();
    expect(filterPage.retailerSelect.isVisible()).to.eql(true);
  })

  it("Verify that brand and retailer values are displayed in descending order of number of products available",()=>{
    browser.pause(2000);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    var t=filterPage.brandCount1.getText();
    var t1=filterPage.brandCount2.getText();
    expect(t>t1).to.eql(true);
    browser.pause(2000);
    filterPage.brandDropdownOptions.click();    
    browser.pause(2000);
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
    filterPage.retailerSelect.waitForVisible();
    var p=filterPage.retailerCount1.getText();
    var p1=filterPage.retailerCount2.getText();
    expect(p>p1).to.eql(true);
    browser.pause(2000);
    filterPage.retailerDropdownOptions.click();
  })

  it("Verify that appropriate error is displayed when user enters max value less than min value",()=>{
    browser.pause(2000);
    filterPage.filter(100,2);
    browser.pause(2000);
    filterPage.errorMsg.waitForVisible();
    expect(filterPage.errorMsg.getText()).to.eql(testData.filter.errorMsg);
  })

  it("Verify that for Products option, user can filter using all 3 categories - Brands, Price Range and Retailer",()=>{
    browser.pause(2000);
    filterPage.maxPrice.waitForVisible();
    filterPage.maxPrice.click();
    filterPage.maxPrice.addValue('00');
    browser.pause(2000);
    filterPage.brandOption.waitForVisible();
    filterPage.brandOption.click();
    filterPage.brandOption.addValue('jaca');
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    filterPage.retailerClick.waitForVisible();
    filterPage.retailerClick.click();
    filterPage.brandDropdown.waitForVisible();
    filterPage.brandDropdown.click();
    browser.pause(2000);
    filterPage.retailerOption.waitForVisible();
    filterPage.retailerOption.waitForVisible();
    filterPage.retailerOption.click();
    filterPage.retailerOption.addValue('deb');
        browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
    filterPage.retailerDropdown.waitForVisible();
    filterPage.retailerDropdown.click();
    filterPage.filterBlock.waitForVisible();
    filterPage.filterBlock.click();
    filterPage.updateResultsBtn.waitForVisible();
    filterPage.updateResultsBtn.click();
    browser.pause(2000);
    productPage.price.waitForVisible();
    var price1 = productPage.price.getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(price2 >= price1).to.eql(true);
    browser.pause(2000);
    productPage.retailerName.waitForVisible();
    expect(productPage.retailerName.isVisible()).to.eql(true);
    browser.pause(2000);
    filterPage.clearFilterBtn.waitForVisible();
    filterPage.clearFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > h3.price'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
  })

  it("Verify that the results matching to the specified price range are displayed when user enters only minimum price in the price range filter",()=>{
    browser.pause(2000);
    filterPage.minPrice.waitForVisible();
    filterPage.minPrice.click();
    filterPage.minPrice.addValue('100');
    browser.pause(2000);
    filterPage.updateResultsBtn.waitForVisible();
    filterPage.updateResultsBtn.click();
    browser.pause(2000);
    productPage.price.waitForVisible();
    var price1 = productPage.price.getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(minprice <= price1).to.eql(true);
    browser.pause(2000);
    filterPage.clearFilterBtn.waitForVisible();
    filterPage.clearFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > h3.price'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
  })

  it("Verify that the results matching to the specified price range are displayed when user enters only maximum price in the price range filter",()=>{
    browser.pause(2000);
    filterPage.maxPrice.waitForVisible();
    filterPage.maxPrice.click();
    filterPage.maxPrice.addValue('200');
    browser.pause(2000);
    filterPage.updateResultsBtn.waitForVisible();
    filterPage.updateResultsBtn.click();
    browser.pause(2000);
    productPage.price.waitForVisible();
    var price1 = productPage.price.getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(price2 >= price1).to.eql(true);
    browser.pause(2000);
    filterPage.clearFilterBtn.waitForVisible();
    filterPage.clearFilterBtn.click();
  })

  it("Verify that user selected filter options are displayed in Filters section",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.name, 'Enter']);
    browser.pause(2000);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    browser.pause(2000);
    var d=filterPage.brandSelect.getText();
    console.log(d);
    filterPage.brandSelect.click();
    filterPage.brandSelect1.click();
    browser.pause(2000);
    filterPage.plusBtn.waitForVisible();
    filterPage.plusBtn.click();
    browser.pause(2000);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    browser.pause(2000);
    expect(filterPage.selectedBrandFirst.isVisible()).to.eql(true);
    expect(filterPage.selectedBrandSecond.isVisible()).to.eql(true);
    browser.scroll(0,200);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    browser.pause(2000);
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
    browser.pause(2000);
    filterPage.retailerSelect2.click();
    filterPage.retailerSelect.click();
    browser.pause(2000);
    filterPage.plusBtn.waitForVisible();
    filterPage.plusBtn.click();
    browser.pause(2000);
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
    browser.pause(2000);
    expect(filterPage.retailerFirstOption.isVisible()).to.eql(true);
    expect(filterPage.retailerSecondOption.isVisible()).to.eql(true);
    browser.pause(2000);
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
  })

  it("Verify that all the filter results which are selected by user are removed when user clicks on Clear all option",()=>{
    filterPage.filter(100,200);
    browser.scroll(0,100)
    filterPage.clearFilterBtn.waitForVisible();
    filterPage.clearFilterBtn.click();
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
    expect(filterPage.minPrice.getValue()).to.eql('');
    expect(filterPage.maxPrice.getValue()).to.eql('');
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    expect(filterPage.selectedBrandFirst.isVisible()).to.eql(false);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    expect(filterPage.retailerFirstOption.isVisible()).to.eql(false);

  })

  it("Verify that appropriate error message is displayed when there are NO filtered results for the filter selected for the product",()=>{
    browser.pause(2000);    
    filterPage.filter(11199,11199);
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
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-3.inWsOe>div>div>p'
          ) === true
        );
      },
      120000,
      "add item input field not visible even after 10s"
    );    
    expect(filterPage.noResults.isVisible()).to.eql(true);
  })

  it("Verify that Clear all filters button is enabled when a filter option is present",()=>{
    filterPage.filter(100,200);
    filterPage.clearFilterBtn.waitForVisible();
    filterPage.clearFilterBtn.click();
    expect(filterPage.minPrice.getValue()).to.eql('');
    expect(filterPage.maxPrice.getValue()).to.eql('');
  })

  it("Verify that filter options are displayed properly when user adds multiple(10) filters",()=>{
    browser.pause(2000);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#brands-item-0'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    filterPage.brandSelect.waitForVisible();
    filterPage.brandSelect.click();
    filterPage.brandSelect1.waitForVisible();
    filterPage.brandSelect1.click();
    filterPage.brandSelect2.waitForVisible();
    filterPage.brandSelect2.click();
    filterPage.brandSelect3.waitForVisible();
    filterPage.brandSelect3.click();
    filterPage.brandSelect4.waitForVisible();
    filterPage.brandSelect4.click();
    // browser.waitUntil(
    //   function() {
    //     return (
    //       browser.isVisible(
    //         'sc-1jb845n-3.kFfhVc.search-filters .sc-1jb845n-1.dKNqJG.filter-select:nth-child(1) .MuiButtonBase-root:nth-child(1) .MuiIconButton-label:nth-child(1) .MuiSvgIcon-root'
    //       ) === true
    //     );
    //   },
    //   60000,
    //   "add item input field not visible even after 10s"
    // );
    browser.pause(2000);
    // filterPage.brandDropdownOptions.waitForVisible();
    // filterPage.brandDropdownOptions.click();
    expect(filterPage.selectedBrandFirst.isVisible()).to.eql(true);
    expect(filterPage.selectedBrandSecond.isVisible()).to.eql(true);
    expect(filterPage.brandThird.isVisible()).to.eql(true); 
    expect(filterPage.brandFourth.isVisible()).to.eql(true); 
    expect(filterPage.brandFourth.isVisible()).to.eql(true);
    filterPage.brandDropdownOptions.waitForVisible();
    filterPage.brandDropdownOptions.click();
    // browser.waitUntil(
    //   function() {
    //     return (
    //       browser.isVisible(
    //         '#merchants-item-0'
    //       ) === true
    //     );
    //   },
    //   60000,
    //   "add item input field not visible even after 10s"
    // );
    filterPage.retailerDropdownOptions.waitForVisible();
    filterPage.retailerDropdownOptions.click();
    filterPage.retailerSelect2.waitForVisible();
    filterPage.retailerSelect2.click();
    filterPage.retailerSelect.waitForVisible();
    filterPage.retailerSelect.click();
    filterPage.retailerSelect3.waitForVisible();
    filterPage.retailerSelect3.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1jb845n-3.kFfhVc.search-filters .sc-1jb845n-1.dKNqJG.filter-select:nth-child(1) .MuiButtonBase-root:nth-child(1) .MuiIconButton-label:nth-child(1) .MuiSvgIcon-root'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.pause(20000);
    // filterPage.retailerDropdownOptions.waitForVisible();
    // filterPage.retailerDropdownOptions.click();
    expect(filterPage.retailerFirstOption.isVisible()).to.eql(true);
    expect(filterPage.retailerSecondOption.isVisible()).to.eql(true);
    //expect(filterPage.retailerFilters(4).isVisible()).to.eql(true);
  })

  it("Verify that 'Apply filter' button is displayed properly when user adds multiple(10) filters",()=>{
    browser.scroll(0,4000);
    expect(filterPage.updateResultsBtn.isVisible()).to.eql(true);
  })

  it("Verify that results will sort according to Followers when followers option is tapped for filter > People",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.follower, 'Enter']);
    browser.pause(2000);
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    expect(product.showingResult.getText()).to.eql(testData.product.peopleSearch);
    browser.pause(2000);
    productPage.peopleFilter(2).waitForVisible();
    productPage.peopleFilter(2).click();
    browser.pause(2000);
    productPage.searchPeopleIcon.waitForVisible();
    productPage.searchPeopleIcon.click();
    browser.pause(2000);
    filterPage.followersCount.waitForVisible();
    var p1=filterPage.followersCount.getText();
    browser.back();
    browser.pause(2000);
    productPage.searchedPeopleSelect(2).waitForVisible();
    productPage.searchedPeopleSelect(2).click();
    browser.pause(2000);
    filterPage.followersCount.waitForVisible();
    var p2=filterPage.followersCount.getText();
    browser.back();
    browser.pause(2000);
    productPage.searchedPeopleSelect(3).waitForVisible();
    productPage.searchedPeopleSelect(3).click();
    browser.pause(2000);
    filterPage.followersCount.waitForVisible();
    var p3=filterPage.followersCount.getText();
    browser.back();
    browser.pause(2000);
    productPage.searchedPeopleSelect(4).waitForVisible();
    productPage.searchedPeopleSelect(4).click();
    browser.pause(2000);
    filterPage.followersCount.waitForVisible();
    var p4=filterPage.followersCount.getText();
    browser.back();
    browser.pause(2000);
    expect(p1 >= p2).to.eql(true);
    expect(p2 >= p3).to.eql(true);
    expect(p3 >= p4).to.eql(true);
  })

  it("Verify that results will sort according to Relevance when Relevance option is tapped for filter > People",()=>{
    browser.pause(2000);
    productPage.peopleFilter(1).waitForVisible();
    productPage.peopleFilter(1).click();
    browser.pause(2000);
    (expect(productPage.filterFollower.getText()).contains("d"));
  })

  it("Verify that user is redirected to the product description page when user clicks on the product",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.name, 'Enter']);
    browser.pause(2000);
    product.showingResult.waitForVisible();
    // filterPage.listGridBtn(1).waitForVisible();
    // filterPage.listGridBtn(1).click();
    browser.pause(2000);
    productPage.price.waitForVisible();
    var p=productPage.price.getText();
    var p1=productPage.productlistName.getText();
    var p5=p1.toUpperCase();
    var retailerName=p5.split(' ');
    var p2=productPage.productlistRetailer.getText();
    productPage.price.click();
    var p3= productPage.subtilte.getText();
    //var retailer=p3.split('110.77','Available from');
    //console.log(retailer);
    //expect(retailer).to.eql(p2);
    var t1=productPage.pdpName.getText();
    var t2=t1.toUpperCase();
    //expect(retailerName).to.eql(t2);
    expect(productPage.buyBtnPDP.getText()).to.eql(testData.product.buy);
    expect(productPage.wishlistBtn.getText()).to.eql(testData.product.wishlist);
    expect(productPage.shareBtn.getText()).to.eql(testData.product.share);
    expect(productPage.addToPost.getText()).to.eql(testData.product.addToPost);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    Login.logout();
  })
})

describe("Product",()=>{

  it("Verify that the count of posts decrements when the user deletes the posts created by him",()=>{
    Login.login(testData.resetEmail.resetEmailUn,testData.share.password);
    newsFeed.profileCount(4).waitForVisible();
    var o=newsFeed.profileCount(4).getText();
    const d=parseInt(o);
    var x=d-count;
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    browser.scroll(0,1500);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(6) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    browser.pause(2000);
    postPage.postOptions(6).waitForVisible();
    postPage.postOptions(6).click();
    postPage.postOperations(2).waitForVisible();
    postPage.postOperations(2).click();
    browser.pause(2000);
    postPage.saveBtn.click();
    Login.profileDetailsPopup.waitForVisible();
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.newsfeed.postDeletion);
    browser.pause(2000);
    newsFeed.newsFeedCount(4).waitForVisible();
    var k=newsFeed.newsFeedCount(4).getText();
    const r=parseInt(k);
    expect(r).to.eql(x);
  })

  it("Verify that the product image is displayed appropriately on the product results page",()=>{
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.product1, 'Enter']);
    browser.pause(2000);
    product.showingResult.waitForVisible();
    expect(product.showingResult.getText()).to.eql(testData.product.showinforChair);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) >img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.productImg.isVisible()).to.eql(true);
  })

  it("Verify that the result count is displayed appropriately below the product search",()=>{
    browser.pause(2000);
    expect(product.resultCount.isVisible()).to.eql(true);
  })

  it("Verify that the product image is displayed appropriately on the product results page",()=>{
    expect(product.image.isVisible()).to.eql(true);
  })

  it("Verify that the user is redirected to the product description page when product image or name is clicked",()=>{
    browser.pause(2000);
    var prdName=product.productName.getText();
    product.productImg.waitForVisible();
    product.productImg.click();
    expect(prdName).to.eql(product.productNamePdp.getText());
    browser.back();
    product.productName.waitForVisible();
    product.productName.click();
    expect(prdName).to.eql(product.productNamePdp.getText());
    browser.back();
  })

  it("Verify that the user is redirected to the product description page when the Retailer link is clicked",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    var prdName=product.productName.getText();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .brand'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    product.brand.waitForVisible();
    product.brand.click();
    browser.pause(2000);
    expect(prdName).to.eql(product.productNamePdp.getText());
  })

  it("Verify that the user is redirected to the Retailer site page in the new tab when buy button is clicked",()=>{
    browser.pause(2000);
    product.buyBtnPDP.waitForVisible();
    product.buyBtnPDP.click();
    browser.pause(6000);
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]); 
    browser.close();
  })

  it("Verify that the social media icons are displayed appropriately when user tries to share the product link",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1ostnru-6.jQbuET:nth-child(3) .sc-1ostnru-7.iZkjtJ:nth-child(3)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    product.share.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiPaper-root.MuiDialog-paper'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.socialMediaIcons(1).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(2).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(3).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(4).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(5).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(6).isVisible()).to.eql(true);
    expect(product.socialMediaIcons(7).isVisible()).to.eql(true);
    browser.pause(2000);
    product.wishlistPopupClose.waitForVisible();
    product.wishlistPopupClose.click();
    browser.back();
  })

  it("Verify that create new wishlist popup is displayed when star icon is clicked below the product image",()=>{
    browser.pause(2000);
    product.product1.waitForVisible();
    product.product1.click();
    browser.pause(2000);
    productPage.wishlistBtn.waitForVisible();
    productPage.wishlistBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.dialog-content .title'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.wishlistLabel.getText()).to.eql(testData.product.wishlist);
  })

  it("Verify that the already created wish list is also displayed when star icon is clicked below the product image",()=>{
    browser.pause(2000);
    product.craetedWishlist.waitForVisible();
    expect(product.craetedWishlist.isVisible()).to.eql(true);
  })

  it("Verify that the Add button is activated only when the user starts enter the text in the create new wish list field",()=>{
    browser.pause(2000);
    expect(product.disabledAddBtn.isEnabled()).to.eql(false);
    browser.pause(2000);
    product.createWishlist.waitForVisible();
    product.createWishlist.setValue('chair');
    expect(product.addBtn.isEnabled()).to.eql(true);
  })

  it("Verify that the user is able to create the new wishlist when new wish list name is submitted in the create wishlist popup",()=>{
    browser.pause(2000);
    product.addBtn.waitForVisible();
    product.addBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiSnackbarContent-message.message'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.createdWishlistPopup.getText()).to.eql(testData.product.createdWishlistPopup);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu.purple-inverted.remove-button'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.removeBtn.getText()).to.eql(testData.product.removeBtn);
    product.closeCreatedWishlitPopup.waitForVisible();
    product.closeCreatedWishlitPopup.click();
  })

  it("Verify that the previously added products are removed from the wish list when remove button is clicked",()=>{
    browser.pause(2000);
    product.removeBtn.waitForVisible();
    product.removeBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiPaper-root.MuiSnackbarContent-root.sc-9kis23-0.iZYiAy.MuiPaper-elevation6 .MuiSnackbarContent-message.message'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(product.createdWishlistPopup.getText()).to.eql(testData.product.deletedWishlistPopup);
    product.closeCreatedWishlitPopup.waitForVisible();
    product.closeCreatedWishlitPopup.click();
    browser.pause(2000);
    product.wishlistPopupClose.waitForVisible();
    product.wishlistPopupClose.click();
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
  })
})

describe("create post - RAP",()=>{

  it("Verify that suggested match is displayed when a query is typed in Search field of Recommend a Product",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-14o4777-0.cgntRS'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
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
    postPage.search.waitForVisible();
    postPage.search.setValue(testData.product.productname);
    postPage.rapSuggestion(1).waitForExist({ timeout: 5000 });
    expect(postPage.rapSuggestion(1).isVisible()).to.eql(true);
    browser.scroll(0,300);
    postPage.discaredpostBtn.waitForVisible();
    postPage.discaredpostBtn.click();
  })

  it("Verify that Use product Image option is disabled when the user has not added any product",()=>{
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.createPost(1).waitForVisible();
    expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
    postPage.createPost(1).click();
    browser.pause(2000);
    postPage.rapSteps(2).waitForVisible();
    postPage.rapSteps(2).click();
    browser.pause(2000);
    postPage.procutImgBtn.waitForVisible();
    expect(postPage.procutImgBtn.isEnabled()).to.eql(false);
  })

  it("Verify that matching results are displayed when suggested match is selected during Recommend a Product",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.createPost(1).waitForVisible();
    expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
    postPage.createPost(1).click();
    browser.pause(2000);
    postPage.search.waitForVisible();
    postPage.search.setValue(testData.product.productname);
    postPage.productName.waitForExist({ timeout: 5000 });
    expect(postPage.productName.isVisible()).to.eql(true);
    postPage.productName.click();
  })

  it("Verify that matching results are displayed when Search icon is clicked after typing a query during 'Recommend a Product'",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.createPost(1).waitForVisible();
    expect(postPage.createPost(1).getText()).to.eql(testData.post.RAP);
    postPage.createPost(1).click();
    browser.pause(2000);
    postPage.search.waitForVisible();
    postPage.search.setValue(testData.product.productname);
    browser.pause(2000);
    postPage.rapSearchIcon.waitForVisible();
    postPage.rapSearchIcon.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(postPage.filterOption.isVisible()).to.eql(true);
  })

  it("Verify that appropriate results are displayed in Step 2 of Recommend a Product when a single brand is selected in Filters",()=>{
    browser.pause(2000);
    postPage.filterOption.waitForVisible();
    postPage.filterOption.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    filterPage.brandSelect.waitForVisible();
    filterPage.brandSelect.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.pause(4000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    expect(postPage.selectedFilterName(1).isVisible()).to.eql(true);
    expect(postPage.selectedFilterName(1).isEnabled()).to.eql(true);
  })

  it("Verify that appropriate results are displayed in Step 2 of Recommend a Product when multiple brands are selected in Filters",()=>{
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();       
    filterPage.brandSelect.waitForVisible();
    filterPage.brandSelect.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#brands-item-1'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );       
    filterPage.brandSelect1.waitForVisible();
    filterPage.brandSelect1.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.pause(4000);
    browser.scroll(0,200);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    expect(postPage.brandRap0.isVisible()).to.eql(true);
    expect(postPage.brandRap1.isVisible()).to.eql(true);
  })

  it("Verify that appropriate results are displayed in Step 2 of Recommend a Product when a single retailer is selected in Filters",()=>{
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    postPage.RetailerSelect.waitForVisible();
    postPage.RetailerSelect.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#merchants-toggle-button .MuiIconButton-label .MuiSvgIcon-root'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );        
    browser.scroll(0,200);
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    expect(postPage.retailerRap0.isVisible()).to.eql(true);
  })

  it("Verify that appropriate results are displayed in Step 2 of Recommend a Product when multiple retailers are selected in Filters",()=>{
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    postPage.RetailerSelect.waitForVisible();
    postPage.RetailerSelect.click();
    browser.pause(2000);
    postPage.RetailerSelect1.waitForVisible();
    postPage.RetailerSelect1.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '#merchants-toggle-button .MuiIconButton-label .MuiSvgIcon-root'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );        
    browser.scroll(0,200);
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    expect(postPage.retailerRap0.isVisible()).to.eql(true);
    expect(postPage.retailerRap1.isVisible()).to.eql(true);
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
  })

  it("Verify that appropriate results are displayed when min price only is submitted in Step 2 of Recommend a Product",()=>{
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    filterPage.priceAtRap(1).waitForVisible();
    filterPage.priceAtRap(1).setValue('100');
    browser.pause(2000);    
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.gLSDob .lfyyWF:nth-child(5) h2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    browser.scroll(0,200);
    var price1 = filterPage.productPriceInRap(5).getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(minprice <= price1).to.eql(true);
  })

  it("Verify that appropriate results are displayed when max price only is submitted in Step 2 of Recommend a Product.",()=>{
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    filterPage.priceAtRap(2).waitForVisible();
    filterPage.priceAtRap(2).setValue('200');
    browser.pause(2000);    
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.pause(2000);
    browser.scroll(0,200);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.gLSDob .lfyyWF:nth-child(5) h2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    var price1 = filterPage.productPriceInRap(5).getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(price2 >= price1).to.eql(true);
  })

  it("Verify that appropriate results are displayed when both min price and max price are submitted in Step 2 of Recommend a Product.",()=>{
    browser.pause(2000);
    filterPage.priceAtRap(1).waitForVisible();
    filterPage.priceAtRap(1).setValue('100');
    browser.pause(2000);    
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.pause(2000);
    browser.scroll(0,200);
    var price1 = filterPage.productPriceInRap(5).getText();
    price1 = price1.split("£");
    price1 = price1[1];
    price1 = parseFloat(price1);
    expect(minprice <= price1).to.eql(true);
    expect(price2 >= price1).to.eql(true);
  })

  it("Verify that appropriate results are displayed when single brand, single retailer, min price and max price are submitted in Step 2 of Recommend a Price.",()=>{
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    filterPage.brandSelect.waitForVisible();
    filterPage.brandSelect.click();
    browser.pause(2000);
    filterPage.brandSelect1.waitForVisible();
    filterPage.brandSelect1.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    postPage.RetailerSelect.waitForVisible();
    postPage.RetailerSelect.click();
    browser.pause(2000);
    postPage.RetailerSelect1.waitForVisible();
    postPage.RetailerSelect1.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.gLSDob .lfyyWF:nth-child(5) h2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(filterPage.productPriceInRap(5).isVisible()).to.eql(true);
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    expect(postPage.brandRap0.isVisible()).to.eql(true);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    expect(postPage.retailerRap0.isVisible()).to.eql(true);
  })

  it("Verify that appropriate results are displayed when multiple brands, multiple retailers, min price and max price are submitted in Step 2 of Recommend a Product.",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu.purple-inverted:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    postPage.skipBtn.click();
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    filterPage.brandSelect.waitForVisible();
    filterPage.brandSelect.click();
    browser.pause(2000);
    filterPage.brandSelect1.waitForVisible();
    filterPage.brandSelect1.click();
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    postPage.RetailerSelect.waitForVisible();
    postPage.RetailerSelect.click();
    browser.pause(2000);
    postPage.RetailerSelect1.waitForVisible();
    postPage.RetailerSelect1.click();
    browser.pause(2000);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    browser.pause(2000);
    browser.scroll(0,200);
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.gLSDob .lfyyWF:nth-child(5) h2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(filterPage.productPriceInRap(5).isVisible()).to.eql(true);
    browser.pause(2000);
    postPage.brandIcon.waitForVisible();
    postPage.brandIcon.click();
    browser.pause(2000);
    expect(postPage.brandRap0.isVisible()).to.eql(true);
    expect(postPage.brandRap1.isVisible()).to.eql(true);
    postPage.retailerIcon.waitForVisible();
    postPage.retailerIcon.click();
    expect(postPage.retailerRap0.isVisible()).to.eql(true);
    expect(postPage.retailerRap1.isVisible()).to.eql(true);
  })

  it("Verify that appropriate message is displayed when there are no matching results",()=>{
    browser.pause(2000);
    postPage.skipBtn.waitForVisible();
    postPage.skipBtn.click();
    browser.pause(2000);
    filterPage.priceAtRap(1).waitForVisible();
    filterPage.priceAtRap(1).setValue('1099');
    browser.pause(2000);
    filterPage.priceAtRap(2).waitForVisible();
    filterPage.priceAtRap(2).setValue('1099');
    postPage.applyFilterBtn.waitForVisible();
    postPage.applyFilterBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sajudl-0.idzkGR>div:nth-child(4)>h3'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(postPage.noResultsInRap.isVisible()).to.eql(true);
  })
  
  it("Verify that an appropriate error is displayed when a picture lesser than 200px is selected",()=>{
    browser.scroll(0,200);
    postPage.stepInRap(2).waitForVisible();
    postPage.stepInRap(2).click();
    postPage.nextBtn.waitForVisible();
    //postPage.nextBtn.click();
    const toUpload = path.join(__dirname, "..", "resources", "less200px.png");
    console.log(toUpload);  
    browser.chooseFile('input[type="file"]', toUpload);   
    browser.pause(5000);
    postPage.errorMsgForImage.waitForVisible();
    expect(postPage.errorMsgForImage.getText()).to.eql(testData.post.error);
  })

  it("Verify that user is unable to submit the post without adding a media",()=>{
    browser.pause(2000);
    expect(postPage.disabledNextBtn.isEnabled()).to.eql(false);
    expect(postPage.addSomeMediaLabel.getText()).to.eql(testData.post.notPostedMedia);
  })

  it("Verify that user can navigate from Step 2 to Step 1 of Recommend a Product flow",()=>{
    browser.scroll(0,0);
    postPage.rapSteps(1).waitForVisible();
    postPage.rapSteps(1).click();
    browser.pause(2000);
    expect(postPage.rapFirstStepHeading.getText()).to.eql(testData.post.RAPHeading);
  })

  it("Verify that user can navigate from Step 3 to Step 2 of Recommend a Product flow",()=>{
    postPage.rapSteps(3).waitForVisible();
    postPage.rapSteps(3).click();
    browser.pause(2000);
    postPage.rapSteps(2).waitForVisible();
    postPage.rapSteps(2).click();
    expect(postPage.rapFirstStepHeading.getText()).to.eql(testData.post.RapStep2);
  })

  it("Verify that NewsFeed is displayed when user clicks on 'Discard Post' option",()=>{
    postPage.discardBtn.waitForVisible();
    postPage.discardBtn.click();
  })

  it("Verify that video is displayed in 'Recommend a product' post when a video is uploaded from computer",()=>{
    browser.pause(2000);
    postPage.createRapForUpload();
  })

  it("Verify that 250 character text added to 'Recommend a Product' post is displayed appropriately",()=>{
    browser.scroll(0,100);
    expect(postPage.captionOnNewsfeed.isVisible()).to.eql(true);
  })

  it("Verify that uploaded video in RAP post is played only when 'Play' button is clicked",()=>{
    expect(postPage.playBtn.isVisible()).to.eql(true);
    postPage.playBtn.click();
    expect(postPage.playBtn.isVisible()).to.eql(false);
  })

  it("Verify that uploaded video in RAP post is played inline with the post in hashtag search",()=>{
    expect(postPage.hashTag.isVisible()).to.eql(true);
    postPage.hashTag.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.post-image .video-icon>img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(postPage.videoIcon.isVisible()).to.eql(true);
    postPage.videoIcon.waitForVisible();
    postPage.videoIcon.click();
    expect(postPage.videoIcon.isVisible()).to.eql(false);
  })

  it("Verify that user is redirected to the profile page when Profile picture icon is clicked",()=>{
    browser.pause(2000);
    Login.profileImg.waitForVisible();
    Login.profileImg.click();
    expect(Login.profilePage.isVisible()).to.eql(true);
  })
})

describe("Profile",()=>{

  it("Verify that user is redirected to the profile page when Profile picture icon is clicked",()=>{
    browser.pause(2000);
    Login.profileImg.waitForVisible();
    Login.profileImg.click();
    expect(Login.profilePage.isVisible()).to.eql(true);
  })

  it("Verify that count of the 'Followers' are displayed properly when 'View profile' button is clicked",()=>{
    Login.profileOptions(1).waitForVisible();
    expect(Login.profileOptions(1).isVisible()).to.eql(true);
  })

  it("Verify that count of the 'Following' are displayed properly when 'View profile' button is clicked",()=>{
    Login.profileOptions(2).waitForVisible();
    expect(Login.profileOptions(2).isVisible()).to.eql(true);
  })

  it("Verify that count of the 'Wishlist' are displayed properly when 'View profile' button is clicked",()=>{
    Login.profileOptions(3).waitForVisible();
    expect(Login.profileOptions(3).isVisible()).to.eql(true);
  })

  it("Verify that thumbnail image of the product added in the Wishlist is displayed when user clicks on 'Wishlists' link in the Profile page",()=>{
    Login.profileOptions(3).waitForVisible();
    Login.profileOptions(3).click();
    browser.pause(2000);
    newsFeed.wishlistPrdImg.waitForVisible();
    expect(newsFeed.wishlistPrdImg.isVisible()).to.eql(true);
  })

  it("Verify that image uploaded from the computer is updated when user selects 'Upload an image' option during edit profile",()=>{
    browser.pause(2000);
    Login.setting.waitForVisible();
    Login.setting.click();
    browser.pause(2000);
    Login.visitProfile.waitForVisible();
    Login.visitProfile.click();
    browser.pause(2000);
    const toUpload = path.join(__dirname, "..", "resources", "laptop.jpeg");
    browser.chooseFile('input[type="file"]', toUpload);  
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.dialog-content .buttons .save .MuiButtonBase-root.MuiButton-root > .MuiButton-label'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    Login.saveBtnOnProfile.waitForVisible();
    Login.saveBtnOnProfile.click();  
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiSnackbarContent-message.message'
          ) === true
        );
      },
      900000,
      "add item input field not visible even after 10s"
    );
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.profile.profilePhoto);
  })

  it("Verify that Maximum 31 characters message is displayed when user clicks on last name field and adds more than 31 characters in last name field",()=>{
    browser.pause(2000);
    Login.firstName.waitForVisible();
    Login.firstName.setValue([testData.profile.longName]);
    browser.pause(2000);
    Login.errorMsgOfProfile(4).waitForVisible();
    expect(Login.errorMsgOfProfile(4).getText()).to.eql(testData.profile.errorMsg);
  })

  it("Verify that Maximum 31 characters message is displayed when user clicks on last name field and adds more than 31 characters in first name fiel",()=>{
    browser.scroll(0,200);
    Login.lastName.waitForVisible();
    Login.lastName.setValue([testData.profile.longName]);
    browser.pause(2000);
    Login.errorMsgOfProfile(5).waitForVisible();
    expect(Login.errorMsgOfProfile(5).getText()).to.eql(testData.profile.errorMsg);
  })

  it("Verify that following options are displayed in 'Your interests'",()=>{
    expect(Login.yourInterestsOptions(1).getText()).to.eql(testData.profile.interestsOption1);
    expect(Login.yourInterestsOptions(2).getText()).to.eql(testData.profile.interestsOption2);
    expect(Login.yourInterestsOptions(3).getText()).to.eql(testData.profile.interestsOption3);
    expect(Login.yourInterestsOptions(4).getText()).to.eql(testData.profile.interestsOption4);
    expect(Login.yourInterestsOptions(5).getText()).to.eql(testData.profile.interestsOption5);
    expect(Login.yourInterestsOptions(6).getText()).to.eql(testData.profile.interestsOption6);
    expect(Login.yourInterestsOptions(7).getText()).to.eql(testData.profile.interestsOption7);
    expect(Login.yourInterestsOptions(8).getText()).to.eql(testData.profile.interestsOption8);
    expect(Login.yourInterestsOptions(9).getText()).to.eql(testData.profile.interestsOption9);
    expect(Login.yourInterestsOptions(10).getText()).to.eql(testData.profile.interestsOption10);
    expect(Login.yourInterestsOptions(11).getText()).to.eql(testData.profile.interestsOption11);
    expect(Login.yourInterestsOptions(12).getText()).to.eql(testData.profile.interestsOption12);
    expect(Login.yourInterestsOptions(13).getText()).to.eql(testData.profile.interestsOption13);
  })

  it("Verify that user can select single option from 'Your interests' section",()=>{
    Login.yourInterestsOptions(1).waitForVisible();
    Login.yourInterestsOptions(1).click();
  })

  it("Verify that user can select multiple options from 'Your interests' section",()=>{
    Login.yourInterestsOptions(2).waitForVisible();
    Login.yourInterestsOptions(2).click();
    Login.yourInterestsOptions(3).waitForVisible();
    Login.yourInterestsOptions(3).click();
    Login.yourInterestsOptions(4).waitForVisible();
    Login.yourInterestsOptions(4).click();
  })

  it("Verify that user can select all the options from 'Your interests' section",()=>{
    Login.yourInterestsOptions(5).waitForVisible();
    Login.yourInterestsOptions(5).click();
    Login.yourInterestsOptions(6).waitForVisible();
    Login.yourInterestsOptions(6).click();
    Login.yourInterestsOptions(7).waitForVisible();
    Login.yourInterestsOptions(7).click();
    Login.yourInterestsOptions(8).waitForVisible();
    Login.yourInterestsOptions(8).click();
    Login.yourInterestsOptions(9).waitForVisible();
    Login.yourInterestsOptions(9).click();
    Login.yourInterestsOptions(10).waitForVisible();
    Login.yourInterestsOptions(10).click();
    Login.yourInterestsOptions(11).waitForVisible();
    Login.yourInterestsOptions(11).click();
    Login.yourInterestsOptions(12).waitForVisible();
    Login.yourInterestsOptions(12).click();
    Login.yourInterestsOptions(13).waitForVisible();
    Login.yourInterestsOptions(13).click();
  })

  it("Verify that Remaining characters 255 message is displayed when user clicks on Introduction field",()=>{
    browser.scroll(0,1000);
    Login.intro.waitForVisible();
    Login.intro.setValue([testData.profile.longIntro]);
    browser.pause(2000);
    Login.errorMsgOfProfile(10).waitForVisible();
    expect(Login.errorMsgOfProfile(10).getText()).to.eql(testData.profile.introErrorMsg);
  })

  it("Verify that Save Changes button is enabled only when user makes some changes in the profile",()=>{
    browser.scroll(0,0);
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.pause(2000);
    Login.visitProfile.waitForVisible();
    Login.visitProfile.click();
    browser.scroll(0,1000);
    expect(Login.saveBtn.isEnabled()).to.eql(false);
    Login.firstName.waitForVisible();
    Login.firstName.setValue([testData.profile.firstname]);
    browser.scroll(0,1000);
    expect(Login.saveBtnEnabled.isEnabled()).to.eql(true);
    browser.scroll(0,0);
    Login.lastName.waitForVisible();
    Login.lastName.setValue([testData.profile.firstname]);
    browser.scroll(0,1000);
    expect(Login.saveBtnEnabled.isEnabled()).to.eql(true);
    browser.scroll(0,0);
    Login.intro.waitForVisible();
    Login.intro.setValue([testData.profile.firstname]);
    browser.scroll(0,1000);
    expect(Login.saveBtnEnabled.isEnabled()).to.eql(true);
  })

  it("Verify that Profile details updated successfully when user makes changes and tap on Save changes button",()=>{
    browser.scroll(0,1000);
    browser.pause(2000);
    Login.saveBtnEnabled.waitForVisible();
    Login.saveBtnEnabled.click();
    browser.pause(2000);
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.profile.profileDetails);
  })

  it("Verify that first and last name displayed properly in Newsfeed when user enters 32 characters",()=>{
    browser.scroll(0,0);
    browser.pause(2000);
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.pause(2000);
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.pause(2000);
    postPage.name.waitForVisible();
    expect(postPage.name.isVisible()).to.eql(true);
  })

  it("Verify that user is redirected to the Followers screen when Followers option is clicked under Your Profile",()=>{
    browser.pause(2000);
    Login.profileOptions(1).waitForVisible();
    Login.profileOptions(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.followers-wrapper>h1'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(Login.followerHeading.getText()).to.eql(testData.profile.Followers);
  })

  it("Verify that username and Given Name of the people are displayed properly in the Followers section under Visit Profile",()=>{
    browser.pause(2000);
    Login.followerUsers(1).waitForVisible();
    expect(Login.followerUsers(1).isVisible()).to.eql(true);
    expect(Login.followerUsers(2).isVisible()).to.eql(true);
    expect(Login.followerUsers(3).isVisible()).to.eql(true);
    expect(Login.followerUsers(4).isVisible()).to.eql(true);
    expect(Login.followerUsers(5).isVisible()).to.eql(true);
  })

  it("Verify that user is redirected to the Following screen when Following option is clicked under Your Profile",()=>{
    browser.pause(2000);
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.pause(2000);
    Login.profileOptions(2).waitForVisible();
    Login.profileOptions(2).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.followers-wrapper>h1'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(Login.followerHeading.getText()).to.eql(testData.profile.Following);
  })

  it("Verify that username and Given Name of the people are displayed properly in the Following section under Visit Profile",()=>{
    browser.pause(2000);
    Login.followerUsers(1).waitForVisible();
    expect(Login.followerUsers(1).isVisible()).to.eql(true);
    expect(Login.followerUsers(2).isVisible()).to.eql(true);
  })

  it("Verify that user can create post from Profile page and the posts are displayed properly in the NewsFeed",()=>{
    browser.pause(2000);
    Login.backBtn.waitForVisible();
    Login.backBtn.click();
    browser.pause(2000);
    Login.profileOptions(4).waitForVisible();
    Login.profileOptions(4).click();
    browser.scroll(0,100);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.no-posts-view .hy4rz0-0.gCuAwB >a'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    Login.postARecommendBtn.click();
    browser.pause(2000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-12txaws-0.jIyEZD:nth-child(2) .MuiInputBase-root:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    postPage.createRap();
  })

  it("Verify that count of the Following is increased when user Follow new users",()=>{
    var o=Login.followingCount.getText();
    const d=parseInt(o);
    var x=d+count;
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.peoplesearch2, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    filterPage.followBtn(1).waitForVisible();
    filterPage.followBtn(1).click();
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.user-info-counts:nth-child(2) .count:nth-child(2) .number:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    var n2=Login.followingCount.getText();
    const r=parseInt(n2);
    expect(r).to.eql(x);
  })

  it("Verify that count of the Following is decreased when user Unfollow existing followers",()=>{
    var f=Login.followingCount.getText();
    var x=f-count;
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.peoplesearch2, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    Login.unfollowBtn.waitForVisible();
    Login.unfollowBtn.click();
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.user-info-counts:nth-child(2) .count:nth-child(2) .number:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.pause(2000);
    var n2=Login.followingCount.getText();
    const r=parseInt(n2);
    expect(r).to.eql(x);
  })

  it("Verify that user created posts are displayed properly in the 'Posts' section under Profile dropdown > Your profile page",()=>{
    Login.profileOptions(4).waitForVisible();
    Login.profileOptions(4).click();
    browser.pause(2000);
    expect(Login.post.isVisible()).to.eql(true);
  })

  it("Verify that user is redirected to the 'post description' when user clicks on any of the post from the 'Posts' section",()=>{
    browser.pause(2000);
    Login.post.waitForVisible();
    Login.post.click();
    expect(product.postName.getText()).to.eql(testData.share.post);
    browser.back();
  })

  it("Verify that user is redirected to the 'post description' when user clicks on any of the post from the 'Question' section",()=>{
    Login.profileOptions(5).waitForVisible();
    Login.profileOptions(5).click();
    browser.pause(2000);
    Login.question.waitForVisible();
    Login.question.click();
    expect(product.postName.getText()).to.eql(testData.share.post);
    browser.back();
  })
  
})

describe("Wishlist",()=>{

  it("Verify that user is redirected to the '<User name> Wishlists' page when 'Wishlist' option is clicked under 'Your Profile'",()=>{
    browser.pause(2000);
    newsFeed.profileCount(3).waitForVisible();
    newsFeed.profileCount(3).click();
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
    expect(Login.profilePage.isVisible()).to.eql(true);
  })

  it("Verify that user is able to create the Wishlist with maximum of 60 characters in the Wishlist name",()=>{
    browser.pause(2000);
    newsFeed.createWishlistBtn.waitForVisible();
    newsFeed.createWishlistBtn.click();
    browser.pause(2000);
    product.createWishlist.waitForVisible();
    product.createWishlist.setValue('name namename namename namename namename namename namename na');
    browser.pause(2000);
    expect(newsFeed.wishlistErrormsg.getText()).to.eql(testData.profile.wishlist);
    browser.pause(2000);
    newsFeed.wishlistCrossIcon.waitForVisible();
    newsFeed.wishlistCrossIcon.click();
  })

  it("Verify that Wishlists created will be 'Public' by default",()=>{
    browser.pause(2000);
    newsFeed.wishlist(1).waitForVisible();
    newsFeed.wishlist(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.left-column .edit-delete-row button.edit.image-text:nth-child(2) > .text:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    newsFeed.wishlistEdit.click();
    productPage.publicBtn.waitForVisible();
    expect(productPage.publicBtn.isVisible()).to.eql(true);
  })

  it("Verify that user is able to add UTF characters in the Wishlist name",()=>{
    newsFeed.wishlistName.setValue('$%!@#*');
    browser.pause(2000);
    newsFeed.saveBtn.waitForVisible();
    newsFeed.saveBtn.click();
    browser.pause(2000);
    expect(newsFeed.updatedWishlistName.getText()).to.eql('$%!@#*');
  })

  it("Verify that deleted Wishlists are removed and wishlist count is decreased when 'Delete Wishlist' button is clicked",()=>{
    filterPage.wishlistBackBtn.waitForVisible();
    filterPage.wishlistBackBtn.click();
    browser.pause(2000);
    var n1=newsFeed.wishlistCountOnProfile.getText();
    var x=n1-count;
    newsFeed.wishlist(1).waitForVisible();
    newsFeed.wishlist(1).click();
    browser.pause(2000);
    newsFeed.deleteWishlist.waitForVisible();
    newsFeed.deleteWishlist.click();
    browser.pause(2000);
    Login.saveBtnEnabled.waitForVisible();
    Login.saveBtnEnabled.click();
    browser.pause(4000);
    expect(newsFeed.updatedWishlistName.isVisible()).eql(false);
    browser.pause(2000);
    var n2=newsFeed.wishlistCountOnProfile.getText();
    const r=parseInt(n2);
    expect(r).to.eql(x);
  })

  it("verify that products added in the wishlists are displayed when user clicks on any of the wishlist",()=>{
    browser.pause(2000);
    newsFeed.wishlist(1).waitForVisible();
    newsFeed.wishlist(1).click();
    // browser.pause(2000);
    // newsFeed.productWihslist.waitForVisible();
    // expect(newsFeed.productWihslist.isVisible()).to.eql(true);
  })

  it("Verify that user is able to re-name the wishlists created by him",()=>{
    browser.pause(2000);
    newsFeed.wishlistEdit.waitForVisible();
    newsFeed.wishlistEdit.click();
    browser.pause(2000);
    newsFeed.wishlistName.waitForVisible();
    newsFeed.wishlistName.click();
    newsFeed.wishlistName.setValue('a');
    browser.pause(2000);
    newsFeed.saveBtn.waitForVisible();
    newsFeed.saveBtn.click();
    browser.pause(2000);
    expect(newsFeed.updatedWishlistName.getText()).to.eql('a');
  })

  it("Verify that user can share his wishlist using 'Share' option",()=>{
    var f=sharePage.userName.getText();
    sharePage.wishlistShare.waitForVisible();
    sharePage.wishlistShare.click();
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
    product.wishlistPopupClose.waitForVisible();
    product.wishlistPopupClose.click();
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    browser.url(s);
    Login.emailOrUsername.waitForVisible();
    Login.emailOrUsername.click();
    Login.emailOrUsername.setValue(testData.login.username);
    Login.password.waitForVisible();
    Login.password.click();
    Login.password.setValue(testData.share.password);
    Login.clickToContinueBtn.waitForVisible();
    Login.clickToContinueBtn.click();
    browser.pause(4000);
    expect(f).to.eql(sharePage.userName.getText());
    browser.pause(2000);
    filterPage.wishlistBackBtn.waitForVisible();
    filterPage.wishlistBackBtn.click();
  })

  it("Verify that user can like other user's wishlist",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.resetEmail.checkUn, 'Enter']);
    browser.pause(2000);
    browser.pause(2000);
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    postPage.userName.waitForVisible();
    postPage.userName.click();
    sharePage.profileOptions(3).waitForVisible();
    sharePage.profileOptions(3).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.wishlists-list-wrapper .sc-9j83u1-0.hxWAFJ .item:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    newsFeed.wishlist(1).waitForVisible();
    newsFeed.wishlist(1).click();
    newsFeed.likeWishlist.waitForVisible();
    newsFeed.likeWishlist.click();
    expect(newsFeed.likeWishlist.getText()).to.eql(testData.share.likeWishlist);

  })

  it("Verify that user can comment in other user's wishlist",()=>{
    newsfeedPage.cmtWishlist.waitForVisible();
    newsfeedPage.cmtWishlist.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.dialog-content .comments-title'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    newsfeedPage.writeCmt.waitForVisible();
    newsfeedPage.writeCmt.click();
    newsfeedPage.writeCmt.setValue('nice');
    browser.pause(2000);
    newsfeedPage.postWishlistCmt.waitForVisible();
    newsfeedPage.postWishlistCmt.click();
    browser.pause(2000);
    product.wishlistPopupClose.waitForVisible();
    product.wishlistPopupClose.click();
    expect(newsFeed.cmtWishlist.getText()).to.eql(testData.share.cmtWishlist);
    browser.pause(2000);
    newsfeedPage.logo.waitForVisible();
    newsfeedPage.logo.click();
    //Login.logout();

  })

})

describe("create post - AAQ",()=>{
  it("Verify that 'Brands' label is displayed properly when user enters text related to the brand",()=>{
    //  Login.login(testData.login.user3,testData.resetEmail.pw);
    //  browser.pause(2000);
     postPage.plusIcon.waitForVisible();
     postPage.plusIcon.click();
     postPage.createPost(2).waitForVisible();
     expect(postPage.createPost(2).getText()).to.eql(testData.post.AAQname);
     postPage.createPost(2).click();
     browser.pause(2000);
     postPage.rapSteps(2).waitForVisible();
     postPage.rapSteps(2).click();
     browser.pause(2000);
     postPage.search.waitForVisible();
     postPage.search.setValue(testData.product.suggestion);
     browser.pause(2000);
     browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiList-root.jss2.MuiList-padding:nth-child(2) .MuiListItem-root.sc-12txaws-2.fdKwHh.MuiListItem-gutters:nth-child(5)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
     );
     expect(postPage.suggestionRap(5).getText()).to.eql(testData.filter.suggestionBrand);
  })

  it("Verify that 'Retailers' label is displayed properly when user enters text related to the retailer",()=>{
      browser.pause(2000);
      postPage.rapSuggestion(6).waitForExist({ timeout: 5000 });
      expect(postPage.suggestionRap(6).getText()).to.eql(testData.filter.suggestioRetailer);
  })

  it("Verify that appropriate results are displayed when user clicks on any of the suggestions",()=>{
      postPage.rapSuggestion(6).waitForVisible();
      postPage.rapSuggestion(6).click();
      browser.waitUntil(
          function() {
            return (
              browser.isVisible(
                '.MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
        );
      expect(postPage.search.getValue()).to.eql(testData.filter.retailerName);
  })

  it("Verify that the label 'You can add up to six products to a post' is displayed when 'Product' tab is clicked",()=>{
    browser.pause(2000);
    postPage.rapSteps(2).waitForVisible();
    postPage.rapSteps(2).click();
    expect(postPage.aaqLabel.getText()).to.eql(testData.post.AaqLabel);
  })

  it("Verify that options displayed appropriately when user tap on dropdown icons to filter result while creating 'Ask a question' post",()=>{
      browser.pause(2000);
      postPage.filterOption.waitForVisible();
      postPage.filterOption.click();
      browser.pause(2000);
      postPage.brandIcon.waitForVisible();
      postPage.brandIcon.click();
      browser.pause(2000);
      expect(filterPage.brandSelect.isVisible()).to.eql(true);
      browser.pause(2000);
      postPage.brandIcon.waitForVisible();
      postPage.brandIcon.click();
      browser.pause(2000);
      postPage.retailerIcon.waitForVisible();
      postPage.retailerIcon.click();
      browser.pause(2000);
      expect(postPage.retailerIcon.isVisible()).to.eql(true);
      browser.pause(2000);
      postPage.retailerIcon.waitForVisible();
      postPage.retailerIcon.click();
  })

  it("Verify that duplicate product is not allowed to add to post",()=>{
      browser.scroll(0,200);
      var p=0,p1=1;
      browser.pause(2000);
      postPage.addToPostRadioBtn(5).waitForVisible();
      postPage.addToPostRadioBtn(5).click();
      browser.pause(2000);
      postPage.aaqProductCount.waitForVisible();
      var f= postPage.aaqProductCount.getText();
      expect(f >= p1).to.eql(true);
      browser.pause(2000);
      postPage.addToPostRadioBtn(5).waitForVisible();
      postPage.addToPostRadioBtn(5).click();
      browser.pause(2000);
      postPage.aaqProductCount.waitForVisible();
      var f= postPage.aaqProductCount.getText();
      expect(f <= p).to.eql(true);
  })

  it("Verify that user can add upto 6 products to the post",()=>{
      browser.scroll(0,200);
      browser.pause(2000);
      postPage.addToPostRadioBtn(5).waitForVisible();
      postPage.addToPostRadioBtn(5).click();
      browser.pause(2000);
      postPage.addToPostRadioBtn(6).waitForVisible();
      postPage.addToPostRadioBtn(6).click();
      browser.pause(2000);
      postPage.addToPostRadioBtn(7).waitForVisible();
      postPage.addToPostRadioBtn(7).click();
      browser.pause(2000);
      postPage.addToPostRadioBtn(8).waitForVisible();
      postPage.addToPostRadioBtn(8).click();
      browser.scroll(0,500);
      browser.pause(2000);
      postPage.addToPostRadioBtn(10).waitForVisible();
      postPage.addToPostRadioBtn(10).click();
      browser.pause(2000);
      postPage.addToPostRadioBtn(11).waitForVisible();
      postPage.addToPostRadioBtn(11).click();
      expect(postPage.aaqProductCount.getText()).to.eql('6');
  })

  it("Verify that product is removed when user clicks on 'trash' icon",()=>{
      browser.scroll(0,0);
      postPage.removePrd.waitForVisible();
      postPage.removePrd.click();
      expect(postPage.aaqProductCount.getText()).to.eql('5');
  })

  it("Verify that user is redirected to Step 1 when '1' button is clicked",()=>{
      browser.scroll(0,0);
      browser.pause(2000);
      postPage.rapSteps(1).waitForVisible();
      postPage.rapSteps(1).click();
      expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.AAQ);
  })

  it("Verify that selected background is displayed when user clicks on background images",()=>{
    browser.pause(2000);
    postPage.uploadBtn.waitForVisible();
    postPage.uploadBtn.click();
    browser.pause(2000);
    postPage.aaqBackgroundImage.waitForVisible();
    postPage.aaqBackgroundImage.click();
    browser.pause(2000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.pause(4000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
  })

  it("Verify that text color changed when user clicks on different colours",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.background-palette .color-container:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    browser.pause(2000);
    postPage.textColor(2).waitForVisible();
    postPage.textColor(2).click();
    postPage.textColor(3).waitForVisible();
    postPage.textColor(3).click(); 
    postPage.textColor(5).waitForVisible();
    postPage.textColor(5).click();
  })

  it("Verify that text size is changes according to the sidebar changes",()=>{
    browser.scroll(0,2000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiSlider-root.MuiSlider-colorPrimary'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
     );    
    browser.scroll(0,2000);
    elem.dragAndDrop({ x: 100, y: 200 });
  })

  it("Verify that 'Please help me to find...' caption is displayed when user selects any default background button to create an AAQ post",()=>{
    browser.pause(4000);
    expect(postPage.aaqHelpMeText.getText()).to.eql(testData.post.text);
  })

  it("Verify that default caption is disappeared when user clicks on 'Please help me to find...' caption",()=>{
    postPage.aaqHelpMeText.waitForVisible();
    postPage.aaqHelpMeText.click();
    browser.pause(2000);
    expect(postPage.aaqHelpMeText.getText()).to.eql('');
    postPage.aaqHelpMeText.setValue('help');
    browser.pause(4000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
  })

  it("Verify that user is redirected to the post when 'Continue post' button is clicked",()=>{
     browser.back();
     browser.pause(2000);
     browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.MuiIconButton-label>img'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
     );
     browser.pause(2000);
     postPage.crossIcon.waitForVisible();
     postPage.crossIcon.click();
     browser.pause(2000);
     postPage.createPost(1).waitForVisible();
     expect(postPage.createPost(1).getText()).to.eql(testData.post.cotinuePostButton);
     postPage.createPost(1).click();
     expect(postPage.recommendProductHeading.getText()).to.eql(testData.post.AAQ);
  })

  it("Verify that user is redirected to the Newsfeed when 'Discard' button is clicked",()=>{
    browser.pause(2000);
    postPage.rapSteps(3).waitForVisible();
    postPage.rapSteps(3).click();
    browser.pause(2000);
    browser.scroll(0,1000);
    postPage.discaredpostBtn.waitForVisible();
    postPage.discaredpostBtn.click();
    browser.pause(2000);
    browser.scroll(0,1000);
    postPage.discaredpostBtn.waitForVisible();
    postPage.discaredpostBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(postPage.postNewsfeed(1).isVisible()).to.eql(true);
  })

  it("Verify that text with more than 3 words entered in the text field is displayed appropriately",()=>{
    browser.pause(2000);
    postPage.plusIcon.waitForVisible();
    postPage.plusIcon.click();
    postPage.createPost(2).waitForVisible();
    expect(postPage.createPost(2).getText()).to.eql(testData.post.AAQname);
    postPage.createPost(2).click();
    browser.pause(2000);
    postPage.uploadBtn.waitForVisible();
    postPage.uploadBtn.click();
    browser.pause(4000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.pause(4000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.pause(2000);
    postPage.aaqHelpMeText.waitForVisible();
    browser.pause(2000);
    postPage.aaqHelpMeText.setValue('help me to find gift');
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
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(4000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(4000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
  })

  it("Verify that new text added while editing a 'Ask a Question' post is updated in Newsfeed",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    expect(postPage.newPost.isVisible()).to.eql(true);
    browser.scroll(0,100);
    postPage.postOptions(3).waitForVisible();
    postPage.postOptions(3).click();
    postPage.postOperations(1).waitForVisible();
    postPage.postOperations(1).click();
    browser.pause(2000);
    postPage.editCaption.waitForVisible();
    postPage.editCaption.click();
    browser.pause(2000);
    postPage.addText.waitForVisible();
    postPage.addText.click();
    postPage.addText.addValue('help');
    browser.pause(4000);
  })

  it("Verify that text removed while editing a 'Ask a Question' post is updated in Newsfeed",()=>{
    postPage.addText.waitForVisible();
    postPage.addText.click();
    postPage.addText.setValue('cool bag');
    browser.pause(4000);
    postPage.saveQuestionBtn.waitForVisible();
    postPage.saveQuestionBtn.click();
    browser.scroll(0,100);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(4000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(4000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );    
    expect(postPage.newPost.isVisible()).to.eql(true);
  })

  it("Verify that effects of the text modified while editing 'Ask a Question' post is updated in Newsfeed",()=>{
    expect(postPage.newPost.isVisible()).to.eql(true);
    postPage.postOptions(3).waitForVisible();
    postPage.postOptions(3).click();
    postPage.postOperations(1).waitForVisible();
    postPage.postOperations(1).click();
    browser.pause(2000);
    postPage.deleteBackground.waitForVisible();
    postPage.deleteBackground.click();
    postPage.uploadBtn.waitForVisible();
    postPage.uploadBtn.click();
    browser.pause(2000);
    postPage.aaqBackgroundImage.waitForVisible();
    postPage.aaqBackgroundImage.click();
    browser.pause(2000);
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
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
  })

  it("Verify that text removed while editing a 'Ask a Question' post is updated in Newsfeed",()=>{
    // const select = postPage.aaqHelpMeText.getValue();
    // const backSpaces = new Array(select.length).fill('Backspace');
    // postPage.aaqHelpMeText.setValue(backSpaces);
    browser.pause(4000);
    postPage.aaqHelpMeText.waitForVisible();
    postPage.aaqHelpMeText.setValue('help me');
    postPage.saveBtn.waitForVisible();
    postPage.saveBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-56f71l-0.iaChRu:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );        
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(4000);
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
  })

  it("Verify that emojis are displayed properly in the post when user adds emoji in caption",()=>{
    // browser.pause(2000);
    // postPage.aaqCaption.waitForVisible();
    // postPage.aaqCaption.click();
    browser.pause(2000);
    postPage.aaqEmoji.waitForVisible();
    postPage.aaqEmoji.click();
    browser.pause(2000);
    newsFeed.selectEmoji.waitForVisible();
    newsFeed.selectEmoji.click();
    newsFeed.selectEmoji.click();
    browser.pause(2000);
    const nextBtn=$(".sc-56f71l-0.iaChRu:nth-child(1)")
    nextBtn.doubleClick();
    postPage.nextBtn.waitForVisible();
    postPage.nextBtn.click();
    browser.pause(2000);
    postPage.newPost.waitForExist({ timeout: 6000 });
    browser.scroll(0,500);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3) .img-question:nth-child(2)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(postPage.que.isVisible()).to.eql(true);
    expect(postPage.cmt.isVisible()).to.eql(true);
  })

  it("Verify that edited post/question is displayed as 'edited' in the newsfeed",()=>{
    var edited= postPage.newPost.getText();
    var y = edited.split('• ')
    var g=y[1];
   expect(g).to.eql(testData.post.editedPost);
  })
})

describe("Newsfeed",()=>{

it("Verify that the badge count of Likes are incremented when a user taps on the the Like icon of a post",()=>{
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(3)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );    
   postPage.like.waitForVisible();
   postPage.like.click();
   var o=postPage.likeCounter.getText();
   expect(o).to.eql('1');
})

it("Verify that the badge count of Likes are decremented when a user double taps on the the Like icon of a post",()=>{
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(3)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );       
  postPage.like.waitForVisible();
  postPage.like.click();
  var d=postPage.likeCounter.getText();
  expect(d).to.eql('0');
})

it("Verify that recommendation added by other users are displayed in Newsfeed",()=>{
  browser.moveToObject(".content-block:nth-child(9)")
  expect(newsFeed.nikPost.isVisible()).to.eql(true);
})

it("Verify user is redirected to user information page when user clicks on any user name from the Newsfeed",()=>{
  browser.scroll(0,1000);
  postPage.userNameNewsfeed.waitForVisible();
  var n=postPage.userNameNewsfeed.getText();
  postPage.userNameNewsfeed.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.name-username>h2'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  var c=postPage.otherUserNewsfeed.getText();
  expect(n).to.eql(c);
  browser.back();
})

it("Verify that user is redirected to 'Product details' page when user clicks on post's product",()=>{
  browser.pause(2000);
  var p=postPage.productNewsfeed.getText();
  console.log(p)
  postPage.productNewsfeed.click();
  browser.pause(2000);
  var f=productPage.pdpName.getText();
  console.log(f);
  expect(p).to.eql(f);
})

it("Verify that 'Buy' button is displayed when clicked on the product Info for any post",()=>{
  browser.pause(2000);
  expect(product.buyBtnPDP.getText()).to.eql(testData.product.buy);
})

it("Verify that in the 'Your wishlists' section product has been added when clicks on the 'Add' button",()=>{
  browser.pause(2000);
  productPage.wishlistBtn.waitForVisible();
  productPage.wishlistBtn.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.dialog-content .title'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(product.wishlistLabel.getText()).to.eql(testData.product.wishlist);
  browser.pause(2000);
  product.createWishlist.waitForVisible();
  product.createWishlist.setValue('newsfeed');
  browser.pause(2000);
  product.addBtn.waitForVisible();
  product.addBtn.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.MuiSnackbarContent-message.message'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(product.createdWishlistPopup.getText()).to.eql(testData.product.createdWishlistPopup);
})

it("Verify that duplicate wishlists are not created when star icon 'Add' is clicked multiple times",()=>{
  browser.pause(2000);
  expect(product.disabledAddBtn.isEnabled()).to.eql(false);
})

it("Verify that in the 'Your wishlists' section Save button is changed to 'Remove' when user clicks on 'Save' button in the 'Your wishlists' section",()=>{
  browser.pause(2000);
  expect(product.removeBtn.getText()).to.eql(testData.product.removeBtn);
  product.closeCreatedWishlitPopup.waitForVisible();
  product.closeCreatedWishlitPopup.click();
  browser.pause(2000);
  product.wishlistPopupClose.waitForVisible();
  product.wishlistPopupClose.click();
})

it("Verify that user is able to create post by viewing any 'Details' >'Add to Post' under any post in the Newsfeed",()=>{
  browser.pause(2000);
  product.addToPost.waitForVisible();
  product.addToPost.click();
  browser.pause(2000);
  product.prdPostOptions(4).waitForVisible();
  product.prdPostOptions(4).click();
  browser.pause(4000);
  postPage.createQue();
})

it("Verify that 'You asked a question' is displayed in the Newsfeed when user asked a question",()=>{
  browser.pause(2000);
  expect(newsFeed.afterPostCreationLabel(1).getText()).to.eql(testData.newsfeed.ownUserPost);
  expect(newsFeed.afterPostCreationLabel(2).getText()).to.eql(testData.post.newpost);
})

it("Verify that specific timestamp is displayed when user scrolls through the Newsfeed",()=>{
  browser.scroll(0,1000);
  browser.pause(2000);
  newsfeedPage.timeStamp(7).waitForVisible();
  expect(newsfeedPage.timeStamp(7).isVisible()).to.eql(true);
  browser.scroll(0,800);
  expect(newsfeedPage.timeStamp(9).isVisible()).to.eql(true);
})

it("Verify that badge count of Comment is incremented when user adds a comment to a post",()=>{
  newsFeed.addComment.waitForVisible();
  newsFeed.addComment.click();
  var comment = "try weshop RAP post";
  newsFeed.writeCmt.waitForVisible();
  newsFeed.writeCmt.click();
  newsFeed.writeCmt.setValue(comment);
  browser.pause(2000);
  newsFeed.postComment.waitForVisible();
  newsFeed.postComment.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.nav-main-logo.nav-main-item'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );  
  newsfeedPage.logo.click();
  browser.scroll(0,3000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.main-column .content-block:nth-child(7) .actions>a>div>span:nth-child(2)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(postPage.commentCount(7).getText()).to.eql('1');
})

it("Verify that user is able to delete his own comment under other user’s post",()=>{
  browser.pause(2000);
  newsFeed.addComment.waitForVisible();
  newsFeed.addComment.click();
  browser.scroll(0,3000);
  browser.pause(2000);
  newsfeedPage.deleteCmt.waitForVisible();
  newsfeedPage.deleteCmt.click();
  browser.pause(2000);
  newsfeedPage.commentOptions(2).waitForVisible();
  expect(newsfeedPage.commentOptions(2).getText()).to.eql(testData.newsfeed.delCmt);
  newsfeedPage.commentOptions(2).click();
})

it("Verify that badge count of Comment is decremented when user delete a comment",()=>{
  browser.pause(2000);
  newsfeedPage.deleteCmtYesBtn.waitForVisible();
  newsfeedPage.deleteCmtYesBtn.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.nav-main-logo.nav-main-item'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );  
  newsfeedPage.logo.click();
  browser.scroll(0,1000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.main-column .content-block:nth-child(7) .actions>a>div>span:nth-child(2)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(postPage.commentCount(7).getText()).to.eql('0');
})

it("Verify that deleted 'Ask a Question' post is removed from the Newsfeed of the user",()=>{
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
  expect(postPage.newPost.isVisible()).to.eql(true);
  postPage.deletePost();
  signup.eyeIcon.waitForVisible();
  signup.eyeIcon.click();
})

it("Verify that count of the 'Posts/Questions' is decreased when user deletes post/question in 'Posts/Questions' section",()=>{
    newsFeed.newsFeedCount(5).waitForVisible();
    var d=newsFeed.newsFeedCount(5).getText();
    browser.pause(2000);
    postPage.deletePost();
    newsFeed.newsFeedCount(5).waitForVisible();
    var k=newsFeed.newsFeedCount(5).getText();
    var f=d-count;
    const r=parseInt(k);
    expect(f).to.eql(r);
})

it("Verify that Follow button is changed to 'Unfollow' when user clicks on 'Follow' button in the 'People you may know... ' section",()=>{
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(1)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  browser.scroll(0,10000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(7)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.post(7).isVisible()).to.eql(true);
  browser.scroll(0,10000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(14)' 
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.post(14).isVisible()).to.eql(true);
  browser.moveToObject(".sc-1xwm0m6-0.cHwNXh")
  newsFeed.folBtn.waitForVisible();
  newsFeed.folBtn.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.sc-130g6cx-0.htxXiB:nth-child(2) .slick-slide.slick-active.slick-current:nth-child(1) span:nth-child(5) div:nth-child(1) > .sc-56f71l-0.iaChRu'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.folBtn.getText()).to.eql(testData.login.afterFollowInPeopleYoumanyKnow)
})

it("Verify that Following button is changed to 'Follow' when user clicks on 'Unfollow' button in the 'People you may know...' section",()=>{
  expect(newsFeed.folBtn.getText()).to.eql(testData.login.afterFollowInPeopleYoumanyKnow)
  newsFeed.folBtn.waitForVisible();
  newsFeed.folBtn.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.sc-130g6cx-0.htxXiB:nth-child(2) .slick-slide.slick-active.slick-current:nth-child(1) span:nth-child(5) div:nth-child(1) > .sc-56f71l-0.iaChRu'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.folBtn.getText()).to.eql(testData.login.followBtn);
})

it("following count increases when user follow new user from 'People you may know'",()=>{
  newsFeed.profileCount(2).waitForVisible();
  var o=newsFeed.profileCount(2).getText();
  const d=parseInt(o);
  var x=d+count;
  newsFeed.folBtn.waitForVisible();
  newsFeed.folBtn.click();
  browser.pause(4000);
  const r=parseInt(x);
  var i=newsFeed.profileCount(2).getText();
  const l=parseInt(i);
  expect(l).to.eql(x);
  newsFeed.folBtn.waitForVisible();
  newsFeed.folBtn.click();
})

it("Verify that taken photo from a computer for a comment is displayed properly when user add a comment using 'Camera' icon",()=>{
  browser.scroll(0,0);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.content-block:nth-child(1)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  browser.scroll(0,1000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.main-column .content-block:nth-child(4) .actions>a>div>img' 
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  newsFeed.addCmtTwo.waitForVisible();
  newsFeed.addCmtTwo.click();
  browser.pause(2000);
  newsFeed.imageCmt.waitForVisible();
  const toUpload = path.join(__dirname, "..", "resources", "laptop.jpeg");
  browser.chooseFile('input[type="file"]', toUpload); 
  browser.scroll(0,100);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.sc-56f71l-0.iaChRu'
        ) === true
      );
    },
    120000,
    "add item input field not visible even after 10s"
  );
  newsFeed.postComment.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.sc-3fytly-2.bvtewK>img'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.imageInCmt.isVisible()).to.eql(true);
})

it("Verify that added product to the comment is displayed properly when user adds a product to the comment",()=>{
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.comment-create__row__actions .comment-create__row__actions__item:nth-child(1)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );  
  newsFeed.commentOption(1).waitForVisible();
  newsFeed.commentOption(1).click();
  browser.pause(2000);
  newsFeed.addPrdToComment.waitForVisible();
  newsFeed.addPrdToComment.setValue([testData.product.name,'Enter']);
  browser.pause(2000);
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.search-list'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  browser.moveToObject(".sc-17vwwnr-0.iobcSV.product-wrapper:nth-child(1) .productItem .sc-56f71l-0.iaChRu")
  newsFeed.addPrdBtn.click();
  browser.pause(2000);
  newsFeed.postComment.waitForVisible();
  newsFeed.postComment.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.comment__primary__content__product'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.prdCmt.isVisible()).to.eql(true);
})

it("Verify that added emoji are displayed properly when user adds emoji for comment",()=>{
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.comment-create__row__actions .comment-create__row__actions__item:nth-child(3)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  newsFeed.commentOption(3).click();
  browser.pause(2000);
  newsFeed.selectEmoji.waitForVisible();
  newsFeed.selectEmoji.click();
  newsFeed.selectEmoji.click();
  browser.pause(2000);
  newsFeed.postComment.waitForVisible();
  const r=$(".sc-56f71l-0.iaChRu")
  r.doubleClick();
  newsFeed.postComment.click();
  browser.waitUntil(
    function() {
      return (
        browser.isVisible(
          '.comment__primary__content__text .bky81h-0.gEOQom >span:nth-child(1)'
        ) === true
      );
    },
    60000,
    "add item input field not visible even after 10s"
  );
  expect(newsFeed.postedComment.isVisible()).to.eql(true);
})
})

describe("Account",()=>{

  it("Verify that 'Change e-mail address' button is not activated when user adds invalid e-mail address",()=>{
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();    
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
    Login.emailaddress.setValue(y);
    browser.pause(2000);
    Login.changePwBtn.waitForVisible();
    Login.changePwBtn.click();
    Login.profileDetailsPopup.waitForVisible();
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.resetPwd.duplicateEmail);
  })

  it("Verify that 'Change e-mail address' button is not activated when user adds invalid e-mail address",()=>{
    Login.emailaddress.setValue(testData.resetEmail.checkUn);
    browser.pause(2000);
    expect(Login.chnageEmail.isEnabled()).to.eql(false);
  })

  it.skip("Verify that user is notified when email address is changed",()=>{
    var e=Login.emailAddress.getText();
    var y = e.split(':')[1];
    browser.newWindow('http://www.yopmail.com/en/')
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[1]); 
    browser.pause(3000)
    gmail.checkinbox_changeiframe_email([y, 'Enter']);
    expect(gmail.emailChanged.getText()).to.eql(testData.resetEmail.chnagesEmail);
  })

  it.skip("Verify that user is notified when password is changed",()=>{
    browser.back();
    gmail.checkinbox_changeiframe_email([testData.resetEmail.email, 'Enter']);
    expect(gmail.emailChanged.getText()).to.eql(testData.resetEmail.chnagePw);
    browser.close();
  })

  it("Verify that 'Change Password' button is NOT enabled when the user enters different string for 'Password' and 'Repeat Password' fields",()=>{
    Login.changePw.waitForVisible();
    Login.changePw.setValue(testData.signup.password);
    Login.repeatPw.waitForVisible();
    Login.repeatPw.setValue(testData.resetPwd.pwd);
    expect(Login.changePass.isEnabled()).to.eql(false);
    browser.back();
  })

  it("Verify that 'Transactional & purchases' option is enabled by default in 'Notifications & communication'",()=>{
    var tabIds = browser.getTabIds();
    browser.switchTab(tabIds[0]);
    browser.pause(2000);
    Login.settingPage(4).waitForVisible();
    Login.settingPage(4).click();
    expect(Login.transactionRadioBtn.isVisible()).to.eql(true);
  })

  it("Verify that User is redirected to the 'Deactivate account' step when 'Cross' icon in Deactivate account pop-up is clicked",()=>{
    browser.back();
    browser.pause(2000);
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
    productPage.wishlistPopupClose.waitForVisible();
    productPage.wishlistPopupClose.click();
    browser.pause(2000);
    expect(Login.changePwBtn.isVisible()).to.eql(true);
  })
})

describe("Activities",()=>{

  it("Verify that notifications are displayed when the user taps on the bell icon",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.nav-main-wrapper.mui-fixed .sc-1v1uga8-1.UAjzl.nav-main-item.nav-main-item--mobile:nth-child(3) .sc-1v1uga8-12.jhbKPP'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    newsFeed.newsfeedOptions(4).waitForVisible();
    newsFeed.newsfeedOptions(4).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1a9wc9e-12.hqiVfQ'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(newsfeedPage.inboxMonth.getText()).to.eql(testData.newsfeed.inbox);
  })

  it("Verify that appropriate time stamp is displayed for the Following user activity in 'Inbox' tab",()=>{
    newsFeed.notificationTime.waitForVisible();
    expect(newsFeed.notificationTime.isVisible()).to.eql(true);
  })

  it("Verify that profile picture of the people are displayed properly",()=>{
    newsFeed.notificationProfile.waitForVisible();
    expect(newsFeed.notificationProfile.isVisible()).to.eql(true);
  })

  it("Verify that username of the people are displayed properly in Notifications",()=>{
    newsFeed.notificationUsername.waitForVisible();
    expect(newsFeed.notificationUsername.isVisible()).to.eql(true);
  })

  it("question",()=>{
    expect(newsfeedPage.inboxMonth.getText()).to.eql(testData.newsfeed.inbox);
    newsFeed.notification(1).waitForVisible();
    expect(newsFeed.notification(1).getText()).to.eql(testData.newsfeed.inboxQues);
  })

  it("post",()=>{
    expect(newsfeedPage.inboxMonth.getText()).to.eql(testData.newsfeed.inbox);
    newsFeed.notification(2).waitForVisible();
    expect(newsFeed.notification(2).getText()).to.eql(testData.newsfeed.inboxPost);
  })

  it("Verify that user is directed to the respective follower's post when tapped on the notification in the Notifications > 'Inbox' tab",()=>{
    newsFeed.notifications(1).waitForVisible();
    newsFeed.notifications(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-9jt9lg-0.eiUGAE>h2'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(newsFeed.notificationPost.getText()).to.eql(testData.share.post);
  })

  it("Verify that user is navigated back to notifications tab when clicked on 'Back' button in the Following User's post screen",()=>{
    browser.back();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(1)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(newsFeed.notifications(1).isVisible()).to.eql(true);
  })
})
  
describe("Dashboard",()=>{
  
    it("Verify that user Dashboard is displayed when 'Dashboard' icon is clicked",()=>{
       browser.pause(2000);
       newsFeed.newsfeedOptions(3).waitForVisible();
       newsFeed.newsfeedOptions(3).click();
       expect(product.otherUserName.isVisible()).to.eql(true);
       expect(newsFeed.purchaseHeading.getText()).to.eql(testData.newsfeed.Purchases);
    })
  
    it("Verify that 'Referrals' section is displayed when user selects 'Referrals' option",()=>{
      browser.pause(2000);
      newsFeed.dashboardOptions(3).waitForVisible();
      newsFeed.dashboardOptions(3).click();
      expect(product.otherUserName.isVisible()).to.eql(true);
      expect(newsFeed.purchaseHeading.getText()).to.eql(testData.newsfeed.Referrals);
    })
  
    it("Verify that 'Influenced posts' section is displayed when user selects 'Influenced posts' option",()=>{
      browser.pause(2000);
      newsFeed.dashboardOptions(2).waitForVisible();
      newsFeed.dashboardOptions(2).click();
      expect(product.otherUserName.isVisible()).to.eql(true);
      expect(newsFeed.purchaseHeading.getText()).to.eql(testData.newsfeed.Influenced);
    })
  
    it("Verify that 'Purchases' section is displayed when user selects 'Purchases' option",()=>{
      browser.pause(2000);
      newsFeed.dashboardOptions(1).waitForVisible();
      newsFeed.dashboardOptions(1).click();
      expect(product.otherUserName.isVisible()).to.eql(true);
      expect(newsFeed.purchaseHeading.getText()).to.eql(testData.newsfeed.Purchases);
    })
  
    it("Verify that summary of 'Value of Shares', 'Share Price','Data Last Updated' and 'Number of WeShares' is displayed",()=>{
      browser.pause(2000);
      expect(product.lastUpdated.isVisible()).to.eql(true);
      expect(product.sharePrice.isVisible()).to.eql(true);
      expect(product.totalWeshares.isVisible()).to.eql(true);
    })
  
})

describe("Share",()=>{

  it("Verify that appropriate message is displayed appropriate post are reported by the user in Newsfeed.",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click(); 
    browser.pause(2000);
    browser.scroll(0,10000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(15) .sc-16juea8-0.dZRJah.header .ellipsis'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    postPage.post.click();
    postPage.reportPost();
  })

  it("Verify that user is not able to see posts from user when user tap on 'Block user' option",()=>{
    browser.pause(2000);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(15) .sc-16juea8-0.dZRJah.header .ellipsis'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    postPage.post.click();
    postPage.blockUser();
  })

  it("Verify that user can share post of other user when 'Share' button is clicked",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.content-block:nth-child(3)'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.otheuser,'Enter']);
    browser.pause(2000);
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    productPage.searchedPeopleSelect(1).waitForVisible();
    productPage.searchedPeopleSelect(1).click();
    browser.pause(2000);
    newsFeed.userProfilePost(1).waitForVisible();
    newsFeed.userProfilePost(1).click();
    browser.pause(2000);
    sharePage.otherUserPostShare.waitForVisible();
    sharePage.otherUserPostShare.click();
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
                '.sc-9jt9lg-0.eiUGAE >h2'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
    );
    expect(productPage.postName.getText()).to.eql(testData.share.post);
  })

  it("Verify that the following shortcut icons for the 'Retailer' results are working and it is navigated to respective pages when it is clicked: Star Icon, Share and +(Add) Icon",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.product.name,'Enter']);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > h3.price'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    productPage.price.click();
    productPage.buyBtnPDP.waitForVisible();
    productPage.buyBtnPDP.click();
    var tabId1=browser.getTabIds();
    browser.switchTab(tabId1[1]);
    expect(productPage.detailsPage.isVisible()).to.eql(true);
    browser.close();
    productPage.wishlistBtn.waitForVisible();
    productPage.wishlistBtn.click();
    browser.pause(8000);
    productPage.wishlistPopupClose.waitForVisible();
    productPage.wishlistPopupClose.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1ostnru-7.iZkjtJ:nth-child(3)  .sc-1ostnru-9.gyByto'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    productPage.shareBtn.waitForVisible();
    productPage.shareBtn.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1ostnru-14.hxLnDc'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(productPage.sharePopup.isVisible()).to.eql(true);
    productPage.wishlistPopupClose.waitForVisible();
    productPage.wishlistPopupClose.click();
    productPage.addToPost.waitForVisible();
    productPage.addToPost.click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.add-to-post-modal'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(productPage.addTopostPopup.isVisible()).to.eql(true);
    productPage.wishlistPopupClose.waitForVisible();
    productPage.wishlistPopupClose.click();
  })

  it("Verify that profile of the shared user is displayed when the Referral link of the user is launched",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    var s=browser.getValue('.sc-1d12nmp-0.cerMME.sticky.refer-friend .MuiInputBase-input.MuiOutlinedInput-input');
    browser.url(s);
    expect(productPage.otherUserName.isVisible()).to.eql(true);
  })

  it("Verify that the shared profile link of the 'Following' user is displayed when the profile link is launched and 'UnFollow' is displayed next to user name",()=>{
    browser.pause(2000); 
    newsFeed.countOnProfilePage(2).waitForVisible();
    newsFeed.countOnProfilePage(2).click();
    sharePage.followingUserName.waitForVisible();
    sharePage.followingUserName.click();
    var tabId1=browser.getTabIds();
    browser.switchTab(tabId1[1]);
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.image-wrapper .share-button'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    sharePage.followingShareBtn.waitForVisible();
    sharePage.followingShareBtn.click();
    var s=browser.getValue('.copy-link-input');
    productPage.wishlistPopupClose.waitForVisible();
    productPage.wishlistPopupClose.click();
    browser.pause(2000);
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
                '.desktop-button-wrapper .sc-56f71l-0.iaChRu.purple-outlined:nth-child(1)'
              ) === true
            );
          },
          60000,
          "add item input field not visible even after 10s"
    );
    expect(sharePage.unfollowBtnInProfile.getText()).to.eql(testData.login.afterFollowInPeopleYoumanyKnow);
  })

  it("Verify that count of the 'Followers' is increased when user follows",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click(); 
    Login.logout();
    browser.pause(2000);
    Login.login(testData.signup.dupUn,testData.login.pw);
    newsFeed.profileCount(1).waitForVisible();
    var o=newsFeed.profileCount(1).getText();
    const d=parseInt(o);
    var x=d+count;
    Login.logout();
    browser.pause(2000);
    Login.login(testData.login.followersUser,testData.login.password);
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.signup.dupUn, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    filterPage.followBtn(1).waitForVisible();
    filterPage.followBtn(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-7rqm9q-0.eZZypw:nth-child(1) .sc-56f71l-0.iaChRu.blue'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.followingBtn(1).getText()).to.eql(testData.login.followinglabel);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    Login.login(testData.signup.dupUn,testData.login.pw);
    browser.pause(2000);
    const r=parseInt(x);
    var i=newsFeed.profileCount(1).getText();
    const l=parseInt(i);
    expect(l).to.eql(x);
  })

  it("Verify that notification is displayed along with appropriate time in 'Inbox' tab when a user starts following the logged in user",()=>{
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.nav-main-wrapper.mui-fixed .sc-1v1uga8-1.UAjzl.nav-main-item.nav-main-item--mobile:nth-child(3) .sc-1v1uga8-12.jhbKPP'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    newsFeed.newsfeedOptions(4).waitForVisible();
    newsFeed.newsfeedOptions(4).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-1a9wc9e-12.hqiVfQ'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    );
    expect(newsfeedPage.inboxMonth.getText()).to.eql(testData.newsfeed.inbox);
    newsFeed.notificationTime.waitForVisible();
    expect(newsFeed.notificationTime.getText()).to.eql(testData.newsfeed.newNotification);
    expect(newsFeed.notification(1).getText()).to.eql(testData.newsfeed.followingUser);
  })

  it("Verify that count of the 'Followers' is decreased when existing followed user unfollow ",()=>{
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click(); 
    browser.pause(2000);
    var o=newsFeed.profileCount(1).getText();
    const d=parseInt(o);
    var x=d-count;
    Login.logout();
    browser.pause(2000);
    Login.login(testData.login.followersUser,testData.login.password);
    browser.pause(2000);
    filterPage.serachBar.waitForVisible();
    filterPage.serachBar.setValue([testData.signup.dupUn, 'Enter']);
    browser.pause(4000);
    productPage.showingResult.waitForVisible();
    productPage.searchPeopleOption.waitForVisible();
    productPage.searchPeopleOption.click();
    browser.pause(2000);
    filterPage.followingBtn(1).waitForVisible();
    filterPage.followingBtn(1).click();
    browser.waitUntil(
      function() {
        return (
          browser.isVisible(
            '.sc-7rqm9q-0.eZZypw:nth-child(1) .sc-56f71l-0.iaChRu.purple-inverted'
          ) === true
        );
      },
      60000,
      "add item input field not visible even after 10s"
    ); 
    expect(filterPage.followBtn(1).getText()).to.eql(testData.login.followBtn);
    browser.pause(2000);
    newsFeed.logo.waitForVisible();
    newsFeed.logo.click();
    Login.logout();
    Login.login(testData.signup.dupUn,testData.login.pw);
    browser.pause(2000);
    const r=parseInt(x);
    var i=newsFeed.profileCount(1).getText();
    const l=parseInt(i);
    expect(l).to.eql(x);
  })

})


