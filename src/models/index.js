// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SiteManager, Site, Customer, Language, Phrase, Visit } = initSchema(schema);

export {
  SiteManager,
  Site,
  Customer,
  Language,
  Phrase,
  Visit
};