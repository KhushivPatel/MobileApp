import React, {createContext, useState, ReactNode, useContext} from 'react';

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

  // Fetch the user's programme details from the API
  const fetchProgrammeDetails = async () => {
    try {
      const response = await fetch(
        'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet',
        {
          method: 'GET', // or POST depending on your API method
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
            browser: 'chrome',
            browserversion: 'not known',
            city: 'not known',
            'content-type': 'application/json',
            device: 'unknown',
            macaddress: 'not known',
            origin: 'https://admission.msubaroda.ac.in',
            os: 'windows',
            osversion: 'not known',
            priority: 'u=1, i',
            referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
            'sec-ch-ua':
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            sourceip: '',
            token:
              '|zIdI[R|O-cs\\2J|zIdI[R|:2442358;4|zIdI[R|\\5KiUlqP[zIJ[ScTZuY5nCxNR', // Add your token here if needed
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
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
