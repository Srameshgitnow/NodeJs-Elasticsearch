require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ES_NODE,
    auth: {
        username: 'elastic',
        password: 'RHZtyZfrVt1o_w86R3H_'  // use the one you got earlier
      }
 });

 async function checkConnection() {
    try {
      const health = await client.cluster.health({});
      console.log('Elasticsearch is healthy:', health.status);
    } catch (e) {
      console.error('Elasticsearch cluster is down!', e);
    }
  }

module.exports = { client, checkConnection };
