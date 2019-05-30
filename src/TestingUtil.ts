import { ThenableWebDriver, By } from 'selenium-webdriver';
import { AutoConfigurable } from "./Enums";

export class TestingUtil {

    driver: ThenableWebDriver;

    constructor(driver: ThenableWebDriver) {
        this.driver = driver
    }

    public async cancelEdit(){
        
        let cancel = await this.driver.findElements(By.css('i[data-icon-name="Cancel"]'));
        await cancel[0].click();
    }

    public async remove() {
        var element = await (this.driver.findElement(By.xpath("//button[starts-with(@data-automation-id, 'deleteButton')]")));
        await element.click();
        await this.pause(1000);
        element = await (this.driver.findElement(By.xpath("//button[starts-with(@data-automation-id, 'confirmButton')]")));
        await element.click();
        await this.pause(1000);
    }

    public async togglePublishMode() {
        var element = await (this.driver.findElement(By.css("button#CommandBar1preview")));
        return element.click();
    }

    public async pause(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    
    public async  DiscardChanges(){
        await this.pause(2000);
        await this.driver.findElement(By.css('button[data-automation-id="discardButton"]')).click();
        await this.pause(2000);
        await this.driver.findElement(By.css('button[data-automation-id="yesButton"]')).click();
    
    }
    public async reset(){
        await this.DiscardChanges();
        await this.pause(2500);
        await this.driver.findElement(By.name("Edit")).click();
        await this.pause(4000);

    }
    
    public async  goToEdit(){
        let editButtons = await this.driver.findElements(By.css('button[aria-label="Edit web part"]'));
        await editButtons[0].click();
    }

    public async SetupEnviorment() {
        jest.setTimeout(60000);
        await this.driver.manage().window().maximize();
        await (this.driver.get("https://a830edad9050849nda3386.sharepoint.com/sites/Automated-Test-Sandbox"))
        await (this.pause(1500));
        await this.driver.findElement(By.name("loginfmt")).sendKeys("admin@onewindowapp.net");
        await this.driver.findElement(By.id("idSIButton9")).click();
        await this.pause(3000);
        await this.driver.findElement(By.name("passwd")).sendKeys("KJhSW$6542");
        
        await this.driver.findElement(By.id("idSIButton9")).click();
        await this.pause(1000);
        await this.driver.findElement(By.id("idSIButton9")).click();
        await (this.pause(2000));
        await this.driver.findElement(By.name("Edit")).click();
        await (this.pause(6000));
        expect(await this.driver.getCurrentUrl()).toBe("https://a830edad9050849nda3386.sharepoint.com/sites/Automated-Test-Sandbox?Mode=Edit");
        
    }

    public async TestWebpartSetup(webpartIcon:string,webpartName:string) {

        await this.SetupWebpartLocal(webpartIcon);
    
        var element = await (this.driver.findElement(By.css(webpartName)));
        var attrib = await (element.getAttribute("class"));
    
        expect(attrib).not.toBeNull;
        await this.remove();
    }
    
    public async SetupWebpartLocal(webpartIcon:string){
    
        await this.pause(1000);
        var add = await this.driver.findElements(By.css('i[data-icon-name="Add"]'));
        await add[1].click();
        await this.pause(1000);
       
        await this.driver.findElement(By.css(webpartIcon)).click();
       
    }
}