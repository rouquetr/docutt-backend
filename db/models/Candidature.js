'use strict'

module.exports = (sequelize, DataTypes) => {
    var Candidature = sequelize.define('Candidature', {
        statut: { type: DataTypes.INTEGER, allowNull: false }
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
