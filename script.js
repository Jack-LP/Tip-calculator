const bill = document.getElementById("bill-input");
const tipBtns = document.querySelectorAll(".tip-grid__button");
const tipCustom = document.getElementById("custom-tip");
const people = document.getElementById("people-input");
const results = document.querySelectorAll(".total");
const resetBtn = document.querySelector(".reset-button");

bill.addEventListener("input", setBillValue);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", setTipCustomValue);

people.addEventListener("input", setPeopleValue);

resetBtn.addEventListener("click", reset);

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

function validateFloats(s) {
  let rgx = /^[0-9]*/;
  return s.match(rgx);
}

function validateInt(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  // Removes invalid characters from bill input
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }
  if (validateFloats(bill.value)) {
    billValue = bill.value.substring(0, bill.value.length - 1);
  }

  billValue = parseFloat(bill.value);

  calculateTip();
}

function handleClick(event) {
  tipBtns.forEach((btn) => {
    // clear active state
    btn.classList.remove("btn-active");

    // set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  // clear custom tip
  tipCustom.value = "";

  calculateTip();
}

function setTipCustomValue() {
  // validate input
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
  }

  tipValue = parseFloat(tipCustom.value / 100);

  // remove active states from buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (tipCustom.value != "") {
    calculateTip();
  }
}

function setPeopleValue() {
  // validate input
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value);

  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  bill.value = "0.0";
  setBillValue();

  tipBtns[2].click();

  people.value = "1";
  setPeopleValue();
}
