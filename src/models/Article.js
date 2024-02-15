module.exports = (sequelize, DataTypes) => {
    // Définition du modèle Article
    const Article = sequelize.define('Article', {
        title: {
            type: DataTypes.STRING,
            required: true,
            unique: true
            
        },
        description: DataTypes.STRING,
        date: DataTypes.DATE,
    }, {
        timestamps: false
    });
    return Article;
};