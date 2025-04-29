import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

Font.register({
  family: 'Noto Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@4.5.0/files/noto-sans-all-400-normal.woff' },
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@4.5.0/files/noto-sans-all-700-normal.woff', fontWeight: 'bold' },
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@4.5.0/files/noto-sans-all-400-italic.woff', fontStyle: 'italic' },
  ]
});

// Создаем стили
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Noto Sans', // Use Noto Sans
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clinicAddress: {
    fontSize: 12,
    marginBottom: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 5,
  },
  field: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    fontSize: 12,
    width: '60%',
  },
  signature: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
    width: '100%',
  },
  signatureContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 200,
  },
  signatureLine: {
    borderBottom: '1 solid #000',
    width: 200,
    marginTop: 50,
  },
  confirmation: {
    fontSize: 10,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

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

interface FormPdfProps {
  formData: FormData;
}

const FormPdf: React.FC<FormPdfProps> = ({ formData }) => {
  // Всегда используем словацкий язык для PDF, независимо от выбранного в формате
  const language = 'sk';

  // Multilingual texts
  const translations: Record<string, Record<string, string>> = {
    subtitle: {
      en: 'Patient medical history questionnaire',
      ru: 'Анкета истории болезни для пациента',
      sk: 'Dotazník o anamnéze pacienta'
    },
    personalInfo: {
      en: 'Personal Information',
      ru: 'Персональная информация',
      sk: 'Osobné údaje'
    },
    firstName: {
      en: 'First name:',
      ru: 'Имя:',
      sk: 'Meno:'
    },
    lastName: {
      en: 'Last name:',
      ru: 'Фамилия:',
      sk: 'Priezvisko:'
    },
    legalRepresentative: {
      en: 'Legal representative:',
      ru: 'Законный представитель:',
      sk: 'Zákonný zástupca:'
    },
    email: {
      en: 'Email:',
      ru: 'Эл. почта:',
      sk: 'Email:'
    },
    phone: {
      en: 'Phone:',
      ru: 'Телефон:',
      sk: 'Telefón:'
    },
    address: {
      en: 'Address:',
      ru: 'Адрес:',
      sk: 'Adresa:'
    },
    city: {
      en: 'City:',
      ru: 'Город:',
      sk: 'Mesto:'
    },
    zipCode: {
      en: 'Zip code:',
      ru: 'Почтовый индекс:',
      sk: 'PSČ:'
    },
    country: {
      en: 'Country:',
      ru: 'Страна:',
      sk: 'Krajina:'
    },
    identificationNumber: {
      en: 'Identification number:',
      ru: 'Идентификационный номер:',
      sk: 'Rodné číslo:'
    },
    dateOfBirth: {
      en: 'Date of birth:',
      ru: 'Дата рождения:',
      sk: 'Dátum narodenia:'
    },
    medicalHistory: {
      en: 'Medical History',
      ru: 'История болезни',
      sk: 'Zdravotná anamnéza'
    },
    currentMedications: {
      en: 'Current medications:',
      ru: 'Текущие лекарства:',
      sk: 'Aktuálne lieky:'
    },
    adverseReaction: {
      en: 'Adverse reaction:',
      ru: 'Побочные реакции:',
      sk: 'Nežiaduce reakcie:'
    },
    details: {
      en: 'Details:',
      ru: 'Подробности:',
      sk: 'Podrobnosti:'
    },
    diseases: {
      en: 'Diseases',
      ru: 'Болезни',
      sk: 'Ochorenia'
    },
    hepatitis: {
      en: 'Hepatitis:',
      ru: 'Гепатит:',
      sk: 'Hepatitída:'
    },
    tuberculosis: {
      en: 'Tuberculosis:',
      ru: 'Туберкулез:',
      sk: 'Tuberkulóza:'
    },
    std: {
      en: 'STD:',
      ru: 'ЗППП:',
      sk: 'Pohlavné choroby:'
    },
    rheumaticFever: {
      en: 'Rheumatic fever:',
      ru: 'Ревматическая лихорадка:',
      sk: 'Reumatická horúčka:'
    },
    heartDisease: {
      en: 'Heart disease:',
      ru: 'Болезни сердца:',
      sk: 'Srdcové ochorenia:'
    },
    kidneyDisease: {
      en: 'Kidney disease:',
      ru: 'Болезни почек:',
      sk: 'Ochorenie obličiek:'
    },
    highBloodPressure: {
      en: 'High blood pressure:',
      ru: 'Высокое кровяное давление:',
      sk: 'Vysoký krvný tlak:'
    },
    respiratoryDisease: {
      en: 'Respiratory disease:',
      ru: 'Заболевания дыхательной системы:',
      sk: 'Ochorenie dýchacích ciest:'
    },
    diabetes: {
      en: 'Diabetes:',
      ru: 'Диабет:',
      sk: 'Cukrovka:'
    },
    thyroidDisease: {
      en: 'Thyroid disease:',
      ru: 'Заболевания щитовидной железы:',
      sk: 'Ochorenie štítnej žľazy:'
    },
    epilepsy: {
      en: 'Epilepsy:',
      ru: 'Эпилепсия:',
      sk: 'Epilepsia:'
    },
    bloodDisorders: {
      en: 'Blood disorders:',
      ru: 'Нарушения крови:',
      sk: 'Poruchy krvi:'
    },
    psychiatricDisorders: {
      en: 'Psychiatric disorders:',
      ru: 'Психические расстройства:',
      sk: 'Psychiatrické poruchy:'
    },
    congenitalDefects: {
      en: 'Congenital defects:',
      ru: 'Врожденные дефекты:',
      sk: 'Vrodené vady:'
    },
    hereditaryDiseases: {
      en: 'Hereditary diseases:',
      ru: 'Наследственные заболевания:',
      sk: 'Dedičné ochorenia:'
    },
    osteoporosis: {
      en: 'Osteoporosis:',
      ru: 'Остеопороз:',
      sk: 'Osteoporóza:'
    },
    allergies: {
      en: 'Allergies',
      ru: 'Аллергии',
      sk: 'Alergie'
    },
    medications: {
      en: 'Medications:',
      ru: 'Лекарства:',
      sk: 'Lieky:'
    },
    otherAllergies: {
      en: 'Other allergies:',
      ru: 'Другие аллергии:',
      sk: 'Iné alergie:'
    },
    additionalQuestions: {
      en: 'Additional questions',
      ru: 'Дополнительные вопросы',
      sk: 'Ďalšie otázky'
    },
    bleeding: {
      en: 'Bleeding:',
      ru: 'Кровотечение:',
      sk: 'Krvácanie:'
    },
    cancer: {
      en: 'Cancer:',
      ru: 'Рак:',
      sk: 'Rakovina:'
    },
    smoking: {
      en: 'Smoking:',
      ru: 'Курение:',
      sk: 'Fajčenie:'
    },
    hiv: {
      en: 'HIV positive:',
      ru: 'ВИЧ-положительный:',
      sk: 'HIV pozitívny:'
    },
    questionsForWomen: {
      en: 'Questions for women',
      ru: 'Вопросы для женщин',
      sk: 'Otázky pre ženy'
    },
    pregnancy: {
      en: 'Pregnancy:',
      ru: 'Беременность:',
      sk: 'Tehotenstvo:'
    },
    contraception: {
      en: 'Contraception:',
      ru: 'Контрацепция:',
      sk: 'Antikoncepcia:'
    },
    notificationAgreement: {
      en: 'Notification Agreement',
      ru: 'Соглашение на уведомления',
      sk: 'Dohoda o oznámeniach'
    },
    smsAndEmail: {
      en: 'SMS and email notifications:',
      ru: 'Уведомления по SMS и email:',
      sk: 'SMS a emailové oznámenia:'
    },
    notificationsProcedures: {
      en: 'Notifications about procedures:',
      ru: 'Уведомления о процедурах:',
      sk: 'Oznámenia o procedúrach:'
    },
    date: {
      en: 'Date:',
      ru: 'Дата:',
      sk: 'Dátum:'
    },
    signature: {
      en: 'Signature:',
      ru: 'Подпись:',
      sk: 'Podpis:'
    },
    noSignature: {
      en: 'No signature provided',
      ru: 'Подпись не предоставлена',
      sk: 'Neposkytnutý žiadny podpis'
    },
    confirmation: {
      en: 'I confirm that all information provided is correct. I am obliged to report any change in health status or medication to the dentist without being asked.',
      ru: 'Я подтверждаю, что вся предоставленная информация верна. Я обязуюсь сообщать о любых изменениях в состоянии здоровья или лекарствах стоматологу без дополнительных вопросов.',
      sk: 'Potvrdzujem, že všetky poskytnuté informácie sú správne. Som povinný hlásiť akúkoľvek zmenu zdravotného stavu alebo liekov zubárovi bez vyzvania.'
    },
    yes: {
      en: 'Yes',
      ru: 'Да',
      sk: 'Áno'
    },
    no: {
      en: 'No',
      ru: 'Нет',
      sk: 'Nie'
    }
  };

  // Helper function to get translation
  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  // Map disease data with translations
  const diseaseList = [
    { name: t('hepatitis'), value: formData.hepatitis, details: formData.hepatitisDetails },
    { name: t('tuberculosis'), value: formData.tuberculosis, details: formData.tuberculosisDetails },
    { name: t('std'), value: formData.std, details: formData.stdDetails },
    { name: t('rheumaticFever'), value: formData.rheumaticFever, details: formData.rheumaticFeverDetails },
    { name: t('heartDisease'), value: formData.heartDisease, details: formData.heartDiseaseDetails },
    { name: t('kidneyDisease'), value: formData.kidneyDisease, details: formData.kidneyDiseaseDetails },
    { name: t('highBloodPressure'), value: formData.highBloodPressure, details: formData.highBloodPressureDetails },
    { name: t('respiratoryDisease'), value: formData.respiratoryDisease, details: formData.respiratoryDiseaseDetails },
    { name: t('diabetes'), value: formData.diabetes, details: formData.diabetesDetails },
    { name: t('thyroidDisease'), value: formData.thyroidDisease, details: formData.thyroidDiseaseDetails },
    { name: t('epilepsy'), value: formData.epilepsy, details: formData.epilepsyDetails },
    { name: t('bloodDisorders'), value: formData.bloodDisorders, details: formData.bloodDisordersDetails },
    { name: t('psychiatricDisorders'), value: formData.psychiatricDisorders, details: formData.psychiatricDisordersDetails },
    { name: t('congenitalDefects'), value: formData.congenitalDefects, details: formData.congenitalDefectsDetails },
    { name: t('hereditaryDiseases'), value: formData.hereditaryDiseases, details: formData.hereditaryDiseasesDetails },
    { name: t('osteoporosis'), value: formData.osteoporosis, details: formData.osteoporosisDetails },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.clinicName}>Open Dental Clinic</Text>
          <Text style={styles.clinicAddress}>Clinic, s. r. o.</Text>
          <Text style={styles.clinicAddress}>Sliačska 13902/1A</Text>
          <Text style={styles.clinicAddress}>831 02 Bratislava</Text>
        </View>

        {/* Заголовок формы */}
        <Text style={styles.title}>
          Zdravotný záznam osoby v špecializovanej ambulancii zubného lekárstva
        </Text>
        {/* Персональная информация */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('personalInfo')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('firstName')}</Text>
            <Text style={styles.value}>{formData.firstName || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('lastName')}</Text>
            <Text style={styles.value}>{formData.lastName || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('legalRepresentative')}</Text>
            <Text style={styles.value}>{formData.legalRepresentative || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('email')}</Text>
            <Text style={styles.value}>{formData.email || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('phone')}</Text>
            <Text style={styles.value}>{formData.phone || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('address')}</Text>
            <Text style={styles.value}>{formData.address || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('city')}</Text>
            <Text style={styles.value}>{formData.city || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('zipCode')}</Text>
            <Text style={styles.value}>{formData.zipCode || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('country')}</Text>
            <Text style={styles.value}>{formData.country || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('identificationNumber')}</Text>
            <Text style={styles.value}>{formData.identificationNumber || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('dateOfBirth')}</Text>
            <Text style={styles.value}>{formData.dateOfBirth || ''}</Text>
          </View>
        </View>

        {/* Медицинская история */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('medicalHistory')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('currentMedications')}</Text>
            <Text style={styles.value}>{formData.currentMedications ? t('yes') : t('no')}</Text>
          </View>
          {formData.currentMedicationsDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.currentMedicationsDetails}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>{t('adverseReaction')}</Text>
            <Text style={styles.value}>{formData.adverseReaction ? t('yes') : t('no')}</Text>
          </View>
          {formData.adverseReactionDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.adverseReactionDetails}</Text>
            </View>
          )}
        </View>

        {/* Болезни */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('diseases')}</Text>
          {diseaseList.map((disease, index) => (
            <React.Fragment key={index}>
              <View style={styles.field}>
                <Text style={styles.label}>{disease.name}</Text>
                <Text style={styles.value}>{disease.value ? t('yes') : t('no')}</Text>
              </View>
              {disease.details && (
                <View style={styles.field}>
                  <Text style={styles.label}>{t('details')}</Text>
                  <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{disease.details}</Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Аллергии */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('allergies')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('medications')}</Text>
            <Text style={styles.value}>{formData.allergiesMedications ? t('yes') : t('no')}</Text>
          </View>
          {formData.allergiesMedicationsDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.allergiesMedicationsDetails}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>{t('otherAllergies')}</Text>
            <Text style={styles.value}>{formData.otherAllergies ? t('yes') : t('no')}</Text>
          </View>
          {formData.otherAllergiesDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.otherAllergiesDetails}</Text>
            </View>
          )}
        </View>

        {/* Дополнительные вопросы */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('additionalQuestions')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('bleeding')}</Text>
            <Text style={styles.value}>{formData.bleeding ? t('yes') : t('no')}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('cancer')}</Text>
            <Text style={styles.value}>{formData.cancer ? t('yes') : t('no')}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('smoking')}</Text>
            <Text style={styles.value}>{formData.smoking ? t('yes') : t('no')}</Text>
          </View>
          {formData.smokingDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.smokingDetails}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>{t('hiv')}</Text>
            <Text style={styles.value}>{formData.hiv ? t('yes') : t('no')}</Text>
          </View>
        </View>

        {/* Вопросы для женщин */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('questionsForWomen')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('pregnancy')}</Text>
            <Text style={styles.value}>{formData.pregnancy ? t('yes') : t('no')}</Text>
          </View>
          {formData.pregnancyDetails && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('details')}</Text>
              <Text style={[styles.value, { fontFamily: 'Noto Sans' }]}>{formData.pregnancyDetails}</Text>
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>{t('contraception')}</Text>
            <Text style={styles.value}>{formData.contraception ? t('yes') : t('no')}</Text>
          </View>
        </View>

        {/* Соглашение на уведомления */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('notificationAgreement')}</Text>
          <View style={styles.field}>
            <Text style={styles.label}>{t('smsAndEmail')}</Text>
            <Text style={styles.value}>{formData.agreementSmsAndEmail ? t('yes') : t('no')}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>{t('notificationsProcedures')}</Text>
            <Text style={styles.value}>{formData.agreementNotify ? t('yes') : t('no')}</Text>
          </View>
        </View>

        {/* Подтверждение */}
        <Text style={styles.confirmation}>
          {t('confirmation')}
        </Text>
        
        {/* Дата и подпись в одной строке */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
          {/* Дата слева */}
          <View style={{ width: '45%' }}>
            <Text style={styles.label}>{t('date')}</Text>
            <Text style={styles.value}>{formData.date || ''}</Text>
          </View>
          
          {/* Подпись справа */}
          <View style={{ width: '45%', alignItems: 'flex-end' }}>
            <Text style={[styles.label, { textAlign: 'center' }]}>{t('signature')}</Text>
            {formData.signature ? (
              <Image
                src={formData.signature}
                style={{ width: 200, height: 50 }}
              />
            ) : (
              <Text style={styles.value}>{t('noSignature')}</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FormPdf; 