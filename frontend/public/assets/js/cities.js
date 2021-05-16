var state_arr = new Array("Andaman And Nicobar Islands", "Andhra Pradesh", 
"Arunachal Pradesh", "Assam", "Bihar", 
"Chandigarh", 
"Chhattisgarh", 
"Dadra And Nagar Haveli", 
"Daman And Diu", 
"Delhi", 
"Goa", 
"Gujarat", 
"Haryana", 
"Himachal Pradesh", 
"Jammu And Kashmir", 
"Jharkhand", 
"Karnataka", 
"Kerala", 
"Lakshadweep", 
"Madhya Pradesh", 
"Maharashtra", 
"Manipur", "Meghalaya", "Mizoram", "Nagaland", 
"Odisha", 
"Puducherry", 
"Punjab", 
"Rajasthan", 
"Sikkim", 
"Tamil Nadu", "Tripura", 
"Uttar Pradesh", 
"Uttarakhand", "West Bengal");

var s_a = new Array();
s_a[0]="";
s_a[1] = " Nicobar | North And Middle Andaman | South Andaman ";
s_a[2]=" Anantapur | Chittoor | East Godavari | Guntur | Krishna | Kurnool | Prakasam | Sri Potti Sriramulu Nellore | Srikakulam | Visakhapatnam | Vizianagaram | West Godavari | YSR District, Kadapa (Cuddapah) ";
s_a[3]=" Anjaw | Changlang | Dibang Valley | East Kameng | East Siang | Itanagar Capital Complex | Kamle | Kra Daadi | Kurung Kumey | Lepa Rada | Lohit | Longding | Lower Dibang Valley | Lower Siang | Lower Subansiri | Namsai | Pakke Kessang | Papum Pare | Shi Yomi | Siang | Tawang | Tirap | Upper Siang | Upper Subansiri | West Kameng | West Siang ";
s_a[4]=" Baksa | Barpeta | Biswanath | Bongaigaon | Cachar | Charaideo | Chirang | Darrang | Dhemaji | Dhubri | Dibrugarh | Dima Hasao | Goalpara | Golaghat | Hailakandi | Hojai | Jorhat | Kamrup Metropolitan | Kamrup Rural | Karbi-Anglong | Karimganj | Kokrajhar | Lakhimpur | Majuli | Morigaon | Nagaon | Nalbari | Sivasagar | Sonitpur | South Salmara Mankachar | Tinsukia | Udalguri | West Karbi Anglong ";
s_a[5]=" Araria | Arwal | Aurangabad | Banka | Begusarai | Bhagalpur | Bhojpur | Buxar | Darbhanga | East Champaran | Gaya | Gopalganj | Jamui | Jehanabad | Kaimur | Katihar | Khagaria | Kishanganj | Lakhisarai | Madhepura | Madhubani | Munger | Muzaffarpur | Nalanda | Nawada | Patna | Purnia | Rohtas | Saharsa | Samastipur | Saran | Sheikhpura | Sheohar | Sitamarhi | Siwan | Supaul | Vaishali | West Champaran ";
s_a[6]=" Chandigarh ";
s_a[7]=" Balod | Baloda Bazar | Balrampur | Bastar | Bemetara | Bijapur | Bilaspur | Dantewada | Dhamtari | Durg | Gariaband | Gaurela Pendra Marwahi | Janjgir-Champa | Jashpur | Kanker | Kawardha | Kondagaon | Korba | Koriya | Mahasamund | Mungeli | Narayanpur | Raigarh | Raipur | Rajnandgaon | Sukma | Surajpur | Surguja ";
s_a[8]=" Dadra And Nagar Haveli ";
s_a[9]=" Daman | Diu ";
s_a[10]=" Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | Shahdara | South Delhi | South East Delhi | South West Delhi | West Delhi ";
s_a[11]=" North Goa | South Goa ";
s_a[12]=" Ahmedabad | Ahmedabad Corporation | Amreli | Anand | Aravalli | Banaskantha | Bharuch | Bhavnagar | Bhavnagar Corporation | Botad | Chhotaudepur | Dahod | Dang | Devbhumi Dwaraka | Gandhinagar | Gandhinagar Corporation | Gir Somnath | Jamnagar | Jamnagar Corporation | Junagadh | Junagadh Corporation | Kheda | Kutch | Mahisagar | Mehsana | Morbi | Narmada | Navsari | Panchmahal | Patan | Porbandar | Rajkot | Rajkot Corporation | Sabarkantha | Surat | Surat Corporation | Surendranagar | Tapi | Vadodara | Vadodara Corporation | Valsad ";
s_a[13]=" Ambala | Bhiwani | Charkhi Dadri | Faridabad | Fatehabad | Gurgaon | Hisar | Jhajjar | Jind | Kaithal | Karnal | Kurukshetra | Mahendragarh | Nuh | Palwal | Panchkula | Panipat | Rewari | Rohtak | Sirsa | Sonipat | Yamunanagar ";
s_a[14]=" Bilaspur | Chamba | Hamirpur | Kangra | Kinnaur | Kullu | Lahaul Spiti | Mandi | Shimla | Sirmaur | Solan | Una ";
s_a[15]= " Anantnag | Bandipore | Baramulla | Budgam | Doda | Ganderbal | Jammu | Kathua | Kishtwar | Kulgam | Kupwara | Poonch | Pulwama | Rajouri | Ramban | Reasi | Samba | Shopian | Srinagar | Udhampur ";
s_a[16]=" Bokaro | Chatra | Deoghar | Dhanbad | Dumka | East Singhbhum | Garhwa | Giridih | Godda | Gumla | Hazaribagh | Jamtara | Khunti | Koderma | Latehar | Lohardaga | Pakur | Palamu | Ramgarh | Ranchi | Sahebganj | Seraikela Kharsawan | Simdega | West Singhbhum ";
s_a[17]=" Bagalkot | Bangalore Rural | Bangalore Urban | BBMP | Belgaum | Bellary | Bidar | Chamarajanagar | Chikamagalur | Chikkaballapur | Chitradurga | Dakshina Kannada | Davanagere | Dharwad | Gadag | Gulbarga | Hassan | Haveri | Kodagu | Kolar | Koppal | Mandya | Mysore | Raichur | Ramanagara | Shimoga | Tumkur | Udupi | Uttar Kannada | Vijayapura | Yadgir ";
s_a[18]=" Alappuzha | Ernakulam | Idukki | Kannur | Kasaragod | Kollam | Kottayam | Kozhikode | Malappuram | Palakkad | Pathanamthitta | Thiruvananthapuram | Thrissur | Wayanad ";
s_a[19]=" Agatti Island | Lakshadweep ";
s_a[20]=" Agar | Alirajpur | Anuppur | Ashoknagar | Balaghat | Barwani | Betul | Bhind | Bhopal | Burhanpur | Chhatarpur | Chhindwara | Damoh | Datia | Dewas | Dhar | Dindori | Guna | Gwalior | Harda | Hoshangabad | Indore | Jabalpur | Jhabua | Katni | Khandwa | Khargone | Mandla | Mandsaur | Morena | Narsinghpur | Neemuch | Panna | Raisen | Rajgarh | Ratlam | Rewa | Sagar | Satna | Sehore | Seoni | Shahdol | Shajapur | Sheopur | Shivpuri | Sidhi | Singrauli | Tikamgarh | Ujjain | Umaria | Vidisha ";
s_a[21]=" Ahmednagar | Akola | Amravati | Aurangabad | Beed | Bhandara | Buldhana | Chandrapur | Dhule | Gadchiroli | Gondia | Hingoli | Jalgaon | Jalna | Kolhapur | Latur | Mumbai | Nagpur | Nanded | Nandurbar | Nashik | Osmanabad | Palghar | Parbhani | Pune | Raigad | Ratnagiri | Sangli | Satara | Sindhudurg | Solapur | Thane | Wardha | Washim | Yavatmal ";
s_a[22]=" Bishnupur | Chandel | Churachandpur | Imphal East | Imphal West | Jiribam | Kakching | Kamjong | Kangpokpi | Noney | Pherzawl | Senapati | Tamenglong | Tengnoupal | Thoubal | Ukhrul ";
s_a[23]=" Amlaren | Baghmara | Cherrapunjee | Dadengiri | Garo Hills | Jaintia Hills | Jowai | Khasi Hills | Khliehriat | Mariang | Mawkyrwat | Nongpoh | Nongstoin | Resubelpara | Ri Bhoi | Shillong | Tura | Williamnagar";
s_a[24]=" Aizawl | Champhai | Demagiri | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip";
s_a[25]=" Dimapur | Jalukie | Kiphire | Kohima | Mokokchung | Mon | Phek | Tuensang | Wokha | Zunheboto ";
s_a[26]=" Angul | Balangir | Balasore | Bargarh | Bhadrak | Boudh | Cuttack | Deogarh | Dhenkanal | Gajapati | Ganjam | Jagatsinghpur | Jajpur | Jharsuguda | Kalahandi | Kandhamal | Kendrapara | Kendujhar | Khurda | Koraput | Malkangiri | Mayurbhanj | Nabarangpur | Nayagarh | Nuapada | Puri | Rayagada | Sambalpur | Subarnapur | Sundargarh ";
s_a[27]=" Karaikal | Mahe | Puducherry | Yanam ";
s_a[28]=" Amritsar | Barnala | Bathinda | Faridkot | Fatehgarh Sahib | Fazilka | Ferozpur | Gurdaspur | Hoshiarpur | Jalandhar | Kapurthala | Ludhiana | Mansa | Moga | Pathankot | Patiala | Rup Nagar | Sangrur | SAS Nagar | SBS Nagar | Sri Muktsar Sahib | Tarn Taran ";
s_a[29]=" Ajmer | Alwar | Banswara | Baran | Barmer | Bharatpur | Bhilwara | Bikaner | Bundi | Chittorgarh | Churu | Dausa | Dholpur | Dungarpur | Hanumangarh | Jaipur I | Jaipur II | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Karauli | Kota | Nagaur | Pali | Pratapgarh | Rajsamand | Sawai Madhopur | Sikar | Sirohi | Sri Ganganagar | Tonk | Udaipur ";
s_a[30]=" Barmiak | Be | Bhurtuk | Chhubakha | Chidam | Chubha | Chumikteng | Dentam | Dikchu | Dzongri | Gangtok | Gauzing | Gyalshing | Hema | Kerung | Lachen | Lachung | Lema | Lingtam | Lungthu | Mangan | Namchi | Namthang | Nanga | Nantang | Naya Bazar | Padamachen | Pakhyong | Pemayangtse | Phensang | Rangli | Rinchingpong | Sakyong | Samdong | Singtam | Siniolchu | Sombari | Soreng | Sosing | Tekhug | Temi | Tsetang | Tsomgo | Tumlong | Yangang | Yumtang ";
s_a[31]=" Aranthangi | Ariyalur | Attur | Chengalpet | Chennai | Cheyyar | Coimbatore | Cuddalore | Dharmapuri | Dindigul | Erode | Kallakurichi | Kanchipuram | Kanyakumari | Karur | Kovilpatti | Krishnagiri | Madurai | Nagapattinam | Namakkal | Nilgiris | Palani | Paramakudi | Perambalur | Poonamallee | Pudukkottai | Ramanathapuram | Ranipet | Salem | Sivaganga | Sivakasi | Tenkasi | Thanjavur | Theni | Thoothukudi (Tuticorin) | Tiruchirappalli | Tirunelveli | Tirupattur | Tiruppur | Tiruvallur | Tiruvannamalai | Tiruvarur | Vellore | Viluppuram | Virudhunagar ";
s_a[32]=" Agartala | Ambasa | Bampurbari | Belonia | Dhalai | Dharam Nagar | Kailashahar | Kamal Krishnabari | Khopaiyapara | Khowai | Phuldungsei | Radha Kishore Pur | Tripura ";
s_a[33]=" Agra | Aligarh | Ambedkar Nagar | Amethi | Amroha | Auraiya | Ayodhya | Azamgarh | Badaun | Baghpat | Bahraich | Balarampur | Ballia | Banda | Barabanki | Bareilly | Basti | Bhadohi | Bijnour | Bulandshahr | Chandauli | Chitrakoot | Deoria | Etah | Etawah | Farrukhabad | Fatehpur | Firozabad | Gautam Buddha Nagar | Ghaziabad | Ghazipur | Gonda | Gorakhpur | Hamirpur | Hapur | Hardoi | Hathras | Jalaun | Jaunpur | Jhansi | Kannauj | Kanpur Dehat | Kanpur Nagar | Kasganj | Kaushambi | Kushinagar | Lakhimpur Kheri | Lalitpur | Lucknow | Maharajganj | Mahoba | Mainpuri | Mathura | Mau | Meerut | Mirzapur | Moradabad | Muzaffarnagar | Pilibhit | Pratapgarh | Prayagraj | Raebareli | Rampur | Saharanpur | Sambhal | Sant Kabir Nagar | Shahjahanpur | Shamli | Shravasti | Siddharthnagar | Sitapur | Sonbhadra | Sultanpur | Unnao | Varanasi ";
s_a[34]=" Almora | Bageshwar | Chamoli | Champawat | Dehradun | Haridwar | Nainital | Pauri Garhwal | Pithoragarh | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Uttarkashi ";
s_a[35]= " Alipurduar District | Bankura | Basirhat HD (North 24 Parganas) | Birbhum | Bishnupur HD (Bankura) | Cooch Behar | COOCHBEHAR | Dakshin Dinajpur | Darjeeling | Diamond Harbor HD (S 24 Parganas) | East Bardhaman | Hoogly | Howrah | Jalpaiguri | Jhargram | Kalimpong | Kolkata | Malda | Murshidabad | Nadia | Nandigram HD (East Medinipore) | North 24 Parganas | Paschim Medinipore | Purba Medinipore | Purulia | Rampurhat HD (Birbhum) | South 24 Parganas | Uttar Dinajpur | West Bardhaman ";

function print_state(state_id){
	// given the id of the <select> tag as function argument, it inserts <option> tags
	var option_str = document.getElementById(state_id);
	option_str.length=0;
	option_str.options[0] = new Option('Select State','');
	option_str.selectedIndex = 0;
	for (var i=0; i<state_arr.length; i++) {
		option_str.options[option_str.length] = new Option(state_arr[i],state_arr[i]);
	}
}

function print_city(city_id, city_index){
	var option_str = document.getElementById(city_id);
	option_str.length=0;
	option_str.options[0] = new Option('Select District','');
	option_str.selectedIndex = 0;
	var city_arr = s_a[city_index].split("|");
	for (var i=0; i<city_arr.length; i++) {
		option_str.options[option_str.length] = new Option(city_arr[i],city_arr[i]);
	}
}