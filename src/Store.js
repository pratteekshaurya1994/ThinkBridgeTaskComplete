import useAsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_KEY = 'MYJOURNAL_ITEMS';

export default class Store {
  static loadItems = async () => {
    let items = null;
    try {
      const jsonItems = await useAsyncStorage.getItem(ITEMS_KEY);
      items = JSON.parse(jsonItems);
    } catch (error) {
      console.error('Error loading journal items.', error.message);
    }
    return items || [];
  };

  static saveItems = async items => {
    try {
      await useAsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving journal items.', error.message);
    }
  };

  static deleteItems = async () => {
    try {
      await useAsyncStorage.removeItem(ITEMS_KEY);
    } catch (error) {
      console.error('Error deleting journal items.', error.message);
    }
  };
}
