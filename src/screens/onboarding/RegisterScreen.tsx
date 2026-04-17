import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../navigation/OnboardingStack";
import Screen from "../../components/Screen";
import PrimaryButton from "../../components/PrimaryButton";
import { registerUser, validateDurhamEmail } from "../../authHelpers";

// ─── Design tokens ────────────────────────────────────────────────────────────
const SECONDARY = "#5b798a";
const PRIMARY = "#85817d";
const INPUT_BG = "#f9f4ee";
const ERROR_COLOR = "#c45c5c";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        const trimmedEmail = email.trim().toLowerCase();

        if (!validateDurhamEmail(trimmedEmail)) {
            setFormError("Please use your Durham email (e.g. abcd12@durham.ac.uk).");
            return;
        }

        if (password.length < 8) {
            setFormError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        setFormError("");
        setLoading(true);

        try {
            await registerUser(trimmedEmail, password);

            // Success feedback → redirect to Sign In
            Alert.alert(
                "Account Created! 🎉",
                "Your SideKick account has been created successfully. Please sign in.",
                [{ text: "Sign In", onPress: () => navigation.navigate("Login") }]
            );
        } catch (err: any) {
            const code: string = err?.code ?? "";
            if (code === "auth/email-already-in-use") {
                setFormError(
                    "This email is already registered. Please sign in instead."
                );
            } else if (code === "auth/weak-password") {
                setFormError("Password is too weak. Use at least 8 characters.");
            } else {
                setFormError(err?.message ?? "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen>
            <KeyboardAvoidingView
                style={styles.flex1}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    style={styles.flex1}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Heading */}
                    <Text style={styles.heading}>Create Account</Text>

                    <Text style={styles.subtitle}>
                        Join{" "}
                        <Text style={styles.subtitleBold}>SideKick</Text>
                        {"\n"}Use your Durham University email to get started.
                    </Text>

                    {/* Durham email input */}
                    <TextInput
                        style={styles.input}
                        placeholder="abcd12@durham.ac.uk"
                        placeholderTextColor="#b5b0ab"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(t) => {
                            setEmail(t);
                            if (formError) setFormError("");
                        }}
                    />

                    {/* Password input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Create a password (min. 8 characters)"
                        placeholderTextColor="#b5b0ab"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(t) => {
                            setPassword(t);
                            if (formError) setFormError("");
                        }}
                    />

                    {/* Confirm Password input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        placeholderTextColor="#b5b0ab"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={confirmPassword}
                        onChangeText={(t) => {
                            setConfirmPassword(t);
                            if (formError) setFormError("");
                        }}
                    />

                    {formError ? (
                        <Text style={styles.errorText}>{formError}</Text>
                    ) : null}

                    {/* CTA */}
                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color={SECONDARY}
                            style={{ marginTop: 24 }}
                        />
                    ) : (
                        <PrimaryButton
                            label="Create Account"
                            onPress={handleRegister}
                            style={{ marginTop: 24 }}
                        />
                    )}

                    <Text style={styles.noteText}>
                        Only Durham University emails are accepted.{"\n"}
                        Your email is verified using the institutional format.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    flex1: { flex: 1 },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 36,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },

    heading: {
        fontFamily: "Georgia-Italic",
        fontSize: 44,
        color: SECONDARY,
        textAlign: "center",
        marginBottom: 12,
    },

    subtitle: {
        fontFamily: "Georgia-Italic",
        fontSize: 16,
        color: PRIMARY,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 40,
    },

    subtitleBold: {
        fontFamily: "Georgia-BoldItalic",
        color: PRIMARY,
    },

    input: {
        width: "100%",
        height: 52,
        paddingHorizontal: 24,
        borderRadius: 999,
        backgroundColor: INPUT_BG,
        color: PRIMARY,
        fontFamily: "Georgia-Italic",
        fontSize: 16,
        marginBottom: 16,
    },

    errorText: {
        fontFamily: "Georgia-Italic",
        color: ERROR_COLOR,
        fontSize: 13,
        textAlign: "center",
        marginTop: 4,
    },

    noteText: {
        fontFamily: "Georgia-Italic",
        textAlign: "center",
        color: PRIMARY,
        fontSize: 13,
        marginTop: 28,
        lineHeight: 20,
        opacity: 0.85,
    },
});
