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

export class PersonalContent{

        icon: string
        driver: ThenableWebDriver;
        testingUtil: TestingUtil;
        constructor(driver: ThenableWebDriver) {
            this.icon = 'button[data-automation-id="8da684ee-309a-4fcc-bf9a-104120b4b537_0"]';
            this.driver = driver;
            this.testingUtil = new TestingUtil(driver);
        }

    public async TestViews(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(500);

        //go to view
        await this.driver.findElement(By.xpath('//*[contains(text(),"View settings")]')).click();
        await this.testingUtil.pause(500);

        //change & check
        await this.Views('Juliett','class="wsbItem_87184ad8"')
        await this.Views('Paris','class="wsbItem_6cf64b72"' )

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
        
    }
    private async Views(name: string, cssClass: string){
        await this.driver.findElement(By.css('div[id*="Dropdown"]')).click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[title="'+name+'"]')).click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);

        let elements = await this.driver.findElements(By.css('div['+cssClass+']'));

        expect(elements).not.toBeUndefined();
    }

    public async TestFilter(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(500);

        //change to sandboxed enviorment
        await this.driver.findElement(By.xpath('//*[contains(text(),"Filter settings")]')).click();
        await this.testingUtil.pause(500);
        let toggles = await this.driver.findElements(By.css('button[id*="Toggle"]'));
        await toggles[1].click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(12000);
        //check result
        let firstResult = await this.driver.findElement(By.css('div[class*="ms-DocumentCardTitle root-"]'));
        firstResult.getText().then( attr =>  {
            expect(attr).toContain('event')
        });
        
        //set events to zero
        let sliders = await this.driver.findElements(By.css('span[class*="lineContainer"]'));

        for(let k =1;k<7;k++){
            await sliders[6].click();
        }
        
        //apply & check
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(12000);
        firstResult = await this.driver.findElement(By.css('div[class*="ms-DocumentCardTitle root-"]'));
        firstResult.getText().then( attr =>  {
            expect(attr).not.toContain('event')
        });
        

        //set pages to zero

        for(let k =1;k<7;k++){
            await sliders[2].click();
        }
        
        //apply & check
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(12000);
        let sitePage = await this.driver.findElements(By.css('div[title="Automated-Test-Sandbox"]'));

        expect(sitePage[0]).toBeUndefined();


        //turn documents on 
        for(let k =1;k<7;k++){
            await sliders[9].click();
        }
        //apply & check
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(12000);
        let document = await this.driver.findElements(By.css('div[title="News-Repost5"]'));

        expect(document[0]).not.toBeUndefined();

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }
    
    public async TestPaging(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(500);

        //go to paging
        await this.driver.findElement(By.xpath('//*[contains(text(),"Paging settings")]')).click();
        await this.testingUtil.pause(500);

        //set to 4
        let sliders = await this.driver.findElements(By.css('span[class*="lineContainer"]'));

        for(let k =1;k<3;k++){
            await sliders[0].click();
        }

        //apply and check
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);

        let elements = await  this.driver.findElements(By.css('div[class*="ms-DocumentCard ms-DocumentCard--actionable ms-Grid-col root"]'));
        expect(elements.length<5)

        //set max
        for(let k =1;k<5;k++){
            await sliders[1].click();
        }

        //apply -> check
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);
        let elements2 = await  this.driver.findElements(By.css('div[class*="ms-DocumentCard ms-DocumentCard--actionable ms-Grid-col root"]'));
        expect(elements2.length>44)

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }
}