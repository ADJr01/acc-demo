import Service from '@ember/service';

export default class IndexStoreService extends Service {
  db = null;
  dbName = 'CoreDB';
  storeName = 'AGENT_CORE_CLIENT_STORE';
  version = 1;
  initPromise = null;
  isInitializing = false;

  async init() {
    super.init(...arguments);
    if (this.db) {
      console.warn('CoreDB already initialized');
      return;
    }

    if (this.isInitializing) {
      return this.initPromise;
    }

    this.isInitializing = true;

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        this.isInitializing = false;
        this.initPromise = null;
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isInitializing = false;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };
    });
    return this.initPromise;
  }

  async get(key) {
    await this._ensureInitialized();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.value : null);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get key: ${key}`));
      };
    });
  }

  async save(key, value) {
    await this._ensureInitialized();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ key, value });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error(`Failed to save key: ${key}`));
    });
  }

  async delete(key) {
    await this._ensureInitialized();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error(`Failed to delete key: ${key}`));
    });
  }

  async clearAll() {
    await this._ensureInitialized();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear all keys'));
    });
  }

  async _ensureInitialized() {
    if (!this.db && !this.isInitializing) {
      throw new Error('CoreDB not initialized. Call init() first.');
    }

    if (this.isInitializing) {
      await this.initPromise;
    }
  }
}
