module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_Id:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: Sequelize.STRING,
            required: true,
            trim: true,
            unique:true
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
        },
        phone: {
            type: Sequelize.STRING,
            required: true
        },
        role: {
            type: Sequelize.DataTypes.ENUM(["admin", "app_user"]),
            default: "app_user"
        }

    });

    return User;
};
