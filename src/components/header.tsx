import { Text, View } from 'react-native';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <View className='w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-b border-white/10'>
            <Text className='flex-1 text-white text-lg font-medium text-center'>
                {title}
            </Text>
        </View>
    );
}
