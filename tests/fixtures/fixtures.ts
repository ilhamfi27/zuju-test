import to from 'await-to-js';
import { tables } from '../../src/infrastructure/sql/driver/connection';
import { dbConn } from '../app';
import fixtureExample from '../../src/bin/example/fixtures.json';
import { Fixtures } from '../../src/interfaces/fixtures';

export const fixtureExamples: Fixtures[] = fixtureExample as any;

export const seedFixtures = async () => {
  for (const element of fixtureExample) {
    const el = element;
    const data = {
      ...el,
      date: new Date(el.date)
    };
    const [e] = await to(dbConn(tables.INDEX_TABLE_FIXTURES).insert(data));
    if (e) throw new Error(e.message);
  }
  return Promise.resolve(fixtureExample);
};

export const truncateFixtures = async () => {
  const [e] = await to(
    dbConn.raw(`truncate table ${tables.INDEX_TABLE_FIXTURES}`)
  );
  if (e) throw new Error(e.message);
  return Promise.resolve('deleted');
};
