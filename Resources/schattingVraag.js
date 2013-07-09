// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
//
// create base UI tab and root window
//
var schattingVraag = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

schattingVraag.addEventListener('focus',function(e){
	
	Titanium.include('schattingAntwoord.js');
});
		// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');

	// Haal cafes op bij gekozen thema
	var selectCafe = db.execute("SELECT DISTINCT cafe.cafeID, cafe.cafe_naam, cafe.themaID FROM cafe INNER JOIN deelnemersgroep ON cafe.themaID = deelnemersgroep.themaID WHERE groepID = ? LIMIT 1", deelnemersGroepID);
	var cafeCafeID = selectCafe.fieldByName('cafeID');
	var cafeNaam = selectCafe.fieldByName('cafe_naam');

	// Haal vraag random op
	var selectVraag = db.execute("SELECT vraag, vraagID FROM vragen WHERE cafeID=? AND vraag_type=3 ORDER BY RANDOM()", cafeCafeID);
	var vragenVraagID = selectVraag.fieldByName('vraagID');
	var vragenVraag = selectVraag.fieldByName('vraag');
	
	// Haal antwoorden van vraag op
	var selectAntwoorden = db.execute("SELECT antwoord, goedfout FROM antwoorden WHERE vraagID = ?", vragenVraagID);
	var schattingJuisteAntwoord = selectAntwoorden.fieldByName('antwoord');
	
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT count(groepID) FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var aantalDeelnemers = selectAantalDeelnemers.fieldByName('count(groepID)');
	
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	var deelnemersNamen = [];
	
	var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: false,
  height: '100%',
  width: '100%',
  top:0,
  left:0
});
schattingVraag.add(scrollView);


	var aantal = aantalDeelnemers;

	// fetch rows
	while (selectDeelnemers.isValidRow()) {
		
		
		deelnemersNamen.push(selectDeelnemers.fieldByName('naam'));
		// get next row
  		selectDeelnemers.next();
	}
 		
 	// always close rowset and db connection!
	db.close();
	
	var deelnemernaam_1 = deelnemersNamen[0];
	var deelnemernaam_2 = deelnemersNamen[1];
	var deelnemernaam_3 = deelnemersNamen[2];
	var deelnemernaam_4 = deelnemersNamen[3];
	var deelnemernaam_5 = deelnemersNamen[4];
	

// Toon de vraag
var	vraagTonen = Ti.UI.createLabel({
    	color: 'black',
    	text: ''+ vragenVraag + '',
    	font: { fontSize: '15dp', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'25dp',
 		top:'30dp'
	});



schattingVraag.add(vraagTonen);

var deelnemer_1_antwoord = Ti.UI.createTextField({
    color:'#336699',
 	top:'80dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Antwoordveld van '+ deelnemernaam_1 + '' ,
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

scrollView.add(deelnemer_1_antwoord);

var deelnemer_2_antwoord = Ti.UI.createTextField({
    color:'#336699',
    top:'140dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Antwoordveld van '+ deelnemernaam_2 + '',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

scrollView.add(deelnemer_2_antwoord);

var deelnemer_3_antwoord = Ti.UI.createTextField({
    color:'#336699',
    top:'200dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Antwoordveld van '+ deelnemernaam_3 + '',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 
});

scrollView.add(deelnemer_3_antwoord);

var deelnemer_4_antwoord = Ti.UI.createTextField({
    color:'#336699',
    top:'260dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Antwoordveld van '+ deelnemernaam_4 + '',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 
});

var deelnemer_5_antwoord = Ti.UI.createTextField({
    color:'#336699',
    top:'320dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Antwoordveld van '+ deelnemernaam_5 + '',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
 
});



if (aantal == 4) {
			 scrollView.add(deelnemer_4_antwoord);
		} else if (aantal == 5) {
			 scrollView.add(deelnemer_4_antwoord);
			 scrollView.add(deelnemer_5_antwoord);
		
		} 

var btnSubmitSchattingen = Ti.UI.createButton({
    title:'Bevestig schattingen',
    top:'360dp',
    width:'190dp',
    height:'35dp',
 	right:'10dp',
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

scrollView.add(btnSubmitSchattingen);

btnSubmitSchattingen.addEventListener('click',function(e) {
	if (deelnemer_1_antwoord.value != '') {
		var dbData = {
			deelnemer_1_antwoord: deelnemer_1_antwoord.value
		};
		var db = Ti.Database.install('quiz3.sqlite','crawlympics');
		var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = 1');
		var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
		var insertAntwoord1 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_1_antwoord.value+', ?)', deelnemerDeelnemerID);
	 	var insertAntwoord2 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_2_antwoord.value+', ? + 1)', deelnemerDeelnemerID);
		var insertAntwoord3 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_3_antwoord.value+', ? + 2)', deelnemerDeelnemerID);
		if (aantal == 4) {
			 var insertAntwoord4 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_4_antwoord.value+', ? + 3)', deelnemerDeelnemerID);
		} else if (aantal == 5) {
			 var insertAntwoord4 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_4_antwoord.value+', ? + 3)', deelnemerDeelnemerID);
			 var insertAntwoord5 = db.execute('INSERT INTO schattingAntwoorden (schattingAntwoord, deelnemerID) VALUES ('+deelnemer_5_antwoord.value+', ? + 4)', deelnemerDeelnemerID);
		
		} 
		db.close();
	};
	
	schattingAntwoord.open();
	
});
