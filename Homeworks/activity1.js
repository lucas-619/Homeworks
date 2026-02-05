function checkOddEven(num) {
  if (num % 2 === 0) {
    console.log("The number is even");
  } else {
    console.log("The number is odd");
  }
}

const checkOddEvenArrow = (num) => {
  if (num % 2 === 0) {
    console.log("The number is even");
  } else {
    console.log("The number is odd");
  }
};

checkOddEven(7);        // The number is odd
checkOddEvenArrow(10); // The number is even