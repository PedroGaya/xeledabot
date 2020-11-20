module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Users', {
		user_id: {
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