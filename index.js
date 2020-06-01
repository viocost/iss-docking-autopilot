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

class Assistant {
    constructor(param = {}) {
        let { pc = 5, ic = 0, dc, tv = 0, functionIncrease = null, functionDecrease = null, interval = 100 } = param;
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
                if ((prop === "functionIncrease" || prop === "functionDecrease" || prop === "getInput") && !(value instanceof Function))
                    throw new TypeError(`Property ${prop} must be a function`)
                else if (prop === "enabled") return Reflect.set(...arguments)
                else if (typeof value !== "number") throw new TypeError(`Property ${prop} must be a number`)
                return Reflect.set(...arguments)
            }
        })

    }

    compute (input) {
        let now = new Date();
        let deltaTime = (now - this.lastTime) * .001; //in seconds
        let error = this.tv - input;

        this.errorSum += (erro * deltaTime)
        let dErr = (error - this.lastError) / deltaTime;

        this.lastError = error
        this.lastTime = now

        return this.pc * error + this.ic * this.errorSum + dc * dErr;
    }


    run() {
        if (this.functionIncrease === null || this.functionDecrease === null || this.getInput === null)
            throw new Error("Assistant is not initialized")
        this.lastTime = new Date()

        let runOnce = function(){
            let output = this.compute(this.getInput())
            for (let i=0; i<this.normalizeOutput(Math.floor(Math.abs(output))); ++i ){
                output < 0 ? this.functionIncrease() : this.functionDecrease();
            }

            if(this.enabled) setTimeout(runOnce, this.interval);
        }
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

    setInputGetter(fn){
        this.getInput = fn;
    }


}
