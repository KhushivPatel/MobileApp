import React, {createContext, useState, ReactNode, useContext} from 'react';
import {AuthContext} from './AuthContext';

// Define the structure for the student profile
export interface StudentProfile {
  PRN: number;
  LastName: string;
  FirstName: string;
  MotherName: string;
  EmailId: string;
  MobileNo: string;
  MiddleName: string;
  Gender: string;
  ReligionId: number;
  ReligionName: string;
  MaritalStatusId: number;
  MaritalStatus: string;
  MotherTongueName: string;
  DOB: string;
  HeightInCms: number;
  WeightInKgs: number;
  IsMajorThalassemiaStatus: string;
  IsNRI: string;
  CountryIdOfCitizenship: number;
  CitizenCountry: string;
  PermanentState: string;
  CurrentState: string;
  PermanentCityVillage: string;
  CurrentCityVillage: string;
  // Add any other fields you need
}

// Define the shape of the StudentProfileContext
export interface StudentProfileContext {
  studentProfile: StudentProfile | null;
  fetchStudentProfile: () => Promise<void>;
  setStudentProfile: (profile: StudentProfile) => void;
}

// Create the StudentProfileContext
export const StudentProfileContext = createContext<
  StudentProfileContext | undefined
>(undefined);

// Define the StudentProfileProvider component to wrap around the app
export const StudentProfileProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(
    null,
  );
  // Use the AuthContext to get the authToken
  const {authToken} = useContext(AuthContext);

  // Fetch the user's student profile from the API
  const fetchStudentProfile = async () => {
    try {
      if (!authToken) {
        console.error('Token is missing');
        return;
      }
      const response = await fetch(
        'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StudentProfileGet',
        {
          method: 'GET',
          headers: {
            accept: 'application/json, text/plain, */*',
            referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
            token: authToken,
          },
        },
      );

      const result = await response.json();
      if (response.ok && result.response_code === '200') {
        // Assuming "obj" contains the student profile
        setStudentProfile(result.obj[0]); // Adjusted to get the first object
      } else {
        console.error('Failed to fetch student profile', result);
      }
    } catch (error) {
      console.error('Error fetching student profile', error);
    }
  };

  // Provide student profile and methods for fetching and setting data via the context
  return (
    <StudentProfileContext.Provider
      value={{studentProfile, fetchStudentProfile, setStudentProfile}}>
      {children}
    </StudentProfileContext.Provider>
  );
};

// Custom hook to use the StudentProfileContext more easily
export const useStudentProfile = () => {
  const context = useContext(StudentProfileContext);
  if (!context) {
    throw new Error(
      'useStudentProfile must be used within a StudentProfileProvider',
    );
  }
  return context;
};
