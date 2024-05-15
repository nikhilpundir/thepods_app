import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { ReportContext } from '../context/ReportContext';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';

const AdminReportScreen = () => {
  const { isLoading,allUsers,getAllUsers,clearData,allBookings,getAllBookings } = useContext(ReportContext);
  const { logout} = useContext(AuthContext);
  const handleLogout = () => {
    clearData();
    logout();

  }
  const handleTask1 = async () => {
    await getAllUsers();
    const userData = allUsers ;
    if (userData) {
    
    const htmlContent = generateHTMLTable(userData.users);

    try {
      const options = {
        html: htmlContent,
        fileName: 'Task1Report',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      Toast.show({
        type: 'success',
        text1: 'PDF generated'
    });
      console.log('PDF generated:', pdf.filePath);

      // Open the PDF file
      openPDF(pdf.filePath);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error generating PDF'
    });
      console.error('Error generating PDF:', error);
    }
  }else {
    console.log('No user data received'); // Log a message if no user data is received
  }
  };
  const handleTask2 = async () => {
    getAllBookings();
    const bookingData = allBookings ;
    if (bookingData) {
    
    const htmlContent = generateBookingHTMLTable(bookingData.bookings);

    try {
      const options = {
        html: htmlContent,
        fileName: 'Task1Report',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      Toast.show({
        type: 'success',
        text1: 'PDF generated'
    });
      console.log('PDF generated:', pdf.filePath);

      // Open the PDF file
      openPDF(pdf.filePath);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error generating PDF'
    });
      console.error('Error generating PDF:', error);
    }
  }else {
    console.log('No user data received'); // Log a message if no user data is received
  }
  };
  
  const generateBookingHTMLTable = (schema) => {
    // Define the table header
    let htmlContent = `
      <html>
        <head>
          <style>
            /* CSS styles for the table */
            table {
              width: 100%;
              border-collapse: collapse;
            }
  
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
  
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1>Booking Data Report</h1>
          <table>
            <tr>
              <th>User ID</th>
              <th>Payment ID</th>
              <th>Booking Date</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Number of Classic Pods</th>
              <th>Number of Women Pods</th>
              <th>Number of Premium Pods</th>
              <th>Is Cancelled</th>
            </tr>
    `;
    // Iterate over each schema field and add table rows
    schema?.forEach(field => {
      htmlContent += `
        <tr>
          <td>${field.userId}</td>
          <td>${field.paymentId}</td>
          <td>${new Date(field.bookingDate).toLocaleDateString()}</td>
          <td>${new Date(field.checkIn).toLocaleDateString()}</td>
          <td>${new Date(field.checkOut).toLocaleDateString()}</td>
          <td>${field.numberOfClassicPods}</td>
          <td>${field.numberOfWorkersPods}</td>
          <td>${field.numberOfPremiumPods}</td>
          <td>${field.isCancelled}</td>
        </tr>
      `;
    });
  
    // Close the table and body tags
    htmlContent += `
          </table>
        </body>
      </html>
    `;
  
    return htmlContent;
  };

  const openPDF = async (filePath) => {
    try {
      // Check if the file exists
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        console.error('PDF file does not exist:', filePath);
        return;
      }

      // Open the PDF file using the default application
      await Share.open({
        url: `file://${filePath}`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Error opening PDF'
    });
      
    }
  };
  const generateHTMLTable = (schema) => {
    
    // Define the table header
    let htmlContent = `
    <html>
      <head>
        <style>
          /* CSS styles for the table */
          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Users Data Report</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Deleted</th>
          </tr>
  `;
    // Iterate over each schema field and add table rows
    schema?.forEach(field => {
      htmlContent += `
        <tr>
        <td>${field._id}</td>
          <td>${field.name}</td>
          <td>${field.email}</td>
          <td>${field.verified}</td>
          <td>${field.isDeleted}</td>
        </tr>
      `;
    });

    // Close the table and body tags
    htmlContent += `
          </table>
        </body>
      </html>
    `;

    return htmlContent;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Reports</Text>
      <TouchableOpacity style={styles.button} onPress={handleTask1}>
        <Text style={styles.buttonText}>Generate Users Detail Report </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTask2}>
        <Text style={styles.buttonText}>Generate Booking Detail Report </Text>
      </TouchableOpacity>
      <Pressable onPress={handleLogout}>
    <View style={styles.logoutButtonContainer}>
    <Icon name="logout" size={23} color="white" />
      <Text style={styles.buttonText}>logout</Text>
    </View>
    </Pressable>
      {/* Other buttons and UI elements */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  buttonSubText: {
    color: '#ccc',
    fontSize: 14,
  },
  logoutButtonContainer:{
    backgroundColor:"red",
    display:"flex",
    flexDirection:"row",
    gap:10,
    padding:10,
    borderRadius:15
  }
});

export default AdminReportScreen;
