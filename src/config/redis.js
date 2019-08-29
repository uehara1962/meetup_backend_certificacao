// export default {
//   host: '127.0.0.1',
//   port: 6379,
// };
// S>----------------------------------------------------------------------------------------<//

/*
--I> incluir variaveis de ambiente
*/
export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
