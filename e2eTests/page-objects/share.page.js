import Page from "./page";
import testData from "../constants/testData.json"
import { expect } from "chai";

var retailerCount;
var char="A";

class Share extends Page{

    get otherprofile(){
        return $(".ks5vpi-5.bNKinf")
    }
    
    get ownprofile(){
        return $(".ks5vpi-5.bNKinf")
    }

    get postedcaption(){
        return $("div.MuiDialog-root.n3g8mq-0.pCJGG:nth-child(31) .sc-1v3mgku-0.joXdql .fullname-content.text-ellipsis:nth-child(1)")
    }

    get otherUserPostShare(){
        return $(".MuiButtonBase-root.MuiButton-root.MuiButton-text .MuiButton-label>img")
    }

    get ownProfileUrl(){
        return $(".copy-link-input")
    }

    get followingShareBtn(){
        return $(".image-wrapper .share-button")
    }

    get followingUserName(){
        return $("ul:nth-child(2) li:nth-child(1) .followers-list div:nth-child(2) > a:nth-child(2)")
    }

    get unfollowBtnInProfile(){
        return $(".desktop-button-wrapper .sc-56f71l-0.iaChRu.purple-outlined:nth-child(1)")
    }

    get wishlistShare(){
        return $(".card.wishlist-info.sticky .share")
    }

    get userName(){ //in wishlist
        return $(".core.wishlist-page .name")
    }

    profileOptions(index){
        return $(`.bg-white.rounded.border.w-100.p-3.mb-3>div>span:nth-child(${index})`)
    }

    AplhCount() {
        let j = browser.elements(`.first-symbol`).value.length;
        return j
    }

    get discoverTab(){
        return $(".nav-main-container .sc-1v1uga8-10.gUkcAx:nth-child(2) >div:nth-child(2) svg")
    }

    retailerAlphaText(index) {
        return $(`.retailers>div:nth-child(${index}) h3`)
    }

    get createWishlitTextField(){//Creating wishlist from profile
        return $("input[placeholder='Wishlist name']")
    }

    get createWishlistBtn(){
        return $(".btn.btn-primary.mt-2")
    }

    saveAndCancleBtn(index){
        return $(`.modal-footer >button:nth-child(${index})`)
    }

    wihslistName(index){
        return $(`.col-12.col-lg.ps-lg-3.flex-grow-1.position-relative:nth-child(2) .user-content.d-flex.flex-wrap div:nth-child(${index}) .card-body.info-wrapper > .text-truncate.m-0.cursor-pointer`)
    }

    get wishlistNameForValidation(){
        return $(".col-12.col-lg.ps-lg-3.flex-grow-1.position-relative:nth-child(2) .user-content.d-flex.flex-wrap div:nth-child(2) .card-body.info-wrapper > .text-truncate.m-0.cursor-pointer")
    }
    
    getNextChar(char) {
        return String.fromCharCode(char.charCodeAt(0) + 1);
    }

    DiscoverAllRetailers() {

        retailerCount = this.AplhCount();
        var s=testData.share.alphCount;
        const d=parseInt(s);

        expect(retailerCount).to.eql(d)
        this.retailerAlphaText(3).waitForVisible()
        expect(this.retailerAlphaText(3).getText()).to.eql("#")
        char = "A"
        for(var i=4; i<=retailerCount + 2; i++) {

            this.retailerAlphaText(i).waitForVisible()
            var retailer = this.retailerAlphaText(i).getText()
            console.log("Ahh=" +retailer)
            if(char == "X") {
                char = this.getNextChar(char)
            }
            expect(retailer).to.eql(char)
            char = this.getNextChar(char)
           
        }
    }
}


export default new Share();