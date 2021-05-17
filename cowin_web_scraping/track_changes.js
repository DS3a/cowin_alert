const vaccines = require("./vaccines");

async function track_changes(age, state, district, district_doc, db_instance) {
    let output = [false, null];
    await vaccines.get_vaccine_data(age, state, district, (dates_array, centres_array) => {
        if (district_doc.data().centres == null && district_doc.data().dates == null) {
            console.log(district_doc.data());
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            });
            output = [false, null];
        } else if (district_doc.data().dates != {
                0: dates_array[0], 
                1: dates_array[1], 
                2: dates_array[2]}
               && (centres_array[0] != ["No Vaccination center is available for booking."] || centres_array[0] != [ '' ])
               && (centres_array[1] != ["No Vaccination center is available for booking."] || centres_array[1] != [ '' ])
               && (centres_array[2] != ["No Vaccination center is available for booking."] || centres_array[2] != [ '' ])) {
            output = [true, "dates"];
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            });        

        } else if (district_doc.data().centres != {
                0: centres_array[0], 
                1: centres_array[1], 
                2: centres_array[2]} 
                && (centres_array[0] != ["No Vaccination center is available for booking."] || centres_array[0] != [ '' ])
                && (centres_array[1] != ["No Vaccination center is available for booking."] || centres_array[1] != [ '' ])
                && (centres_array[2] != ["No Vaccination center is available for booking."] || centres_array[2] != [ '' ])) {
             let district_doc = district_doc.data();
            district_doc['dates'] = {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]};
            district_doc['centres'] = {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]}; 
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            }   );        
            output = [true, "slots"];
        }  else {
            output = [false, null];
        }
    }).then(() => {
        console.log(output);
    });
    return output;
}

module.exports.track_changes = track_changes;