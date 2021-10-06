export interface BackendConfig {
  name: string;
  port: string;
  mode: 'dev' | 'prod';
  address: string;
  notes: string;
}
