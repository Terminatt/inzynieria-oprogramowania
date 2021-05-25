const BaseModel = require("./baseModel");

class AclModel extends BaseModel {
  constructor(req) {
    super(req)
    this.setDocumentClass("Acl")
  }
  

  async createOrUpdate(data) {
    try {

        for(const el of data) {
          let documentClass = this.getDocumentClass();
          let model = this.getModel(documentClass);
          let document = new model();
          document = this.setAllData(data, el);
          let errors = this.validateDocument(el);
          if (errors) {
            throw errors;
          }
          let result = await model.findOneAndUpdate({
            entityName: document.entityName,
            role: document.role,
          }, {
            entityName: document.entityName,
            permissions: document.permissions,
            role: document.role,
          }, {
            useFindAndModify: false,
            upsert: true,
            new: true,
          });
          if (result) {
              return result;
          } else {
              throw new AppError("Wystąpił błąd przy zapisie dokumentu", 422);
          }

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
          document.entityName = data.entityName;
        }

        if ('permissions' in data) {
          document.permissions = data.permissions;
        }

        if('role' in data) {
          document.role = data.role;
        }

        return document;
    } catch (err) {
        throw new AppError(err.message, err.status);
    }
  } 
}

module.exports = AclModel;