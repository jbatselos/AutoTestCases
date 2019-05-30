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
 


export class InfoBar{

    icon: string
    driver: ThenableWebDriver;
    testingUtil: TestingUtil;
    constructor(driver: ThenableWebDriver) {
        this.icon = 'button[data-automation-id="643032a7-f7ef-410a-a227-96c9372040cc_0"]';
        this.driver = driver;
        this.testingUtil = new TestingUtil(driver);
    }

    public async TestAllLayouts(){

        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();

        //check default (Banner)
        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("alerts_5ca0576d");
        });

        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/button')).click();
        
        //change and check (Message on Right)
        let layouts  = await this.driver.findElements(By.css('div[class*="ms-ChoiceField ms-ChoiceField--image root-"]'));
        await layouts[1].click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();


        element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("alerts_02160ac5");
        });

        //change and check 
        await layouts [2].click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();


        element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch('');
        });
        
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }


    public async TestThemes(){

        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();

        //check default (Default)
        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("alerts_5ca0576d");
        });
        

        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/button')).click();
        
        //change and check (Juliet)
        let layouts  = await this.driver.findElements(By.css('div[class*="ms-ChoiceField ms-ChoiceField--image root-"]'));
        await layouts[4].click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();


        element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("alerts_29d2a66f");
        });
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }
    public async TestButtonStyles(){

        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();

        //check default (Round)
        let element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div/div/div/div[2]/a'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("webpartAlertButton_5ca0576d ");
        });
        

        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[3]/div/div/button')).click();
        
        //change and check (Rounded)
        let layouts  = await this.driver.findElements(By.css('div[class*="ms-ChoiceField ms-ChoiceField--image root-"]'));
        await layouts[6].click();
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();


        element = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div/div/div/div[2]/a'))
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch("webpartAlertButton_5ca0576d rounded_5ca0576d");
        });
        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }

    public async TestMessageText(){

        let message1 = "This is a witty test message123";
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();

        await this.testingUtil.pause(1000);

        //go to Content
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[4]/div/div/button/div')).click();

        //change message & apply
        
        let textBox = await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[4]/div/div[2]/div[1]/div/div/div/div[2]/div[3]/div[2]'));
        
        await textBox.clear();
        await textBox.sendKeys(message1);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        let message2 = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div/div/div/div[1]')).getText();

        expect(message2).toEqual(message1);

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }
    public async TestButton(){

        let buttonMessage = "Click Me"
        let buttonURL = "NotAWebsite"
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();

        await this.testingUtil.pause(1000);
        //go to Content
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[4]/div/div/button/div')).click();

        //change text & url
        let boxes = await this.driver.findElements(By.css('input[type="text"]'));
        await boxes[0].click();
        await boxes[0].sendKeys(buttonMessage);
        await boxes[1].click();
        await boxes[1].sendKeys(buttonURL);

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        //check
        let button = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div[1]/section/div/div/div/div/div[2]/a'))
        button.getAttribute('href').then( attr =>  {
            expect(attr).toMatch(buttonURL)
        });
        button.getText().then( attr =>  {
            expect(attr).toMatch(buttonMessage)
        });

        await this.testingUtil.cancelEdit();
        await this.testingUtil.remove();
    }
}