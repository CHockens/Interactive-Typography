/*******************************************************************
 *                        Interactive Typography
 * Program Summary: 
 * When the user clicks the mouse, my first initial letter is morphed into the
 * next letter of my initials, then third. 
 * Finally, all initals are displayed on the screen, and with one more click,
 * the canvas will slowly change a different color. 
 * NOTE: Reload page in order for transformation/morphing to occur after 4 clicks
 *                             Cindy Hockens
 *                           (₌♥ᆽ♥₌)
 * *****************************************************************/

let fog;
let fontSize = 200;

let letterC = [];
let letterE = [];
let letterH = [];
let x, y;

let letterVal = 0; // Start with letterVal as 0

let bgColor; // Variable to store background color
let targetColor; // Variable to store target color for interpolation
let colorChangeDuration = 2000; // Duration of color change in milliseconds
let colorChangeStart; // Variable to store the start time of color change

function preload() {
  fog = loadFont('fog.otf');
}

function setup() {
  createCanvas(600, 600);
  textFont(fog);
  textSize(fontSize);

  x = width / 3;
  y = height / 2;

  letterC = fog.textToPoints("C", x, y, fontSize, {
    sampleFactor: 0.134
  });

  letterE = fog.textToPoints("E", x, y, fontSize, {
    sampleFactor: 0.1
  });

  letterH = fog.textToPoints("H", x, y, fontSize, {
    sampleFactor: 0.101
  });

  // Initialize background color
  bgColor = color(240, 200, 255);
}

function draw() {
  background(bgColor);

  if (letterVal === 0) {
    text("C", x, y);
  }

  if (letterVal === 1) {
    beginShape();
    fill("black");
    for (let i = 0; i < letterC.length; i++) {
      vertex(letterC[i].x, letterC[i].y);

      // Update positions only if letterVal is 1 (C to E)
      if (letterC[i].x <= letterE[i].x) {
        letterC[i].x++;
      }
      if (letterC[i].x >= letterE[i].x) {
        letterC[i].x--;
      }
      if (letterC[i].y <= letterE[i].y) {
        letterC[i].y++;
      }
      if (letterC[i].y >= letterE[i].y) {
        letterC[i].y--;
      }
    }
    endShape();
  }

  if (letterVal === 2) {
    beginShape();
    fill("black");
    for (let i = 0; i < letterE.length; i++) {
      vertex(letterE[i].x, letterE[i].y);

      // Update positions only if letterVal is 2 (E to H)
      if (letterE[i].x <= letterH[i].x) {
        letterE[i].x++;
      }
      if (letterE[i].x >= letterH[i].x) {
        letterE[i].x--;
      }
      if (letterE[i].y <= letterH[i].y) {
        letterE[i].y++;
      }
      if (letterE[i].y >= letterH[i].y) {
        letterE[i].y--;
      }
    }
    endShape();
  }

  if (letterVal === 3) {
    push();
    fill("black");
    text("C.E.H", x - 150, y);
    textSize(15);
    text("Cindy Emilia Hockens", x, y + 50);
    pop();
  }

  if (letterVal === 4) {
    // Check if color change has started
    if (!colorChangeStart) {
      colorChangeStart = millis(); // Record start time
      targetColor = color(random(255), random(255), random(255)); // Set target color
    }

    // Calculate interpolation amount based on elapsed time
    let elapsedTime = millis() - colorChangeStart;
    let amount = map(elapsedTime, 0, colorChangeDuration, 0, 1);
    bgColor = lerpColor(bgColor, targetColor, amount);

    // Display text
    push();
    fill("black");
    text("C.E.H", x - 150, y);
    textSize(15);
    text("Cindy Emilia Hockens", x, y + 50);
    pop();
  }

  // Display letterVal
  push();
  textSize(15);
  text("LETTER VAL: " + letterVal, 20, 590);
  pop();
}

// Toggle letterVal when mouse is pressed
function mousePressed() {
  letterVal = (letterVal + 1) % 5; // Toggle between 0, 1, 2, 3, and 4
  colorChangeStart = null; // Reset color change start time on toggle
}
