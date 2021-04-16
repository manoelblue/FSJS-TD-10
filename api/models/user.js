'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please add a first name."
                },
                notEmpty: {
                    msg: "Please add a first name."
                }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please add a last name."
                },
                notEmpty: {
                    msg: "Please add a last name"
                }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "The email address should be unique. This email is already being used."
            },
            validate: {
                notNull: {
                    msg: "Please add an email."
                },
                notEmpty: {
                    msg: 'Please add an email.'
                },
                isEmail: {
                    msg: "The email is not formated correctly."
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please add a password."
                },
                notEmpty: {
                    msg: 'Please add a password.'
                }
            },
            set(value) {
                const hashedPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashedPassword);
            }
        }
    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, { foreignKey: 'userId' });
    };

    return User;
};