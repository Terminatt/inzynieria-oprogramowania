const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const roleSchema = require("../module/application/schema/role");
const userSchema = require("../module/application/schema/user");

const initRoles =  async () => {
  try {
    let adminRole = await mongoose.model('Role', roleSchema).findOne({ name: 'Super Admin' });
    let userRole = await mongoose.model('Role').findOne({name: 'User'});
    
    if(!adminRole) {
      adminRole = await mongoose.model('Role').create({
        name: 'Super Admin',
        superAdmin: true,
        deletable: false,
      });
  
      await mongoose.model('User', userSchema).create({
        active: true,
        name: 'admin', 
        sex: 'male', 
        email: 'admin@admin.com', 
        password: bcrypt.hashSync('admin', 10),
        role: adminRole._id,
      })
    }

    if (!userRole) {
      await mongoose.model('Role').create({
        name: 'User',
        superAdmin: false,
        deletable: false,
      });
    }
  } catch(e) {
    throw new Error(e);
  }


}


module.exports = {
  initRoles,
}