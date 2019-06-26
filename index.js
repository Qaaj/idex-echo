const fastify = require('fastify')({
  logger: true
})

const { exec } = require('child_process');

const execShellCommand = () => {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec('idex status', (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}


fastify.get('/', async (request, reply) => {
  reply.type('text/html').code(200);
  const text = await execShellCommand();
  const index = text.indexOf('Staking:');
  const txt = text.substr(index,16);
  return txt;
})

fastify.listen(80,'0.0.0.0', (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})