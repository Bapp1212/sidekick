import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingStack";

const PRIMARY = "#85817d";
const SECONDARY = "#5b798a";
const BG = "#f4ece4";
const INPUT_BG = "#fff6f5";
const PLACEHOLDER_COLOR = "#c4b7b6";
const FOOTER_COLOR = "#7a7e82";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
    const [email, setEmail] = useState("");

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Register</Text>

                    <Text style={styles.subtitle}>
                        {"129k students are already on "}
                        <Text style={styles.subtitleBold}>{"SideKick"}</Text>
                        {".\nJoin them to accelerate each other!"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="first.last@durham.ac.uk"
                        placeholderTextColor={PLACEHOLDER_COLOR}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("MainTabs")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <Text style={styles.footer}>
                        {"If you already have an account, your data will automatically restore."}
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    safe: {
        flex: 1,
        backgroundColor: BG,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 49,
        gap: 31,
    },
    title: {
        fontFamily: "Georgia-Italic",
        fontSize: 40,
        color: SECONDARY,
    },
    subtitle: {
        fontFamily: "Georgia-Italic",
        fontSize: 16,
        color: PRIMARY,
        textAlign: "center",
        lineHeight: 24,
        maxWidth: 304,
    },
    subtitleBold: {
        fontFamily: "Georgia-BoldItalic",
        fontSize: 16,
        color: PRIMARY,
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: INPUT_BG,
        borderRadius: 50,
        paddingHorizontal: 24,
        fontFamily: "Georgia-Italic",
        fontSize: 16,
        color: PRIMARY,
    },
    button: {
        width: 95,
        height: 50,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "Georgia",
        fontSize: 16,
        color: BG,
    },
    footer: {
        fontFamily: "Georgia-Italic",
        fontSize: 13,
        color: FOOTER_COLOR,
        textAlign: "center",
        lineHeight: 19,
        maxWidth: 222,
    },
});
