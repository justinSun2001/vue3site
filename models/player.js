const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const GameSchema = new Schema(
  {
    // game_number:{type: Number},
    // team_number:{type: Number},
    position: {type:String},
    game_time_min: {type: String},
    shot_percent: {type:String},
    three_percent: {type:String},
    freethrow_percent: {type:String},
    zhengfuzhi: {type:String},
    point: {type: Number},
    rebound: {type: Number},
    assist: {type: Number},
    steal: {type: Number},
    block: {type: Number},
    turnover: {type: Number},
    foul: {type: Number},
    three_made: {type: Number},
    three_got: {type: Number},
    shot_made: {type: Number},
    shot_got: {type: Number},
    freethrow_made: {type: Number},
    freethrow_got: {type: Number},
    game_time:{type:String}
  }
);

// GameSchema.virtual('duration').get(function(){
//   let a=this.game_time_min.substr(2);
//   let b=this.game_time_min.substring(2,4);
//   return a+'分'+b+'秒'
// })

const PlayerSchema = new Schema({
  first_name: {type: String, required: true, max: 100},
  family_name: {type: String, required: true, max: 100},
  cname:{type:String},
  date_of_birth: {type: Date},
  height:{type:Number},
  weight:{type:Number},
  age:{type:Number},
  number:{type:Number},
  pick:{type:String},
  intro:{type:String},
  honor:{type:String},
  // team: {type: Schema.Types.ObjectId, ref: 'Team'},
  game: [GameSchema],
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  // avg_score: {type: Number},
  // avg_block: {type: Number},
  // avg_assist: {type: Number},
  // avg_steal: {type: Number},
  // avg_rebound: {type: Number},
});






PlayerSchema.virtual('name').get(function () {
  return this.first_name + ' ' + this.family_name;
  });

PlayerSchema.virtual('url').get(function() {
  return '/nba/player/' + this._id;
});

module.exports = mongoose.model('Player', PlayerSchema);