import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

const SettingsTermsConditionsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Makro Calculator</Text>
        <Text style={styles.subtitle}>Kullanım Koşulları</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>1. Giriş</Text>
        <Text style={styles.text}>
          Bu Kullanım Koşulları, Makro Calculator uygulamasını kullanırken uymanız gereken kuralları belirler. Uygulamayı kullanarak bu koşulları kabul etmiş sayılırsınız. 
        </Text>

        <Text style={styles.sectionTitle}>2. Hizmetin Kullanımı</Text>
        <Text style={styles.text}>
          Makro Calculator, kullanıcıların sağlıklı beslenme ve fitness hedeflerine ulaşmalarına yardımcı olmak amacıyla tasarlanmıştır. Uygulama, yalnızca bilgi amaçlıdır ve herhangi bir tıbbi tavsiye niteliği taşımaz.
        </Text>

        <Text style={styles.sectionTitle}>3. Hesap ve Güvenlik</Text>
        <Text style={styles.text}>
          Kullanıcılar, hesap oluştururken doğru ve güncel bilgiler vermekle yükümlüdür. Hesabınızın güvenliğini sağlamak için şifrenizi gizli tutun.
        </Text>

        <Text style={styles.sectionTitle}>4. Üçüncü Taraf Bağlantıları</Text>
        <Text style={styles.text}>
          Uygulama, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriklerinden ve gizlilik uygulamalarından sorumlu değiliz.
        </Text>

        <Text style={styles.sectionTitle}>5. Sorumluluk Reddi</Text>
        <Text style={styles.text}>
          Makro Calculator, sağlanan bilgilerin doğruluğunu garanti etmez. Kullanıcılar, uygulamayı kullanırken kendi sorumlulukları altında hareket ederler.
        </Text>

        <Text style={styles.sectionTitle}>6. Veri Gizliliği</Text>
        <Text style={styles.text}>
          Kişisel bilgilerinizin gizliliğine saygı gösteriyoruz ve Gizlilik Politikamız uyarınca koruma altına alıyoruz. Gizlilik Politikamızı inceleyin.
        </Text>
        <TouchableOpacity
          onPress={() => openLink('https://example.com/privacy-policy')}>
          <Text style={styles.link}>Gizlilik Politikası</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>7. Değişiklikler</Text>
        <Text style={styles.text}>
          Bu Kullanım Koşulları, zaman zaman güncellenebilir. Güncellemelerden haberdar olmak için bu sayfayı düzenli olarak kontrol edin.
        </Text>

        <Text style={styles.sectionTitle}>8. İletişim</Text>
        <Text style={styles.text}>
          Herhangi bir sorunuz veya geri bildiriminiz varsa, bizimle iletişime geçebilirsiniz:
        </Text>
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
  marginBottom: 20,
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
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default SettingsTermsConditionsScreen;