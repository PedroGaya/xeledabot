module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Servers', {
		server_id: {
			type: DataTypes.STRING,
            primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
        timestamps: true,
        freezeTableName: true,
        underscored: true,
	});
};