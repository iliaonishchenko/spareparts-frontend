import {Injectable} from '@angular/core';


@Injectable()
export class LocalStorageService {

  static save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static get(key: string): string {
    return localStorage.getItem(key);
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
