import Page from "./page";
import { expect } from 'chai';


class Gmail extends Page{

    get email_input(){
        return $("input[placeholder='Enter your inbox here']")
    }

    get emailForwardArrow() {
        return $("button[title='Check Inbox @yopmail.com']")
    }

    get emailChanged(){
      return $(".bodymail.yscrollbar:nth-child(2) .yscrollbar:nth-child(2) h1:nth-child(1) span:nth-child(1) > b:nth-child(1)")
    }

    get refreshForNewMails() {
        return $(".wminboxheader #refresh")
    }

    get googleCaptcha(){
        return $(".rc-anchor-center-item.rc-anchor-checkbox-holder .recaptcha-checkbox-border")
    }

    checkinbox_changeiframe(checkemail){
        this.email_input.waitForVisible()
        expect(this.email_input.isVisible()).to.eql(true)
        this.email_input.setValue(checkemail);
        browser.pause(2000);
        browser.waitUntil(
            function() {
              return (
                browser.isVisible(
                  '#refreshbut'
                ) === true
              );
            },
            60000,
            "add item input field not visible even after 10s"
          );
        this.emailForwardArrow.waitForVisible()
        this.emailForwardArrow.waitForVisible()
        this.emailForwardArrow.click()
        browser.pause(5000)
        this.refreshForNewMails.waitForVisible()
        this.refreshForNewMails.click()
        const frameValue = browser.element('#ifmail').value;
        browser.frame(frameValue);
        browser.pause(2000);
    }

    checkinbox_changeiframe_email(checkemail){
        this.email_input.waitForVisible()
        expect(this.email_input.isVisible()).to.eql(true)
        const selector = this.email_input.getValue();
        const backSpaces = new Array(selector.length).fill('Backspace');
        this.email_input.setValue(backSpaces);
        browser.pause(2000);
        this.email_input.setValue(checkemail);
        browser.pause(2000);
        // this.emailForwardArrow.waitForVisible()
        // this.emailForwardArrow.waitForVisible()
        // this.emailForwardArrow.click()
        this.refreshForNewMails.waitForVisible()
        this.refreshForNewMails.click()
        const frameValue = browser.element('#ifmail').value;
        browser.frame(frameValue);
        browser.pause(2000);
    }
}

export default new Gmail();
