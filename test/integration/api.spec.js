const request = require('supertest');
const assert = require('chai').assert;

const app = require('../../index').app;
const server = require('../../index').server;

describe('bcm flight route finder API', () => {
  after((done) => {
    server.close(done);
  });

  it('returns 400 for invalid sellingAirline', () => {
    return request(app)
      .get('/api/routes/far_too_long/CDG/JFK')
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('returns 400 for invalid "from"', () => {
    return request(app)
      .get('/api/routes/BA/CDGVDG/JFK')
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('returns 400 for invalid "to"', () => {
    return request(app)
      .get('/api/routes/BA/CDG/JFKJFK')
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('returns 200 for non-existing sellingAirline', async () => {
    const req = await request(app)
      .get('/api/routes/WW/CDG/JFK')
      .set('Accept', 'application/json')
      .expect(200);

    assert.deepEqual(req.body, []);
  });

  it('returns route options- example 1', async () => {
    const req = await request(app)
      .get('/api/routes/AF/CDG/LHR')
      .set('Accept', 'application/json')
      .expect(200);

    assert.deepEqual(req.body, [
      {
        'from': 'CDG',
        'operatingAirlines': [
          'AF'
        ],
        'sellingAirline': 'AF',
        'stopOvers': [
          'SYD'
        ],
        'to': 'LHR'
      },
      {
        'from': 'CDG',
        'operatingAirlines': [
          'AF'
        ],
        'sellingAirline': 'AF',
        'stopOvers': [],
        'to': 'LHR'
      },
      {
        'from': 'CDG',
        'operatingAirlines': [
          'AF',
          'BA'
        ],
        'sellingAirline': 'AF',
        'stopOvers': [
          'HKG'
        ],
        'to': 'LHR'
      }
    ]);
  });

  it('returns route options - example 2', async () => {
    const req = await request(app)
      .get('/api/routes/BA/CDG/HKG')
      .set('Accept', 'application/json')
      .expect(200);

    assert.deepEqual(req.body, [
      {
        'from': 'CDG',
        'operatingAirlines': [
          'BA',
          'AF'
        ],
        'sellingAirline': 'BA',
        'stopOvers': [],
        'to': 'HKG'
      },
      {
        'from': 'CDG',
        'operatingAirlines': [
          'BA'
        ],
        'sellingAirline': 'BA',
        'stopOvers': [
          'MEX'
        ],
        'to': 'HKG'
      }
    ]
    );
  });
});
