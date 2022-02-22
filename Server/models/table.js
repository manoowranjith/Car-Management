module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("cardetails", {
      carId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      carModel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return model;
  };
