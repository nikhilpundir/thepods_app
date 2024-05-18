import React from 'react';
import { Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const PrivacyPolicy = ({ navigation }) => {
    const HandleBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={HandleBack} style={styles.backIcon}>
                <Icon name="angle-left" size={23} color="black" />
            </Pressable>
            <Text style={styles.heading}>Privacy Policy for ThePods Company</Text>
            <Text style={styles.paragraph}>
                At ThePods, we are dedicated to protecting your privacy and ensuring the confidentiality of your personal information. This Privacy Policy outlines our practices regarding the collection, use, disclosure, and protection of your personal data when you interact with our services, including our website, mobile application, and reservation systems.
            </Text>
            <Text style={styles.subHeading}>Collection of Information:</Text>
            <Text style={styles.paragraph}>
                We collect various types of information to provide and improve our services, personalize your experience, and fulfill your reservations. This may include:
            </Text>
            <Text style={styles.paragraph}>- Personal Information: such as your name, email address, contact number, billing details, and other information provided during the reservation process.</Text>
            <Text style={styles.paragraph}>- Device Information: including IP address, browser type, operating system, and device identifiers.</Text>
            <Text style={styles.paragraph}>- Usage Data: such as your interactions with our website, mobile application, and other services.</Text>
            <Text style={styles.subHeading}>Use of Information:</Text>
            <Text style={styles.paragraph}>
                We use the information we collect for the following purposes:
            </Text>
            <Text style={styles.paragraph}>- To process and confirm your reservations, including sending booking confirmations and updates.</Text>
            <Text style={styles.paragraph}>- To personalize your experience and provide tailored recommendations based on your preferences.</Text>
            <Text style={styles.paragraph}>- To communicate with you regarding your reservations, inquiries, feedback, and promotional offers.</Text>
            <Text style={styles.paragraph}>- To analyze usage trends, monitor the effectiveness of our marketing efforts, and improve our services.</Text>
            <Text style={styles.subHeading}>Disclosure of Information:</Text>
            <Text style={styles.paragraph}>
                We may share your personal information with third-party service providers, business partners, or affiliates who assist us in operating our business, providing services to you, or fulfilling your requests. These parties are contractually obligated to use your information only as necessary to provide the requested services and to adhere to applicable data protection laws.
            </Text>
            <Text style={styles.paragraph}>
                Additionally, we may disclose your information in response to legal requests, court orders, or government inquiries, or to protect our rights, property, or safety.
            </Text>
            <Text style={styles.subHeading}>Data Security:</Text>
            <Text style={styles.paragraph}>
                We employ industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security audits. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Text>
            <Text style={styles.subHeading}>Retention of Information:</Text>
            <Text style={styles.paragraph}>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. When we no longer require your information, we will securely delete or anonymize it to prevent unauthorized access.
            </Text>
            <Text style={styles.subHeading}>Your Rights:</Text>
            <Text style={styles.paragraph}>
                You have the right to access, update, or delete your personal information. You may also have the right to restrict or object to the processing of your data, as well as the right to data portability. To exercise these rights or for any inquiries regarding your personal information, please contact us using the information provided below.
            </Text>
            <Text style={styles.subHeading}>Changes to Privacy Policy:</Text>
            <Text style={styles.paragraph}>
                We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the revised Privacy Policy on our website or through other means. Your continued use of our services after any such changes constitutes acceptance of the revised Privacy Policy.
            </Text>
            <Text style={styles.subHeading}>Use of Cookies:</Text>
            <Text style={styles.paragraph}>
                We may use cookies and similar tracking technologies to enhance your browsing experience, analyze usage patterns, and deliver targeted advertisements. Cookies are small text files stored on your device that enable us to recognize your browser and remember certain information. You can control cookies through your browser settings and opt-out of targeted advertising by visiting the Network Advertising Initiative (NAI) opt-out page or the Digital Advertising Alliance (DAA) Consumer Choice page.
            </Text>

            <Text style={styles.subHeading}>Children's Privacy:</Text>
            <Text style={styles.paragraph}>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18 years of age. If we become aware that we have inadvertently collected personal information from a child under the age of 18, we will take steps to delete it as soon as possible.
            </Text>

            <Text style={styles.subHeading}>International Transfers:</Text>
            <Text style={styles.paragraph}>
                Your personal information may be transferred to and processed in countries outside of your jurisdiction, where data protection laws may differ from those in your country. By using our services, you consent to the transfer of your information to these countries for processing and storage in accordance with this Privacy Policy.
            </Text>

            <Text style={styles.subHeading}>Third-Party Links:</Text>
            <Text style={styles.paragraph}>
                Our services may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party sites. We recommend reviewing the privacy policies of any third-party sites you visit.
            </Text>

            
            <Text style={styles.subHeading}>Contact Us:</Text>
            <Text style={styles.paragraph}>
                If you have any questions, concerns, or feedback regarding this Privacy Policy or our privacy practices, please contact us at support@thepods.com.
            </Text>
            <Text style={styles.paragraph}>
                This Privacy Policy is effective as of 04/01/2024 and applies to all users of ThePods services.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        paddingVertical: 10,
        // paddingTop: 10,
        width: 60,
    },
    container: {
        padding: 20,
        backgroundColor: '#ffffff', // Optional: adjust as needed
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: "black"
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 20,
        color: "black"
    },
});

export default PrivacyPolicy;
