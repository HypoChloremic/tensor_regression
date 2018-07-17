// import {hello} from "./modules/somefunc.js";
// import { p5 } from './libraries/p5.js'



let xValues = [];
let yValues = [];
let width   = 500;
let height  = 500;

const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);


function setup(){
	createCanvas(width, height);
// It seems that when we use tf.variable, we intend
// to give tensorflow the control of changing its value
// Thus far, it seems that tf.placeholders are values we
// provide to tensorflow instead. 
	m = tf.variable(tf.scalar(random(1)));
	b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, labels){
// what type() pred is has not been clarified yet
// in addition to labels. 
	return pred.sub(labels).square().mean();

}

function predict(){
	const xs = tf.tensor1d(x);
	const ys = xs.mul(m).add(b);
	return ys;

}

function draw(){
// => is for arrow functions. 
	tf.tidy(() => {
		if (x_vals.length > 0) {
			const ys = tf.tensor1d(y_vals);
			optimizer 
		}
	});

}