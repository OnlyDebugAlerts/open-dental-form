import { pdf } from '@react-pdf/renderer';
import FormPdf from '../components/FormPdf';
import React from 'react';
import { DocumentProps } from '@react-pdf/renderer';

interface FormData {
  firstName?: string;
  lastName?: string;
  legalRepresentative?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  identificationNumber?: string;
  dateOfBirth?: string;
  currentMedications?: boolean;
  currentMedicationsDetails?: string;
  adverseReaction?: boolean;
  adverseReactionDetails?: string;
  hepatitis?: boolean;
  hepatitisDetails?: string;
  tuberculosis?: boolean;
  tuberculosisDetails?: string;
  std?: boolean;
  stdDetails?: string;
  rheumaticFever?: boolean;
  rheumaticFeverDetails?: string;
  heartDisease?: boolean;
  heartDiseaseDetails?: string;
  kidneyDisease?: boolean;
  kidneyDiseaseDetails?: string;
  highBloodPressure?: boolean;
  highBloodPressureDetails?: string;
  respiratoryDisease?: boolean;
  respiratoryDiseaseDetails?: string;
  diabetes?: boolean;
  diabetesDetails?: string;
  thyroidDisease?: boolean;
  thyroidDiseaseDetails?: string;
  epilepsy?: boolean;
  epilepsyDetails?: string;
  bloodDisorders?: boolean;
  bloodDisordersDetails?: string;
  psychiatricDisorders?: boolean;
  psychiatricDisordersDetails?: string;
  congenitalDefects?: boolean;
  congenitalDefectsDetails?: string;
  hereditaryDiseases?: boolean;
  hereditaryDiseasesDetails?: string;
  osteoporosis?: boolean;
  osteoporosisDetails?: string;
  allergiesMedications?: boolean;
  allergiesMedicationsDetails?: string;
  otherAllergies?: boolean;
  otherAllergiesDetails?: string;
  bleeding?: boolean;
  cancer?: boolean;
  smoking?: boolean;
  smokingDetails?: string;
  hiv?: boolean;
  pregnancy?: boolean;
  pregnancyDetails?: string;
  contraception?: boolean;
  agreementSmsAndEmail?: boolean;
  agreementNotify?: boolean;
  date?: string;
  signature?: string;
  language?: 'en' | 'ru' | 'sk';
}

export async function generatePdf(formData: FormData): Promise<Blob> {
  try {
    // Create the document element
    const MyDoc = React.createElement(FormPdf, { formData }) as React.ReactElement<DocumentProps>;
    
    // Use the pdf API to generate a blob directly (works in browser)
    const blob = await pdf(MyDoc).toBlob();
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
} 