import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Screen from "../../components/Screen";

interface RecentLocation {
    id: string;
    name: string;
    address: string;
}

const recentLocations: RecentLocation[] = [
    {
        id: "1",
        name: "Billy B",
        address: "Stockton Rd, Durham DH1 3LY",
    },
    {
        id: "2",
        name: "MCS",
        address: "Durham University Upper Mountjoy Campus, Stockton Rd, Durham DH1 3LE",
    },
    {
        id: "3",
        name: "Big Tesco",
        address: "17, Durham Market Place, Durham DH1 3NE",
    },
    {
        id: "4",
        name: "Student Castle",
        address: "20 Claypath, Durham DH1 1RH",
    },
    {
        id: "5",
        name: "Hatfield College",
        address: "N Bailey, Durham DH1 3RQ",
    },
];

export default function SafeWalkScreen() {
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");

    const handleLeaveNow = () => {
        // TODO: Implement leave now functionality
        console.log("Leave now", { from, destination });
    };

    const handleRecentLocationPress = (location: RecentLocation) => {
        // TODO: Implement recent location selection
        console.log("Selected location:", location);
    };

    return (
        <Screen>
            <ScrollView className="flex-1 bg-[#f4ece4]">
                <View className="flex-1 px-10 pt-10 pb-6">
                    {/* Header */}
                    <Text className="text-[#5b798a] text-[13px] mb-8 italic">
                        Don't want to walk alone? Find a peer!
                    </Text>

                    {/* Input Fields */}
                    <View className="mb-4">
                        <TextInput
                            className="bg-[#fff6f5] h-[25px] rounded-[50px] px-4 text-[13px] text-[#c4b7b6] italic"
                            placeholder="from"
                            placeholderTextColor="#c4b7b6"
                            value={from}
                            onChangeText={setFrom}
                        />
                    </View>

                    <View className="mb-6">
                        <TextInput
                            className="bg-[#fff6f5] h-[25px] rounded-[50px] px-4 text-[13px] text-[#c4b7b6] italic"
                            placeholder="destination"
                            placeholderTextColor="#c4b7b6"
                            value={destination}
                            onChangeText={setDestination}
                        />
                    </View>

                    {/* Leave Now Button */}
                    <TouchableOpacity
                        className="bg-[#85817d] rounded-[50px] w-[91px] h-[20px] items-center justify-center mb-10"
                        onPress={handleLeaveNow}
                    >
                        <Text className="text-[#f4ece4] text-[13px] italic">
                            Leave now
                        </Text>
                    </TouchableOpacity>

                    {/* Recent Section */}
                    <View>
                        <Text className="text-[#85817d] text-[13px] mb-2 italic">
                            Recent
                        </Text>
                        <View className="border-b border-[#85817d] mb-6" />

                        {/* Recent Locations List */}
                        {recentLocations.map((location, index) => (
                            <TouchableOpacity
                                key={location.id}
                                className={`${index > 0 ? "mt-6" : ""}`}
                                onPress={() => handleRecentLocationPress(location)}
                            >
                                <Text className="text-[#5b798a] text-[16px] font-bold italic mb-1">
                                    {location.name}
                                </Text>
                                <Text className="text-[#3b4849] text-[13px] italic leading-5">
                                    {location.address}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}
