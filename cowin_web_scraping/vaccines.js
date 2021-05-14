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

async function get_vaccine_data(age, state, district, callback) {
    let serviceBuilder = new ServiceBuilder(process.env.CHROME_DRIVER_PATH);
    let driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();
    const next_button_xpath = "/html/body/app-root/div/app-home/div[2]/div/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[5]/div/div/ul/carousel/div/a[2]";
    const search_button_xpath = `/html/body/app-root/div/app-home/div[2]/div/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[2]/div/div/button`;
    const age_18_button_xpath = '/html/body/app-root/div/app-home/div[2]/div/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[3]/div/div[1]';
    const district_field_button_xpath = "/html/body/app-root/div/app-home/div[2]/div/appointment-table/div/div/div/div/div/div/div/div/div/div/div[2]/form/div/div/div[1]/div/label/div";
    try {
        let _response_1 = (await driver).get(url);
        const district_field_button =(await driver).findElement(By.xpath(district_field_button_xpath));

        let dates_array = [];
        let centres_array = [];

        (await district_field_button).click().then(async () => {
            const state_select = await driver.findElement(By.id("mat-select-0")).click().then(async () => {
                const state_to_select = await (await driver.findElement(By.xpath(`//*[contains(text(), '${state}')]`))).click().then(async () => {
                    const district_select = (await driver).findElement(By.id("mat-select-value-3")).click().then(async () => {
                        const district_driver = (await (await driver).findElement(By.xpath(`//*[contains(text(), '${district}')]`))).click().then(async () => {
                            (await (await driver).findElement(By.xpath(search_button_xpath))).click().then(async () => {
                                console.log('entered all parameters, now just need to read');
                                if (age >= 18 && age < 45) {
                                    const age_field_18_plus = (await driver).findElement(By.xpath(age_18_button_xpath));
                                    (await age_field_18_plus).click().then(() => {
                                        console.log('checked the 18+ checkbox');
                                    });
                                }
                            }).then(async () => {
                                console.log("entering the read code");
                                let vaccines_date = (await driver).findElement(By.className("availability-date-ul"));
                                (await vaccines_date).getText().then((dates) => {
                                    dates_array.push(dates.split('\n').slice(0, -2));
                                });
                                let vaccines_centres = (await driver).findElement(By.className("col-padding matlistingblock"));
                                (await vaccines_centres).getText().then((centres) => {
                                    centres_array.push(centres.split('\n'));
                                }).then(async () => {
                                    const next_nutton = (await (await driver).findElement(By.xpath(next_button_xpath))).click().then(async () => {
                                        let vaccines_date = (await driver).findElement(By.className("availability-date-ul"));
                                        (await vaccines_date).getText().then((dates) => {
                                            dates_array.push(dates.split('\n').slice(0, -2));
                                        });
                                        let vaccines_centres = (await driver).findElement(By.className("col-padding matlistingblock"));
                                        (await vaccines_centres).getText().then((centres) => {
                                            centres_array.push(centres.split('\n'));
                                        }).then(async () => {
                                            const next_nutton = (await (await driver).findElement(By.xpath(next_button_xpath))).click().then(async () => {
                                                let vaccines_date = (await driver).findElement(By.className("availability-date-ul"));
                                                (await vaccines_date).getText().then((dates) => {
                                                    dates_array.push(dates.split('\n').slice(0, -2));
                                                    console.log(dates_array);
                                                });
                                                let vaccines_centres = (await driver).findElement(By.className("col-padding matlistingblock"));
                                                (await vaccines_centres).getText().then((centres) => {
                                                    centres_array.push(centres.split('\n'));
                                                    console.log(centres_array);
                                                }).then(async () => {
                                                    callback(dates_array, centres_array);
                                                });
                                            });
                                        });      
                                    });
                                });
                            
                                let source = await driver.getPageSource();
                                return await source;                                    
                            });
                        });
                    });
                });
            });
        });        
    } catch(e) {
        console.error(`Ran into an error : ${e}`);
        return false;
    }
}

module.exports.get_vaccine_data = get_vaccine_data;