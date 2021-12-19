const symarr = ['×','÷','+','-','%'];

var flag1 = true;

function num(getnum, btnum) {

  let number = document.getElementsByName(btnum)[0].value;

  display(number);

}

function sym(getsym, btsym) {

  let symbol = document.getElementsByName(btsym)[0].value;

  let scdom = document.getElementById('screen1');

  

  if (!isNaN(scdom.value[0])) { //check if the first char is numeric or not

    display(symbol);

  }

}

  

function checkLastOperator(symbol) {

  let x = document.getElementById('screen1');

  if (symbol == x.value[x.value.length-1]) {

    flag1 = false;

  } else {

    flag1 = true;

  }

  return x;

}

function display(show) {

  document.getElementById('screen1').value += show;

  document.getElementById('screen1')['scrollLeft'] = document.getElementById('screen1')['scrollWidth'];

}

function clean() {

  document.getElementById('screen1').value = null;

}

function replaceOperator(str) {

  let rstr = str.value;

  rstr = rstr.replace(/÷/g,'/');

  rstr = rstr.replace(/×/g,'*');

  return rstr;

}

function result() {

  let scdom = document.getElementById('screen1');

  let result = replaceOperator(scdom);

  try {

    scdom.value = eval(result);

  } catch(SyntaxError) {

    alert('Invalid format used.');

  } 

}

