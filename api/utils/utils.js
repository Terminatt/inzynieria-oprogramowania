const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const roleSchema = require("../module/application/schema/role");
const userSchema = require("../module/application/schema/user");

const createSuperAdmin =  async () => {
  try {
    const role = await mongoose.model('Role', roleSchema).findOne({ name: 'Super Admin' });
    
    if(!role) {
      const role = await mongoose.model('Role').create({
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
        role: role._id,
      })
    }
  } catch(e) {
    throw new Error(e);
  }


}


module.exports = {
  createSuperAdmin,
}