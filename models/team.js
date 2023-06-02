const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name:{type: String, required:true},
  cname:{type: String},
  // players: [{type: Schema.Types.ObjectId, ref: 'Player'}]
})


TeamSchema.virtual('url').get(function() {
  return '/nba/team/' + this._id;
});
module.exports = mongoose.model('Team', TeamSchema);