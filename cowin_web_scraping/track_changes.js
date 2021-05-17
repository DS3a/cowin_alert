const vaccines = require("./vaccines");

async function track_changes(age, state, district, district_doc, db_instance, callback) {
    let output = [false, null];

    try {
        district_doc.data();
        console.log("got data");
        console.log(district_doc.data());
    } catch(e) {
        console.log("ran into some stupid error, returning");
        return;
    }
    await vaccines.get_vaccine_data(age, state, district, async (dates_array, centres_array) => {
        console.log('asdffdas', JSON.stringify(district_doc.data().dates) === JSON.stringify({
            0: dates_array[0], 
            1: dates_array[1], 
            2: dates_array[2]}));
        console.log(JSON.stringify(district_doc.data().dates));
        console.log(JSON.stringify({
            0: dates_array[0], 
            1: dates_array[1], 
            2: dates_array[2]}));
    
        console.log('centres', JSON.stringify(district_doc.data().dates) === JSON.stringify({
            0: dates_array[0], 
            1: dates_array[1], 
            2: dates_array[2]}));
        console.log(JSON.stringify(district_doc.data().dates));
        console.log(JSON.stringify({
            0: dates_array[0], 
            1: dates_array[1], 
            2: dates_array[2]}));

        console.log(`got stuff ${dates_array, centres_array}`);
        if (district_doc.data().centres == null && district_doc.data().dates == null) {
            console.log("it was null, rewriting stuff now");
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            });
            console.log(`returning false, with null`);
            output = [false, null];
            callback(output);
        } else if (!JSON.stringify(district_doc.data().dates) === JSON.stringify({
                0: dates_array[0], 
                1: dates_array[1], 
                2: dates_array[2]})
               && (centres_array[0][0] != "No Vaccination center is available for booking." || centres_array[0][0] !=  '' )
               && (centres_array[1][0] != "No Vaccination center is available for booking." || centres_array[1][0] !=  '' )
               && (centres_array[2][0] != "No Vaccination center is available for booking." || centres_array[2][0] != '' )) {
            output = [true, "dates"];
            console.log("the dates were different");
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            });        
            callback(output);
        } else if (!(JSON.stringify(district_doc.data().centres) === JSON.stringify({
                0: centres_array[0], 
                1: centres_array[1], 
                2: centres_array[2]})) 
                && (centres_array[0] != ["No Vaccination center is available for booking."] || centres_array[0] != [ '' ])
                && (centres_array[1] != ["No Vaccination center is available for booking."] || centres_array[1] != [ '' ])
                && (centres_array[2] != ["No Vaccination center is available for booking."] || centres_array[2] != [ '' ])) {

            console.log("new slots added");
            db_instance.collection("districts").doc(district_doc.id).set({
                district: district_doc.data().district,
                state: district_doc.data().state,
                age: district_doc.data().age,
                centres: {0: centres_array[0], 1: centres_array[1], 2: centres_array[2]},
                dates: {0: dates_array[0], 1: dates_array[1], 2: dates_array[2]}
            }   );        
            output = [true, "slots"];
            callback(output);

        }  else {
            console.log("the same as last time");
            output = [false, null];
            callback(output);
        }
    }).then(() => {
        console.log(`The verdict ${output}`);
        return output;
    });
}

module.exports.track_changes = track_changes;