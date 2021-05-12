const {
    Browser,
    Builder,
    Key,
    By
} = require('selenium-webdriver');

const {
    Options,
    ServiceBuilder
} = require('selenium-webdriver/chrome');


const url = "https://www.cowin.gov.in/home";
let options = new Options();

async function get_vaccine_data(age, pincode, callback) {
    let serviceBuilder = new ServiceBuilder(process.env.CHROME_DRIVER_PATH);
    let driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();

    try {
        let _response_1 = (await driver).get(url);
        const pincode_field =(await driver).findElement(By.id("mat-input-0"));
        await pincode_field.sendKeys(pincode, Key.ENTER);
        if (age == 18) {
            const age_field_18_plus = (await driver).findElement(By.xpath('/html/body/app-root/div/app-home/div[2]/div/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[4]/div/div[1]'));
            (await age_field_18_plus).click().then(() => {
                console.log('checked the 18+ checkbox');
            });
        }
        let vaccines_date = (await driver).findElement(By.className("availability-date-ul"));
        let dates_array = [];
        let centres_array = [];
        (await vaccines_date).getText().then((dates) => {
            dates_array.push(dates.split('\n'));
        });
        let vaccines_centres = (await driver).findElement(By.className("col-padding matlistingblock"));
        (await vaccines_centres).getText().then((centres) => {
            centres_array.push(centres.split('\n'));
        }).then(() => {
            callback(dates_array, centres_array);
        });

        let source = await driver.getPageSource();
        return await source;
    } catch(e) {
        console.error(`Ran into an error : ${e}`);
        return false;
    }
}

module.exports.get_vaccine_data = get_vaccine_data;