function is(w,m){if(m.substr(0,1) == "#"){if(m.substr(1,m.length-1) == w.target.id){return true;}else{return false;}}else if(m.substr(0,1) == "."){fl=w.target.classList.length;for (var i = 0; i < fl; i++){if(w.target.classList[i] == m.substr(1,m.length-1)){return true;break;}else if(i==w.target.classList.length){return false;}};}}
function closest(w,m){currentelement=w.target;match=false;nomatch=false;loopcount=0;while(!match && !nomatch){if(currentelement!=null){if(m.substr(0,1) == "#"){if(m.substr(1,m.length-1) == currentelement.id){match=true;}else{currentelement=currentelement.parentNode}}else if(m.substr(0,1) == "."){if(loopcount > 200){nomatch=true;};loopcount++;fl=currentelement.classList.length;for (var i = 0; i < fl; i++){if(currentelement.classList[i] == m.substr(1,m.length-1)){match=true;break;}else if(i==currentelement.classList.length-1){currentelement=currentelement.parentNode;}};if(fl==0){currentelement=currentelement.parentNode;};}}else{nomatch=true;}};if(nomatch){return false;};if(match){return true;};("004e006f006d006f00770069");}
function booltoint(w){if(w){return 1;}else{return 0;}}
function getID(w){return document.getElementById(w);}
function getClass(w){return document.getElementsByClassName(w);}
function show(e){e.style.display='block'};function hide(e){e.style.display='none'};ajax=[];
ajax.get=function(url){req = new XMLHttpRequest;req.open("GET",url,false);req.send();return req.responseText;}
ajax.post=function(url,post){req = new XMLHttpRequest;req.open("POST",url,false);req.setRequestHeader("Content-type","application/x-www-form-urlencoded");req.send(post);return req.responseText;}
function str2hex(str){response="";for (var i = 0; i < str.length; i++) {hex=str.charCodeAt(i).toString(16);response+=("000"+hex).slice(-4);};return response;}
function hex2str(str){response="";hexes=str.match(/.{1,4}/g) || [];for (var i = 0; i < hexes.length; i++) {response+=String.fromCharCode(parseInt(hexes[i],16));};return response;}
function isEven(value) {return (value%2 == 0);}

window.addEventListener('keydown', function(e){
	if(e.keyIdentifier === 'F5'){window.location.reload();}
});

calendar=[];
calendar.lang="es";
calendar.monthextra = 0;
var date = new Date().toDateString().split(" ");
setInterval(function(){
	reftime();
},1000)

jsonlang=ajax.get("langs.json");
lang=JSON.parse(jsonlang);

window.addEventListener('load',function(){
	getID('addevent').innerHTML=lang[calendar.lang].addevent;
	loadTime();
	loadDaysName();
	displayDays()
})

function loadTime(){
	getID('n-mon').innerHTML=lang[calendar.lang].months[date[1]];
	getID('n-year').innerHTML=date[3];
}
function loadDaysName(){
	toadd="";
	for(key in lang[calendar.lang].daysmin){
		toadd+="<div class='col'>"+lang[calendar.lang].daysmin[key]+"</div>";
	}
	getID('namdays').innerHTML=toadd;
}
function displayDays(){
	tm=true;
	daynumb=1;
	gfd = new Date();
	files=getClass('daynumb');
	ddate=new Date(gfd.getFullYear(), gfd.getMonth() + calendar.monthextra, gfd.getDate());

	monthdays=getNDays(parseInt(new Date(gfd.getFullYear(), gfd.getMonth() + calendar.monthextra, 1).getMonth()));
	jump=daystrTodaynumb(getFirstDay());
	if(jump > 0){
		daynumb=(monthdays-jump)+1;
		tm=false;
	}else{
		daynumb=1;
		tm=true;
	}

	for (var i = 0; i < files.length; i++) {
		files[i].innerHTML="";
		for (var ida = 0; ida < 7; ida++) {
			if(tm && gfd.getDate() == daynumb && gfd.getFullYear() == ddate.getFullYear() && gfd.getMonth() == ddate.getMonth()){
				files[i].innerHTML+="<div class='col' e='2'>"+daynumb+"</div>";
			}else{
				files[i].innerHTML+="<div class='col' e='"+booltoint(tm)+"'>"+daynumb+"</div>";
			}
			if(daynumb > monthdays-1){daynumb=1;tm=!tm;}else{daynumb+=1;}
		};
	};
}
function getNDays(m){
	gfd = new Date();
	dt=new Date(gfd.getFullYear(), gfd.getMonth() + calendar.monthextra, 1);
	if(isEven(m)){return 31;}else if(m == 1){
		if(isBisiest(dt.getFullYear())){return 29;}else{return 28;}
	}else{return 30;}
}
function isBisiest(y){
	if ((y % 4 == 0) && ((y % 100 != 0) || (y % 400 == 0))){return true;}else{return false;}
}
function getFirstDay(){
	gfd = new Date();
	return new Date(gfd.getFullYear(), gfd.getMonth() + calendar.monthextra, 1).toDateString().split(" ")[0];
}
function reftime(){
	gfd = new Date();
	date = new Date(gfd.getFullYear(), gfd.getMonth() + (calendar.monthextra), gfd.getDate()).toDateString().split(" ");
	loadTime();
}

function daystrTodaynumb(w){
	switch(w){
		case 'Mon':
			return 0;
		break;
		case 'Tue':
			return 1;
		break;
		case 'Wed':
			return 2;
		break;
		case 'Thu':
			return 3;
		break;
		case 'Fri':
			return 4;
		break;
		case 'Sat':
			return 5;
		break;
		case 'Sun':
			return 6;
		break;
	}
}

window.addEventListener('click',function(e){
	if(is(e,'.prev-n')){
		calendar.monthextra-=1;
		reftime();
		displayDays()
	}
	if(is(e,'.next-n')){
		calendar.monthextra+=1;
		reftime();
		displayDays()
	}
})