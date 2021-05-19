const BaseModel = require("./baseModel");

class AclModel extends BaseModel {
  constructor(req) {
    super(req)
    this.setDocumentClass("Acl")
  }
  

  async createOrUpdate(data) {
    try {
        let documentClass = this.getDocumentClass();
        let model = this.getModel(documentClass);
        let document = new model();

        document = this.setAllData(data, document);
        let errors = this.validateDocument(document);
        if (errors) {
            throw errors;
        }
        let result = await model.findOneAndUpdate({
          entityName: document.entityName,
          role: document.role,
        }, document, {
          upsert: true,
        });
        if (result instanceof Array) {
            return result[0];
        } else {
            throw new AppError("Wystąpił błąd przy zapisie dokumentu", 422);
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new AppError(this.parseValidationErrors(err), 422);
        } else {
            throw new AppError(err.message, err.status);
        }
    }
}

  setAllData(data, document) {
    try {
        this.setAllowedData(data, document);

        if ('entityName' in data) {
          document.entityName = document.entityName;
        }

        if ('permissions' in data) {
          document.permissions = document.permissions;
        }

        if('role' in data) {
          document.role = document.role;
        }

        return document;
    } catch (err) {
        throw new AppError(err.message, err.status);
    }
  } 
}

module.exports = AclModel;