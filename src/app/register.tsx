import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StatusBar, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { api } from '@/server/api';

import { useBadgeStore } from '@/store/badge-store';

import { colors } from '@/styles/colors';

const EVENT_ID = '05cb3e61-67d4-4e6a-8bc6-6f5b4d759bbb';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const badgeStore = useBadgeStore();

    async function handleRegister() {
        try {
            if (!name.trim() || !email.trim()) {
                return Alert.alert('Inscrição', 'Informe todos os campos!');
            }

            setIsLoading(true);

            const registerResponse = await api.post(`/events/${EVENT_ID}/attendee`, { name, email });

            if (registerResponse.data.attendeeId) {
                const { data } = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`);

                badgeStore.save(data.badge)

                Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/ticket')
                    },
                ]);
            }
        } catch (error) {
            console.log(error);

            setIsLoading(false);

            if (axios.isAxiosError(error)) {
                if (String(error.response?.data.message).includes('already registered')) {
                    return Alert.alert('Inscrição', 'Esse e-mail já está cadastrado!');
                }
            }

            Alert.alert('Inscrição', 'Não foi possível fazer a inscrição.');
        }
    }

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
                    <FontAwesome6
                        name='user-circle'
                        color={colors.green[200]}
                        size={20}
                    />

                    <Input.Field
                        placeholder='Nome completo'
                        onChangeText={setName}
                    />
                </Input>

                <Input>
                    <MaterialIcons
                        name='alternate-email'
                        color={colors.green[200]}
                        size={20}
                    />

                    <Input.Field
                        placeholder='E-mail'
                        keyboardType='email-address'
                        onChangeText={setEmail}
                    />
                </Input>

                <Button
                    title='Realizar inscrição'
                    onPress={handleRegister}
                    isLoading={isLoading}
                />

                <Link href='/' className='text-gray-100 text-base font-bold text-center mt-8'>
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    );
}
