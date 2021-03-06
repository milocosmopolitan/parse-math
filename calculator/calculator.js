// Based on http://en.wikipedia.org/wiki/Recursive_descent_parser

function Calculator(expression) {
  this.expressionToParse = expression.replace(/\s+/g, '').split('');
}

Calculator.prototype.run = function () {
  return this.expression();
}

Calculator.prototype.peek = function () {
  return this.expressionToParse[0] || '';
};

Calculator.prototype.get = function () {
  return this.expressionToParse.shift();
}

/*
  Grammar Rule:
  number = [0-9] {[0-9.]+}
  Hint: remember this means we need to get the first number
    followed by any number of numbers (or the period .)
 */
Calculator.prototype.number = function () {
  
  var numStr = '';

  while (/[0-9.]/.test(this.peek())){
    numStr += this.get();
  }
  return Number(numStr);
}

/* Grammar Rule:
  factor = number
          | "(" expression ")"
          | - factor
  Hints:
    - If we see a number, produce a number 
    - If we see a (  then consume it and an expression
    - If we see a "-", return the negative of the factor
 */
Calculator.prototype.factor = function () {
  
  if(/[0-9]/.test(this.peek())){
    return this.number();
  } else if(this.peek() === "("){
    return this.expression();
  } else if(this.peek() === "-"){
    this.get();
    //console.log(this.number());
    return -1 * this.number();
  }
  
}

/*
  term = factor {(*|/) factor}
 */
Calculator.prototype.term = function () {

  
}

/* Grammar Rules
    expression = term {(+|-) term}
*/
Calculator.prototype.expression = function () {
  debugger;
  var result = this.term();
  
   while (this.peek() == '+' || this.peek() == '-') {
    if (this.get() == '+') {
      result += this.term();
    } else {
      result -= this.term();
    }
  }
  // TODO: Handle additional term productions if we see a + or - at this point


  return result;
}
