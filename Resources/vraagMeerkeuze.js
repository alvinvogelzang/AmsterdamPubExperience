/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('vraag4pictures1word.js');

var vraagMeerkeuze = Ti.UI.createWindow({
   backgroundImage:'/images/achtergrondCafe.jpg',
   title: 'Meerkeuzevraag',
   modal: true
});

var animationView = Titanium.UI.createView({
});

	var titel;
	var vraagTonen;
	var brandView;
	var view;
	var bgView;
	var count = 0;

function vraagToevoegen() {
	count++;
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT * FROM deelnemers WHERE groepID = 1');
	var aantalDeelnemers = selectAantalDeelnemers.rowCount;
	
	if (count <= aantalDeelnemers) {
	// Database aanroepen
	
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT cafe1, welkCafe FROM deelnemersgroep WHERE groepID = 1');
	var deelnemersGroepID = 1;
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	var ditCafe = selectDeelnemersgroep.fieldByName('welkCafe');
	
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = 1 AND deelnemerID = ?', deelnemersCafe1);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	// Haal vraag random op
	var selectVraag = db.execute("SELECT vraag, vraagID FROM vragen WHERE cafeID=?-1 AND vraag_type=1 ORDER BY RANDOM()", ditCafe);
	var vragenVraagID = selectVraag.fieldByName('vraagID');
	var vragenVraag = selectVraag.fieldByName('vraag');
 
	// Haal antwoorden van vraag op
	var selectAntwoorden = db.execute("SELECT antwoord, goedfout FROM antwoorden WHERE vraagID =? ORDER BY RANDOM()", vragenVraagID);
	var antwoordenAntwoord = selectAntwoorden.fieldByName('antwoord');
	var antwoordenGoedfout = selectAntwoorden.fieldByName('goedfout');

	// Toon voor wie de vraag is
	titel = Ti.UI.createLabel({
    	color: 'white',
    	text: 'Vraag voor '+ naam + '',
    	font: { fontSize: '22dp', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'15dp',
 		top:'17dp'
	});

	// Toon de vraag
	vraagTonen = Ti.UI.createLabel({
    	color: 'white',
    	text: ''+ vragenVraag + '',
    	font: { fontSize: '22dp', fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
    	right:'25dp',
 		left:'15dp',
 		top:'60dp'
	});
	
	// Toon de antwoorden
	// Primary view voor de buttons
	brandView = Ti.UI.createView({
   		title : 'Hello',
    	width : '100%',
   		height : '100%',
    	top: '170dp',
    	layout: 'vertical'
	});
	
	var bgView = Ti.UI.createLabel({
        backgroundColor : '#c57e1f',
        width: '305dp',
        height: '24dp',
       	bottom: '21dp',
    });

    var view = Titanium.UI.createView({
       	backgroundColor:'#f9a32f',
       	width: '1dp',
      	height: '24dp',
       	bottom: '21dp',
        left: '10dp',
        zIndex : 1
    });
    var animation = Titanium.UI.createAnimation();

    var animationHandler = function() {
 		animation.removeEventListener('complete',animationHandler);
        animation.backgroundColor = '#f9a32f';
        animation.delay = 0;
        animation.width = '300dp';
 		animation.height = '24dp';
        animation.duration = 29000;
        view.animate(animation);
          
        function run() {
     		var db = Ti.Database.install('quiz3.sqlite','crawlympics');
            
      	   	// Sla op bij welke vraag het spel is
        	var selectDeelnemersgroep = db.execute('SELECT cafe1 FROM deelnemersgroep WHERE groepID = 1');
           	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
          	var optellen = deelnemersCafe1 + 1;

 			db.execute('UPDATE deelnemersgroep SET cafe1= ? WHERE groepID = 1', optellen);
            db.close();
  			vraagMeerkeuze.remove(view);
            vraagMeerkeuze.remove(bgView);
           	animation =  null;
            vraagMeerkeuze.remove(titel);    
            vraagMeerkeuze.remove(vraagTonen);
            vraagMeerkeuze.remove(brandView); 

            vraagToevoegen(); 
    	};
    timer = setTimeout(run, 28995);
    };
    
    animation.addEventListener('complete',animationHandler);
    view.animate(animation);
	
	
	var buttonArray = [];
	
	// fetch rows
	while (selectAntwoorden.isValidRow()) {
 		
   		//create Button with name and title
   		var myButton = Ti.UI.createButton({
   	    	buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    	title : selectAntwoorden.fieldByName('antwoord'),
   	    	tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    	color: '#000000',
  			borderColor: "#000000",
    		borderWidth: 3,
    		backgroundColor: '#ffcc33',
			backgroundImage: 'none',
			borderRadius:5,
			font:{fontFamily:'Arial', fontSize: '21dp'},
   	    	width : '295dp',
   	    	height : '70dp',
        	top: '20dp'
   		});
    	
    	addlistener(myButton);
    
    	// Button toevoegen aan de view
		brandView.add(myButton);
		
		myButton.addEventListener('click',function(e){
             animation.removeEventListener('complete',animationHandler);
             vraagMeerkeuze.remove(view);
             vraagMeerkeuze.remove(bgView);
             animation.duration = 0;
             animation = null;
             clearTimeout(timer);
            timer = 0;
         });
 
    	// push button to array, if we maybe need it later
		buttonArray.push(myButton);
 
    	// get next row
  		selectAntwoorden.next();
    	
	}
	
	// always close rowset and db connection!
	selectAntwoorden.close();
	selectDeelnemersgroep.close();
	selectDeelnemers.close();
	
	console.log(deelnemersCafe1);
	console.log(aantalDeelnemers); 
	vraagMeerkeuze.add(bgView);  
	vraagMeerkeuze.add(view); 
    vraagMeerkeuze.addEventListener('focus',function(e){
    	animation.removeEventListener('complete',animationHandler);
    });
	vraagMeerkeuze.add(brandView);
	vraagMeerkeuze.add(vraagTonen);
	vraagMeerkeuze.add(titel);    
 	db.close();	
		
	} else {		
		var db = Ti.Database.install('quiz3.sqlite','crawlympics');
       	db.execute('UPDATE deelnemersgroep SET cafe1 = 1 WHERE groepID = 1');
 		db.close();
  		vraag4pictures1word.open();
		
	}
	
};
	vraagMeerkeuze.addEventListener('focus',function(e){
 		vraagToevoegen();
	});
 	
	function addlistener(inobj) {
           inobj.addEventListener('click',function(e){
            if (e.source.tagsID === 1) {
 	
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                
 				// Sla op bij welke vraag het spel is
 				var selectDeelnemersgroep = db.execute('SELECT cafe1 FROM deelnemersgroep WHERE groepID = 1');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
 				var optellen = deelnemersCafe1 + 1;
 					db.execute('UPDATE deelnemersgroep SET cafe1= ? WHERE groepID = 1', optellen);
        
 				// Update de score van de gebruiker	
				var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = 1 AND rowid = ?', deelnemersCafe1);
				var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
				db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = ?', deelnemerDeelnemerID);
	
 				db.close();
 				
        		vraagMeerkeuze.remove(titel);    
                vraagMeerkeuze.remove(vraagTonen);
                vraagMeerkeuze.remove(brandView);
           
  				setTimeout(function(){
  					vraagToevoegen();
  				},1800);
 				
                
            } else if (e.source.tagsID === 0) {
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                // Checken in welke deelnemersgroep we zitten
                var selectDeelnemersgroep = db.execute('SELECT cafe1 FROM deelnemersgroep WHERE groepID = 1');
                var deelnemersGroepID = 1;
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
 				var optellen = deelnemersCafe1 + 1;
 				
 				db.execute('UPDATE deelnemersgroep SET cafe1= ? WHERE groepID = 1', optellen);
 		
 				db.close();
        
            	vraagMeerkeuze.remove(titel);    
            	vraagMeerkeuze.remove(vraagTonen);
           		vraagMeerkeuze.remove(brandView);     
           
			 	setTimeout(function(){
			 		vraagToevoegen();
			 	},1800);
    
            } 
           });
        return;
    }
	
	
	