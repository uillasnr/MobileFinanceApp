import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../types";

async function SaveUser(user: Auth) {
  try {
    const userJson = JSON.stringify(user);
    await AsyncStorage.setItem("user", userJson);
    console.log("Usuário salvo com sucesso.", userJson);
  } catch (error) {
    console.log("Erro ao salvar usuário no storage", error);
  }
}


async function LoadUser() {
    try {
      const storage = await AsyncStorage.getItem("user");
      console.log("storage", storage);
      return storage ? JSON.parse(storage) : null;
    } catch (error) {
      console.error("Erro ao carregar usuário do storage:", error);
      return null;
    }
  }

async function LogoutUser() {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem('token');
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.log("Erro ao realizar logout", error);
  }
}

export { SaveUser, LoadUser, LogoutUser };