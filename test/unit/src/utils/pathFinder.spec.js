const pathFinder = require('../../../../src/utils/pathFinder');
const Route = require('../../../../src/entities/Route.class');
const assert = require('chai').assert;

describe('pathFinder', () => {
  describe('find', () => {
    it('finds shortest and alternative paths', () => {
      const routes = new Route();
      routes.add('ORGA1', 'START', 'END', 'ORGA1');
      routes.add('ORGA1', 'START', 'ALT', 'ORGA2');
      routes.add('ORGA1', 'ALT', 'END', 'ORGA1');

      const paths = pathFinder.find(routes, 'ORGA1', 'START', 'END');
      assert.equal(paths.results.length, 2);
      assert.deepEqual(paths.results[0], [
        { destination: 'START', operatingAirline: null },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
      assert.deepEqual(paths.results[1], [
        { destination: 'START', operatingAirline: null },
        { destination: 'ALT', operatingAirline: 'ORGA2' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
    });

    it('finds a four-edge distance path', () => {
      const routes = new Route();
      routes.add('ORGA1', 'START', 'OK1', 'ORGA1');
      routes.add('ORGA1', 'START', 'NOK2', 'ORGA2');
      routes.add('ORGA1', 'OK1', 'OK2', 'ORGA3');
      routes.add('ORGA1', 'OK2', 'OK3', 'ORGA1');
      routes.add('ORGA1', 'OK3', 'END', 'ORGA2');

      const paths = pathFinder.find(routes, 'ORGA1', 'START', 'END');
      assert.equal(paths.results.length, 1);
      assert.deepEqual(paths.results[0], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK1', operatingAirline: 'ORGA1' },
        { destination: 'OK2', operatingAirline: 'ORGA3' },
        { destination: 'OK3', operatingAirline: 'ORGA1' },
        { destination: 'END', operatingAirline: 'ORGA2' }
      ]);
    });

    it('will not look for a five-edge distance path', () => {
      const routes = new Route();
      routes.add('ORGA1', 'START', 'OK1', 'ORGA1');
      routes.add('ORGA1', 'START', 'NOK2', 'ORGA1');
      routes.add('ORGA1', 'OK1', 'OK2', 'ORGA1');
      routes.add('ORGA1', 'OK2', 'OK3', 'ORGA1');
      routes.add('ORGA1', 'OK3', 'OK4', 'ORGA1');
      routes.add('ORGA1', 'OK4', 'END', 'ORGA1');

      const paths = pathFinder.find(routes, 'ORGA1', 'START', 'END');
      assert.equal(paths.results.length, 0);
    });

    it('will only add paths without loops', () => {
      const routes = new Route();
      routes.add('ORGA1', 'START', 'OK1', 'ORGA1');
      routes.add('ORGA1', 'START', 'OK2', 'ORGA2');
      routes.add('ORGA1', 'START', 'OK3', 'ORGA3');
      routes.add('ORGA1', 'OK1', 'OK2', 'ORGA1');
      routes.add('ORGA1', 'OK1', 'OK3', 'ORGA3');
      routes.add('ORGA1', 'OK2', 'OK1', 'ORGA1');
      routes.add('ORGA1', 'OK2', 'OK3', 'ORGA2');
      routes.add('ORGA1', 'OK3', 'END', 'ORGA1');

      const paths = pathFinder.find(routes, 'ORGA1', 'START', 'END');
      assert.equal(paths.results.length, 5);
      assert.deepEqual(paths.results[0], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK1', operatingAirline: 'ORGA1' },
        { destination: 'OK2', operatingAirline: 'ORGA1' },
        { destination: 'OK3', operatingAirline: 'ORGA2' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
      assert.deepEqual(paths.results[1], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK1', operatingAirline: 'ORGA1' },
        { destination: 'OK3', operatingAirline: 'ORGA3' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
      assert.deepEqual(paths.results[2], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK2', operatingAirline: 'ORGA2' },
        { destination: 'OK1', operatingAirline: 'ORGA1' },
        { destination: 'OK3', operatingAirline: 'ORGA3' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
      assert.deepEqual(paths.results[3], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK2', operatingAirline: 'ORGA2' },
        { destination: 'OK3', operatingAirline: 'ORGA2' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
      assert.deepEqual(paths.results[4], [
        { destination: 'START', operatingAirline: null },
        { destination: 'OK3', operatingAirline: 'ORGA3' },
        { destination: 'END', operatingAirline: 'ORGA1' }
      ]);
    });
  });
});
