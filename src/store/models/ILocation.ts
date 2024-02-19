interface IMetadata {
  currentOffset: number;
  totalCount: number;
}

interface ILinks {
  rel: string;
  href: string;
}

interface IData {
  id: number;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  population: number;
}

export interface ILocation {
  data: IData[];
  links: ILinks[];
  metadata: IMetadata;
}
