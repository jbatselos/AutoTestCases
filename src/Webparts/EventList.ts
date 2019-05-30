import {
    ActionSequence,
    Session,
    Capabilities,
    Executor,
    WebElement,
    By,
    Builder,
    Key,
    IWebDriverOptionsCookie
} from 'selenium-webdriver';
import * as fs from 'fs';
import { TestingUtil } from "../TestingUtil";
import { ThenableWebDriver} from 'selenium-webdriver';
import find from 'ramda/es/find';

export class EventList{
    icon: string
    driver: ThenableWebDriver;
    testingUtil: TestingUtil;
    constructor(driver: ThenableWebDriver) {
        this.icon = 'button[data-automation-id="81a6e49c-5190-4167-adb7-06c27acb534a_0"]';
        this.driver = driver;
        this.testingUtil = new TestingUtil(driver);
    }

    public async TestUserCustomization(){

        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1000);
        await this.xtraEventStep();

        //go to Event Creation
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[4]/div/div/button/div')).click();
        await this.testingUtil.pause(1500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(2000);

        expect(await this.driver.findElement(By.xpath('//*[contains(text(), "Add event")]'))).not.toBeNull();
        

        // TO DO: check event creation page
        /*
        let url = await driver.getCurrentUrl();
        expect(url).toBe('https://owdevelop.sharepoint.com/sites/OWv2-Develop/_layouts/15/Event.aspx?ListGuid=3a4ed6d1-f5f5-49b9-9316-a0c9a6e6e900&Mode=Edit');

        */
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }

    public async TestLimitEvents() {
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.pause(1500); 
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1500);
        //go to General
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div/button/div')).click();
        await this.testingUtil.pause(1500);

        //adjust slider to 1
        let slider = await this.driver.findElement(By.css('span[style="width: 33.3333%;"]'));
        await slider.click();

        //apply
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(2000);
        //check amount of items
        let elements = await this.driver.findElements(By.className("EventsListItem_f536101d"));
        expect(elements.length).toEqual(2);

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
        
    }

    public async TestAllLayouts() {

        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.goToEdit();
        await this.xtraEventStep();

        //go to view Settings
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[6]/div/div/button')).click();
        
        // click lists
        
        await this.layoutTests('Sierra',"EventsListItem_912fd12e", "EventsTileItem_912fd12e");
        await this.layoutTests('Default',"EventsListItem_0c5b83fe","EventsTileItem_0c5b83fe");

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
        
    }


    public async TestDateRange(){
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        await this.testingUtil.pause(2000);
        //go to edit webpart
        await this.testingUtil.goToEdit();

        await this.xtraEventStep();

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div')).click();

        //change date range to a week
        let dropdowns = await this.driver.findElements(By.css('span[role="option"]'));
        await dropdowns[1].click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[title="This week"]')).click();

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        await this.testingUtil.pause(1500);

        let noDateElements = await this.driver.findElements(By.css('div[title="No upcoming events"]'));

        expect(noDateElements[0]).not.toBeNull();

        
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }

    private async layoutTests(title: string, layoutList: string, layoutTile: string){
        
        //click on list
        await this.testingUtil.pause(1000);
    
        let lists = await this.driver.findElements(By.css('div[role="listbox"]'));
        await lists[0].click();
        await this.testingUtil.pause(500);
        //click on certain layout
        let dataIndex = 'button[title="'+title+'"]';
        await this.driver.findElement(By.css(dataIndex)).click();
        //apply
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(2000);

    
    let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/div/div/section[2]/div/div[1]'));
    await element.getAttribute('class').then( attr =>  {
        expect(attr).toMatch(layoutList)
    })

    let switches = await this.driver.findElements(By.css('button[role="switch"]'));
    await switches[1].click();
    await this.testingUtil.pause(500);
    await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
    await this.testingUtil.pause(2000);

    
    //check if results match
    element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/div/div/section[2]/div/div[1]'));
    element.getAttribute('class').then( attr =>  {
        expect(attr).toMatch(layoutTile)
    })

    await switches[1].click();
    }

    private async xtraEventStep(){
        await this.testingUtil.pause(2000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div')).click();
        await this.testingUtil.pause(1500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1500);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div[1]/button/div')).click();
    }
}
