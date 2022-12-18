import to from 'await-to-js';
import { tables } from '../../src/infrastructure/sql/driver/connection';
import { dbConn } from '../app';
import teamExample from '../../src/bin/example/teams.json';
import { Teams } from '../../src/interfaces/teams';

export const teamExamples: Teams[] = teamExample as any;

export const seedTeams = async () => {
  for (const element of teamExample) {
    const el = element;
    const data = {
      ...el,
    };
    const [e] = await to(dbConn(tables.INDEX_TABLE_TEAMS).insert(data));
    if (e) throw new Error(e.message);
  }
  return Promise.resolve(teamExample);
};

export const truncateTeams = async () => {
  const [e] = await to(
    dbConn.raw(`truncate table ${tables.INDEX_TABLE_TEAMS}`)
  );
  if (e) throw new Error(e.message);
  return Promise.resolve('deleted');
};
