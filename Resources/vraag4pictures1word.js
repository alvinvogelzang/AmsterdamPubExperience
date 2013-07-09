/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

var vraag4pictures1word = Ti.UI.createWindow({
   backgroundImage:'/images/achtergrondFotovragen.jpg',
   title: 'Amsterdam Pub Experience',
   modal: true
});

	var vraagZelf;
	var fotoVraagTonen;
	var fotoView;
	var countTwee = 0;

function vraagToevoegenTwee() {
	countTwee++;
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT * FROM deelnemers WHERE groepID = 1');
	var aantalDeelnemers = selectAantalDeelnemers.rowCount;

	if (countTwee <= aantalDeelnemers) {
	
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1, welkCafe FROM deelnemersgroep WHERE groepID = 1');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	var ditCafe = selectDeelnemersgroep.fieldByName('welkCafe');

	
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT count(groepID) FROM deelnemers WHERE groepID = 1');
	var aantalDeelnemers = selectAantalDeelnemers.fieldByName('count(groepID)');
		
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = 1 AND rowid = ?', deelnemersCafe1);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	
	// Haal cafes op bij gekozen thema
	var selectCafe = db.execute('SELECT DISTINCT cafe.cafeID, cafe.cafe_naam, cafe.themaID FROM cafe INNER JOIN deelnemersgroep ON cafe.themaID = deelnemersgroep.themaID WHERE groepID = 1 LIMIT 1');
	var cafeCafeID = selectCafe.fieldByName('cafeID');
	var cafeNaam = selectCafe.fieldByName('cafe_naam');
		
	// Haal vraag random op
	var selectVraag = db.execute("SELECT vraag, vraagID FROM vragen WHERE cafeID=?-1 AND vraag_type=2 ORDER BY RANDOM()", ditCafe);
	var vragenVraagID = selectVraag.fieldByName('vraagID');
	var vragenVraag = selectVraag.fieldByName('vraag');
 
	// Haal antwoorden van vraag op
	var selectAntwoorden = db.execute("SELECT antwoord, goedfout FROM antwoorden WHERE vraagID =? ORDER BY RANDOM()", vragenVraagID);
	var antwoordenAntwoord = selectAntwoorden.fieldByName('antwoord');
	var antwoordenGoedfout = selectAntwoorden.fieldByName('goedfout');
	
	// Toon voor wie de vraag is
	vraagZelf = Ti.UI.createLabel({
    	color: 'white',
    	text: 'Vraag voor '+ naam + '',
    	font: { fontSize: '20dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'30dp',
 		top:'30dp'
	});

	// Toon de vraag
	fotoVraagTonen = Ti.UI.createLabel({
    	color: 'white',
    	text: ''+ vragenVraag + '',
    	font: { fontSize: '22dp', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'30dp',
 		top:'57dp'
	});
	
	// Toon de antwoorden
	// Primary view voor de buttons
	fotoView = Ti.UI.createView({
   		title : 'Hello',
    	width : '100%',
   		height : '100%',
   		
    	top: '180dp',
    	layout: 'horizontal'
	});
	

	var count=0;
	// fetch rows
	while (selectAntwoorden.isValidRow()) {
		
		if(count==0) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		borderColor : '#58301d',
   	    		borderWidth : 8,
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '12dp',
        		left: '12dp'
			});
		}
		
		if(count==1) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		borderColor : '#894b2c',
   	    		borderWidth : 8,
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '12dp',
        		left: '12dp'
			});
		}
		if(count==2) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		borderColor : '#4c2817',
   	    		borderWidth : 8,
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '12dp',
        		left: '12dp'
			});
		}
		if(count==3) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/plaatjes/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		width : '140dp',
   	    		height : '140dp',
   	    		borderColor : '#8e5031',
   	    		borderWidth : 8,
        		top: '12dp',
        		left: '12dp'
			});
		}
    	addlistenerTwee(myButton);
    
    	// Button toevoegen aan de view
		fotoView.add(myButton);
 		count++;
 
    	// get next row
  		selectAntwoorden.next();
    	
	}

	// always close rowset and db connection!
	selectAntwoorden.close();
	
		vraag4pictures1word.add(fotoView);
		vraag4pictures1word.add(fotoVraagTonen);
		vraag4pictures1word.add(vraagZelf);
		db.close();
	} else {		
       	db.execute('UPDATE deelnemersgroep SET cafe1=1 WHERE groepID = 1');
 		db.close();
		schattingVraag.open();
	}
	
};
	
	
	
	vraag4pictures1word.addEventListener('focus',function(e){
		Titanium.include('schattingVraag.js');
		vraagToevoegenTwee();
	});
	

	function addlistenerTwee(inobj) {
           inobj.addEventListener('click',function(e){
            if (e.source.tagsID === 1) {
 	
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
 				// Sla op bij welke vraag het spel is
 				var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
              	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
                db.execute('UPDATE deelnemersgroep SET cafe1= cafe1+1 WHERE groepID = ?', deelnemersGroepID);
 
 				vraag4pictures1word.animate({ 
            duration:1000, 
            backgroundColor: 'green',
            autoreverse : true
        });
               
 	 vraag4pictures1word.remove(titel);    
    vraag4pictures1word.remove(vraagZelf);    
                vraag4pictures1word.remove(fotoVraagTonen);
                vraag4pictures1word.remove(fotoView);
                
           
  setTimeout(function(){
  				vraagToevoegenTwee();
  	},1800);
 
 				// Update de score van de gebruiker	
				var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID =1 AND rowid = ?', deelnemersCafe1);
				var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
				db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = ?', deelnemerDeelnemerID);
	
 				db.close();
       
 				
                
            } else if (e.source.tagsID === 0) {
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                // Checken in welke deelnemersgroep we zitten
                var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE groepID = 1');
                var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
                db.execute('UPDATE deelnemersgroep SET cafe1= cafe1+1 WHERE groepID = ?', deelnemersGroepID);
 
 				vraag4pictures1word.animate({ 
            duration:1000, 
            backgroundColor: 'red',
            autoreverse : true
        });
               
 				db.close();
                
 				vraag4pictures1word.remove(titel);   
 				vraag4pictures1word.remove(fotoVraagTonen); 
   				vraag4pictures1word.remove(vraagZelf);    
                vraag4pictures1word.remove(fotoView);
           
  setTimeout(function(){ 
  				vraagToevoegenTwee();
  	},1800);
             
            } 
        });
        return;
    }
	
	
	
	