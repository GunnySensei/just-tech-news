const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");

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

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Vote.belongsTo(Post, {
foreignKey: 'post_id'
});

User.hasMany(Vote, {
foreignKey: 'user_id'
});

Post.hasMany(Vote, {
foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };
