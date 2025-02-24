import  Sequelize  from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('btl_web_k2n3', 'root', null, { //dtbase, user, passs
  host: 'localhost',
  dialect: 'mysql' 
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 

export default connection