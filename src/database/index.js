// import Sequelize from 'sequelize';

// import User from '../app/models/User';

// import databaseConfig from '../config/database';

// const models = [User];

// class Database {
//   constructor() {
//     this.connection = new Sequelize(databaseConfig);
//     this.init();
//   }

//   init() {
//     models.forEach(model => model.init(this.connection));
//   }
// }

// export default new Database();

// S>----------------------------------------------------------------------------------------<//

import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        // console.log(model.associate)
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();

// S>----------------------------------------------------------------------------------------<//

// import Sequelize from 'sequelize'

// import User from '../app/models/User'
// import File from '../app/models/File'
// import Meetup from '../app/models/Meetup'
// import Subscription from '../app/models/Subscription'

// import databaseConfig from '../config/database'

// const models = [ User, File,  Meetup, Subscription]

// class Database {
//   constructor(){
//     this.connection = new Sequelize(databaseConfig)
//     this.init()
//     this.associate();
//   }

//   init(){
//     models.forEach(model => model.init(this.connection))
//   }

//   associate(){
//     models.forEach(model => {
//       if(model.associate){
//         // console.log(model.associate)
//         model.associate(this.connection.models)
//       }
//     })
//   }

// }

// export default new Database()
