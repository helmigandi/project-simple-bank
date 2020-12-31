'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create data
    const customerData = [
      {
        identityNumber: 31122001881,
        fullName: "Abdul Rojak",
        address: "Jl. Mawar Merah No 13, Jakarta Timur",
        birthDate: "1990-01-20",
        gender: 'male'
      },
      {
        identityNumber: 31122002881,
        fullName: "Ajeng Mayangsari",
        address: "Jl. Bunga Rampai No 103, Bandung",
        birthDate: "1993-12-10",
        gender: 'female'
      },
      {
        identityNumber: 31122003881,
        fullName: "Hendriansyah",
        address: "Jalan Taman Sari No. 23, Bogor",
        birthDate: "1995-10-19",
        gender: 'male'
      },
      {
        identityNumber: 31122004889,
        fullName: "Ratna Sari",
        address: "Jalan Bojong Gede No. 03, Bekasi Utara",
        birthDate: "1992-02-22",
        gender: 'female'
      },
      {
        identityNumber: 31122005890,
        fullName: "Tasya Adina",
        address: "Jl. Delta Mas 2 No. 32, Banten",
        birthDate: "1989-05-09",
        gender: 'female'
      },
    ]
    // Add 'createdAt' and 'updatedAt' with date now to every data
    customerData.forEach(customer => {
      customer.createdAt = new Date();
      customer.updatedAt = new Date();
    });
    // Insert all data
    return queryInterface.bulkInsert('Customers', customerData, {});
  },

  down: (queryInterface, Sequelize) => {
    // Delete all data
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
