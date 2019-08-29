// import Sequelize, { Model } from 'sequelize';

// class File extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         name: Sequelize.STRING,
//         path: Sequelize.STRING,
//         url: {
//           type: Sequelize.VIRTUAL,
//           get() {
//             return `htpp://192.168.1.95:3333/files/${this.path}`;
//           }
//         }
//       },
//       {
//         sequelize
//       }
//     );

//     return this;
//   }

//   static associate(models) {
//     this.hasMany(models.Meetup);
//   }
// }

// export default File;

// S>----------------------------------------------------------------------------------------<//

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Meetup);
  }
}

export default File;
