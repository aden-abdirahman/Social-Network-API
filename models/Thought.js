const { Schema, model, Types } = require("mongoose");
const {formattedDate} = require('../utils/formattedDate')


// mongoose reaction schema. must define reaction schema first for mongoose to be able to reference it in thoughtSchema
  const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      
      username: {
        type: String,
        required: true,
      },
      reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: formattedDate
      },
    },
    {
      toJSON: {
        getters: true,
      }
    }
  );

// mongoose thought schema
const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: formattedDate
      },
  
      username: {
        type: String,
        required: true,
      },
    //   reaction subdocs arr
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );


  
  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

  const Thought = model("Thought", ThoughtSchema);

  module.exports = Thought;