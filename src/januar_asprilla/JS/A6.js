console.log("////////Flattening////////");

let arrays = [[[1, 2, 3], [4, 5], [6]]];
let flattenedMatrix = arrays.reduce(
  (accumulator, currentArray) => accumulator.concat(...currentArray),
  []
);

console.log(flattenedMatrix);

console.log("////////Your own loop////////");
function loop(value, test, update, body) {
  for (let current = value; test(current); current = update(current)) {
    body(current);
  }
}
loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);

console.log("////////Everything////////");
function everyConLoop(array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

console.log(everyConLoop([1, 3, 5], (n) => n < 10));
// → true

console.log(everyConLoop([2, 4, 16], (n) => n < 10));
// → false

console.log(everyConLoop([], (n) => n < 10));
// → true

console.log("/////////////");
function everyConSome(array, test) {
  // La negación de some devuelve true si ninguna coincidencia es encontrada
  return !array.some((element) => !test(element));
}

console.log(everyConSome([1, 3, 5], (n) => n < 10));
// → true

console.log(everyConSome([2, 4, 16], (n) => n < 10));
// → false

console.log(everyConSome([], (n) => n < 10));
// → true

console.log("////////Dominant writing direction////////");

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}
let SCRIPTS = [
  {
    //secuencia de comandos de el Árabe
    name: "Arabic",
    ranges: [
      [1536, 1792],
      [1872, 1920],
      [2208, 2304],
      [64336, 65022],
      [65136, 65277],
      [126464, 126500],
      [126503, 126524],
      [126530, 126531],
      [126535, 126571],
      [126572, 126602],
    ],
    direction: "rtl",
    year: 400,
    living: true,
    link: "https://en.wikipedia.org/wiki/Arabic_script",
  },
  {
    //secuencia de comandos de el Latin // español, portugués, gallego, catalán, proven- zal, francés, italiano, rético, sardo, dálmata y rumano
    name: "Latin",
    ranges: [
      [65, 91],
      [97, 123],
      [170, 171],
      [186, 187],
      [192, 215],
      [216, 247],
      [248, 697],
      [736, 741],
      [7424, 7615],
      [7680, 7936],
      [8305, 8306],
      [8319, 8320],
      [8336, 8349],
      [8490, 8492],
      [8498, 8499],
      [8526, 8527],
      [8544, 8585],
      [11360, 11392],
      [42786, 42927],
      [42928, 42936],
      [42999, 43008],
      [43824, 43877],
      [64256, 64263],
      [65313, 65339],
      [65345, 65371],
    ],
    direction: "ltr",
    year: -700,
    living: true,
    link: "https://en.wikipedia.org/wiki/Latin_script",
  },
  {
    //secuencia de comandos de el Mongolia
    name: "Mongolian",
    ranges: [
      [6144, 6469],
      [6480, 6497],
      [12832, 12841],
      [12872, 12879],
      [12881, 12895],
      [12928, 12937],
      [12977, 12991],
      [43072, 43123],
      [43136, 43204],
      [69024, 69631],
    ],
    direction: "ttb",
    year: 1204,
    living: true,
    link: "https://en.wikipedia.org/wiki/Mongolian_script",
  },
];
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name === name);
    if (known === -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({ name }) => name != "none");

  if (scripts.length == 0) return "ltr", "ttb", "rtl";
  return scripts.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
console.log(dominantDirection("ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ"));
// → ttb
