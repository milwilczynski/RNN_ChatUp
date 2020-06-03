import AsyncStorage from '@react-native-community/async-storage';

export class Store {
  static _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@Token', data);
    } catch (error) {
      console.log(error);
    }
  };
  static _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Token');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  static _clearData = async () => {
    try {
      await AsyncStorage._clearData();
    } catch (error) {
      console.log(error);
    }
  };
}

export default Store;
