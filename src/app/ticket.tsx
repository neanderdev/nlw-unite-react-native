import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Redirect } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    Share,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Button } from '@/components/button';
import { Credential } from '@/components/credential';
import { Header } from '@/components/header';
import { QRCode } from '@/components/qrcode';

import { useBadgeStore } from '@/store/badge-store';

import { colors } from '@/styles/colors';

export default function Ticket() {
    const [expandQRCode, setExpandQRCode] = useState(false);

    const badgeStore = useBadgeStore();

    async function handleShare() {
        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL
                });
            }
        } catch (error) {
            console.log(error);

            Alert.alert('Compartilhar', 'Não foi possível compartilhar.');
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            });

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);

            Alert.alert('Foto', 'Não foi possível selecionar a imagem.');
        }
    }

    if (!badgeStore.data?.checkInURL) {
        return <Redirect href='/' />
    }

    return (
        <View className='flex-1 bg-green-500'>
            <StatusBar
                barStyle='light-content'
            />

            <Header
                title='Minha Credencial'
            />

            <ScrollView className='-mt-28 -z-10' contentContainerClassName='px-8 pb-8' showsVerticalScrollIndicator={false}>
                <Credential
                    data={badgeStore.data}
                    onChangeAvatar={handleSelectImage}
                    onExpandQRCode={() => setExpandQRCode(true)}
                />

                <MotiView
                    from={{
                        translateY: 0,
                    }}
                    animate={{
                        translateY: 10,
                    }}
                    transition={{
                        loop: true,
                        type: 'timing',
                        duration: 700,
                    }}
                >
                    <FontAwesome
                        name='angle-double-down'
                        size={24}
                        color={colors.gray[300]}
                        className='self-center my-6'
                    />
                </MotiView>

                <Text className='text-white text-2xl font-bold mt-4'>
                    Compartilhar credencial
                </Text>

                <Text className='text-white text-base font-regular mt-1 mb-6'>
                    Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle}!
                </Text>

                <Button
                    title='Compartilhar'
                    onPress={handleShare}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className='mt-10'
                    onPress={() => badgeStore.remove()}
                >
                    <Text className='text-base font-bold text-white text-center'>
                        Remover Ingresso
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} animationType='slide' statusBarTranslucent>
                <View className='flex-1 bg-green-500 items-center justify-center'>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setExpandQRCode(false)}
                    >
                        <QRCode
                            value={badgeStore.data.checkInURL}
                            size={300}
                        />

                        <Text className='text-sm font-body text-orange-500 mt-10 text-center'>
                            Fechar QRCode
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
