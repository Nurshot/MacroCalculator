import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

const SettingsAboutApp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://taslak.sdu.edu.tr/assets/uploads/sites/275/other/43621.jpg' }}  // Logo URL'sini buraya ekleyin
          style={styles.logo}
        />
        <Text style={styles.title}>Makro Calculator</Text>
        <Text style={styles.subtitle}>Uygulama Hakkında</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Uygulama Özellikleri</Text>
        <Text style={styles.text}>
          Makro Calculator, günlük makro besin ihtiyaçlarınızı hesaplamanıza ve takip etmenize yardımcı olur. 
          Sağlıklı yaşam ve fitness hedeflerinize ulaşmak için özel olarak tasarlanmıştır.
        </Text>
        <Text style={styles.text}>
          Uygulama ile:
        </Text>
        <Text style={styles.bulletPoint}>• Günlük kalori ve makro hedeflerinizi belirleyin</Text>
        <Text style={styles.bulletPoint}>• Besin takibi yapın</Text>
        <Text style={styles.bulletPoint}>• İlerlemenizi izleyin</Text>
        <Text style={styles.bulletPoint}>• Sağlıklı tarifler keşfedin</Text>

        <Text style={styles.sectionTitle}>Geliştirici</Text>
        <Text style={styles.text}>Özge Avcıoğlu</Text>
        <Text style={styles.text}>Nurşat Bülbül</Text>
        
        <Text style={styles.sectionTitle}>Sosyal Medya</Text>
        <View style={styles.socialMedia}>
      
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => openLink('https://instagram.com/nursat.bulbul')}>
            <Ionicons name="logo-instagram" size={32} color="#4267B2" />
            
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => openLink('https://instagram.com/ozge_avcio')}>
            <Ionicons name="logo-instagram" size={32} color="#4267B2" />
            
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => openLink('https://tr.linkedin.com/in/nursatbulbul')}>
            <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => openLink('https://tr.linkedin.com/in/ozgeavcioglu')}>
            <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>İletişim</Text>
        <Text style={styles.text}>Destek veya önerileriniz için bize ulaşın:</Text>
        <TouchableOpacity
          onPress={() => openLink('mailto:support@example.com')}>
          <Text style={styles.link}>support@example.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f7f7f7',
      padding: 20,
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: 18,
      color: '#666',
      marginTop: 5,
    },
    content: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    text: {
      fontSize: 16,
      color: '#555',
      marginBottom: 8,
      lineHeight: 22,
    },
    textsocial: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        lineHeight: 22,

      },
    bulletPoint: {
      fontSize: 16,
      color: '#555',
      marginLeft: 10,
      marginBottom: 8,
      lineHeight: 22,
    },
    link: {
      color: '#007bff',
      textDecorationLine: 'underline',
      marginBottom: 10,
    },
    socialMedia: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
      marginBottom: 20,
    },
    iconButton: {
      marginHorizontal: 10,
    },
  });
  
  export default SettingsAboutApp;