import Page from "./page";

class Product extends Page{


get productSuggestion(){
    return $(".sc-1fz54jw-1.gHQIQQ:nth-child(1) .typeahead-container__content .typeahead-container__content__primary")
}

get showingResult(){
    return $(".search-results-wrapper")
}

get resultCount(){
    return $(".title-container .results-quantity")
}

get editWishlistBtn(){
    return $(".card.wishlist-info.sticky .edit-delete-row:nth-child(1) .edit.image-text:nth-child(2)")
}

price(index){
    return $(`.pe-md-3 .product-wrapper.d-flex.justify-content-between.rounded:nth-child(${index}) .product-info.flex-grow-1.overflow-hidden.ps-3 > h5.price.m-0`)
}

get image(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2)>img")
}

get descp(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > h3.title")
}

get retailerName(){
    return $(".sc-5wwmt8-0.iKGBpl:nth-child(2) .brand")
}

get product1(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2)")
}

get share(){
    return $(".sc-1ostnru-6.jQbuET:nth-child(3) .sc-1ostnru-7.iZkjtJ:nth-child(3)")
}

get copy(){
    return $(".MuiDialog-container:nth-child(3) .MuiButtonBase-root .MuiButton-label")
}

get copyBtn(){
    return $(".sc-14wm98u-1.jgsUyu")
}

get link(){
    return $(".copy-link-input")
}

get userName(){
    return $(".username.own-profile")
}

get otherUserName(){
    return $(".b9xfa1-0.gBarNF .name")
}

get postName(){
    return $(".sc-9jt9lg-0.eiUGAE >h2")
}

get searchPeopleOption(){
    return $(".header-results-type >li:nth-child(2)")
}

get wishlistModal(){
    return $(".wishlist-modal")
}

get detailsPage(){
    return $(".content-wrapper")
}

get searchPeopleIcon(){
    return $(".sc-7rqm9q-1 .sc-7rqm9q-0:nth-child(1) div.info > h3:nth-child(1)")
}

searchedPeopleSelect(index){
    return $(`.sc-7rqm9q-1 .sc-7rqm9q-0:nth-child(${index}) div.info > h3:nth-child(1)`)
}

get shareIcon(){
    return $(".share-button")
}

get sharePost(){
    return $(".MuiButtonBase-root.MuiButton-root.MuiButton-text .MuiButton-label")
}

get copiedPopup(){
    return $(".minified-copied")
}

get crossProfileIcon(){
    return $(".l8qxrk-0.jxYAmZ .dialog-close .w9h3q4-0.gJvwnA.icon.dialog-close__icon")
}

get weShopLogo(){
    return $(".nav-main-logo__img")
}

get addToPost(){ //In product deatils page add to post btn
    return $(".sc-1ostnru-17.bxPuWL .sc-1ostnru-9.gyByto:nth-child(2)")
}

prdPostOptions(index){  //In PDP RAP and AAQ options
    return $(`.add-to-post-modal .sc-56f71l-0.iaChRu:nth-child(${index})`);
}

get productBadge(){
    return $(".sc-1hjjkgc-1.drskXq:nth-child(1) .sc-1hjjkgc-2.YldMF:nth-child(1) .MuiBadge-root.sc-1hjjkgc-5.gaSdjC:nth-child(1) .MuiBadge-badge:nth-child(1)")
}

get scrollPrd(){
    return $(".search-results-wrapper .sc-5wwmt8-0.iKGBpl:nth-child(25)")
}

get buyBtnPDP(){
    return $(".sc-56f71l-0.iaChRu")
}

get wishlistBtn(){
    return $(".sc-639abu-0.kAjkTK .sc-1ostnru-9.gyByto:nth-child(2)")
}

get shareBtn(){
    return $(".sc-1ostnru-7.iZkjtJ:nth-child(3)  .sc-1ostnru-9.gyByto")
}

get addToPostBtn(){
    return $(".sc-1ostnru-17.bxPuWL .sc-1ostnru-9.gyByto")
}

get pdpPrice(){
    return $(".sub-title>b")
}

get productlistName(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > h3.title")
}

get pdpName(){
    return $(".z68ck-0.jSvcrQ.sc-1ostnru-3.eISxDd")
}

get productlistRetailer(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .product-info:nth-child(2) > span")
}

get subtilte(){ //In product details page title means price, retailer
    return $(".sub-title")
}

// get followerRadioBtn(){
//     return $(".sc-13hahjp-0.gHNUpE .sort-desktop>li:nth-child(2)>p")
// }

peopleFilter(index){
    return $(`.sc-13hahjp-0.gHNUpE .sort-desktop >li:nth-child(${index})`)
}

get crossIconBrand(){
    return $(".sc-1jb845n-1:nth-child(1) .filter-actions-results:nth-child(3) div:nth-child(3) .text-holder >img")
}

get crossIconRetailer(){
    return $(".sc-1jb845n-1:nth-child(2) .filter-actions-results:nth-child(3) div:nth-child(3) .text-holder > img")
}

get wishlistLabel(){
    return $(".dialog-content .title")
}

get craetedWishlist(){
    return $(".sc-1k9dhmg-2.dvBfjW:nth-child(1) .wishlist-item__details__primary:nth-child(1)")
}

get createWishlist(){
    return $("input[placeholder='Wishlist name']")
}

get addBtn(){ //Add a product to wishlist button
    return $(".title-button .sc-56f71l-0.iaChRu.purple-inverted.addRemove-button")
}

get publicBtn(){ //public wishlist button
    return $(".MuiButtonBase-root.MuiIconButton-root.jss20.MuiSwitch-switchBase.MuiSwitch-colorSecondary.jss21.Mui-checked")
}

get createdWishlistPopup(){
    return $(".MuiSnackbarContent-message.message")
}

get removeBtn(){ //Remove previously added product
    return $(".sc-56f71l-0.iaChRu.purple-inverted.remove-button")
}

get closeCreatedWishlitPopup(){
    return $(".MuiIconButton-label .MuiSvgIcon-root:nth-child(1)")
}

get wishlistPopupClose(){
    return $(".w9h3q4-0.gJvwnA.icon.dialog-close__icon")
}

get addTopostPopup(){
    return $(".add-to-post-modal")
}

get sharePopup(){
    return $(".sc-1ostnru-14.hxLnDc")
}

get disabledAddBtn(){
    return $(".title-button .sc-56f71l-0.bBbvaW.purple-inverted.addRemove-button")
}

socialMediaIcons(index){
    return $(`.modal-share-buttons__item:nth-child(${index})`)
}

get productImg(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) >img")
}

get productName(){
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .title")
}

get productNamePdp(){
    return $(".md>p")
}

get brand(){ //On product list page brand name
    return $(".sc-5wwmt8-1 .sc-5wwmt8-0:nth-child(2) .brand")
}

get filterFollower(){
    return $(".sc-7rqm9q-0.eZZypw:nth-child(1) .info >span")
}

//DASHBOARd related locators
get lastUpdated(){
    return $(".sc-14yhooi-0.cgiHWE .subtitle")
}

get sharePrice(){
    return $(".sticky .purchases-graph.card .text-content:nth-child(2) > .share-price")
}

get totalWeshares(){
    return $(".share-price-graph.card .title")
}
}

export default new Product();
