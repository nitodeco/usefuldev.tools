export type ConversionMode = 'csv-to-json' | 'json-to-csv';

export interface ConversionOptions {
  hasHeader: boolean;
  prettyPrint: boolean;
}
