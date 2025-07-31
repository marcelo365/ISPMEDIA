// models/estacao.model.ts
export interface Estacao {
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  language: string;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number; // 1 = online, 0 = offline
}
