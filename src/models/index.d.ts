import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SiteManagerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SiteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LanguageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PhraseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VisitMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SiteManager {
  readonly id: string;
  readonly site?: Site;
  readonly phoneNumber: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly siteSiteManagersId?: string;
  constructor(init: ModelInit<SiteManager, SiteManagerMetaData>);
  static copyOf(source: SiteManager, mutator: (draft: MutableModel<SiteManager, SiteManagerMetaData>) => MutableModel<SiteManager, SiteManagerMetaData> | void): SiteManager;
}

export declare class Site {
  readonly id: string;
  readonly siteManagers?: (SiteManager | null)[];
  readonly name: string;
  readonly description?: string;
  readonly serviceRadius: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly averageWait: number;
  readonly averageLine: number;
  readonly online: boolean;
  readonly estimatedDaily: number;
  readonly pricePerMonth: number;
  readonly expectedJerrycans: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Site, SiteMetaData>);
  static copyOf(source: Site, mutator: (draft: MutableModel<Site, SiteMetaData>) => MutableModel<Site, SiteMetaData> | void): Site;
}

export declare class Customer {
  readonly id: string;
  readonly IDNumber: string;
  readonly siteID: string;
  readonly site?: Site;
  readonly validSubscription: boolean;
  readonly pin: number;
  readonly phoneNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly language: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}

export declare class Language {
  readonly id: string;
  readonly language: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Language, LanguageMetaData>);
  static copyOf(source: Language, mutator: (draft: MutableModel<Language, LanguageMetaData>) => MutableModel<Language, LanguageMetaData> | void): Language;
}

export declare class Phrase {
  readonly id: string;
  readonly languageID: string;
  readonly language?: Language;
  readonly data: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Phrase, PhraseMetaData>);
  static copyOf(source: Phrase, mutator: (draft: MutableModel<Phrase, PhraseMetaData>) => MutableModel<Phrase, PhraseMetaData> | void): Phrase;
}

export declare class Visit {
  readonly id: string;
  readonly customerID: string;
  readonly siteID: string;
  readonly timeStamp: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Visit, VisitMetaData>);
  static copyOf(source: Visit, mutator: (draft: MutableModel<Visit, VisitMetaData>) => MutableModel<Visit, VisitMetaData> | void): Visit;
}