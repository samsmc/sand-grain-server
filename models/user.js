const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creamos el modelo User
const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userPhoto: String,
    address: String,
    phone: String,
    createdEvents: [{type: Schema.Types.ObjectId,ref:'Events'}], 
    joinedEvents: [{type: Schema.Types.ObjectId,ref:'Events'}], 
    favorites: [],
    stars:{type: Number},
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;