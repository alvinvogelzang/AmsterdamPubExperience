/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('kaart.js');

// Database aanroepen
var db = Ti.Database.install('quiz3.sqlite','crawlympics');

var gebruikersToevoegen = Ti.UI.createWindow({
  backgroundImage:'/images/achtergrondApp.jpg'
});


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
gebruikersToevoegen.add(scrollView);

var titelGebruikersToevoegen = Ti.UI.createLabel({
	text: 'Voer de namen van de deelnemers hieronder in',
	color: '#FFFFFF',
	top: '20dp',
	width: 'auto',
	height: 'auto',
	left: '20dp',
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'16dp'}
	
});

gebruikersToevoegen.add(titelGebruikersToevoegen);

var deelnemer_naam_1 = Ti.UI.createTextField({
    color:'#336699',
     top:'100dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam eerste deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderColor: '#000000', 
    borderWidth: 3,
 	backgroundColor:'#FFFFFF', 
    backgroundImage:'none'
});

scrollView.add(deelnemer_naam_1);

var deelnemer_naam_2 = Ti.UI.createTextField({
    color:'#336699',
    top:'150dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam tweede deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT, 
    borderColor: '#000000', 
    borderWidth: 3,
 backgroundColor:'#FFFFFF', 
    backgroundImage:'none'
});

scrollView.add(deelnemer_naam_2);

var deelnemer_naam_3 = Ti.UI.createTextField({
    color:'#336699',
    top:'200dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam derde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderColor: '#000000', 
    borderWidth: 3,
 backgroundColor:'#FFFFFF', 
    backgroundImage:'none'
});

scrollView.add(deelnemer_naam_3);

var deelnemer_naam_4 = Ti.UI.createTextField({
    color:'#336699',
    top:'250dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam vierde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderColor: '#000000', 
    borderWidth: 3,
 backgroundColor:'#FFFFFF', 
    backgroundImage:'none'

});


var deelnemer_naam_5 = Ti.UI.createTextField({
    color:'#336699',
    top:'300dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam vijfde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderColor: '#000000', 
    borderWidth: 3,
 backgroundColor:'#FFFFFF', 
    backgroundImage:'none'

});

var btnAdd = Ti.UI.createButton({
    title:'+',
    bottom:'80dp',
    left:'10dp',
    width:'40dp',
    height:'40dp',
 	color: '#FFFFFF',
 	backgroundColor: '#ff9900',
 	backgroundImage: 'none',
    borderRadius:5,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:'18dp'}
});
scrollView.add(btnAdd);

var aantal = 3;

btnAdd.addEventListener('click',function(e) {
    if (aantal == 3) {
        scrollView.add(deelnemer_naam_4);
        aantal++;
    } else if (aantal == 4) {
        scrollView.add(deelnemer_naam_5);
        aantal++;
    } else if (aantal == 5) {
        alert("Helaas kunnen er maar maximaal 5 speler mee doen. Je zou teams kunnen maken.");
    };
});



var btnSubmit = Ti.UI.createButton({
    title: 'Deelnemers bevestigen', 
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


btnSubmit.addEventListener('click',function(e) {
    
    if (deelnemer_naam_1.value != '') {
        
        
        var dbData = {
            deelnemer_naam_1: deelnemer_naam_1.value
        };
        var sql = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = 1');
        var groepID = sql.fieldByName('groepID');
        console.log(groepID);
        var insertNaam1 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_1.value+'", 0, ?)', groepID);
        var insertNaam2 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_2.value+'", 0, ?)', groepID);
        var insertNaam3 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_3.value+'", 0, ?)', groepID);
        if (aantal == 4) {
            var insertNaam4 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_4.value+'", 0, ?)', groepID);
        } else if (aantal == 5) {
            var insertNaam4 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_4.value+'", 0, ?)', groepID);
            var insertNaam5 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_5.value+'", 0, ?)', groepID);
        } 
        sql.close();
        db.close();
        kaart.open();
        gebruikersToevoegen.close(); 
    } else {
 		alert('Er moeten minstens drie deelnemers meedoen om het spel te kunnen spelen');
 	};


});