import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
  export class RequestCacheService {
    private cache: Map<string, any> = new Map();
  
    // Method to store data in the cache
    
    put(key: any, data: any): void {
        this.cache.set(key, data);
      }
    
    // Method to retrieve data from the cache
    get(key: any): any {
      return this.cache.get(key);
    }
    

  }
  
