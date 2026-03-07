import { View, Text, ScrollView, Pressable } from "react-native";
import Screen from "../../components/Screen";

interface QuestionCardProps {
    title: string;
    description: string;
    author: string;
    timePosted: string;
    tag: string;
    tagCount: string;
    answerCount: number;
}

function QuestionCard({
    title,
    description,
    author,
    timePosted,
    tag,
    tagCount,
    answerCount,
}: QuestionCardProps) {
    return (
        <View className="bg-[#e2e3e3] rounded-[10px] p-4 mx-5">
            {/* Title */}
            <Text className="text-[16px] text-[#3b4849] italic font-normal mb-2">
                {title}
            </Text>

            {/* Description */}
            <Text className="text-[12px] text-[#3b4849] italic leading-[18px] mb-3">
                {description}
            </Text>

            {/* Divider */}
            <View className="h-[1px] bg-[#b9c8ca] my-2" />

            {/* Author and time */}
            <Text className="text-[11px] text-[#5b798a] italic mb-2">
                <Text className="font-bold">{author} </Text>
                <Text>posted this {timePosted}</Text>
            </Text>

            {/* Bottom row: tag and answer count */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                    <View className="border border-[#85817d] rounded-[8px] px-2 py-[2px]">
                        <Text className="text-[10px] text-[#85817d] italic">
                            {tag}
                        </Text>
                    </View>
                    <Text className="text-[10px] text-[#85817d] italic">
                        {tagCount}
                    </Text>
                </View>
                <Text className="text-[11px] text-[#5b798a] italic">
                    {answerCount} people have answered
                </Text>
            </View>
        </View>
    );
}

interface FilterButtonProps {
    label: string;
    onPress?: () => void;
}

function FilterButton({ label, onPress }: FilterButtonProps) {
    return (
        <Pressable
            className="border border-[#85817d] rounded-[10px] px-3 py-1"
            onPress={onPress}
        >
            <Text className="text-[13px] text-[#85817d] italic">{label}</Text>
        </Pressable>
    );
}

export default function QAScreen() {
    return (
        <Screen>
            <ScrollView
                className="flex-1 bg-[#f4ece4]"
                contentContainerClassName="pb-24"
            >
                {/* Header */}
                <View className="px-5 pt-6">
                    <Text className="text-[13px] text-[#5b798a] italic">
                        Some of your peers need help!
                    </Text>
                </View>

                {/* Filter Buttons */}
                <View className="flex-row gap-2 px-5 mt-4">
                    <FilterButton label="Priority" />
                    <FilterButton label="Course" />
                    <FilterButton label="Level" />
                    <FilterButton label="Academic" />
                </View>

                {/* Question Cards */}
                <View className="mt-6">
                    <QuestionCard
                        title="First-order logic"
                        description="My assignment is based on first-order logic but I don't understand! Can someone explain it to me?"
                        author="Funny Sloth"
                        timePosted="32 minutes ago"
                        tag="Computer Science"
                        tagCount="+3"
                        answerCount={2}
                    />
                </View>
            </ScrollView>
        </Screen>
    );
}
