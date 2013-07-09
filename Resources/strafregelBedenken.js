/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('vraagMeerkeuze.js');

var strafregelBedenken = Ti.UI.createWindow({
   backgroundImage:'/images/achtergrondCafe.jpg'
});

var titelStrafregelBedenken = Ti.UI.createLabel({
	text: 'Bedenk een strafregel voor de verliezer en voor die hieronder in',
	color: '#FFFFFF',
	top: '20dp',
	width: 'auto',
	height: 'auto',
	left: '20dp',
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'16dp'}
	
});

strafregelBedenken.add(titelStrafregelBedenken);

var textField = Titanium.UI.createTextArea({
  keyboardType:Ti.UI.KEYBOARD_DEFAULT,
  color: '#000',
  top: '100dp', 
  width: '95%', 
  height: '280dp',
  opacity: 0.8,
  value: 'Bijvoorbeeld: Zing een nummer van Andre Hazes, betaal een rondje of drink je glas in een keer leeg...',
  font: {fontSize: '16dp'},
  borderColor: '#000000', 
  borderWidth: 5,
  backgroundColor:'#FFFFFF', 
  backgroundImage:'none'
});

textField._hintText = textField.value;
 
textField.addEventListener('focus',function(e){
    if(e.source.value == e.source._hintText){
        e.source.value = "";
    }
});

strafregelBedenken.add(textField);

var btnSubmit = Ti.UI.createButton({
    title: 'Start het spel', 
		width: '95%', 
    height: '45dp', 
    bottom: '10dp',
    color: '#ffffcc',
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize: '20dp'},
    borderRadius: 10,
    borderColor: '#000000', 
    borderWidth: 3,
    backgroundGradient:{ 
        type:'linear', 
        colors:[{color:'#ff9c00', position:0.0}, {color:'#ff7e00', position:1.0}, {color:'#d57605', position:2.0}], 
        backFillStart: false 
    }
});


scrollView.add(btnSubmit);

strafregelBedenken.add(btnSubmit);


btnSubmit.addEventListener('click',function(e) {
	if (textField.value != '') {
		var dbData = {
			textField: textField.value
		};
		var db = Ti.Database.install('quiz3.sqlite','crawlympics');
		var selectDeelnemersgroep = db.execute('SELECT groepID FROM deelnemersgroep WHERE groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var groepIDsb = selectDeelnemersgroep.fieldByName('groepID');
		
		
		// Kijken in welke ronde we zitten
		var sql = db.execute('SELECT strafregel_ronde1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde1 = sql.fieldByName('strafregel_ronde1');
		var sql = db.execute('SELECT strafregel_ronde2 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde2 = sql.fieldByName('strafregel_ronde2');
		var sql = db.execute('SELECT strafregel_ronde3 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde3 = sql.fieldByName('strafregel_ronde3');
	
		// Strafregel in db toevoegen bij de juiste ronde
		if (strafregel_ronde1 === null && strafregel_ronde2 === null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde1 = "'+textField.value+'" WHERE groepID =?', groepIDsb);
		} else if (strafregel_ronde1 !== null && strafregel_ronde2 === null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde2 = "'+textField.value+'" WHERE groepID =?', groepIDsb);
		} else if (strafregel_ronde1 !== null && strafregel_ronde2 !== null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde3 = "'+textField.value+'" WHERE groepID =?', groepIDsb);
		} else {
			alert('Er moet eerst een strafregel worden bedacht die de verliezer van de ronde uit moet voeren.');
		}
		sql.close();
		db.close();
		// Naar het volgende scherm
	
		vraagMeerkeuze.open();
	};

});

