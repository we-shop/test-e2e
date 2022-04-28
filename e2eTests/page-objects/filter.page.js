import Page from "./page";
import { expect } from 'chai';
import testData from "../constants/testData.json";

class Filter extends Page{

    get serachBar(){
        return $("input[placeholder='Search WeShop']");
    }

    get suggestion(){
        return $("#search-typeahead-item-2")
    }

    gridViewPrd(index){
        return $(`.search-results-wrapper.grid-view .sc-5wwmt8-0.iKGBpl.for-grid-view:nth-child(${index})`)
    }

    get viewPrice(){
        return $(".search-results-wrapper :nth-child(2) .product-info .price")
    }

    get viewRetailer(){
        return $(".search-results-wrapper :nth-child(2) .product-info .brand")
    }

    get retailerAfterScroll(){
        return $(".search-results-wrapper :nth-child(8) .product-info .title")
    }

    get viewTitle(){
        return $(".search-results-wrapper :nth-child(2) .product-info .title")
    }

    listGridBtn(index){
        return $(`.view-option >button:nth-child(${index})`)
    }

    get searchIcon(){
        return $(".sc-17wdton-0.eucxwj.jss4")
    }

    get priceDownArrow(){
        return $(".search-filter .gbhan4-0.closed:nth-child(1)")
    }

    get minPrice(){
        return $(" .filter-props div.sc-1jb845n-0.hnDRRX .maxMin-price:nth-child(1) .maxMin-price__item:nth-child(1) .MuiInputBase-root > .MuiInputBase-input.MuiOutlinedInput-input")
    }

    get maxPrice(){
        return $(" .filter-props div.sc-1jb845n-0.hnDRRX .maxMin-price:nth-child(1) .maxMin-price__item:nth-child(2) .MuiInputBase-root > .MuiInputBase-input.MuiOutlinedInput-input");
    }

    get updateResultsBtn(){
        return $(".bottom-buttons .sc-56f71l-0.iaChRu:nth-child(1)");
    }

    get brandOption(){
        return $("input[placeholder='Brands']");
    }

    get brandDropdown(){
        return $("#brands-toggle-button .MuiSvgIcon-root")
    }

    get retailerDropdown(){
        return $("#merchants-toggle-button .MuiSvgIcon-root")
    }

    get wishlistBackBtn(){
        return $(".back-link .MuiSvgIcon-root")
    }

    get brandCount1(){
        return $("#brands-item-0 .MuiListItemText-root.MuiListItemText-multiline .MuiTypography-root.MuiListItemText-secondary")
    }

    get brandCount2(){
        return $("#brands-item-1 .MuiListItemText-root.MuiListItemText-multiline .MuiTypography-root.MuiListItemText-secondary")
    }

    get retailerCount1(){
        return $("#merchants-item-0 .MuiListItemText-root.MuiListItemText-multiline .MuiTypography-root.MuiListItemText-secondary")
    }

    get retailerCount2(){
        return $("#merchants-item-1 .MuiListItemText-root.MuiListItemText-multiline .MuiTypography-root.MuiListItemText-secondary")
    }

    get brandSelect(){ 
        return $("#brands-item-0")
    }

    get brandSelect1(){ 
        return $("#brands-item-1")
    }

    get brandSelect2(){ 
        return $("#brands-item-2")
    } 
    
    get brandSelect3(){ 
        return $("#brands-item-3")
    }

    get brandSelect4(){ 
        return $("#brands-item-4")
    }

    get brandSelect5(){ 
        return $("#brands-item-5")
    }

    get retailerDownArrow(){
        return $(".search-filter .gbhan4-0.closed:nth-child(3)")
    }

    get noResults(){
        return $(".sc-5wwmt8-3.inWsOe>div>div>p")
    }

    get retailerOption(){
        return $("input[placeholder='Retailers']")
    }

    get viewName(){
        return $(".view-option .active>span")
    }

    get clearAll(){
        return $(".bottom-buttons .sc-56f71l-0.iaChRu:nth-child(2)")
    }

    get retailerSelect(){
        return $( "#merchants-item-1")
    }

    get retailerClick(){
        return $(".MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock")
    }

    get retailerSelect2(){
        return $("#merchants-item-0")
    }

    get retailerSelect3(){
        return $( "#merchants-item-2")
    }

    get retailerSelect4(){
        return $( "#merchants-item-3")
    }

    get retailerSelect5(){
        return $( "#merchants-item-4")
    }

    get filterBlock(){
        return $(".sc-1jb845n-3.kFfhVc.search-filters")
    }

    get noresultLabel(){
        return $(".no-results-wrapper>div>p")
    }

    get noResultMsgPrd(){
        return $(".no-results-wrapper>div>p>span")
    }

    get plusBtn(){
        return $(".maxMin-price__item:nth-child(1) div:nth-child(2) > button:nth-child(1)")
    }

    get userNameInSearch(){
        return $(".sc-7rqm9q-0.eZZypw:nth-child(1) .info >span")
    }

    get brandDropdownOptions(){
        return $(".sc-1jb845n-3.kFfhVc.search-filters .sc-1jb845n-1.dKNqJG.filter-select:nth-child(1) .MuiButtonBase-root:nth-child(1) .MuiIconButton-label:nth-child(1) .MuiSvgIcon-root")
    }

    get retailerDropdownOptions(){
        return $(".sc-1jb845n-3.kFfhVc.search-filters .sc-1jb845n-1.dKNqJG.filter-select:nth-child(2) .MuiButtonBase-root:nth-child(1) .MuiIconButton-label:nth-child(1) .MuiSvgIcon-root")
    }

    get errorMsg(){
        return $(".text-danger")
    }

    get suggestionOptions(){
        return $("#search-typeahead-menu #search-typeahead-item-3")
    }

    get retailerSuggestion(){
        return $("#search-typeahead-menu #search-typeahead-item-5")
    }

    get clearFilterBtn(){
        return $(".sc-56f71l-0.iaChRu.purple-outlined.clear-all")
    }

    followingBtn(index){
        return $(`.sc-7rqm9q-0.eZZypw:nth-child(${index}) .sc-56f71l-0.iaChRu.blue`)
    }

    followBtn(index){
        return $(`.sc-7rqm9q-0.eZZypw:nth-child(${index}) .sc-56f71l-0.iaChRu.purple-inverted`)
    }

    get brandFirstOption(){
        return $(".MuiList-root.jss26.MuiList-padding:nth-child(2) #brands-item-0 .jss49")
    }

    get brandSecondOption(){
        return $(".MuiList-root.jss26.MuiList-padding:nth-child(2) #brands-item-1 .jss49")
    }

    get brandSecondOption(){
        return $(".MuiList-root.jss26.MuiList-padding:nth-child(2) #brands-item-2 .jss49")
    }

    get brandThirdOption(){
        return $(".MuiList-root.jss26.MuiList-padding:nth-child(2) #brands-item-3 .jss49")
    }

    get brandFourthOption(){
        return $(".MuiList-root.jss26.MuiList-padding:nth-child(2) #brands-item-4 .jss49")
    }

    get selectedBrandFirst(){
        return $("#brands-item-0 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }
    
    get selectedBrandSecond(){
        return $("#brands-item-1 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }

    get brandThird(){
        return $("#brands-item-2 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }

    get brandFourth(){
        return $("#brands-item-3 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }
    
    get brandFifth(){
        return $("#brands-item-4 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }

    get retailerFirstOption(){
        return $("#merchants-item-0 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }
    
    get retailerSecondOption(){
        return $("#merchants-item-1 .MuiButtonBase-root.MuiIconButton-root.Mui-checked")
    }

    brandFilters(index){
        return $(`.sc-1jb845n-1:nth-child(1) .filter-actions-results:nth-child(3) div:nth-child(${index}) .text-holder > p:nth-child(1)`)
    }

    retailerFilters(index){
        return $(`.sc-1jb845n-1:nth-child(2) .filter-actions-results:nth-child(3) div:nth-child(${index}) .text-holder > p:nth-child(1)`)
    }

    get followersCount(){
        return $(".count:nth-child(1) .number")
    }

    priceAtRap(index){
        return $(`.maxMin-price__item:nth-child(${index}) .MuiInputBase-input.MuiOutlinedInput-input`)
    }

    productPriceInRap(index){
        return $(`.gLSDob .lfyyWF:nth-child(${index}) h2`)
    }

    filter(min,max){
        browser.pause(2000);
        this.minPrice.waitForVisible();
        this.minPrice.click();
        this.minPrice.addValue(min);
        browser.pause(2000);
        this.maxPrice.waitForVisible();
        this.maxPrice.click();
        this.maxPrice.addValue(max);
        browser.pause(2000);
    }
}



export default new Filter();