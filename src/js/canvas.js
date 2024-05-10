import utils, { randomIntFromRange } from "./utils";
import { noise, noiseSeed } from "@chriscourses/perlin-noise";
import * as dat from "dat.gui";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// const gui = new dat.GUI();

canvas.width = innerWidth;
canvas.height = innerHeight;
// console.log(noise);
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const offset = {
  x: 20,
};
// Objects
class Circle {
  constructor(x, y, radius, color, offSet) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offSet = offSet;
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
  }
}

let circles = [];
for (let i = 0; i < 500; i++) {
  circles.push(
    new Circle(
      -200,
      -200,
      10,
      `hsl(${289 * (i / 500)}, 50%, 50%)`,
      Math.random() * 2
    )
  );
}
let time1 = 0;
let time2 = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.02)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    circle.update();
    circle.x = noise(time1 + circle.offSet + offset.x) * canvas.width;
    circle.y = noise(time2 + circle.offSet) * canvas.height;
  });

  time1 += 0.003;
  time2 += 0.005;
}

animate();
