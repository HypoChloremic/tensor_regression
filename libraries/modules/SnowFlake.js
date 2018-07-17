// Supposedly this is necessary for us to use 
// the different p5 defined methods.
new p5();

class SnowFlake{
	constructor(width, height){
		this.width  = width;
		this.height = height;
		// this.r = random(5, 20); 
		// this.pos = createVector(random(0, this.width), random(-10, -100)); 
		// this.vel = createVector(0, 0.07*this.r);
		this.flake();
	}

	flake(){
		this.r = random(2, 20); 
		this.pos = createVector(random(0, this.width), random(-10, -100)); 
		this.vel = createVector(0, 0.07*this.r);
	}

	applyforce(){
		this.pos.add(this.vel);
		if (this.pos.y > height+this.r) {
			this.flake();
		}
	}

	 render(){
		stroke(255);
		ellipse(this.pos.x, this.pos.y, this.r);
	}

	reset(){
	}


	wind(){
	}

}

// Render the shit
function Render(arrayOfFlakes){
	for (let i of flakes){
		i.applyforce();
		i.render();
	}
}

// This was an attempt, but it seems that 
// it creates far too much overhead..

class FlakeCreator{
	constructor(amount, width, height){
		this.flakes = [];
		for (let i = 0; i<amount-1; i++){
			this.flakes.push(new SnowFlake(width, height));
		}
	}

	render(){
		for (let i of this.flakes ){
			i.applyforce();
			i.render();
		}
	}
}














