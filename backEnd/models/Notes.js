const mongoose = require('mongoose');const mongoose = require('mongoose');
const { Schema } = mongoose;

  const notesSchema = new Schema(
      {
          title:{
              type:String,
              required:true,
          },
          discription:{
            type:String,
            required:true,
           
        },
        teg:{
            type:String,
            default:"General"
        },
        date:{
            type:Date,
            default:Date.now
        }
      }
  );

  module.exports=mongoose.model('notes',notesSchema);