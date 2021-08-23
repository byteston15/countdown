module.exports = (sequelize, DataTypes) => {
    const ClockModel = sequelize.define("ClockModel", {
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return ClockModel;
}
