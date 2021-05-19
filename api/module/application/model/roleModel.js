const BaseModel = require("./baseModel");

class RoleModel extends BaseModel {
  constructor(req) {
    super(req)
    this.setDocumentClass("Role")
  }

  async setAllData(data, document) {
    try {
        this.setAllowedData(data, document);

        if ('name' in data) {
            document.name = await this.setTitle(document, data.name);
        }
        document.superAdmin = true;
        document.deletable = true;

        return document;
    } catch (err) {
        throw new AppError(err.message, err.status);
    }
  } 

  async setTitle(document, name) {
    try {
        let roleDocument = await this.getModel(this.getDocumentClass()).findOne({ name }).lean();
        if (roleDocument) {
            this.addValidationError("Rola o tej nazwie już istnieje", "name");
        }
        document.name = name;
        return document;
    } catch (err) {
        throw new AppError(err.message, err.status);
    }
  }
}

module.exports = RoleModel;