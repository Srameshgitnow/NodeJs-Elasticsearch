const express = require('express');
const router = express.Router();
const { client } = require('../elasticClient');

router.get('/search', async (req, res) => {
  const { q, subtypes } = req.query;

  try {
    const query = {
      index: process.env.ES_INDEX,
      body: {
        query: {
          bool: {
            must: q ? [
              {
                match: {
                  content: q
                }
              }
            ] : [],
            filter: subtypes ? [
              {
                terms: {
                  subtype: subtypes.split(',')
                }
              }
            ] : []
          }
        }
      }
    };

    const body  = await client.search(query);
    res.json(body.hits.hits.map(hit => hit._source));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error searching Elasticsearch');
  }
});

module.exports = router;
