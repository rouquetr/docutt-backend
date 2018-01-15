'use strict'

module.exports = (sequelize, DataTypes) => {
    var Candidature = sequelize.define('Candidature', {
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'candidature'
    })

    Candidature.associate = function(models) {
        models.Candidature.belongsTo(models.Utilisateur, {
            foreignKey: {
                name: "id_doctorant",
                allowNull: false
            }
        })
        models.Candidature.belongsTo(models.Creneau, {
            foreignKey: {
                name: "id_creneau",
                allowNull: false
            }
        })
    }

    return Candidature
}
