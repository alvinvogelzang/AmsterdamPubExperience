Titanium.UI.setBackgroundColor('#000');
//
// create base UI tab and root window
//
var schattingAntwoord = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

var winnaarNaam; 

var array = [];

function getSchattingen() {
	
	Titanium.include('schattingVraag.js', 'stand.js');
	
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');	
	
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	
	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden");
	var antwoordenSchatting = selectSchattingen.fieldByName('schattingAntwoord');
	
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT count(groepID) FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var aantalDeelnemers = selectAantalDeelnemers.fieldByName('count(groepID)');
	
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	var deelnemersNamen = [];
	
	var aantal = aantalDeelnemers;
	
	// fetch rows
	while (selectDeelnemers.isValidRow()) {
		
		
		deelnemersNamen.push(selectDeelnemers.fieldByName('naam'));
		// get next row
  		selectDeelnemers.next();
	}
	
	console.log(deelnemersNamen);
 		
 	// always close rowset and db connection!
	
	var deelnemernaam_1 = deelnemersNamen[0];
	var deelnemernaam_2 = deelnemersNamen[1];
	var deelnemernaam_3 = deelnemersNamen[2];
	var deelnemernaam_4 = deelnemersNamen[3];
	var deelnemernaam_5 = deelnemersNamen[4];
	
		// Haal cafes op bij gekozen thema
	var deelnemerIDJoin = db.execute("SELECT DISTINCT schattingAntwoorden.deelnemerID, schattingAntwoorden.schattingAntwoord FROM schattingAntwoorden INNER JOIN deelnemers ON schattingAntwoorden.deelnemerID = deelnemers.deelnemerID WHERE groepID = 1");
	
	while (selectSchattingen.isValidRow()) { 
		
		array.push(selectSchattingen.fieldByName('schattingAntwoord'));
		// get next row
  		selectSchattingen.next();
    	
	}

	// always close rowset and db connection!
	selectSchattingen.close();
	
	console.log(antwoordenSchatting);
	
	db.close();
	
console.log(array);

var value = schattingJuisteAntwoord; // DIT MOET HET ANTWOORD ZIJN

var low, high;

var getClosestValues = function(array, value) {
    for (var i = array.length; i--;) {
        if (array[i] <= value && (low === undefined || low < array[i])) low = array[i];
        if (array[i] >= value && (high === undefined || high > array[i])) high = array[i];
    };
    return [low, high];
    
}

var result = getClosestValues(array, value);	

var difHighValue = high - value;
var difLowValue = value - low;

console.log(difHighValue);
console.log(difLowValue);

var juisteAntwoord;

var getClosestValue = function() {
	if (difHighValue < difLowValue || isNaN(difLowValue)) {
		juisteAntwoord = high; 
		console.log('Persoon met schatting ' + high + ' wint 1 punt!' );
	} 
	else if (difHighValue == difLowValue) { 
		juisteAntwoord = high & low;
		console.log('Allebei 1 punt!');
		}
	
	else {
		juisteAntwoord = low;
		console.log('Persoon met schatting ' + low + ' wint 1 punt!' );
	}
}	

console.log(juisteAntwoord);
	
getClosestValue();	

function scoreUpdaten(){
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');	
	
	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden WHERE deelnemerID = 1");
	var deelnemer_1_schatting = selectSchattingen.fieldByName('schattingAntwoord');

	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden WHERE deelnemerID = 2");
	var deelnemer_2_schatting = selectSchattingen.fieldByName('schattingAntwoord');
	
	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden WHERE deelnemerID = 3");
	var deelnemer_3_schatting = selectSchattingen.fieldByName('schattingAntwoord');
	if (aantal == 4) {
	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden WHERE deelnemerID = 4");
	var deelnemer_4_schatting = selectSchattingen.fieldByName('schattingAntwoord');
	}
	if (aantal == 5) {	
	var selectSchattingen = db.execute("SELECT schattingAntwoord FROM schattingAntwoorden WHERE deelnemerID = 5");
	var deelnemer_5_schatting = selectSchattingen.fieldByName('schattingAntwoord');
	
	}
	
	switch(true)
{
    case (juisteAntwoord === deelnemer_1_schatting):
      db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = 1');
      winnaarNaam = deelnemernaam_1;
      break;
    case (juisteAntwoord === deelnemer_2_schatting):
      db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = 2');
      winnaarNaam = deelnemernaam_2;
      break;
    case (juisteAntwoord === deelnemer_3_schatting):
      db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = 3');
      winnaarNaam = deelnemernaam_3;
      break;
    case (juisteAntwoord === deelnemer_4_schatting):
      db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = 4');
      winnaarNaam = deelnemernaam_4;
      break;
    case (juisteAntwoord === deelnemer_5_schatting):
      db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = 5');
      winnaarNaam = deelnemernaam_5;
      break;

}
	
	
	var	antwoordTonen = Ti.UI.createLabel({
    	color: 'black',
    	text: ''+ winnaarNaam + ' met als antwoord '+ juisteAntwoord + ' wint 1 punt! Het juiste antwoord is '+ schattingJuisteAntwoord + '',
    	font: { fontSize: 15, fontFamily: 'Helvetica Neue' },
    	right:25,
 		left:25,
 		top:'30dp'
	});

schattingAntwoord.add(antwoordTonen);

db.close();
	
}
	
scoreUpdaten();
	
}

var btnStandTonen = Ti.UI.createButton({
    title:'Stand Tonen',
    top:'360dp',
    width:'190dp',
    height:'35dp',
 	right:'10dp',
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

schattingAntwoord.add(btnStandTonen);


btnStandTonen.addEventListener('click',function(e) {
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	var leegDeelnemersgroep = db.execute('DELETE FROM schattingAntwoorden');
	db.close();
	schattingAntwoord.close();
	stand.open();
});


schattingAntwoord.addEventListener('focus',function(e){
		getSchattingen();
	});