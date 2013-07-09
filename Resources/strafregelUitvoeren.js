var strafregelUitvoeren = Ti.UI.createWindow({
  backgroundImage:'/images/achtergrondStrafregelUitvoeren.jpg',
  title: 'Amsterdam Pub Experience',
  modal: true
});

var verliezerNaam; 
var laagsteScore;

	var deelnemernaam_1;
	var deelnemernaam_2;
	var deelnemernaam_3;
	var deelnemernaam_4;
	var deelnemernaam_5;
	
	var deelnemerscore_1;
	var deelnemerscore_2;
	var deelnemerscore_3;
	var deelnemerscore_4;
	var deelnemerscore_5;

function strafregelOphalen (){
	
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Checken in welke deelnemersgroep we zitten
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam, score FROM deelnemers WHERE groepID = 1 ORDER BY score DESC');
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	
	
	
	var deelnemersNamen = [];

	var deelnemersScore = [];
	// fetch rows
	while (selectDeelnemers.isValidRow()) {
		
		
		deelnemersNamen.push(selectDeelnemers.fieldByName('naam'));
		deelnemersScore.push(selectDeelnemers.fieldByName('score'));
		// get next row
  		selectDeelnemers.next();
	}
	
	deelnemernaam_1 = deelnemersNamen[0];
	deelnemernaam_2 = deelnemersNamen[1];
	deelnemernaam_3 = deelnemersNamen[2];
	deelnemernaam_4 = deelnemersNamen[3];
	deelnemernaam_5 = deelnemersNamen[4];
	
	deelnemerscore_1 = deelnemersScore[0];
	deelnemerscore_2 = deelnemersScore[1];
	deelnemerscore_3 = deelnemersScore[2];
	deelnemerscore_4 = deelnemersScore[3];
	deelnemerscore_5 = deelnemersScore[4];

	laagsteScore = Math.min.apply(Math, deelnemersScore);
	
	console.log(laagsteScore);
	console.log(deelnemersScore);
	db.close();
};

strafregelOphalen();


function verliezerBepalen () {
		switch(true)
{
    case (laagsteScore === deelnemerscore_1):
      verliezerNaam = deelnemernaam_1;
      break;
    case (laagsteScore === deelnemerscore_2):
      verliezerNaam = deelnemernaam_2;
      break;
    case (laagsteScore === deelnemerscore_3):
      verliezerNaam = deelnemernaam_3;
      break;
    case (laagsteScore === deelnemerscore_4):
      verliezerNaam = deelnemernaam_4;
      break;
    case (laagsteScore === deelnemerscore_5):
      verliezerNaam = deelnemernaam_5;
      break;
}
};

verliezerBepalen();
// Checken in welke deelnemersgroep we zitten
	
	var	verliezerTonen = Ti.UI.createLabel({
    	color: 'white',
    	text: ''+ verliezerNaam + ' is de verliezer van deze ronde en moet onderstaande strafregel uitvoeren:',
    	font: { fontSize: '22dp', fontFamily: 'Helvetica Neue', fontWeight:'bold' },
    	right:'25dp',
 		left:'27dp',
 		top:'35dp', 
 		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	});
	strafregelUitvoeren.addEventListener('focus',function(e){
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1, strafregel_ronde1, strafregel_ronde2, strafregel_ronde3, welkCafe FROM deelnemersgroep WHERE groepID = 1');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	var ditCafe = selectDeelnemersgroep.fieldByName('welkCafe');
	if(ditCafe ==2) {
		var strafregelTonen = selectDeelnemersgroep.fieldByName('strafregel_ronde1');
	};
	if (ditCafe ==3) {
		var strafregelTonen = selectDeelnemersgroep.fieldByName('strafregel_ronde2');
	};
	if (ditCafe ==4) {
		var strafregelTonen = selectDeelnemersgroep.fieldByName('strafregel_ronde3');
	};
	
	// Toon voor wie de vraag is
	titelStrafregel = Ti.UI.createLabel({
    	color: 'white',
    	text: ''+ strafregelTonen + '',
    	font: { fontSize: '20dp', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'28dp',
 		top:'175dp',
 		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	strafregelUitvoeren.add(titelStrafregel);
	strafregelUitvoeren.add(verliezerTonen);
		
if(ditCafe >4) {
	var volgendeScherm = Ti.UI.createButton({
   	    title : 'Opnieuw spelen',
   	    width : '200dp',
   	    height : '45dp',
    	top: '30dp',
    	right: '20dp'
   	});
   
   	strafregelUitvoeren.add(volgendeScherm);

   	volgendeScherm.addEventListener('click',function(e) {
		Titanium.include('app.js');
		strafregelUitvoeren.close();
	});
	
	} else {
	var volgendeScherm = Ti.UI.createButton({
   	    title : 'Volgende ronde',
   	    width : '200dp',
   	    height : '45dp',
    	bottom: '45dp',
    	right: '20dp'
   	});
   
   	strafregelUitvoeren.add(volgendeScherm);
   	
   	volgendeScherm.addEventListener('click',function(e) {
		db.close();
		Titanium.include('kaart.js');
	
		kaart.open();
	});
}
});

