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
import { TestingUtil } from "./TestingUtil";
import { ToolsApps } from './Webparts/ToolsApps';
import { EventList } from './Webparts/EventList';
import { Discover } from './Webparts/Discover';
import { InfoBar } from './Webparts/InformationBar'
import { NewsList } from './Webparts/NewsList';
import { PeopleDirectory } from './Webparts/PeopleDirectory';
import { PersonalContent } from './Webparts/PersonalContent';


var chrome = require("selenium-webdriver/chrome"); 
require("chromedriver");
var chrome = require("selenium-webdriver/chrome");
var WebDriver = require("selenium-webdriver");
 



jest.setTimeout(20000);

var capabilities = new Capabilities(Capabilities.chrome());
var driver = new Builder().withCapabilities(capabilities).build();
var testingUtil = new TestingUtil(driver);
var eventList = new EventList(driver);
var toolsApps = new ToolsApps(driver);
var discover = new Discover(driver);
var infoBar = new InfoBar(driver)
var newsList = new NewsList(driver);
var peopleDirectory = new PeopleDirectory(driver);
var personalContent = new PersonalContent(driver);

let driverJest;



it('waits for the driver to start', () => {
    jest.setTimeout(40000);
    return driver.then(_d => {
        driverJest = _d
    })
})

it('Can login to enviorment', async () => {await testingUtil.SetupEnviorment(); await testingUtil.reset() })

//Tools and Apps
it('(ToolsApps) Can set up Tools and Apps', async () => { await testingUtil.TestWebpartSetup(toolsApps.icon,'div[data-sp-feature-tag="ToolsAppsWebPart web part (Tools & Apps)"]') })
//it('(ToolsApps) Can turn on user customization', async () => { await toolsApps.TestUserCustomization() })
it('(ToolsApps) Targerting turns on when using Sharepoint data', async () => { await toolsApps.TestTargeting() })
//it('(ToolsApps) Can load list from Sharepoint Site', async () => { await toolsApps.TestSharepointList() })
it('(ToolsApps) Can set item Limit', async () => { await toolsApps.TestItemLimit() })
it('(ToolsApps) Manage items can change order', async () => { await toolsApps.TestManageItems() })
//it('(ToolsApps) Layouts load correctly', async () => { await toolsApps.TestAllLayouts() })
it('(ToolsApps) can clean page', async () => { await testingUtil.reset() })


//EventList
it('(EventList) Can set up Event List', async () => { await testingUtil.TestWebpartSetup(eventList.icon,'div[data-sp-feature-tag="EventListWebPart web part (Event List)"]') })
it('(EventList) Can turn on user customization', async () => { await eventList.TestUserCustomization() })
//it('(EventList) Layouts load correctly', async () => { await eventList.TestAllLayouts() })
//This Test Fails
//it('(EventList) Can limit events', async () => { await eventList.TestLimitEvents() })
it('(EventList) can load proper date ranges', async () => { await eventList.TestDateRange() })
it('(EventList) can clean page', async () => { await testingUtil.reset() })

//Discover
it('(Discover) Can set up Discover', async () => { await testingUtil.TestWebpartSetup(discover.icon,'div[data-sp-feature-tag="SearchDocumentWebPart web part (Discover)"]') })
it('(Discover) Can Search in webpart', async () => {await discover.TestSearch() }) 
//test fails
//it('(Discover) Can use static search', async () => {await discover.TestStaticSearch() }) 
it('(Discover) Can turn on/off show document names', async () => { await discover.TestView('div[title="Benefits .pptx"]',1) })
it('(Discover) Can turn on/off show document preview', async () => { await discover.TestView('div[class*="ms-DocumentCardPreview root-"]',2) })
it('(Discover) Can turn on/off show document icons', async () => { await discover.TestView('img[src="https://spoprod-a.akamaihd.net/files/sp-client-prod_2017-09-08.040/icon_pptx_70f7759d.png"]',3) })
it('(Discover) Can turn on/off show activity sections', async () => { await discover.TestView('div[class*="ms-DocumentCardActivity root-"]',4) })
it('(Discover) Can turn on/off show document location', async () => { await discover.TestView('a[class*="ms-DocumentCardLocation root-"]',5 )})
//it('(Discover) Layouts load correctly', async () => { await discover.TestAllLayouts() })
it('(Discover) can clean page', async () => { await testingUtil.reset() })

//Information Bar
it('(Info Bar) Can set up Information Bar', async () => { await testingUtil.TestWebpartSetup(infoBar.icon,'div[data-sp-feature-tag="InformationBarWebPart web part (Information Bar)"]') })
it('(Info Bar) Can display all Layouts', async () => { await infoBar.TestAllLayouts() })
it('(Info Bar) Can display all Themes ', async () => { await infoBar.TestThemes() })
it('(Info Bar) Can display all button styles', async () => { await infoBar.TestButtonStyles() })
it('(Info Bar) Can change message text', async () => { await infoBar.TestMessageText() })
it('(Info Bar) Can change button text and url', async () => { await infoBar.TestButton() })
it('(Info Bar) can clean page', async () => { await testingUtil.reset() })

//News List 
it('(News) Can set up a webpart', async () => { await testingUtil.TestWebpartSetup(newsList.icon,'div[data-sp-feature-tag="NewsCustomWebPart web part (News List)"]') });
it('(News) Can turn on user customization', async () => { await newsList.TestUserCustomization() });
it('(News) Can hide comments and likes', async () => { await newsList.TestViews(2,'CommentsRow_5ca4aec7') });
it('(News) Can hide photos', async () => { await newsList.TestViews(1,'ImageWrapper_5ca4aec7') });
//TODO add a tagged result in sharepoint
//it('(News) Can display tags', async () => { await newsList.TestViews(3,'TagItem_5ca4aec7') });
//it('(News) Layouts load correctly', async () => { await newsList.TestAllLayouts() });
it('(News) can clean page', async () => { await testingUtil.reset() })

//People Directory
it('(People) Can set up People Directory', async () => { await testingUtil.TestWebpartSetup(peopleDirectory.icon,'div[data-sp-feature-tag="PeopleDirectoryWebPart web part (People Directory)"]') })
it('(People) Can display tiles and list', async () => { await  peopleDirectory.TestView() })
//Cannot move properties
//it('(People) Can Edit properties', async () => { await peopleDirectory.TestProperties() })
it('(People) Can search in webpart', async () => { await peopleDirectory.TestSearch() })
it('(People) can clean page', async () => { await testingUtil.reset() })

//Personal Content
it('(Personal) can set up Peronal Content',  async () => { await testingUtil.TestWebpartSetup(personalContent.icon,'div[data-sp-feature-tag="PersonalContentWebPart web part (Personal Content)"]') });
it('(Personal) Filters correctly',  async () => { await personalContent.TestFilter()})
//it('(Personal) can produce all Layouts',  async () => { await personalContent.TestViews()})
it('(Personal) can set item limit',  async () => { await personalContent.TestPaging()})
it('discards changes', async () => { await testingUtil.DiscardChanges() })

it('closes the driver', async () => { await driver.close() })
