import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugService {
  async getAll(userEmail) {
    return await dbContext.Bugs.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this thing")
    }
    return data
  }
  async closeBug(id, userEmail) {
    let bugData = await dbContext.Bugs.findOne({ _id: id, creatorEmail: userEmail })
    // @ts-ignore
    bugData.closed = true;

    await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, bugData, { new: true })

    return bugData;
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await bugService.getNotesByBugId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this thing");
    }
    return data;
  }


}


export const bugService = new BugService()