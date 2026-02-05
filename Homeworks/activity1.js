function checkOddEven(x) {
  if (x % 2 === 0) {
    console.log("The number is even");
  } else {
    console.log("The number is odd");
  }
}

const checkOddEvenArrow = (x) => {
  if (x % 2 === 0) {
    console.log("The number is even");
  } else {
    console.log("The number is odd");
  }
};

checkOddEven(7);    
checkOddEven(8);    
checkOddEvenArrow(10); 
checkOddEvenArrow(11);