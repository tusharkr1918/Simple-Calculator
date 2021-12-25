var flag = false;

function num(getnum, btnum) {
  let number = document.getElementsByName(btnum)[0].value;
  display(number);
  flag = false;
}

function sym(getsym, btsym) {
  let symbol = document.getElementsByName(btsym)[0].value;
  let scdom = document.getElementById('screen1');
  
  if (!isNaN(scdom.value[0]) || getsym == "()") { //check if the first char is numeric or not
    display (symbol);
  }
}

/*function checkLastOperator(symbol) {
  var scdom = document.getElementById('screen1');
  var lastChar = scdom.value[scdom.value.length-1];
  if(!isNaN(lastChar) || lastChar==null || !isNaN(num)) {
  scdom.value=scdom.valuem + num;
  } else if(num!=lastChar) {
  document.form.textview.value=myString.replace(lastChar,num);
  }
}*
  /
  // case 1
  // 8
  // case 2 
  // 8+ , 873+
  // case 3 (btn symbol +, then don't replace)
  // 8+ 
  // case 4 (btn symbol -, then replace)
  // 8+ -> 8-
  
/*function replaceLastOperator(x,y,z){
    const rev = [];
    let rlen = x.length;
    for (let i=0; i<rlen; ++i)
        rev[i] = x[i];
    x = rev.reverse().join("").replace(y,z);
    for (let i=0; i<rlen; ++i)
        rev[i] = x[i];
    return rev.reverse().join("");   
  }
*/



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
  try {
    let result = "";
    result = replaceOperator(scdom);
    result = percentage(result);
    console.log(result);
    result = eval(result);
    result = roundup(result,6);
    scdom.value = result;
  } catch(SyntaxError) {
    alert('Invalid format used.');
  } 
}

function roundup(x,rd){
	  let iOfdot = String(x).indexOf('.');
	  let digAfterDot = String(x).length-iOfdot;
	  if (iOfdot > -1) {
	    if (digAfterDot > rd) {
	      return x.toFixed(rd);
	    }else {
	      return x;
	    }
	  }else {
	    return x;
	 }
}

function percentage(str){
    let modInx = str.indexOf('%');
    let count = 0;
    const numLftOfMod = [];
    const numRhtOfMod = [];
    let lnum,rnum;
    let newStr;
    
    if (modInx > -1){
        for(let i=modInx-1; i>=0; --i){
            if(!isNaN(str[i]) || str[i] == "."){
                numLftOfMod[count] = str[i];
                ++count;
            }else break;            
        }
        count = 0;
        for(let i=modInx+1; i<=str.length; ++i){
            if(!isNaN(str[i]) || str[i] == "."){
                numRhtOfMod[count] = str[i];
                ++count;
            }else break;            
        }        
        lnum = numLftOfMod.reverse().join("");
        rnum = numRhtOfMod.join("");
        newStr = lnum+"%"+rnum;
         
    }else return str;
    str = str.replace(newStr,"("+lnum+"/100"+")"+"*"+rnum);
    console.log(str);
    
    if(str.indexOf("%") == -1)
      return str;
    else return percentage(str);
}
//console.log(eval(percentage(str)).toFixed(4));

// To do
// Fixing multiple modules issues (done)
// decimal case (done)
// bracket case (done)
// recursive overrun fixed (done)
