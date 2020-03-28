import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking  } from 'react-native';
import * as MailComposer  from 'expo-mail-composer';

import logo from '../../assets/logo.png';
import styles from './style';

function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const incident =route.params.incident;
    

    const message = `Hello ${incident.name}, I am getting in touch because I would like to help in the case "${incident.title}" with a value of ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function navigateBack() {
        navigation.goBack()
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Hero of the case: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsaap() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container} > 
            <View style={styles.header}>
            <Image source={logo} />

            <TouchableOpacity onPress={navigateBack} >
                <Feather name="arrow-left" size={28} color="#E82041" />
            </TouchableOpacity>
          </View>  

          <View style={styles.incident} >
          <Text style={styles.incidentProperty, { marginTop: 0}}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} in {incident.city}/{incident.uf} </Text>
                
            <Text style={styles.incidentProperty}>CASE:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
          </View>

          <View style={styles.contactBox} >
            <Text style={styles.heroTitle}>Save the day ! </Text>
            <Text style={styles.heroTitle}>Be the hero of this case. </Text>
            <Text style={styles.description}>Contacts: </Text>
        
            <View style={styles.actions} >
                <TouchableOpacity style={styles.action} onPress={sendWhatsaap} >
                    <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendEmail} >
                    <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}

export default Detail;