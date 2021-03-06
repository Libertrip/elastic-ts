/**
 * The following query examples were taken from the Elasticsearch documentation
 */

import {SearchBody} from '../..'

// @ts-ignore
let body: SearchBody

body = {
  query: {
    match: {
      message: {
        operator: 'or',
        query: 'the quick brown',
      },
    },
  },
  rescore: {
    window_size: 50,
    query: {
      rescore_query: {
        match_phrase: {
          message: {
            query: 'the quick brown',
            slop: 2,
          },
        },
      },
      query_weight: 0.7,
      rescore_query_weight: 1.2,
    },
  },
}

body = {
  query: {
    match: {
      message: {
        operator: 'or',
        query: 'the quick brown',
      },
    },
  },
  rescore: [
    {
      window_size: 100,
      query: {
        rescore_query: {
          match_phrase: {
            message: {
              query: 'the quick brown',
              slop: 2,
            },
          },
        },
        query_weight: 0.7,
        rescore_query_weight: 1.2,
      },
    },
    {
      window_size: 10,
      query: {
        score_mode: 'multiply',
        rescore_query: {
          function_score: {
            script_score: {
              script: {
                source: 'Math.log10(doc.likes.value + 2)',
              },
            },
          },
        },
      },
    },
  ],
}
