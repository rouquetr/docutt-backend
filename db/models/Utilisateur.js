'use strict'

module.exports = (sequelize, DataTypes) => {
    var Utilisateur = sequelize.define('Utilisateur', {
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.INTEGER
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
