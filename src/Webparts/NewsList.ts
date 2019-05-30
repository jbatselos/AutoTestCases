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
 


export class NewsList{

    icon: string
    driver: ThenableWebDriver;
    testingUtil: TestingUtil;
    constructor(driver: ThenableWebDriver) {
        this.icon = 'button[data-automation-id="724de694-da8b-4658-98d5-83b56ebc8f23_0"]';
        this.driver = driver;
        this.testingUtil = new TestingUtil(driver);
    }


    public async TestUserCustomization(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        
        //go to News page creation
        await this.testingUtil.pause(1000);

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/div/div/button')).click();
    
        await this.testingUtil.pause(2000);
        //default is yes so click apply

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(500);
        //check if add button exists
        let addNews = await this.driver.findElements(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[2]/button'));
        expect(addNews[0]).not.toBeNull();
        await this.testingUtil.cancelEdit(); 
        await this.testingUtil.remove();
        
    }

    public async TestViews(switchNum: number, locator: string) {

        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
            
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1500);
        await this.XtraNewsStep();
        await this.testingUtil.pause(1500);

        //go to Data

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[6]/div/div/button')).click();

        //Switch to Manual Source
        let switches = await this.driver.findElements(By.css('button[role="switch"]'));   
        await switches[switchNum].click();
        await this.testingUtil.pause(1500);
        
        //apply 
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        // check if elements exists
        await this.testingUtil.pause(1500);
        
        let element = await this.driver.findElements(By.className(locator));
        
        if(switchNum!=3){
            expect(element.length).toEqual(0);
        }else{
            expect(element.length).not.toEqual(0);
        }

        await this.testingUtil.cancelEdit()
        await this.testingUtil.remove();
    }

    public async TestAllLayouts() {
        
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1000);
        await this.XtraNewsStep();

        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[5]/div/div/button')).click();
        // click lists
        
        await  this.layoutTests(1,"typeList",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/div' );
        await  this.layoutTests(0,"MainNewsItem",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/section[1]');
        await  this.layoutTests(2,"typeSideBySide",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/div');
        await  this.layoutTests(3,"slideTile",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/div/div/div/div[2]/div/div');
        await  this.layoutTests(5,"gridItem",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/div');
        await  this.layoutTests(4,"carouselTile",'//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[2]/section/section/div[3]/div[2]/div/div/div/div[2]/div/div');
        
        await this.testingUtil.cancelEdit()
        
        await this.testingUtil.remove();
        
    }


    private async layoutTests( title: number, layout: string, layoutXPath: string){
    
        await this.testingUtil.pause(1000);
        let radioChoices = await this.driver.findElements(By.css('div[class*="ms-ChoiceField-wrapper choiceFieldWrapper-"]'));
        await radioChoices[title].click();

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        let layoutNew = layout + '_c9bcfd9f';
        if(title == 3 || title == 4){
            layoutNew = layoutNew + ' slideContentContainer_c9bcfd9f';
        }
        //check if results match
        await this.testingUtil.pause(1000);
        
        let element = await this.driver.findElement(By.xpath(layoutXPath));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutNew)
        })

        await this.checkStyle(title,'_03ecbc22',layoutXPath,layout, 'Sierra' )
        await this.checkStyle(title,'_b78ee607',layoutXPath,layout,'Foxtrot')

        await this.driver.findElement(By.css('div[role="listbox"]')).click();
        await this.driver.findElement(By.css('button[title="Default"]')).click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(500);
    }

    private async checkStyle(title:number , code: string, lXpath:string, layout:string, style:string){
        
        let styleString = 'button[title='+style+']';
        await this.driver.findElement(By.css('div[role="listbox"]')).click();
        await this.driver.findElement(By.css(styleString)).click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);

        let layoutNew = layout + code;
        if(title == 3 || title == 4){
            layoutNew = layoutNew + ' slideContentContainer'+code;
        }

        let element = await this.driver.findElement(By.xpath(lXpath));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutNew)
        })

    }
    private async XtraNewsStep(){
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/button')).click();
        await this.testingUtil.pause(2000);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/button')).click();
        await this.testingUtil.pause(1000);
    }
}