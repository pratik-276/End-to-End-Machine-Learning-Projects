var homeb = document.getElementById('homeb');
var visualizationb = document.getElementById('visualizationb');
var performanceb = document.getElementById('performanceb');
var predictionb = document.getElementById('predictionb');

var home = document.getElementById('home');
var visualization = document.getElementById('visualization');
var performances = document.getElementById('performance');
var prediction = document.getElementById('prediction');

homeb.addEventListener('click', function(){
  home.style.display = 'block';
  visualization.style.display = 'none';
  performances.style.display = 'none';
  prediction.style.display = 'none';
});
visualizationb.addEventListener('click', function(){
  home.style.display = 'none';
  visualization.style.display = 'block';
  performances.style.display = 'none';
  prediction.style.display = 'none';
});
performanceb.addEventListener('click', function(){
  home.style.display = 'none';
  visualization.style.display = 'none';
  performances.style.display = 'block';
  prediction.style.display = 'none';
});
predictionb.addEventListener('click', function(){
  home.style.display = 'none';
  visualization.style.display = 'none';
  performances.style.display = 'none';
  prediction.style.display = 'block';
});

var homeleft1 = document.getElementById('dcoll');
var homeleft2 = document.getElementById('dclean');
var homeleft3 = document.getElementById('ddesc');
var homeright1 = document.getElementById('homeright1');
var homeright2 = document.getElementById('homeright2');
var homeright3 = document.getElementById('homeright3');
homeleft1.addEventListener('click', function(){
  homeright1.style.display = 'block';
  homeright2.style.display = 'none';
  homeright3.style.display = 'none';
});
homeleft2.addEventListener('click', function(){
  homeright1.style.display = 'none';
  homeright2.style.display = 'block';
  homeright3.style.display = 'none';
});
homeleft3.addEventListener('click', function(){
  homeright1.style.display = 'none';
  homeright2.style.display = 'none';
  homeright3.style.display = 'block';
});



var vleft1 = document.getElementById('sepall');
var vleft2 = document.getElementById('sepalw');
var vleft3 = document.getElementById('petall');
var vleft4 = document.getElementById('petalw');
var vleft5 = document.getElementById('pair');
var vright1 = document.getElementById('vright1');
var vright2 = document.getElementById('vright2');
var vright3 = document.getElementById('vright3');
var vright4 = document.getElementById('vright4');
var vright5 = document.getElementById('vright5');
vleft1.addEventListener('click', function(){
  vright1.style.display = 'block';
  vright2.style.display = 'none';
  vright3.style.display = 'none';
  vright4.style.display = 'none';
  vright5.style.display = 'none';
});
vleft2.addEventListener('click', function(){
  vright1.style.display = 'none';
  vright2.style.display = 'block';
  vright3.style.display = 'none';
  vright4.style.display = 'none';
  vright5.style.display = 'none';
});
vleft3.addEventListener('click', function(){
  vright1.style.display = 'none';
  vright2.style.display = 'none';
  vright3.style.display = 'block';
  vright4.style.display = 'none';
  vright5.style.display = 'none';
});
vleft4.addEventListener('click', function(){
  vright1.style.display = 'none';
  vright2.style.display = 'none';
  vright3.style.display = 'none';
  vright4.style.display = 'block';
  vright5.style.display = 'none';
});
vleft5.addEventListener('click', function(){
  vright1.style.display = 'none';
  vright2.style.display = 'none';
  vright3.style.display = 'none';
  vright4.style.display = 'none';
  vright5.style.display = 'block';
});



var pleft1 = document.getElementById('lr');
var pleft2 = document.getElementById('svm');
var pleft3 = document.getElementById('knn');
var pleft4 = document.getElementById('dt');
var pright1 = document.getElementById('pright1');
var pright2 = document.getElementById('pright2');
var pright3 = document.getElementById('pright3');
var pright4 = document.getElementById('pright4');
pleft1.addEventListener('click', function(){
  pright1.style.display = 'block';
  pright2.style.display = 'none';
  pright3.style.display = 'none';
  pright4.style.display = 'none';
});
pleft2.addEventListener('click', function(){
  pright1.style.display = 'none';
  pright2.style.display = 'block';
  pright3.style.display = 'none';
  pright4.style.display = 'none';
});
pleft3.addEventListener('click', function(){
  pright1.style.display = 'none';
  pright2.style.display = 'none';
  pright3.style.display = 'block';
  pright4.style.display = 'none';
});
pleft4.addEventListener('click', function(){
  pright1.style.display = 'none';
  pright2.style.display = 'none';
  pright3.style.display = 'none';
  pright4.style.display = 'block';
});
