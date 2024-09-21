/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, useColorScheme, Image, ScrollView} from 'react-native';
import createStyles from './Recipt'; // Import the separated styles

const E_recipt: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const commonFees = Array(10).fill('hi');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>E-Receipt</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.maincontainer}>
          <View style={styles.reciptnamedetail}>
            <View style={styles.leftView}>
              <Text style={styles.numbertext}>Receipt No.</Text>
              <Text style={styles.number}>hi</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.rightView, {alignItems: 'flex-end'}]}>
              <Text style={styles.numbertext}>Payment Date</Text>
              <Text style={styles.number}>hi</Text>
            </View>
          </View>

          <View style={styles.msucontainer}>
            <Image
              source={require('../../../../assets/images/logo2.png')}
              style={styles.msulogo}
            />
            <Text style={styles.msu}>
              The Maharaja Sayajirao University, Baroda
            </Text>
            <Text style={styles.recipttext}>hi</Text>
          </View>

          {/* Details container */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>Academic Year</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>PRN</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
          </View>
          {/* Continue displaying other details */}
          <View style={styles.detailsContainer}>
            <View style={styles.Course}>
              <Text style={styles.detailtextbold}>Faculty Name</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>Name</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
          </View>
          {/* Continue displaying other details */}
          <View style={styles.detailsContainer}>
            <View style={styles.Course}>
              <Text style={styles.detailtextbold}>Course Name</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>Mobile No..</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
          </View>
          {/* Continue displaying other details */}
          <View style={styles.detailsContainer}>
            <View style={styles.Course}>
              <Text style={styles.detailtextbold}>Course Year</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>Fees Name</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
          </View>
          {/* Continue displaying other details */}
          <View style={styles.detailsContainer}>
            <View style={styles.Course}>
              <Text style={styles.detailtextbold}>Building Name</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtextbold}>Installment No.</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailtext}>hi</Text>
            </View>
          </View>

          {/* Additional details */}
          <View style={styles.reciptnamedetail}>
            <View style={styles.leftView}>
              <Text style={styles.numbertext}>Total Amount</Text>
              <Text style={styles.number}>hi</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.rightView}>
              <Text style={styles.numbertext}>Amount Paid</Text>
              <Text style={styles.number}>hi</Text>
            </View>
          </View>
          {/*  */}
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text
                style={[
                  styles.feeHeaderTextBold,
                  {fontSize: 14, fontWeight: 'bold'},
                ]}>
                Fee Head
              </Text>
            </View>
            <View style={styles.feeItem}>
              <Text
                style={[
                  styles.feeHeaderTextBold,
                  {fontSize: 14, fontWeight: 'bold'},
                ]}>
                Fee Sub Head
              </Text>
            </View>
            <View style={styles.feeItem1}>
              <Text
                style={[
                  styles.feeHeaderTextBold,
                  {fontSize: 14, fontWeight: 'bold'},
                ]}>
                Amount
              </Text>
            </View>
          </View>
          {/* amount details by stap */}
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>Tuition Fees</Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          {commonFees.map((header, index) => (
            <View key={index} style={styles.feeTotalsContainer}>
              <View style={styles.feeHeader}>
                <Text style={styles.feeHeaderTextBold}>Common Fee</Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeHeaderTextBold}>hi</Text>
              </View>
              <View style={styles.feeItem1}>
                <Text style={styles.feeHeaderTextBold}>hi</Text>
              </View>
            </View>
          ))}
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>Other Fees</Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>Fine/Late Fees</Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>Examination Fees</Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>
                Foreign Students Assistance Fees
              </Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          <View style={styles.feeTotalsContainer}>
            <View style={styles.feeHeader}>
              <Text style={styles.feeHeaderTextBold}>
                Foreign Students Coordination Fees (ICCR)
              </Text>
            </View>
            <View style={styles.feeItem}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
            <View style={styles.feeItem1}>
              <Text style={styles.feeHeaderTextBold}>hi</Text>
            </View>
          </View>
          {/* amount details by stap */}

          {/* amount details by stap */}
          <View style={styles.reciptnamedetail}>
            <View style={styles.leftView}>
              <Text style={styles.numbertext}>Total Amount</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.rightView}>
              <Text style={styles.numbertext}>hi</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default E_recipt;
