"use strict";

const now = new Date();

const data = [
  {
    name: "jesus",
    email: "chichohdzjesus@gmail.com",
    password: "12345678",
    rol: "negocio",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
