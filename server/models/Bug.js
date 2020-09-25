import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Bugs = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
//push test
Bugs.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })


export default Bugs