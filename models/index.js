const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});
const generateSlug = (title) => {
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
};

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "title",
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "content",
  },

  status: Sequelize.ENUM("open", "closed"),
});
Page.beforeValidate(async (page, options) => {
  const generatedSlug = await generateSlug(page.title);
  page.slug = generatedSlug;
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

module.exports = { db, User, Page };
