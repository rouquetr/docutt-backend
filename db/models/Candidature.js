'use strict'

module.exports = (sequelize, DataTypes) => {
    var Candidature = sequelize.define('Candidature', {
        statut: DataTypes.INTEGER
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'candidature'
    })

    Candidature.associate = function(models) {
        models.Candidature.belongsTo(models.Utilisateur, {
            foreignKey: "id_doctorant"
            }
        )
        models.Candidature.belongsTo(models.Creneau, {
            foreignKey: "id_creneau"
        })
    }

    return Candidature
}
