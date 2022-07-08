import Page from "./page";
import { expect } from 'chai';
import testData from "../constants/testData.json";

class newsfeed extends Page{

    get logo(){
        return $(".flex-grow-1.w-100.position-relative.d-flex>span")
    }

    get createPost(){
        return $(".nav-main-logo__img")
    }

    get feed(){
        return $(".sc-1v1uga8-2.fyeqSL.nav-main-item.nav-main-item-add-post")
    }

    get imageCmt(){
        return $(".sc-2t82jk-4.jJZYho")
    }

    get detailsBtn(){
        return $(".newsfeed-list-item:nth-child(3) .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-3:nth-child(2)")
    }

    get like(){
        return $(".newsfeed-list-item:nth-child(3) #active-love")
    }

    get otherPostComent(){
        return $(".newsfeed-list-item:nth-child(3) .sc-1gpmt38-0.cCSJym:nth-child(3) .comment-create__row:nth-child(1) .sx8ryo-2.gljhMt .comment-create-input-textarea")
    }

    get deleteCmtYesBtn(){
        return $(".sc-56f71l-0.iaChRu:nth-child(2)")
    }

    get postComment(){
        return $(".sc-56f71l-0.iaChRu")
    }

    postedComment(index){
        return $(`.post-comments-wrapper .comments-container .mb-3:nth-child(${index}) .post-text`)
    }

    get ownUserComment(){
        return $(".sc-3fytly-0.gYPlle:nth-child(2) .bky81h-0.gEOQom");
    }

    get prdCmt(){
        return $(".comment__primary__content__product")
    }

    get imageInCmt(){
        return $(".sc-3fytly-2.bvtewK>img")
    }

    get ownUserAAQCmt(){
        return $(".sc-1gpmt38-0:nth-child(2) .sc-1gpmt38-1.MaIzJ>div:nth-child(2) .bky81h-0");
    }

    addComment(index){
        return $(`.bg-white.mb-2.rounded.mb-md-3.overflow-hidden.border:nth-child(${index}) .pe-1.material-icons-outlined`)
    }

    get addCmtTwo(){
        return $(".main-column .content-block:nth-child(4) .actions>a>div>img")
    }

    post(index){
        return $(`.content-block:nth-child(${index})`)
    }

    get share(){
        return $(".newsfeed-list-item:nth-child(3)  .sc-1nld9f5-0 .MuiSvgIcon-root")
    }

    get copyBtn(){
        return $(".MuiButtonBase-root.MuiButton-root.MuiButton-text.sc-1cwhfm1-0.kTmsrO .MuiButton-label")
    }

    get copiedPopup(){
        return $(".regular .minified-copied")
    }

    get editOrDeleteCmt(){
        return $(".sc-68bmi1-0.bmlXNU>ul>li:nth-child(2)")
    }

    commentOption(index){ //Emoji, product and text 3 options are their
        return $(`.comment-create__row__actions .comment-create__row__actions__item:nth-child(${index})`)
    }

    get addPrdToComment(){
        return $(".search-body #search-typeahead-input")
    }

    get addPrdBtn(){
        return $(".sc-17vwwnr-0.iobcSV.product-wrapper:nth-child(1) .productItem .sc-56f71l-0.iaChRu")
    }

    timeStamp(index){
        return $(`.content-block:nth-child(${index}) .sc-16juea8-0.dZRJah.header .info >div>span:nth-child(2)`)
    }

    commentOptions(index){
        return $(`.sc-68bmi1-0.bmlXNU >ul>li:nth-child(${index})`)
    }

    profilePost(index){
        return $(`.content-block:nth-child(${index}) .MuiButton-label>img`)
    }

    userProfilePost(index){
        return $(`.sc-9j83u1-0.hxWAFJ .sc-1mu0syi-1.dVdpBC:nth-child(${index})`)
    }

    get wishlistPrdImg(){
        return $(".columns-wrapper .item:nth-child(1) .img-wrapper > img:nth-child(1)")
    }

    get writeCmt(){
        return $("textarea[placeholder='Add a comment']")
    }

    get postWishlistCmt(){
        return $(".sx8ryo-2.gljhMt .MuiButton-label")
    }

    profileCount(index){  //On newsfeed Posts etc count locator
        return $(`.user-info-counts .count:nth-child(${index}) .number`);
    }

    newsFeedCount(index){
        return $(`.gs61pw-0.kEbIaA .user-info-counts div.count:nth-child(${index}) > .number`)
    }

    get peopleYouMayKnow(){
        return $(".sc-1xwm0m6-0.cHwNXh")
    }

    get folBtn(){ //People you may know follow button
        return $(".sc-130g6cx-0.htxXiB:nth-child(2) .slick-slide.slick-active.slick-current:nth-child(1) span:nth-child(5) div:nth-child(1) > .sc-56f71l-0.iaChRu")
    }

    get createWishlistBtn(){
        return $(".sticky .card.create-wishlist-small > button:nth-child(2)")
    }

    get wishlistErrormsg(){
        return $(".error-message")
    }

    wishlist(index){ //Wishlist count
        return $(`.wishlists-list-wrapper .sc-9j83u1-0.hxWAFJ .item:nth-child(${index})`)
    }

    get deleteWishlist(){
        return $(".card.wishlist-info.sticky .delete.image-text .text")
    }

    get wishlistCrossIcon(){
        return $(".w9h3q4-0.gJvwnA.icon.dialog-close__icon")
    }

    get likeWishlist(){
        return $(".card.wishlist-info.sticky .likes-comments-row .likes.image-text .text:nth-child(2)")
    }

    get cmtWishlist(){
        return $(".card.wishlist-info.sticky .likes-comments-row .comments.image-text")
    }

    get wishlistName(){
        return $(".main-column .edit-name.card > input:nth-child(2)")
    }

    get productWihslist(){
        return $(".wishlist-items .price-data >span:nth-child(1)")
    }

    get wishlistCount(){ //Wishlist count on profile page
        return $(".left-column .sc-1ldthaf-0.jFUhUQ .user-info-counts .count:nth-child(3) > .number")
    }

    countOnProfilePage(index){
        return $(`.left-column .sc-1ldthaf-0.jFUhUQ .user-info-counts .count:nth-child(${index}) > .number`)
    }

    get wishlistCountOnProfile(){
        return $(".left-column .info-wrapper .user-info-counts .count:nth-child(3) > .number")
    }

    get selectEmoji(){
        return $(".emoji-mart-category:nth-child(2) .emoji-mart-category-list li:nth-child(1) .emoji-mart-emoji.emoji-mart-emoji-native > span:nth-child(1)")
    }    

    get purchaseHeading(){
        return $(".sc-14yhooi-0.cgiHWE .title")
    }

    dashboardOptions(index){
        return $(`.pages-switch .option.false:nth-child(${index})`)
    }

    newsfeedOptions(index){  //Your feed, Dashboard, Inbox
        return $(`.nav-main-wrapper.mui-fixed .sc-1v1uga8-1.UAjzl.nav-main-item.nav-main-item--mobile:nth-child(${index}) .sc-1v1uga8-12.jhbKPP`)
    }

    get wishlistEdit(){
        return $(".left-column .edit-delete-row button.edit.image-text:nth-child(2) > .text:nth-child(2)")
    }

    get inboxMonth(){
        return $(".sc-1a9wc9e-12.hqiVfQ")
    }

    get editWishlistName(){
        return $(".columns-wrapper .edit-name.card > input:nth-child(2)")
    }

    get deleteCmt(){
        return $(".w9h3q4-0.kajIGg.icon")
    }

    get saveBtn(){ //Rename wishlist
        return $(".save")
    }

    get updatedWishlistName(){
        return $(".card.wishlist-info.sticky .name-info .wishlist-name")
    }

    get notificationTime(){
        return $(".container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(1) .timestamp")
    }

    get notificationProfile(){
        return $(".container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(1) .mfiyyj-3.aNaUT>img")
    }

    afterPostCreationLabel(index){
        return $(`.content-block:nth-child(3) .sc-16juea8-0.dZRJah.header .info>div>span:nth-child(${index})`)
    }

    get notificationUsername(){
        return $(".container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(1) .content>a")
    }

    notification(index){
        return $(`.container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(${index}) .content`)
    }

    notifications(index){
        return $(`.container-outer .sc-1a9wc9e-6.kbKtSu:nth-child(1) .item:nth-child(${index})`)
    }

    get notificationPost(){
        return $(".sc-9jt9lg-0.eiUGAE>h2")
    }

    get nikPost(){
        return $(".content-block:nth-child(9)>div .info>div>span:nth-child(1)")
    }

    get profileIcon(){
        return $(".avatar-container>img")
    }
}

export default new newsfeed();

