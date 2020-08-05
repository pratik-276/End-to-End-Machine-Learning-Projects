var hint0 = document.getElementById('zero_hint');
var hint1 = document.getElementById('first_hint');
var hint2 = document.getElementById('second_hint');
var hint3 = document.getElementById('third_hint');
var hint4 = document.getElementById('fourth_hint');
var hint5 = document.getElementById('fifth_hint');

var btn0 = document.getElementById('next_hint0');
var btn1 = document.getElementById('next_hint1');
var btn2 = document.getElementById('next_hint2');
var btn3 = document.getElementById('next_hint3');
var btn4 = document.getElementById('next_hint4');
var btn5 = document.getElementById('next_hint5');

var card1 = document.getElementById("card"+lst[0]);
var card2 = document.getElementById("card"+lst[1]);
var card3 = document.getElementById("card"+lst[2]);
var card4 = document.getElementById("card"+lst[3]);
var card5 = document.getElementById("card"+lst[4]);
var card6 = document.getElementById("card"+lst[5]);

card1.addEventListener('click', function(){
  alert('Tumse na ho payega🤷‍♂️🤷‍♂️🤦‍♂️🤦‍♂️ Try again!!!');
  location.reload();
});
card2.addEventListener('click', function(){
  alert('Tumse na ho payega🤷‍♂️🤷‍♂️🤦‍♂️🤦‍♂️ Try again!!!');
  location.reload();
});
card3.addEventListener('click', function(){
  alert('Tumse na ho payega🤷‍♂️🤷‍♂️🤦‍♂️🤦‍♂️ Try again!!!');
  location.reload();
});
card4.addEventListener('click', function(){
  alert('Tumse na ho payega🤷‍♂️🤷‍♂️🤦‍♂️🤦‍♂️ Try again!!!');
  location.reload();
});
card5.addEventListener('click', function(){
  alert('Tumse na ho payega🤷‍♂️🤷‍♂️🤦‍♂️🤦‍♂️ Try again!!!');
  location.reload();
});
card6.addEventListener('click', function(){
  if(hint1.style.display == 'block'){
    alert('Correct on the first hint. Very well. Points: 60');
    location.reload();
  }
  else if(hint2.style.display == 'block'){
    alert('Welcome to the winners section. Points: 50');
    location.reload();
  }
  else if(hint3.style.display=='block'){
    alert('Football freak. Points: 40');
    location.reload();
  }
  else if(hint4.style.display=='block'){
    alert('Took some time. But well done. Points: 20');
    location.reload();
  }
  else if(hint5.style.display=='block'){
    alert('Correct, but almost eqivalent to loser. Points: 10');
    location.reload();
  }
});

btn0.addEventListener('click', function(){
  hint0.style.display = 'none';
  hint1.style.display = 'block';
});

btn1.addEventListener('click', function(){
  hint1.style.display = 'none';
  hint2.style.display = 'block';
});

btn2.addEventListener('click', function(){
  hint2.style.display = 'none';
  hint3.style.display = 'block';
});

btn3.addEventListener('click', function(){
  hint3.style.display = 'none';
  hint4.style.display = 'block';
});

btn4.addEventListener('click', function(){
  hint4.style.display = 'none';
  hint5.style.display = 'block';
});

btn5.addEventListener('click', function(){
  alert("You couldn't answer. Shame Shame.");
  location.reload();
});
