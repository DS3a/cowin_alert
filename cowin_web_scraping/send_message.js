

const cowin_site = "https://www.cowin.gov.in/home";

function send_message(phone_number, email, district, type) {
    if (type == "slots") {
        let message = `Hi, We found new slots open in the ${district} district. 
        Hop onto the site ${cowin_site} quickly to grab your slot`;    
    } else {
        let message = `Hi, the dates on the website has changed. 
        This might mean that there are new slots in the ${district} district.
        Hop onto the site ${cowin_site} quickly to check if there are new slots`;
    }
    console.log(message);
    // TODO add code to send messages

    if (email != false) {
        // TODO code to send emails
    }
}

module.exports.send_message = send_message;