// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('pkg');

const target = [
  process.env.PKG_NODE_VERSION || 'node16',
  process.env.PKG_PLATFORM || 'alpine',
].join('-');
exec(['.', '--target', target]);
