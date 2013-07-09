/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

var stand = Ti.UI.createWindow({
  backgroundColor: 'white'
});


	function focusDit() {
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
		
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam, score FROM deelnemers WHERE groepID = 1 ORDER BY score DESC');
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	var deelnemerScore = selectDeelnemers.fieldByName('score');

	// Toon voor wie de vraag is
	titelScore = Ti.UI.createLabel({
    	color: 'black',
    	text: 'Tussenstand',
    	font: { fontSize: '28dp', fontFamily: 'Helvetica Neue', fontWeight:'bold' },
    	right:25,
 		left:20,
 		top:60
	});
	
	// Toon de antwoorden
	// Primary view voor de buttons
	brandViewScore = Ti.UI.createView({
   		title : 'Hello',
    	width : '100%',
   		height : '100%',
    	top: '95dp',
    	layout: 'horizontal'
	});
	
	count=1;
	
	// fetch rows
	while (selectDeelnemers.isValidRow()) {
		
		
   		//create Button with name and title
   			var myButton = Ti.UI.createLabel({
   				text : '0'+count+' - '+selectDeelnemers.fieldByName('naam')+'',
   	    		width : '230dp',
   	    		font: { fontSize: 18, fontFamily: 'Helvetica Neue' },
   	    		height : '40dp',
        		top: '2dp',
        		left: '20dp'
			});
			
			var toonScore = Ti.UI.createLabel({
   				text : selectDeelnemers.fieldByName('score'),
   	    		width : '40dp',
   	    		font: { fontSize: 18, fontFamily: 'Helvetica Neue',  fontWeight:'bold' },
   	    		height : '40dp',
        		top: '2dp',
        		right: '30dp'
			});
		
    	
    	// Button toevoegen aan de view
		brandViewScore.add(myButton);
		brandViewScore.add(toonScore);
		
    	// get next row
  		selectDeelnemers.next();
    	
    	count++;
	}

	// always close rowset and db connection!
	selectDeelnemers.close();
	db.close();
	
	stand.add(titelScore);
	stand.add(brandViewScore);
	
	
	
	

	

	var volgendeScherm = Ti.UI.createButton({
   	    title : 'Strafregel uitvoeren',
   	    width : '230dp',
   	    height : '30dp',
    	top: '350dp',
    	right: '30dp'
   	});
   	
   	// ELSE IF LAATSTE RONDE
   	// BUTTON NIEUW SPEL
   	
   	stand.add(volgendeScherm);
   	
   	volgendeScherm.addEventListener('click',function(e) {
   		
			Titanium.include('strafregelUitvoeren.js');
			strafregelUitvoeren.open();
			stand.close();
	
		
	});
	};
	stand.addEventListener('focus',function(e){
		focusDit();
	});
	