// ---------------------------------------------------------------------------------------------------------------------------
// Variables
/*
const reading = {


    range: range,

    rateCurrent: rateCurrent,
    rateRotationX: rateRotationX,
    rateRotationY: rateRotationY,
    rateRotationZ: rateRotationZ,
    rateSmoothingFactor: rateSmoothingFactor,



    translationVector: translationVector,
    motionVector: motionVector,


}


let inputs = {
    rollLeft: rollLeft,
    rollRight: rollRight,

    pitchUp: picthUp,
    pitchDown: picthDown,

    yawnLeft: yawnLeft,
    yawnRight: yawnRight,

    translateForward:     translateForward,
    translateBackward:     translateBackward,
    translateUp: translateUp,
    translateDown: translateDown,
    translateLeft: translateLeft,
    translateRight: translateRight,
    translate: translate

}
*/

function getYaw() {
    let raw = document.getElementById("yaw").children[0].innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}

function getPitch() {
    let raw = document.getElementById("pitch").children[0].innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}

function getRoll() {

    let raw = document.getElementById("roll").children[0].innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}


function getX(){

    let raw = document.getElementById("x-range").innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}


function getY(){

    let raw = document.getElementById("y-range").innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}

function getZ(){

    let raw = document.getElementById("z-range").innerText
    return parseFloat(raw.substring(0, raw.length - 1))
}

class Assistant {
    constructor(param = {}) {
        let { pc = 5, ic = 0, dc = 0, tv = 0, functionIncrease = null, functionDecrease = null, interval = 100 } = param;
        this.enabled = false;
        this.pc = pc; //Proportional coefficient
        this.ic = ic; //Integral coefficient
        this.dc = dc; //Derrivative coefficient
        this.tv = tv; //or setpoint
        this.lastError = 0;
        this.errorSum = 0;
        this.maxOutVal = 2; //max output
        this.minOutVal = -2; // min output
        this.functionIncrease = functionIncrease;
        this.functionDecrease = functionDecrease;
        this.getInput = null;
        this.interval = interval
        this.lastTime = null;

        return new Proxy(this, {

            get: function(target, prop) {
                if (!(prop in target)) throw new ReferenceError(`prop does not exist`)
                return Reflect.get(...arguments)
            },

            set: function(target, prop, value) {
                if (!(prop in target)) throw new ReferenceError(`prop does not exist`)
                return Reflect.set(...arguments)
            }
        })

    }

    compute (input) {
        let now = new Date();
        let deltaTime = (now - this.lastTime) * .001; //in seconds
        let error = this.tv - input;

        this.errorSum += (error * deltaTime)
        let dErr = (error - this.lastError) / deltaTime;

        this.lastError = error
        this.lastTime = now

        console.log(`pc: ${this.pc}, ic ${this.ic}, dc: ${this.dc}, error: ${error}, dErr: ${dErr}, deltaTime: ${deltaTime}`);
        return this.pc * error + this.ic * this.errorSum + this.dc * dErr;
    }


    run() {
        let self = this
        if (this.functionIncrease === null || this.functionDecrease === null || this.getInput === null)
            throw new Error("Assistant is not initialized")
        this.lastTime = new Date()
        this.enabled = true;

        let runOnce = function(){
            let input = self.getInput()
            console.log(`Input: ${input}`);
            let output = self.compute(input)
            console.log(`Output: ${output}`);
            for (let i=0; i<self.normalizeOutput(Math.floor(Math.abs(output))); ++i ){
                output < 0 ? self.functionIncrease() : self.functionDecrease();
            }

            if(self.enabled) setTimeout(runOnce, self.interval);
        }

        runOnce()
    }

    stop(){
        this.enabled = false;
    }


    normalizeOutput(val){
        return val > this.maxOutVal ? this.maxOutVal : val
    }

    setTunings(pc, ic, dc) {
        this.pc = pc
        this.ic = ic
        this.dc = dc
    }



    setInterval(interval) {
        this.interval = interval;
    }

    setFunctionIncrease(fn) {
        this.functionIncrease = fn
    }

    setFunctionDecrease(fn) {
        this.functionDecrease = fn
    }

    setInputGetter(fn){
        this.getInput = fn;
    }
}



function prepareRollAssistant(){
    let res = new Assistant();
    res.setInputGetter(window.getRoll);
    res.setFunctionIncrease(window.rollRight);
    res.setFunctionDecrease(window.rollLeft);
    res.dc = 100
    return res;
}


function prepareYawAssistant(){
    let res = new Assistant();
    res.setInputGetter(getYaw);
    res.setFunctionIncrease(window.yawRight);
    res.setFunctionDecrease(window.yawLeft);
    res.dc = 100
    return res;
}
function preparePitchAssistant(){
    let res = new Assistant();
    res.setInputGetter(getPitch);
    res.setFunctionIncrease(window.pitchDown);
    res.setFunctionDecrease(window.pitchUp);
    res.dc = 100
    return res;
}


function prepareXAssistant(){
    let res = new Assistant();
    res.setInputGetter(window.get);
    res.setFunctionIncrease(window.translateBackward);
    res.setFunctionDecrease(window.translateForward);
    res.dc = 100
    return res;
}
function prepareYAssistant(){
    let res = new Assistant();
    res.setInputGetter(getY);
    res.setFunctionIncrease(window.translateLeft);
    res.setFunctionDecrease(window.translateRight);
    res.dc = 100
    return res;
}
function prepareZAssistant(){
    let res = new Assistant();
    res.setInputGetter(getZ);
    res.setFunctionIncrease(window.translateDown);
    res.setFunctionDecrease(window.translateUp);
    res.dc = 100
    return res;
}

roll = prepareRollAssistant();
pitch = preparePitchAssistant();
yaw = prepareYawAssistant()

x = prepareXAssistant()
y = prepareYAssistant()
z = prepareZAssistant()
