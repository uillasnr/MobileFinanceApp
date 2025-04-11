import { Redirect } from "expo-router";
import { useAuth } from "../Context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(public)/welcome" />;
}
