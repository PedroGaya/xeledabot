module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Configs', {
		server_id: {
            type: DataTypes.STRING,
		},
		prefix: {
			type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "x/",
		},
	}, {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
	});
};