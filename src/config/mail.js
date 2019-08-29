// export default {
//   host: 'smtp.mailtrap.io',
//   port: '2525',
//   secure: false,
//   auth: {
//     user: '4390e232aa16e6',
//     pass: '778a88dfd4db0c',
//   },
//   default: {
//     from: 'Equipe MeetApp <noreply@meetapp.com>',
//   },
// };

// S>----------------------------------------------------------------------------------------<//

// export default {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
//   default: {
//     from: 'Equipe MeetApp <noreply@meetapp.com>',
//   },
// };

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: '4390e232aa16e6',
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe MeetApp <noreply@meetapp.com>',
  },
};
