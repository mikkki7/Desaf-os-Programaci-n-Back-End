import userModel from "./models/user.model.js";

export class UserManager {
    constructor() {
        this.model = userModel;
    }

    findById(id) {
        const response = userModel.findById(id);
        return response;
    }

    findByEmail(email) {
        const response = userModel.findByEmail(email);
        return response;
    }

    createOne(obj) {
        const response = userModel.create(obj)
        return response;
    }
}