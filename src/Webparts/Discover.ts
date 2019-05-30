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
 


export class Discover{

        icon: string
        driver: ThenableWebDriver;
        testingUtil: TestingUtil;
        constructor(driver: ThenableWebDriver) {
            this.icon = 'button[data-automation-id="d37f91f9-32ca-4919-9b63-24b3789f7134_0"]';
            this.driver = driver;
            this.testingUtil = new TestingUtil(driver);
        }


    public async TestView(elementToTest: string, switchNum : number){
        
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        
        await this.testingUtil.pause(2500);
        // expect default is shown
        var element = await this.driver.findElement(By.css(elementToTest))
        var attrib = await (element.getAttribute("class"));
        expect(attrib).not.toBeNull;

        //go to edit webpart
        await this.testingUtil.goToEdit();
        //go to View 
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div/button/div')).click();
        
        //turn off switch

        let switches = await this.driver.findElements(By.css('button[role="switch"]'));   
        await switches[switchNum].click();
        //apply
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(800);
        
        //check again
        expect(element).toBeNull;
        
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }



    public async TestAllLayouts() {
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.goToEdit();
        
        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[4]/div/div/button')).click();
        // click lists
        await this.layoutTests('Paris',"ms-Grid-col searchTemplateDocumentWithPreview_c4592a5a searchTemplateDocumentListMode_c4592a5a","");
        await this.layoutTests('Default', "ms-Grid-col searchTemplateDocumentWithPreview_c4592a5a searchTemplateDocumentListMode_c4592a5a","");
        
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
        
    }

    public async TestSearch(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        await this.testingUtil.pause(1500);

        await this.driver.findElement(By.css('input[placeholder="Search"]')).sendKeys('Benefits'+Key.ENTER);

        await this.testingUtil.pause(2000);


        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]'));
        element.getAttribute('title').then( attr =>  {
            expect(attr).toMatch("Benefits .pptx")
        })
    
        await this.testingUtil.remove();
    }
    public async TestStaticSearch(){
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1000); 
        //go to Search
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/div/div/button')).click();
        await this.testingUtil.pause(1000);

        let switches = await this.driver.findElements(By.css('button[role="switch"]'));
        await switches[1].click();

        await this.driver.findElement(By.css('textarea[placeholder="Enter search query"]')).sendKeys(Key.BACK_SPACE+'Word'+Key.ENTER);

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        await this.testingUtil.pause(1500);


        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div/section/div/div[2]/div/div[1]/div/div[2]/div[1]'));
        element.getAttribute('title').then( attr =>  {
            expect(attr).toMatch("WordDocInFolder.docx")
        })
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();

    }

    private async layoutTests( title: string, layoutList: string, layoutTile: string){
        
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
        await this.testingUtil.pause(500);

        
        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div[2]/div/div[1]/div'));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutTile)
        })

        let switches = await this.driver.findElements(By.css('button[role="switch"]'));
        await switches[1].click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(500);

        
        //check if results match
        element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div[2]/div/div[1]'));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutList)
        })

        await switches[1].click();


    }

}