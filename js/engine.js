/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at 2019/8/6
										Gear









*/
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
function range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function distance(x1, y1, x2, y2) {
	xDiff = x2 - x1;
	yDiff = y2 - y1;
	return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}
function color() {
	var r = Math.floor(Math.random() * 1000) % 240 + 15;
	var g = Math.floor(Math.random() * 1000) % 240 + 15;
	var b = Math.floor(Math.random() * 1000) % 230 + 25;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}
var rr = 50;
var g = 0;
var b = 0;
function CircleMaster(x, y, r, gl, speed) {
	//All things rotates in circle
	rr += 20;
	g += Math.random() * 40;
	b += Math.random() * 100;
	this.r = r;
	this.x = x
	this.y = y;
	this.rad = 0;
	this.gears = Math.floor(this.r * 0.4);
	this.sides = 2 * this.gears;
	this.angle = Math.PI * 2 / this.sides;
	this.speed = speed;
	this.gearlen = gl;
	this.col = 'rgb(' + (rr) + ', ' + g + ',' + b + ')';
	this.bend = Math.PI / this.gears;//By number gears degree
	this.freq = 0;
	this.lamda = 0.1;
	this.amp = 1.5;
	this.cx = x;
	this.xy = y;
	this.update = () => {

		this.freq += 1.2;
		this.rad += this.speed;
		this.draw();
	};
	this.draw = () => {

		//base circle
		//All shapes should besides in this circle area
		c.beginPath();
		c.strokeStyle = this.col;
		this.y += Math.sin(this.lamda + this.freq) * this.amp;
		//this.x += Math.cos(this.rad);
		for (var i = 0.0; i < Math.PI * 2; i += 0.01) {
			c.lineTo(this.x + Math.cos(i) * this.r, this.y + Math.sin(i) * this.r);
		}
		c.stroke();
		c.closePath();


		//Drawing outside gear 
		for (var i = 0; i < this.sides; i += 1) {
			c.beginPath();
			c.moveTo(this.x + Math.cos(i * this.angle + this.rad) * this.r, this.y + Math.sin(i * this.angle + this.rad) * this.r);
			c.lineTo(this.x + Math.cos(i * this.angle + this.rad) * this.r + Math.cos(i * this.angle + this.bend + this.rad) * this.gearlen, this.y + Math.sin(i * this.angle + this.rad) * this.r + Math.sin(i * this.angle + this.bend + this.rad) * this.gearlen);
			c.stroke();
			c.closePath();
			if ((i) % 2 == 0 && i + 1 < this.sides) {
				c.beginPath();
				c.moveTo(this.x + Math.cos(i * this.angle + this.rad) * this.r + Math.cos(i * this.angle + this.bend + this.rad) * this.gearlen, this.y + Math.sin(i * this.angle + this.rad) * this.r + Math.sin(i * this.angle + this.bend + this.rad) * this.gearlen);
				c.lineTo(this.x + Math.cos((i + 1) * this.angle + this.rad) * this.r + Math.cos((i + 1) * this.angle - this.bend + this.rad) * this.gearlen, this.y + Math.sin((i + 1) * this.angle + this.rad) * this.r + Math.sin((i + 1) * this.angle - this.bend + this.rad) * this.gearlen);
				c.stroke();
				c.closePath();
				//for(var t = i*this.angle; t <= (i+1)*this.angle; t += 0.001){

				// c.beginPath();
				// c.moveTo(this.x+Math.cos(t+this.rad)*this.r, this.y+Math.sin(t+this.rad)*this.r);
				// c.lineTo(this.x+Math.cos(i*this.angle+this.rad)*this.r+Math.cos(i*this.angle+this.bend+j+this.rad)*this.gearlen, this.y+Math.sin(i*this.angle+this.rad)*this.r+Math.sin(i*this.angle+this.bend+j+this.rad)*this.gearlen);
				// c.lineTo(this.x+Math.cos((i+1)*this.angle+this.rad)*this.r+Math.cos((i+1)*this.angle-this.bend-j+this.rad)*this.gearlen, this.y+Math.sin((i+1)*this.angle+this.rad)*this.r+Math.sin((i+1)*this.angle-this.bend-j+this.rad)*this.gearlen);
				// c.stroke();
				// c.closePath();
				// j += 0.001;
				// //this.bend = -this.bend;
				//}

			}
			this.bend = -this.bend;
		}

	};
}
var shape;
function init() {
	shape = [];
	var r = 40;
	var x = innerWidth / 2;
	var y = innerHeight / 2;
	var speed = 0.01;
	var ang = Math.PI / 4;
	var by = 1;
	var gearlen = 10;
	for (var i = 0; i < 10; i++) {
		if (i != 0) {
			speed = -speed;
			ang = shape[i - 1].angle / (Math.floor(r * 0.2) * 2) + range(2, r / 2) * shape[0].angle;
			x = shape[i - 1].x + Math.cos(ang) * (r) + Math.cos(ang) * (shape[i - 1].r + gearlen);
			y = shape[i - 1].y + Math.sin(ang) * (r) + Math.sin(ang) * (shape[i - 1].r + gearlen);

			for (var j = 0; j < i - 1; j++) {
				if (distance(x, y, shape[j].x, shape[j].y) - 2 * r - 2 * gearlen < 0 || (y + r + gearlen > innerHeight || y - r - gearlen < 0 || x + r + gearlen > innerWidth || x - r - gearlen < 0)) {
					ang = shape[i - 1].angle / (Math.floor(r * 0.2) * 2) + range(2, 20) * shape[0].angle;
					x = shape[i - 1].x + Math.cos(ang) * (r) + Math.cos(ang) * (shape[i - 1].r + gearlen);
					y = shape[i - 1].y + Math.sin(ang) * (r) + Math.sin(ang) * (shape[i - 1].r + gearlen);
					j = -1;
				}
			}

		}

		shape.push(new CircleMaster(x, y, r, gearlen, speed));
	}

}
init();
shape.forEach(e => {
	e.update();
});
function animate() {
	requestAnimationFrame(animate);
	//c.fillStyle='rgba(0,0,0,0.1)';
	c.clearRect(0, 0, innerWidth, innerHeight);
	//c.fillRect(0,0,innerWidth, innerHeight);
	shape.forEach(e => {
		e.update();
	});
}
animate();	