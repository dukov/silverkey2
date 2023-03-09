export interface KVDB {
  setValue(key: string, value: string): void;
  getValue(key: string): string;
  getKeys(): string[];
  deleteKey(key: string): void;
}
