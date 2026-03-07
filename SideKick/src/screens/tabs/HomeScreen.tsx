import { View, Text, ScrollView, Image } from "react-native";
import {
    Home,
    MessageSquare,
    Footprints,
    UserRound,
} from "lucide-react-native";
import Screen from "../../components/Screen";

const imgCatWhisker =
    "https://www.figma.com/api/mcp/asset/58d9705e-03c2-4111-aede-5188a6fbb8dc";
const imgRacoon =
    "https://www.figma.com/api/mcp/asset/8b1b7881-a35a-450c-8f7b-bf59c3c4ddd7";

export default function HomeScreen() {
    const stats = [
        { number: "40", label: "questions\nanswered" },
        { number: "12", label: "safe walk\ncompany" },
        { number: "52", label: "helped in\ntotal" },
    ];

    const activities = [
        {
            id: 1,
            name: "Cat Whisker",
            action: "rated you",
            emoji: "😊",
            detail: "from your safe walk session",
            avatar: imgCatWhisker,
        },
        {
            id: 2,
            name: "Raged Raccoon",
            action: "marked your answer as",
            detail: "helpful",
            avatar: imgRacoon,
        },
    ];

    return (
        <Screen>
            <ScrollView
                className="flex-1 bg-[#f4ece4]"
                contentContainerClassName="pb-24"
            >
                {/* Header */}
                <View className="px-8 pt-10">
                    <Text className="text-4xl font-bold text-[#85817d] italic">
                        Hi User!
                    </Text>
                    <Text className="text-sm text-[#5b798a] italic mt-4">
                        Look at you!! Such a nice queen (✿◕‿◕✿)
                    </Text>
                </View>

                {/* Stats Section */}
                <View className="px-8 mt-10">
                    <View className="flex-row justify-between items-center">
                        {stats.map((stat, index) => (
                            <View key={index} className="items-center flex-1">
                                <Text className="text-4xl font-bold text-[#a48675] italic">
                                    {stat.number}
                                </Text>
                                <Text className="text-xs text-[#85817d] text-center mt-2">
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent Activities Title */}
                <View className="px-8 mt-8">
                    <Text className="text-sm text-[#5b798a] italic">
                        Some of your recent activities
                    </Text>
                </View>

                {/* Activities Section */}
                <View className="px-8 mt-6 gap-4">
                    {activities.map((activity) => (
                        <View
                            key={activity.id}
                            className="bg-[#e2e3e3] rounded-2xl p-4 flex-row items-center"
                        >
                            {/* Avatar */}
                            <Image
                                source={{ uri: activity.avatar }}
                                className="w-10 h-10 rounded-full mr-4"
                            />

                            {/* Text Content */}
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-[#85817d] italic">
                                    {activity.name}
                                    <Text className="font-normal not-italic">
                                        {" "}
                                        {activity.action}{" "}
                                    </Text>
                                    {activity.emoji && (
                                        <Text>{activity.emoji}</Text>
                                    )}
                                    <Text className="font-normal not-italic">
                                        {" "}
                                        {activity.detail}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-[#f4ece4] border-t border-gray-200">
                <View className="flex-row justify-around items-center h-24">
                    <NavButton icon={Home} label="Home" active />
                    <NavButton icon={MessageSquare} label="Q&A" />
                    <NavButton icon={Footprints} label="Safe Walk" />
                    <NavButton icon={UserRound} label="Profile" />
                </View>
            </View>
        </Screen>
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
