import "./global.css";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
    const [fontsLoaded] = useFonts({
        Georgia: require("./assets/font/Georgia.ttf"),
        "Georgia-Italic": require("./assets/font/Georgia-Italic.ttf"),
        "Georgia-Bold": require("./assets/font/Georgia-Bold.ttf"),
        "Georgia-BoldItalic": require("./assets/font/Georgia-BoldItalic.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
