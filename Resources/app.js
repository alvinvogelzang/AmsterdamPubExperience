/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('gebruikersToevoegen.js');

var db = Ti.Database.install('quiz3.sqlite','crawlympics');
var beginScherm = Ti.UI.createWindow({
	title: 'Crawlympics',
  	backgroundImage:'/images/achtergrondApp.jpg',
  	modal: true
});

// Database aanroepen
var db = Ti.Database.install('quiz3.sqlite','crawlympics');

var checkTabel = db.execute('SELECT groepID FROM deelnemersgroep');
if (checkTabel.rowCount > 0)  {	
	var leegDeelnemersgroep = db.execute('DELETE FROM deelnemersgroep');
	var leegDeelnemers = db.execute('DELETE FROM deelnemers');
	var clearDeelnemerstabel = db.execute('UPDATE sqlite_sequence SET seq = 0 WHERE rowid = 5');
	var clearGroep = db.execute('UPDATE sqlite_sequence SET seq = 0 WHERE rowid = 1');
}
checkTabel.close();



var btn1 = Ti.UI.createButton({
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


beginScherm.add(btn1);


btn1.addEventListener('click',function(e) {
	var theData = db.execute('INSERT INTO deelnemersgroep (groepID, themaID) VALUES (1, 1)');
	gebruikersToevoegen.open();
});



beginScherm.open();