const canvas = document.getElementById("plot");
const context = canvas.getContext("2d");
const updateAxisButton = document.getElementById("updateAxisButton");
var xAxisLen = canvas.width / 2;
var yAxisLen = canvas.height / 2;

function initAxisLen(){
	document.getElementById("x_len").value = canvas.width / 2 ;
	document.getElementById("y_len").value = canvas.height / 2 ;
}

function fitToContainer(){
	var parent = document.getElementsByClassName("draw")[0];
	console.log(parent.offsetWidth, parent.offsetHeight );
	canvas.width  = parent.offsetWidth;
	canvas.height = parent.offsetHeight;
}
function drawAxes() {
	fitToContainer();
	
	context.beginPath();

	const leftCoord = world2canvas( -canvas.width / 2, 0);
	const rightCoord = world2canvas( canvas.width / 2, 0);
	context.moveTo(leftCoord[0], leftCoord[1]);
	context.lineTo(rightCoord[0], rightCoord[1]);
	context.stroke();

	const topCoord = world2canvas( 0, canvas.height / 2);
	const bottomCoord = world2canvas( 0, -canvas.height / 2);
	context.moveTo(topCoord[0], topCoord[1]);
	context.lineTo(bottomCoord[0], bottomCoord[1]);
	context.stroke();
}


function drawXYData(x,y) {
    context.beginPath();
    const canvasCoord = world2canvas( x, y);
    context.arc(x, y, 4, 0, Math.PI * 2, true);
    context.stroke();
}

function drawMidAxis(xL, yL){
	//serve a scrivere a meta dell asse .. il valore di meta asse
	x = canvas.width / 4;
	y = canvas.height / 4;

	//draw on Y
    context.strokeText("-"+(yL/2),    x,  2*y);
    context.strokeText(    (yL/2),  3*x,  2*y);
    //draw on X
    context.strokeText("-"+(xL/2),  2*x,  y);
    context.strokeText(    (xL/2),  2*x,  3*y);
}

function updateAxisLenValue(e){
	//imposto i vali che ho nel 'input'
	xAxisLen = document.getElementById("x_len").valueAsNumber;
	yAxisLen = document.getElementById("y_len").valueAsNumber;
	console.log("Update Axix Lenght: x="+xAxisLen+", y="+yAxisLen);
	//cancello quello che ho gia disegnato... tutto
	context.clearRect(0, 0, canvas.width, canvas.height);
	//poi lo ri-disegno
	drawAxes();
	drawMidAxis(xAxisLen,yAxisLen);

	return [xAxisLen, yAxisLen]
}


function world2canvas(xCoord, yCoord) {
	canvasX = xCoord + canvas.width / 2;
	canvasY = -yCoord + canvas.height / 2;
	return [canvasX, canvasY];
}

function evt2data(xCoord, yCoord) {
	//prende un click nell canvas e lo converte in coordinate tra zero e uno... 
	//l' allungamento dei dati dispende da quale asse è piu corto
	// TODO : devo mettere un impostazione per selezionare la lunghezza delgi assi
	canvasX = xCoord - canvas.width / 2;
	canvasY = -yCoord + canvas.offsetTop + canvas.height / 2;
	normX = (canvas.width / 2) / xAxisLen;
	normY =  (canvas.height / 2) / yAxisLen;
	return [canvasX/normX, canvasY/normY];
}




function drawDot(xScreen,yScreen){
	console.log(world2canvas(xScreen, yScreen));
}



function aClickAppened(evt){
	console.log(evt2data(evt.x , evt.y));
}


updateAxisButton.addEventListener("click",updateAxisLenValue);
canvas.addEventListener("click", aClickAppened);
context.lineWidth = 5;

drawAxes();
initAxisLen();
