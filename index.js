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

class Assistant{
   constructor(param={}){
       let { pc=5, ic=0, dc, tv=0, functionIncrease=null, functionDecrease=null, interval=100 } = param;
       this.enabled = false;
       this.pc = pc;
       this.ic = ic;
       this.dc = dc;
       this.tv = tv;
       this.functionIncrease = functionIncrease;
       this.functionDecrease = functionDecrease;
       this.interval = interval



       return new Proxy(this, {



           get: function (target, prop){
               if (!(prop in target)) throw new ReferenceError(`prop does not exist`)
               return Reflect.get(...arguments)
           },

           set: function (target, prop, value){
               if (!(prop in target)) throw new ReferenceError(`prop does not exist`)
               if((prop === this.functionIncrease || prop === this.functionDecrease) && !(value instanceof Function) )
                   throw new TypeError(`Property ${prop} must be a function`)
               return Reflect.set(...arguments)
           }
       })

   }



   setExecInterval(interval){
       this.interval = interval;
   }

   setFunctionIncrease(fn){
       this.functionIncrease = fn
   }







}
