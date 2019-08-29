import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { user, meetup } = data;

    // console.log('A fila executou', user, meetup )

    await Mail.sendMail({
      to: `${user.email} <${user.email}>`,
      subject: 'subscription done',
      // text: 'Inscrição efetuada'
      template: 'subscription',
      context: {
        user: user.name,
        title: meetup.title,
        description: meetup.description,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
