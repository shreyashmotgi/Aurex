const {model}=require('mongoose');

const {PositionsSchema}=require('../schemas/PositionSchema');

const Positionsmodel=new model("positions",PositionsSchema);

module.exports={Positionsmodel};