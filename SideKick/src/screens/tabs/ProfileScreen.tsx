import { View, Text, ScrollView, Image, Pressable } from "react-native";
import {
    Home,
    MessageSquare,
    Footprints,
    UserRound,
} from "lucide-react-native";
import Screen from "../../components/Screen";

const imgProfileAvatar =
    "https://www.figma.com/api/mcp/asset/97683d2b-5eca-4a72-ad72-49eebf5f30c9";

export default function ProfileScreen() {
    return (
        <Screen>
            <ScrollView
                className="flex-1 bg-[#f4ece4]"
                contentContainerClassName="pb-24"
            >
                {/* Profile Header */}
                <View className="flex-row items-center px-8 pt-10">
                    {/* Avatar */}
                    <Image
                        source={{ uri: imgProfileAvatar }}
                        className="w-32 h-32 rounded-full mr-6"
                    />

                    {/* Name and Bio */}
                    <View className="flex-1">
                        <Text
                            className="text-4xl font-bold text-[#5b798a] italic"
                            style={{ fontFamily: "Georgia" }}
                        >
                            Potato Frog
                        </Text>
                        <Text
                            className="text-sm text-[#85817d] italic mt-2"
                            style={{ fontFamily: "Georgia" }}
                        >
                            52 contributions so far
                        </Text>
                    </View>
                </View>

                {/* App Info Section */}
                <View className="px-8 mt-16">
                    <Text
                        className="text-sm font-bold text-[#5b798a] italic mb-6"
                        style={{ fontFamily: "Georgia" }}
                    >
                        App Info
                    </Text>

                    {/* Info Items */}
                    <View className="gap-4">
                        <InfoItem label="Version" value="1" />
                        <InfoItem label="Privacy Policy" />
                        <InfoItem label="Terms and Conditions" />
                        <InfoItem label="License" />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-[#f4ece4] border-t border-gray-200">
                <View className="flex-row justify-around items-center h-24">
                    <NavButton icon={Home} label="Home" />
                    <NavButton icon={MessageSquare} label="Q&A" />
                    <NavButton icon={Footprints} label="Safe Walk" />
                    <NavButton icon={UserRound} label="Profile" active />
                </View>
            </View>
        </Screen>
    );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <Pressable>
            <View className="flex-row justify-between items-center">
                <Text
                    className="text-sm text-[#85817d] italic"
                    style={{ fontFamily: "Georgia" }}
                >
                    {label}
                </Text>
                {value && (
                    <Text
                        className="text-sm text-[#85817d] italic"
                        style={{ fontFamily: "Georgia" }}
                    >
                        {value}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

function NavButton({
    icon: Icon,
    label,
    active = false,
}: {
    icon: React.ComponentType<any>;
    label: string;
    active?: boolean;
}) {
    return (
        <View className="items-center justify-center">
            <View
                className={`w-16 h-16 rounded-full items-center justify-center ${
                    active ? "bg-[#b9c8ca]" : "bg-white"
                }`}
            >
                <Icon
                    size={24}
                    color={active ? "#fff" : "#85817d"}
                    strokeWidth={1.5}
                />
            </View>
            <Text className="text-xs text-[#85817d] mt-1">{label}</Text>
        </View>
    );
}
