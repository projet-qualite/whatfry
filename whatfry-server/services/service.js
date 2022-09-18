/*
  This class is an abstract class which will be extended by all the models
*/
const fonctions = require('../utils/functions')

class Service {
    constructor(model)
    {
        this.model = model;
        this.getAll = this.getAll.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }


    async getAll()
    {
        try{
            let items = await this.model.findAll()
            return {
                error: false,
                statusCode: 200,
                data: items
            }

        }catch (errors){
            return {
                error: true,
                statusCode: 500,
                errors
            }
        }
    }

    async insert(data) {
        try {
          let item = await this.model.create(data);
          if (item)
            return {
              error: false,
              statusCode: 201,
              item
            };
        } catch (error) {
          let errorsArr = []
          for(let err of error.errors){
            errorsArr.push(fonctions.codeError(err.validatorKey, err.path))
          }
          
          return {
            error: true,
            statusCode: 400,
            message: error.errmsg || "Not able to create item",
            errors: errorsArr
          };
        }
      }


    async update(id, data) {
        try {
          let item = await this.model.findByPk(id);
          if(!item)
          {
              return {
                  error: true,
                  statusCode: 404,
                  message: "Item not found"
              }
          }
          item.set(data)
          await item.save()
          return {
            error: false,
            statusCode: 202,
            item
          };
        } catch (error) {
          console.log(error)
          return {
            error: true,
            statusCode: 500,
            error
          };
        }
    }

    async delete(id) {
        try {
          let item = await this.model.findByPk(id);
          if (!item)
            return {
              error: true,
              statusCode: 404,
              message: "item not found"
            };
        
          await item.destroy()
    
          return {
            error: false,
            deleted: true,
            statusCode: 202,
            item
          };
        } catch (error) {
          return {
            error: true,
            statusCode: 500,
            error
          };
        }
    }
}

module.exports = Service
