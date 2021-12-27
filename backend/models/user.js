const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      name: { type: String, require: true },
      email: { type: String, require: true },
},{
      timestamps: {
            createAt: 'created_at', updateAt: 'updated_at'
      }
}
)

userSchema.statics.isExists = async function isExists(email) {
      console.log("is Exists method");
      console.log(email);
      const user = await this.findOne({ email: email })
      return user ? true : false;
}


const User = mongoose.model('user', userSchema)

module.exports = {User};