const User = require("./User");
const Post = require("./Post");

//create associations
//Available associations
//hasOne = adds fk to target and singular association to the source
//belongsTo = add a fk and singular association to source
//hasMany = add fk to target and plural association to the source
//belongsToMany = creates N:M association with join table and 
//plural association to source. Junction table created with sourceID and TargetID
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };
