import React, {createContext, useState, ReactNode, useContext} from 'react';
import {AuthContext} from './AuthContext';

// Define the structure for the user details
export interface ProgrammeDetails {
  ProgrammeId: number;
  ProgrammeName: string;
  EligibilityByAcademics: string;
  AdminRemarkByAcademics: string;
  PTAdmList: Array<{
    PRN: number;
    StudentAdmissionId: number;
    StudentName: string;
    FacultyName: string;
    ProgrammeId: number;
    InstPTId: number;
    InstancePartTermName: string;
    InstancePartName: string;
    ProgrammeInstanceId: number;
    InstanceName: string;
    BranchName: string;
    AcademicYearCode: string;
    PartTermStatus: string;
    PartStatus: string;
    FeeStatus: string;
    IsPaperSelByStudent: boolean;
    IsPaperSelBeforeFees: boolean;
    IsFullyPaid: number;
    PTFeeStatus: string;
    psBtnVisibility: boolean;
    flag: boolean;
    PSPTVisibility: string;
    PartTerm2: number;
    PartTerm2Name: string;
    NEPBasedProgram: boolean;
    PaperBtnVisibilityforFY: boolean;
    IsAnySemPaperSelected: boolean;
    ConfirmBtnVisibility: boolean;
    IsConfirmSelectionDone: boolean;
    SequenceNo: number;
    IsPreferenceRequired: boolean;
  }>;
}

// Define the shape of the UserDetailContext
export interface UserDetailContextType {
  programmeDetails: ProgrammeDetails[] | null;
  fetchProgrammeDetails: () => Promise<void>;
  setProgrammeDetails: (details: ProgrammeDetails[]) => void;
}

// Create the UserDetailContext
export const UserDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);

// Define the UserDetailProvider component to wrap around the app
export const UserDetailProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [programmeDetails, setProgrammeDetails] = useState<
    ProgrammeDetails[] | null
  >(null);
  // Use the AuthContext to get the authToken
  const { authToken } = useContext(AuthContext);


  // Fetch the user's programme details from the API
  const fetchProgrammeDetails = async () => {
    try {
         if (!authToken) {
           console.error('Token is missing');
           return;
         }
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet',
        {
          method: 'GET',
          headers: {
            accept: 'application/json, text/plain, */*',
            referer: 'http://172.25.15.22/',
            token: authToken,
          },
        },
      );

      const result = await response.json();
      if (response.ok && result.response_code === '200') {
        setProgrammeDetails(result.obj); // Assuming "obj" contains the array of programmes
      } else {
        console.error('Failed to fetch programme details', result);
      }
    } catch (error) {
      console.error('Error fetching programme details', error);
    }
  };

  // Provide programme details and methods for fetching and setting data via the context
  return (
    <UserDetailContext.Provider
      value={{programmeDetails, fetchProgrammeDetails, setProgrammeDetails}}>
      {children}
    </UserDetailContext.Provider>
  );
};

// Custom hook to use the UserDetailContext more easily
export const useUserDetails = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailProvider');
  }
  return context;
};
