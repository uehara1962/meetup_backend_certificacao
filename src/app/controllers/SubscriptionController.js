// import { Op } from 'sequelize';

// import User from '../models/User';
// import Meetup from '../models/Meetup';
// import Subscription from '../models/Subscription';

// import Mail from '../../lib/Mail';

// class SubscriptionController {
//   async index(req, res) {
//     const subscriptions = await Subscription.findAll({
//       where: {
//         user_id: req.userId,
//       },
//       include: [
//         {
//           model: Meetup,
//           where: {
//             date: {
//               [Op.gt]: new Date(),
//             },
//           },
//           required: true,
//         },
//       ],
//       order: [[Meetup, 'date']],
//     });
//     return res.json(subscriptions);
//   }

//   async store(req, res) {
//     const user = await User.findByPk(req.userId);
//     const meetup = await Meetup.findByPk(req.params.meetupId, {
//       include: [User],
//     });
//     // const meetup = await Meetup.findByPk(req.params.meetupId)

//     // console.log('user:', user)
//     // console.log('meetup:', meetup)
//     if (meetup.user_id === req.userId) {
//       return res
//         .status(400)
//         .json({ error: "Can't subscribe to you own meetups" });
//     }

//     if (meetup.past) {
//       return res.status(400).json({ error: "Can't subscribe to pas meetups" });
//     }

//     const checkDate = await Subscription.findOne({
//       where: {
//         user_id: user.id,
//       },
//       include: [
//         {
//           model: Meetup,
//           required: true,
//           where: {
//             date: meetup.date,
//           },
//         },
//       ],
//     });

//     if (checkDate) {
//       return res
//         .status(400)
//         .json({ error: "Can't subscribe to two meetups at the same time" });
//     }

//     const subscription = await Subscription.create({
//       user_id: user.id,
//       meetup_id: meetup.id,
//     });

//     await Mail.sendMail({
//       to: `${user.email} <${user.email}>`,
//       subject: 'subscription done',
//       text: 'Inscrição efetuada',
//     });

//     return res.json(subscription);
//   }
// }

// export default new SubscriptionController();

// S>----------------------------------------------------------------------------------------<//

// import { Op } from 'sequelize';
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';

// import User from '../models/User';
// import Meetup from '../models/Meetup';
// import Subscription from '../models/Subscription';

// import Mail from '../../lib/Mail';

// class SubscriptionController {
//   async index(req, res) {
//     const subscriptions = await Subscription.findAll({
//       where: {
//         user_id: req.userId,
//       },
//       include: [
//         {
//           model: Meetup,
//           where: {
//             date: {
//               [Op.gt]: new Date(),
//             },
//           },
//           required: true,
//         },
//       ],
//       order: [[Meetup, 'date']],
//     });
//     return res.json(subscriptions);
//   }

//   async store(req, res) {
//     const user = await User.findByPk(req.userId);
//     const meetup = await Meetup.findByPk(req.params.meetupId, {
//       include: [User],
//     });
//     // const meetup = await Meetup.findByPk(req.params.meetupId)

//     // console.log('user:', user)
//     // console.log('meetup:', meetup)
//     if (meetup.user_id === req.userId) {
//       return res
//         .startu(400)
//         .json({ error: "Can't subscribe to you own meetups" });
//     }

//     if (meetup.past) {
//       return res.status(400).json({ error: "Can't subscribe to pas meetups" });
//     }

//     const checkDate = await Subscription.findOne({
//       where: {
//         user_id: user.id,
//       },
//       include: [
//         {
//           model: Meetup,
//           required: true,
//           where: {
//             date: meetup.date,
//           },
//         },
//       ],
//     });

//     if (checkDate) {
//       return res
//         .status(400)
//         .json({ error: "Can't subscribe to two meetups at the same time" });
//     }

//     const subscription = await Subscription.create({
//       user_id: user.id,
//       meetup_id: meetup.id,
//     });

//     await Mail.sendMail({
//       to: `${user.email} <${user.email}>`,
//       subject: 'subscription done',
//       text: 'Inscrição efetuada',
//       template: 'subscription',
//       context: {
//         user: user.name,
//         title: meetup.title,
//         description: meetup.description,
//         date: format(meetup.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
//           locale: pt,
//         }),
//       },
//     });

//     return res.json(subscription);
//   }
// }

// export default new SubscriptionController();

// S>----------------------------------------------------------------------------------------<//
/*
--I> transferir a função "Mail.sendMail" para job "SubscriptionMail.js"
*/
import { Op } from 'sequelize';

import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import File from '../models/File';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          include: [
            {
              model: File,
            },
            {
              model: User,
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });
    // const meetup = await Meetup.findByPk(req.params.meetupId)

    // console.log('user:', user)
    // console.log('meetup:', meetup)
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to pas meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      user,
      meetup,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const subscription = await Subscription.findByPk(req.params.id);

    if (subscription.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    await subscription.destroy();

    // return res.send();
    return res.json(subscription);
  }
}

export default new SubscriptionController();
