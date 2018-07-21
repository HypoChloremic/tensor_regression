new p5
// what we would like to understand is that 
// we will have to different arrays of y-values
// one array that contains the y-values produced
// by our mouse-presses, and a different set of 
// y-values that takes the respective x-values
// associated with the original set and produces
// a set of y-values from the linear equation. 

let xs = [];
let ys = [];

// we wanna map the values. 
// we also wanna create an m,b

let m, b;

const learningrate = 0.2;
const optimizer = tf.train.sgd(learningrate);

function setup() {
	createCanvas(400,400)
	background(0)
// like initializing the weights of a neural network!
// note that m and b change over time, they are variables
// we are being very specific with the types here, because 
// it is a lower level landscape. 
	m = tf.variable(tf.scalar(random(1)));
	b = tf.variable(tf.scalar(random(1)));
}

function predict(xs) {
	// this takes in all of the x's and gives
	// the y-predictions to compare to the y-values
	// we wanna predict a bunch of values
	// if the xs is a plane array it needs to become a tensor

	const tfxs = tf.tensor1d(xs);
	// the formula for a line
	const tfys   = tfxs.mul(m).add(b)

	return tfys
}

function loss(pred, labels) {
	// pred are the y values we get
	// labels are the actual y-values we get from
	// the mouse presses. 

	// this makes sense, because we want to return
	// the predicted value, the y-value associated 
	// with the linear function, and the y-value 
	// that the mousepresses produced. 
	
	// all these mathematical operations are in tf
	// and they can be chained. 
	return pred.sub(labels).square().mean()
}

function mousePressed(){
	console.log("Hello world")
// Note that we are reversing it in this manner
// in order to be able to correct the way we think about
// the coordinate system. 
	let x = map(mouseX, 0, width, 0, 1);
	let y = map(mouseY, 0, height, 1, 0);
	xs.push(x);
	ys.push(y);
	console.log(xs)
}


// to train it is to minimize the loss values
// from the loss function. 



function draw(){
	// so we note that the loss function needs a tensor
	// as well, that is why we convert the ys to 
	// tfys, by creating a tensorflow array that we then
	// pass. 
	const tfys = tf.tensor1d(ys);
	// here we use an anonymous function to run 
	// loss(predict..).
	// predict(xs) will produce a tensor of y values predictions
	// for the given x values. The loss function will then 
	// in turn produce a new tensor array (I assume) where
	// we have done mean squared. 
	if (xs.length > 0) {
		optimizer.minimize(() => loss(predict(xs), tfys))
	}

	// the optimizer works in a specific way. The fact that 
	// we created the tf.variables, means that they are 
	// variables and can be adjusted. In essence it will
	// take the values produced by the passed function, and if
	// no trainable variables are passed, it defaults to all
	// trainable variables.. 

	background(0);
	stroke(255)
	strokeWeight(4);
	for (let i = 0; i < xs.length; i++)
	{
		let px = map(xs[i], 0, 1, 0, width);
		let py = map(ys[i], 0, 1, height, 0);
		ellipse(px,py, 2);
	}	



	let x1 = 0;
	let x2 = 1;

	let y1 = b.get();
	let y2 = m.get() * x2 + b.get();

	x2 = map(x2, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	y2 = map(y2, 0, 1, height, 0);
	
	stroke(255)
	strokeWeight(3)
	line(x1, y1, x2, y2);
}

