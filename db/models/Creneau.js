'use strict'

module.exports = (sequelize, DataTypes) => {
    var Creneau = sequelize.define('Creneau', {
        date: { type: DataTypes.DATE, allowNull: false },
        heure_debut: { type: DataTypes.INTEGER, allowNull: false },
        duree: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'creneau'
    })

    Creneau.associate = function(models) {
        models.Creneau.belongsTo(models.Ue, {
            foreignKey: {
                name: "id_ue",
                allowNull: false
            }
        })
        models.Creneau.hasMany(models.Candidature, {
            foreignKey: {
                name: "id_creneau",
                allowNull: false
            }
        })
    }

    return Creneau
}
