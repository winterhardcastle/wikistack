const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {logging: false});

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'title'
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'slug'
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'content'
  },

  status: Sequelize.ENUM("open", "closed"),
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isEmail: true}
  }
});

module.exports = { db, User, Page };
