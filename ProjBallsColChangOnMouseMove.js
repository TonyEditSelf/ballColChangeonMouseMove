const canvas = document.querySelector('canvas');

document.body.style.backgroundColor = '#100B00';
document.body.style.margin = '0';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mousePosX;
let mousePosY;

document.addEventListener('mousemove', (e) => {

    mousePosX = e.x;
    mousePosY = e.y;
});

class Circle {

    constructor(x, y, dx, dy, radius) {

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.colorArray = ['#85CB33', '#E71D36', '#FF9F1C', '#008BF8']; //creates an array of colors for the circles

        this.randomColor = Math.floor(Math.random() * 4); //randomly chooses one of the colors everytime a circle is created

        this.color = this.colorArray[this.randomColor];
        this.storedColor = this.colorArray[this.randomColor]; //remembers color of each circle, so that the original color can be reapplied after color change

        this.ballColMouse = 'white';
    }

    draw() {

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.save();

        const xDis = mousePosX - this.x;
        const yDis = mousePosY - this.y;
        const distance = Math.sqrt(xDis * xDis + yDis * yDis);
        c.globalAlpha = distance < 100 ? 1.0 : 0.7;
        // Set opacity of circles based on distance from mouse

        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.stroke();
        c.closePath();

    }

    udpate() {

        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        } //makes sure that circles do not get stuck at the left and right of the canvas

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }    //makes sure that circles do not get stuck at the top and bottom of the canvas

        const xDis = mousePosX - this.x;
        const yDis = mousePosY - this.y;
        const distance = Math.sqrt(xDis * xDis + yDis * yDis); //finds distance between all circles from the mouse


        if (distance < 100) {
            this.color = this.ballColMouse; //change the color of balls near the mouse to black 

        } else {
            this.color = this.storedColor; //change the color of balls back to the original color
        }

    }

}

let circleArray = [];

const createCircles = () => {

    for (let i = 0; i < 200; i++) {
        let radius = Math.random() * 30 + 5;
        let x = Math.random() * (canvas.width - (radius * 2)) + radius;
        let y = Math.random() * (canvas.height - (radius * 2)) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius)); //pushes all circles to the the array

    }
    animate();
}

const animate = () => {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 200; i++) {
        circleArray[i].draw();
        circleArray[i].udpate();
    }
}

createCircles();