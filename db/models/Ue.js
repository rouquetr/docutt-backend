'use strict';

module.exports = (sequelize, DataTypes) => {
    var Ue = sequelize.define('Ue', {
        nom: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ue'
    })

    Ue.associate = function (models) {
        models.Ue.belongsToMany(models.Utilisateur, {
                through: "professeur_referent",
                foreignKey: "id_ue",
                timestamps: false
            }
        );
    };

    return Ue;
};
