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
import { ThenableWebDriver} from 'selenium-webdriver';
import { TestingUtil } from "../TestingUtil";




export class ToolsApps{

    icon: string
    driver: ThenableWebDriver;
    testingUtil: TestingUtil;
    constructor(driver: ThenableWebDriver) {
        this.icon = 'button[data-automation-id="5fb28714-f831-431c-b5cb-6f24a558f522_0"]'
        this.driver = driver;
        this.testingUtil = new TestingUtil(driver);
    }
    public async TestUserCustomization(){
        
        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        
        await this.testingUtil.goToEdit();
        
        //go to Layout
        await this.testingUtil.pause(2000);

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div/button')).click();
        
        //turn on user cutomization

        let switches = await this.driver.findElements(By.css('button[aria-checked="false"]'));   
        await switches[0].click();

    
        //apply
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1500);
        //click on new user customization button
        await this.driver.findElement(By.xpath('//*[contains(text(), "Customize Links")]')).click();
        //cancel
        let cancel = await this.driver.findElements(By.css('i[data-icon-name="Cancel"]'));

        await cancel[2].click();
        //cancel again
        await this.testingUtil.pause(500);
        await cancel[0].click();
        
        await this.testingUtil.remove();
    }

    public async TestTargeting() {
        
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
            
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1500);

        //go to Data

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[2]/div/div/button/div')).click();

        //Switch to Manual Source
        let switches = await this.driver.findElements(By.css('button[aria-checked="false"]'));   
        await switches[0].click();

        // see if Targeting tab appears
        await this.testingUtil.pause(1000);
        
        let targetTab = await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[4]/div/div/button/div'));
        var attrib = await (targetTab.getAttribute("class"));
        expect(attrib).not.toBeNull;

        await this.testingUtil.cancelEdit()
        await this.testingUtil.remove();
    }

    public async  TestAllLayouts() {
        
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
        await this.testingUtil.goToEdit();
        
        //go to Layout
        await this.testingUtil.pause(1000);
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[3]/div/div/button')).click();
        // click lists
        
        await this.layoutTests('Sierra',"tile_fea4fe60","list_fea4fe60");
        //await layoutTests("KPI","kpiTitle_3d0ba172");
        await this.layoutTests('Default',"tile_a16c3e42","list_a16c3e42");
        // await  layoutTests('Site Owner',"siteOwnerColumn_3a7ff792");
        await  this.layoutTests('Tabbed',"tile_d30db6f1","list_d30db6f1" );
        await  this.layoutTests('Santiago',"tile_207afaf4","list_207afaf4");
        await  this.layoutTests('Savona',"tile_88e2cb81","list_88e2cb81");
        await  this.layoutTests('Idaho',"tile_c3b8e224","list_c3b8e224");
        await  this.layoutTests('Accordion',"tile_8d5e7397","list_8d5e7397");
        

        await this.testingUtil.cancelEdit()
        
        await this.testingUtil.remove();
        
    }

    public async  TestSharepointList() {
        
        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
            
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(2000);

        //go to Data

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/div/div/button')).click();

        //Switch to Manual Source
        let switches = await this.driver.findElements(By.css('button[aria-checked="false"]'));   
        await switches[0].click();

        await this.testingUtil.pause(2500);

        //click lists
        let arrows = await this.driver.findElement(By.css('div[class="Select is-clearable is-searchable Select--single"]'));
        await arrows.click();
        await this.testingUtil.pause(1000);

        let selectors = await this.driver.findElements(By.css('div[class="Select-control"]'));
        await selectors[1].click();
        await this.testingUtil.pause(1000);
        let roles = await this.driver.findElements(By.css('input[role="combobox"]'));
        await roles[2].sendKeys("Tools And Apps"+Key.ENTER);

        await this.testingUtil.pause(1500);

        await this.driver.findElement(By.css('span[id="IconUrl-option"]')).click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[data-index="5"]')).click();



        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        await this.testingUtil.pause(1000);

        expect(this.driver.findElement(By.css('img[src="https://image.flaticon.com/icons/svg/1189/1189185.svg"]'))).not.toBeNull;

        await this.testingUtil.cancelEdit()

        await this.testingUtil.remove();
    }
    public async  TestItemLimit(){

        //set up webpart
        await  await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
            
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(2000);

        let elementsNo = await this.driver.findElements(By.css('a[class="tile_a16c3e42"]'));
        let elementLength = elementsNo.length;
        //layout
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[2]/div/div[1]/div/div[3]/div/div/button')).click();

        //turn on limit items
        let switches = await this.driver.findElements(By.css('button[role="switch"]'));
        await switches[2].click();

        //slide to 2
        let slider = await this.driver.findElement(By.css('span[style="left: -2.0202%;"]'));
        await slider.click();

        //apply
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        //check for last element
        elementsNo = await this.driver.findElements(By.css('a[class="tile_a16c3e42"]'));
        expect(elementsNo.length).toBe(elementLength-2);


        await this.testingUtil.cancelEdit()

        await this.testingUtil.remove();

    }
    public async  TestManageItems( ){

        //set up webpart
        await this.testingUtil.SetupWebpartLocal(this.icon);
        //go to edit webpart
            
        await this.testingUtil.goToEdit();
        await this.testingUtil.pause(1500);

        let order1 = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div/section/div/div/a[1]'));
        let href1 = order1.getAttribute('href');

        //go to Data

        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div[2]/div[2]/div/div/button')).click();

        //Manage items
        await this.driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/div/div/button')).click();

        await this.driver.findElement(By.css('div[data-automationid="ListCell"]')).click();
        await this.testingUtil.pause(800);
        await this.driver.findElement(By.css('button[icon="ChevronDown"]')).click();
        let cancelButtons = await this.driver.findElements(By.css('i[data-icon-name="Cancel"]'));
        await cancelButtons[2].click();

        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        let order2 = await this.driver.findElement(By.xpath('//*[@id="spPageCanvasContent"]/div/div/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div/div[1]/div/div/div/section/div/div/a[1]'));
        let href2 = order2.getAttribute('href');

        expect(href1).not.toEqual(href2);

        await this.testingUtil.cancelEdit()

        await this.testingUtil.remove();

    }


    private async  layoutTests( title: string, layoutTile: string,layoutList: string){
        
        let lists = await this.driver.findElements(By.css('div[role="listbox"]'));
        lists[1].click();
        await this.testingUtil.pause(500);
        //click on certain layout
        let dataIndex = 'button[title="'+title+'"]';
        await this.driver.findElement(By.css(dataIndex)).click();
        
        

        await lists[0].click();
        await this.driver.findElement(By.css('button[title="List"]')).click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();
        
        let element = await this.driver.findElement(By.css('a[href="https://wsj.com"]'));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutList)
        })

        
        await this.testingUtil.pause(1000);
        

        //click on tile
        await lists[0].click();
        await this.driver.findElement(By.css('button[title="Tile"]')).click();
        await this.testingUtil.pause(500);
        await this.driver.findElement(By.css('button[data-automation-id="propertyPaneApplyButton"]')).click();

        
        //check if results match
        element = await this.driver.findElement(By.css('a[href="https://wsj.com"]'));
        element.getAttribute('class').then( attr =>  {
            expect(attr).toMatch(layoutTile)
        })



    }


}
