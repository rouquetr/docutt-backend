'use strict'

module.exports = (sequelize, DataTypes) => {
    var Creneau = sequelize.define('Creneau', {
        date: DataTypes.DATE,
        heure_debut: DataTypes.STRING,
        duree: DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'creneau'
    })

    Creneau.associate = function(models) {
        models.Creneau.belongsTo(models.Ue, {
            foreignKey: "id_ue"
        })
    }

    return Creneau
}
