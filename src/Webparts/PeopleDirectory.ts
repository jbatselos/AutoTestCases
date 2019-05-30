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

import { TestingUtil } from "../TestingUtil";
import { ThenableWebDriver} from 'selenium-webdriver';


export class PeopleDirectory{

    icon: string
    driver: ThenableWebDriver;
    testingUtil: TestingUtil;
    constructor(driver: ThenableWebDriver) {
        this.icon = 'button[data-automation-id="d48a9fa7-8e04-44ff-9215-699dd6f9f4b8_0"]';
        this.driver = driver;
        this.testingUtil = new TestingUtil(driver);
    }

    public async TestView(){
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        
        //go to Tile settings
        await this.testingUtil.pause(2000);

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div/button')).click();

        //check default
        let element  = this.driver.findElements(By.xpath('div[class="LargeSizeItem_ea59ecae"]'));
        expect(element).not.toBeNull();
        //change to Tile
        let switches = await this.driver.findElements(By.css('button[role="switch"]'));
        await switches[1].click();
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        await this.testingUtil.pause(1500);
        let element2  =  await this.driver.findElements(By.xpath('div[class="SmallSizeItem_ea59ecae"]'));
        expect(element2).not.toBeNull();


        //switch back
        
        await switches[1].click();
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        let element3  = await this.driver.findElements(By.xpath('div[class="LargeSizeItem_ea59ecae"]'));
        expect(element3).not.toBeNull();

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();

    }

    public async TestProperties(){
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        
        //check default
        

        //go to change order
        await this.testingUtil.pause(1500);

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div/button')).click();

        await this.driver.findElement(By.xpath('//*[contains(text(),"Tiles properties configuration")]')).click();
        await this.testingUtil.pause(1500);
        await this.driver.findElement(By.css('div[data-item-index="0"]')).click();
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.css('button[data-command-key="Down"]')).click();

        let cancelButtons = await this.driver.findElements(By.css('i[data-icon-name="Cancel"]'));
        await cancelButtons[2].click();

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        await this.testingUtil.pause(1500);
        //check again

        let element = await this.driver.findElement(By.css('div[class="fieldContent_ed795905" ]'));
        element.getAttribute('title').then( attr =>  {
            expect(attr).toMatch('Work Phone')
        })

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();


    }

    public async TestSearch(){
                //set up webpart
                await this.testingUtil.SetupWebpartLocal(this.icon);
                await this.testingUtil.pause(2000);
                await this.testingUtil.pause(2000);
                await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/div/div/div[1]/div[1]/div[1]/input')).sendKeys('Reader'+Key.ENTER);
                await this.testingUtil.pause(1500);
        
        
                let element = await this.driver.findElement(By.css('div[class*="ms-DocumentCardTitle root-"]'));
                element.getAttribute('title').then( attr =>  {
                    expect(attr).toMatch("Reader Restricted")
                })
                
                await this.testingUtil.remove();

    }
}