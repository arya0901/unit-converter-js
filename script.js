// Supported units
const units = {
  temp: ["C", "F", "K"],
  length: ["m", "km", "mi"],
  weight: ["g", "kg", "lb"]
};

// Fill dropdowns when category changes
const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");

function fillUnits() {
  const category = categorySelect.value;
  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";
  units[category].forEach(unit => {
    const opt1 = new Option(unit, unit);
    const opt2 = new Option(unit, unit);
    fromUnitSelect.add(opt1);
    toUnitSelect.add(opt2);
  });
}
categorySelect.addEventListener("change", fillUnits);
fillUnits(); // initialize once

function convert() {
  const category = categorySelect.value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  const value = parseFloat(document.getElementById("value").value);

  if (isNaN(value)) {
    document.getElementById("result").innerText = "Please enter a number.";
    return;
  }

  let result;

  if (category === "temp") {
    result = convertTemp(value, from, to);
  } else if (category === "length") {
    result = convertLength(value, from, to);
  } else if (category === "weight") {
    result = convertWeight(value, from, to);
  }

  document.getElementById("result").innerText = `${value} ${from} = ${result.toFixed(2)} ${to}`;
}

// Temperature conversions
function convertTemp(value, from, to) {
  let k; // convert to Kelvin first
  if (from === "C") k = value + 273.15;
  if (from === "F") k = (value - 32) * 5/9 + 273.15;
  if (from === "K") k = value;

  if (to === "C") return k - 273.15;
  if (to === "F") return (k - 273.15) * 9/5 + 32;
  if (to === "K") return k;
}

// Length conversions (base: meters)
function convertLength(value, from, to) {
  const toMeter = { m: 1, km: 1000, mi: 1609.34 };
  return value * toMeter[from] / toMeter[to];
}

// Weight conversions (base: kg)
function convertWeight(value, from, to) {
  const toKg = { g: 0.001, kg: 1, lb: 0.453592 };
  return value * toKg[from] / toKg[to];
}
