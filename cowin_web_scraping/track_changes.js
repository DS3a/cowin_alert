const vaccines = require("./vaccines");

async function track_changes(age, state, district, district_doc) {
    let output = [false, null];
    await vaccines.get_vaccine_data(age, state, district, (dates_array, centres_array) => {
        if (district_doc.data().centres == null && district_doc.data().dates == null) {
            db_instance.collection("districts").doc(doc.id).set({
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]},
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]}
            });
            output = [false, null];
        } else if (district_doc.data().centres != {
                0: centres_array[0], 
                1: centres_array[1], 
                2: centres_array[2]} 
            && centres_array != 
                [["No Vaccination center is available for booking."],
                ["No Vaccination center is available for booking."],
                ["No Vaccination center is available for booking."]]) {
            output = [true, "slots"];
        } else if (district_doc.data().dates != {
                0: dates_array[0], 
                1: dates_array[1], 
                2: dates_array[2]}) {
            output = [true, "dates"];
        } else {
            output = [false, null];
        }
    }).then(() => {
        console.log(output);
    });
    return output;
}

module.exports.track_changes = track_changes;