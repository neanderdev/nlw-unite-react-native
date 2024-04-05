import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, StatusBar, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { colors } from '@/styles/colors';

export default function Home() {
    return (
        <View className='flex-1 justify-center items-center bg-green-500 p-8'>
            <StatusBar
                barStyle='light-content'
            />

            <Image
                source={require('@/assets/logo.png')}
                className='h-16'
                resizeMode='contain'
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons
                        name='ticket-confirmation-outline'
                        color={colors.green[200]}
                        size={20}
                    />

                    <Input.Field
                        placeholder='Código do ingresso'
                    />
                </Input>

                <Button
                    title='Acessar credencial'
                />

                <Link href='/register' className='text-gray-100 text-base font-bold text-center mt-8'>
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    );
}
