'use strict'

/*
 * Roles:
 * Doctorant = 1
 * Admin = 2
 * Enseignant-chercheur = 3
 */

module.exports = (sequelize, DataTypes) => {
    var Utilisateur = sequelize.define('Utilisateur', {
        id: { type: DataTypes.STRING, primaryKey: true},
        nom: { type: DataTypes.STRING, allowNull: false },
        prenom: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'utilisateur'
    })

    Utilisateur.associate = function (models) {
        models.Utilisateur.belongsToMany(models.Ue, {
                through: "professeur_referent",
                foreignKey: "id_professeur_referent",
                timestamps: false
            }
        );
    };

    return Utilisateur
}
