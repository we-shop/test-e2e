import Page from "./page";
import { expect } from 'chai';
import testData from "../constants/testData.json";
import Login from "../page-objects/login.page.js";
import productPage from "./product.page";

const path=require("path");

class Post extends Page{

get plusIcon(){
    return $(".sc-14o4777-0.cgntRS")
}

get newsfeed(){
    return $(".sc-1xpq5di-0.dHNiBh.question")
}

//get recommend()
createPost(index){
    return $(`.MuiPaper-root .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root:nth-child(${index})`)
}

stepInRap(index){
    return $(`.sc-1hjjkgc-1.drskXq:nth-child(${index})`)
}

get recommendProductHeading(){
    return $(".sc-195fhah-1.cYJoca>h1")
}

get crossIcon(){
    return $(".MuiIconButton-label>img")
}

get search(){
    return $(".content-container .sc-12txaws-0.jIyEZD input[placeholder='Search WeShop']")
}

get serachIcon(){
    return $(".sc-4hn5pq-0.cKaPtE .sc-17wdton-0.jYIFlL.sc-4hn5pq-1.bfrwUC:nth-child(1)")
}

get rapSearchIcon(){
    return $(".sc-17wdton-0.eucxwj.jss4")
}

addToPostRadioBtn(index){
    return $(`.sc-1jtvvdw-0.cHQRzR .sc-195fhah-0.gLSDob .ao51ir-0.lfyyWF:nth-child(${index}) .productItem .MuiIconButton-label`)
}

get nextBtn(){
    return $(".sc-56f71l-0.iaChRu:nth-child(1)")
}

get productAaq(){
    return $(".sc-1hjjkgc-1.drskXq:nth-child(2) .sc-1hjjkgc-2.YldMF")
}

get saveBtn(){
    return $(".sc-56f71l-0.iaChRu.blue")
}

get closePost(){
    return $(".w9h3q4-0.jXYUpS.icon.dialog-close__icon")
}

get aaqHelpMeText(){
    return $(".question-editor-caption__container >textarea")
}

textColor(index){
    return $(`.background-palette .color-container:nth-child(${index})`)
}

get submitBtn(){
    return $(".MuiButtonBase-root.MuiButton-root.MuiButton-text.sc-1f7myeh-1 .MuiButton-label")
}

get textSize(){
    return $(".MuiSlider-root.MuiSlider-colorPrimary .MuiSlider-track")
}

get newPost(){
    return $(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)")
}

get like(){
    return $(".content-block:nth-child(3) .MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge")
}

get que(){
    return $(".content-block:nth-child(3) .img-question:nth-child(2)")
}

get cmt(){
    return $(".content-block:nth-child(3)  .post-content .bky81h-0.gEOQom")
}

get likeCounter(){
    return $(".content-block:nth-child(3) .likes-counter")
}

postNewsfeed(index){
    return $(`.content-block:nth-child(${index})`)
}

get askAQuestion(){
    return $(".MuiPaper-root .MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root:nth-child(2)")
}

get aaqLabel(){
    return $(".sc-195fhah-1.cYJoca>span")
}

get uploadBtn(){
    return $(".background-container .wrapper .sc-56f71l-0.iaChRu")
}

get disabledAddBtn(){  //After creating a wishlist 
    return $(".title-button .sc-56f71l-0.bBbvaW.purple-inverted.addRemove-button")
}

get lookingForRecomd(){
    return $(".MuiButtonBase-root:nth-child(3)")
}

get saveChnagesBtn(){
    return $(".sc-1cwhfm1-1.kRFMej.styled-button-wrapper .MuiButton-label")
}

get discaredpostBtn(){
    return $(".sc-56f71l-0.iaChRu.purple-inverted");
}

get continuePostBtn(){
    return $(".sc-1081fs9-0.gjvevX.sc-1v1uga8-11.cpylpc")
}

get postAQueBtn(){
    return $(".MuiButtonBase-root.MuiButton-root.MuiButton-text.sc-1cwhfm1-0.esnvJk .MuiButton-label")
}

get background(){
    return $(".MuiDialog-container.jss25:nth-child(3) .fonts-item:nth-child(1)")
}

get weshoptext(){
    return $(".z2assy-8.hDjfXs");
}

get textSize(){
    return $(".slider-top-label")
}

get cross(){
    return $(".dialog-close .w9h3q4-0.jXYUpS.icon.dialog-close__icon")
}

get closeBtn(){
    return $(".confirmation .sc-56f71l-0.iaChRu")
}

get filterOption(){
    return $(".MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge")
}

get RAPBrand(){
    return $(".MuiDialog-container:nth-child(3) .sc-2pcmy7-0.bYgfRu .gbhan4-0:nth-child(2) .header-title")
}

get retailerIcon(){
    return $("#merchants-toggle-button .MuiIconButton-label .MuiSvgIcon-root")
}

get RetailerSelect(){
    return $("#merchants-item-0")
}

get RetailerSelect1(){
    return $("#merchants-item-1")
}

get brandIcon(){
    return $("#brands-toggle-button .MuiIconButton-label .MuiSvgIcon-root")
}

get brandSelect1(){
    return $(".MuiDialog-container:nth-child(3) .sc-1nkojsl-2.ZIQsS .gbhan4-0:nth-child(2) .checkbox-list li:nth-child(2) .label-wrapper")
}

get secondBrandOption(){
    return $(".MuiDialog-scrollBody:nth-child(3) .z2assy-0 .sc-1nkojsl-2.ZIQsS .gbhan4-0.fwbGSF.filter-panel.open:nth-child(3) li:nth-child(2) .utdc8v-0 .eEGJCv")
}

get brandName(){
    return $(".MuiDialog-container:nth-child(3) .MuiPaper-root .sc-2pcmy7-0.bYgfRu .gbhan4-0:nth-child(1) ul:nth-child(1) > li:nth-child(1) >span")
}

get secondBrandName(){
    return $(".MuiDialog-container:nth-child(3) .MuiPaper-root .sc-2pcmy7-0.bYgfRu .gbhan4-0:nth-child(1) ul:nth-child(1) > li:nth-child(2) >span")
}

get applyFilterBtn(){
    return $(".bottom-buttons .sc-56f71l-0.iaChRu:nth-child(1)")
}

get searchProductAaq(){
    return $(".sc-12txaws-0.jIyEZD:nth-child(2) .MuiInputBase-root:nth-child(1)  input[placeholder='Search WeShop']")
}

selectedFilterName(index){
    return $(`#brands-menu .MuiListItem-root.sc-1jb845n-4.bmhoTv.MuiListItem-gutters:nth-child(${index}) .MuiButtonBase-root.Mui-checked`)
}

filterIn(index){ //Select 1 brand and 1 retailer
   return $(`.sc-1jb845n-1.dKNqJG.filter-select:nth-child(${index}) .filter-actions-results:nth-child(3) div:nth-child(2) .text-holder > p:nth-child(1)`)
}

get retailerRap0(){
    return $("#merchants-item-0 .MuiButtonBase-root.Mui-checked ")
}

get retailerRap1(){
    return $("#merchants-item-1 .MuiButtonBase-root.Mui-checked ")
}

get brandRap0(){
    return $("#brands-item-0 .Mui-checked")
}

get brandRap1(){
    return $("#brands-item-1 .Mui-checked")
}

get noResultsInRap(){
    return $(".sajudl-0.idzkGR>div:nth-child(4)>h3")
}

get secondFilterBrandOption(){
    return $(".sc-1jb845n-3.kFfhVc.search-filters .filter-container .sc-1jb845n-1.dKNqJG.filter-select:nth-child(1) .filter-actions-results >div:nth-child(3) .text-holder:nth-child(1) >p:nth-child(1)")
}

get secondRetailerOption(){
    return $(".sc-1jb845n-3.kFfhVc.search-filters .filter-container .sc-1jb845n-1.dKNqJG.filter-select:nth-child(2) .filter-actions-results >div:nth-child(3) .text-holder:nth-child(1) >p:nth-child(1)")
}

get selectedFilterName1(){
    return $(".MuiDialog-container:nth-child(3) .search-pod:nth-child(2) .product-author-container .product-author-name");
}

get editCaption(){ //AAQ post
    return $(".l6j9c5-1.eRwHjm:nth-child(2)")
}

get suggestion(){
    return $("#search-typeahead-item-0")
}

get suggestionIcon(){
    return $(".MuiPaper-root .sc-7gsu7d-1:nth-child(2) .typeahead-container__icon")
}

get productName(){
    return $("#search-typeahead-item-0")
}

get recommendCrossIcon(){
    return $(".MuiDialog-container:nth-child(3) .MuiPaper-root .sc-2pcmy7-0.bYgfRu .gbhan4-0:nth-child(1) ul:nth-child(1) > li:nth-child(1) >a")
}

get brandCrossIcon1(){
    return $(".MuiDialog-container:nth-child(3) .MuiPaper-root .sc-2pcmy7-0.bYgfRu .gbhan4-0:nth-child(1) ul:nth-child(1) > li:nth-child(2) >a")
}

get afterSelectingbrandHeading(){
    return $(".MuiDialog-container:nth-child(3) .sc-1p6a91s-0 .z2assy-1.dkKrl .sc-1nkojsl-2.ZIQsS .gbhan4-0:nth-child(3) .filter-header .header-title")
}

get afterSelectingRtailerOption(){
    return $(".MuiDialog-container:nth-child(3) .sc-1p6a91s-0 .z2assy-1.dkKrl .sc-1nkojsl-2.ZIQsS .gbhan4-0:nth-child(4) .filter-header .header-title")
}

get deleteBackgroundBtn(){
    return $(".MuiButtonBase-root.MuiIconButton-root:nth-child(2)")
}

get skipBtn(){
    return $(".sc-1qt5yle-4.jTBsU .sc-56f71l-0.iaChRu.purple-inverted:nth-child(2)")
}

get rapNextBtn(){ //After skiping the tagging the product step
    return $(".buttons-container .sc-56f71l-0.iaChRu:nth-child(1)")
}

get disabledNextBtn(){ //without adding single product checking disabled next Button
    return $(".sc-56f71l-0.bBbvaW")
}

get aaqThirdStep(){
    return $(".sc-1hjjkgc-0.koDfIn .sc-1hjjkgc-1.drskXq:nth-child(3) .sc-1hjjkgc-2.YldMF.shadowed .w9h3q4-0.GlElq.icon")
}

get followedUserPostName(){
    return $(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(1)")
}

get userNameNewsfeed(){
    return $(".content-block:nth-child(9) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(1)")
}

get discardBtn(){
    return $(".buttons-container .sc-56f71l-0.iaChRu:nth-child(3)")
}

get userName(){
    return $(".sc-7rqm9q-0.eZZypw:nth-child(1) .info>h3")
}

get name(){  //When user clicks on name from newsfeed then in user details page user name 
    return $(".b9xfa1-0.gBarNF .name") 
}

get otherUserNewsfeed(){
    return $(".name-username>h2")
}

get productNewsfeed(){ //Newsfeed product name
    return $(".content-block:nth-child(9) .slick-slide.slick-active.slick-current:nth-child(1) div:nth-child(1) .item-info > span.title")
}

commentCount(index){
    return $(`.main-column .content-block:nth-child(${index}) .actions>a>div>span:nth-child(2)`)
}

rapSuggestion(index){
    return $(`.MuiList-root.jss2.MuiList-padding:nth-child(2) .MuiListItem-root.sc-12txaws-2.fdKwHh.MuiListItem-gutters:nth-child(${index})`)
}

get productImage(){
    return $(".main-column .content-block:nth-child(3) .post-image .slick-slide.slick-active.slick-current>div>a>div>div>img")
}

postOptions(index){
    return $(`.content-block:nth-child(${index}) .sc-16juea8-0.dZRJah.header .ellipsis`);
}

postOperations(index){
    return $(`.sc-1ov04d-1.kgzJHw.tooltip-container>ul>li:nth-child(${index})`)
}

get errorMsgForImage(){
    return $(".nesppr-8.gmLzEe>p")
}

get videoLogoNewsfeed(){
    return $("#movie_player")
}

get mediaSecond(){ //Create a new post "Media"
    return $(".sc-1hjjkgc-1.drskXq:nth-child(2) .sc-1hjjkgc-2.YldMF:nth-child(1)")
}

rapSteps(index){
    return $(`.sc-1hjjkgc-1.drskXq:nth-child(${index}) .sc-1hjjkgc-2.YldMF:nth-child(1)`)
}

get procutImgBtn(){ //Disabled as product is not selected
    return $(".sc-56f71l-0.bBbvaW:nth-child(1)")
}

get disabledNextBtn(){ //Without media user clicks on submit button and it's disabled
    return $(".sc-56f71l-0.bBbvaW:nth-child(2)")
}

get addSomeMediaLabel(){
    return $(".buttons-container>p");
}

get rapFirstStepHeading(){
    return $(".sc-195fhah-1.cYJoca>h1")
}

get aaqProductCount(){
    return $(".sc-1hjjkgc-1:nth-child(2) .MuiBadge-badge.MuiBadge-anchorOriginTopRightRectangle.MuiBadge-colorSecondary")
}

get aaqBackgroundImage(){
    return $(".background-list .background-list__slot:nth-child(2)")
}

get aaqCaption(){ //Ask a Question Step3
    return $("#captionTextarea")
}

get addText(){
    return $(".MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.MuiOutlinedInput-inputMultiline")
}

get aaqEmoji(){
    return $(".emoji-popover-icon>img")
}

get removePrd(){
    return $(".sc-1hjjkgc-3.fqvSAE .sc-1hjjkgc-4.bIHovD:nth-child(1) .MuiSvgIcon-root")
}

get deleteBackground(){
    return $(".nglzl6-1.eWdySA .MuiButtonBase-root.MuiIconButton-root .MuiIconButton-label")
}

suggestionRap(index){
    return $(`.MuiList-root.jss2.MuiList-padding:nth-child(2) .MuiListItem-root.sc-12txaws-2.fdKwHh.MuiListItem-gutters:nth-child(${index}) .MuiListItemText-root.MuiListItemText-multiline>p`)
}

get spamReport(){
    return $(".dialog-content>ul>li:nth-child(1)")
}

get flagContentBtn(){
    return $(".MuiPaper-root .sc-56f71l-0.iaChRu")
}

get confirmationPopup(){
    return $(".confirmation")
}

get closeBtn(){
    return $(".confirmation .sc-56f71l-0.iaChRu")
}

get aaqTextWrapper(){
    return $(".text-wrapper>p")
}

get saveQuestionBtn(){
    return $(".sc-195fhah-0.gLSDob .sc-56f71l-0.iaChRu")
}

get nextBtnForVideo(){
    return $(".buttons-container .sc-56f71l-0.iaChRu:nth-child(1)")
}

get post(){
    return $(".content-block:nth-child(15) .sc-16juea8-0.dZRJah.header .ellipsis")
}

get captionOnNewsfeed(){
    return $(".content-block:nth-child(3) .post-content .bky81h-0.gEOQom")
}

get playBtn(){
    return $(".content-block:nth-child(3) .post-image .video-icon>img")
}

get selectPrdRap(){
    return $(".vtl34a-0.jRogFA.createPost-layout .vtl34a-1.kwFCqN .sc-195fhah-0.gLSDob .sajudl-0.idzkGR .ao51ir-0.lfyyWF:nth-child(6) .productItem .MuiButtonBase-root.MuiIconButton-root.jss15.MuiCheckbox-root.custom-checkbox-root .MuiIconButton-label ")
}

get hashTag(){
    return $(".content-block:nth-child(3) .post-content .bky81h-0.gEOQom .hashtag")
}

get selectPrdAaq(){
    return $(".sc-1jtvvdw-0.cHQRzR .sc-195fhah-0.gLSDob .ao51ir-0.lfyyWF:nth-child(5) .productItem .MuiIconButton-label")
}

get videoIcon(){
   return $(".post-image .video-icon>img")
}

get uploadBtnForRap(){ //when one media is uploaded
    return $(".element .sc-56f71l-0.iaChRu:nth-child(1)")
}

createQue(){
    this.uploadBtn.waitForVisible();
    this.uploadBtn.click();
    browser.pause(4000);
    this.saveBtn.waitForVisible();
    this.saveBtn.click();
    browser.pause(4000);
    this.saveBtn.waitForVisible();
    this.saveBtn.click();
    browser.pause(4000);
    this.aaqHelpMeText.waitForVisible();
    this.aaqHelpMeText.click();
    this.aaqHelpMeText.setValue('help');
 //Jenkins
    browser.scroll(0,10000);    
    this.saveBtn.waitForVisible();
    this.saveBtn.click();
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
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    browser.pause(4000);
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    browser.pause(4000);
    this.nextBtn.waitForVisible();
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
      browser.scroll(0,1000);
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
      browser.moveToObject(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)")
      expect(this.newPost.getText()).eql(testData.post.newpost);
}

createRap(){
    this.searchProductAaq.waitForVisible();
    this.searchProductAaq.click();
    this.searchProductAaq.setValue([testData.product.prdname, 'Enter']);
    browser.scroll(0,100);
    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.vtl34a-0.jRogFA.createPost-layout .vtl34a-1.kwFCqN .sc-195fhah-0.gLSDob .sajudl-0.idzkGR .ao51ir-0.lfyyWF:nth-child(6) .productItem .MuiButtonBase-root.MuiIconButton-root.jss15.MuiCheckbox-root.custom-checkbox-root .MuiIconButton-label '
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
    );      
    this.selectPrdRap.waitForVisible();
    this.selectPrdRap.click();
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    const toUpload = path.join(__dirname, "..", "resources", "laptop.jpeg");
    browser.chooseFile('input[type="file"]', toUpload);    
//Jenkins
    browser.scroll(0,10000);        
    this.saveBtn.waitForVisible();
    this.saveBtn.click();
    browser.pause(2000);
    this.skipBtn.waitForVisible();
    this.skipBtn.click();
    browser.pause(2000);
    this.rapNextBtn.waitForVisible();
    this.rapNextBtn.click();
    browser.pause(2000);
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    browser.scroll(0,1000);
    this.newPost.waitForExist({ timeout: 6000 });
    browser.moveToObject(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)")
    expect(this.newPost.getText()).eql(testData.post.newRapPost);
}

createRapForUpload(){
    this.plusIcon.waitForVisible();
    this.plusIcon.click();
    this.createPost(1).waitForVisible();
    this.createPost(1).waitForVisible();
    expect(this.createPost(1).getText()).to.eql(testData.post.RAP);
    this.createPost(1).click();
    browser.pause(2000);
    this.recommendProductHeading.waitForVisible();
    expect(this.recommendProductHeading.getText()).to.eql(testData.post.RAPHeading);
    this.searchProductAaq.waitForVisible();
    this.searchProductAaq.click();
    this.searchProductAaq.setValue([testData.product.prdname, 'Enter']);
    browser.scroll(0,100);
    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.vtl34a-0.jRogFA.createPost-layout .vtl34a-1.kwFCqN .sc-195fhah-0.gLSDob .sajudl-0.idzkGR .ao51ir-0.lfyyWF:nth-child(6) .productItem .MuiButtonBase-root.MuiIconButton-root.jss15.MuiCheckbox-root.custom-checkbox-root .MuiIconButton-label '
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
    );      
    this.selectPrdRap.waitForVisible();
    this.selectPrdRap.click();
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    const toUpload = path.join(__dirname, "..", "resources", "video.mp4");
    browser.chooseFile('input[type="file"]', toUpload);   

    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.nesppr-10.Tazcl.clickable:nth-child(2)'
            ) === true
          );
        },
        100000,
        "add item input field not visible even after 10s"
    );    
    this.uploadBtnForRap.waitForVisible();
    // this.uploadBtn.click(); 
    // const toUpload1 = path.join(__dirname, "..", "resources", "video 2.mp4");
    // browser.chooseFile('input[type="file"]', toUpload1);  
     
    // this.uploadBtn.waitForVisible();
    // this.uploadBtn.click();
    
    // browser.waitUntil(
    //     function() {
    //       return (
    //         browser.isVisible(
    //           '.buttons-container .sc-56f71l-0.iaChRu:nth-child(1)'
    //         ) === true
    //       );
    //     },
    //     70000,
    //     "add item input field not visible even after 10s"
    // );   
    this.nextBtnForVideo.waitForVisible();
    this.nextBtnForVideo.click();
    browser.pause(2000);
    this.aaqCaption.waitForVisible();
    this.aaqCaption.setValue('#weshop VAgenda for Sustainable Development, adopted by all on development Member States in 2015, provides a shared blueprint for peace and prosperity for people and the planet, now and into the future. At its heart are the 17 Sustainable Development');
    this.nextBtn.waitForVisible();
    this.nextBtn.click();
    browser.scroll(0,1000);
    this.newPost.waitForExist({ timeout: 6000 });
    browser.moveToObject(".content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)")
    expect(this.newPost.getText()).eql(testData.post.newRapPost);
}

deletePost(){
    this.postOptions(3).waitForVisible();
    this.postOptions(3).click();
    this.postOperations(2).waitForVisible();
    this.postOperations(2).click();
    browser.pause(2000);
    this.saveBtn.click();
    Login.profileDetailsPopup.waitForVisible();
    expect(Login.profileDetailsPopup.getText()).to.eql(testData.newsfeed.postDeletion);
    browser.pause(2000);
}

reportPost(){
    this.postOperations(1).waitForVisible();
    this.postOperations(1).click();
    browser.pause(2000);
    this.spamReport.waitForVisible();
    this.spamReport.click();
    this.flagContentBtn.waitForVisible();
    this.flagContentBtn.click();
    browser.waitUntil(
        function() {
          return (
            browser.isVisible(
              '.confirmation'
            ) === true
          );
        },
        60000,
        "add item input field not visible even after 10s"
      );
    expect(this.confirmationPopup.isVisible()).to.eql(true);
    this.closeBtn.waitForVisible();
    this.closeBtn.click();
}

blockUser(){
    this.postOperations(2).waitForVisible();
    this.postOperations(2).click();
    browser.pause(2000);
    this.saveBtn.waitForVisible();
    this.saveBtn.click();
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
    expect(productPage.createdWishlistPopup.isVisible()).to.eql(true);
}

upload(){
    const toUpload = path.join(__dirname, "..", "resources", image);
    browser.chooseFile('input[type="file"]', toUpload);    
    browser.pause(5000);
}
}

export default new Post();