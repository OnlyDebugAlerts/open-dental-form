interface FormData {
  [key: string]: any;
}

// Функция для извлечения данных формы из DOM
export const collectFormData = (language: string, signatureRef: any): FormData => {
  const formData: FormData = {
    language: language,
  };
  
  // Собираем данные из полей формы
  const collectInputValue = (id: string): string => {
    const element = document.getElementById(id) as HTMLInputElement;
    return element ? element.value : '';
  };
  
  // Проверка, отмечен ли чекбокс
  const isCheckboxChecked = (id: string): boolean => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    return checkbox ? checkbox.checked : false;
  };

  // Получаем значения из input полей
  formData.firstName = collectInputValue('first-name');
  formData.lastName = collectInputValue('last-name');
  formData.legalRepresentative = collectInputValue('legalRepresentative');
  formData.email = collectInputValue('email');
  formData.phone = collectInputValue('phone');
  formData.address = collectInputValue('address');
  formData.city = collectInputValue('city');
  formData.zipCode = collectInputValue('zipCode');
  formData.country = collectInputValue('country');
  formData.identificationNumber = collectInputValue('identificationNumber');
  formData.dateOfBirth = collectInputValue('dateOfBirth');
  formData.date = collectInputValue('date');
  
  // Собираем данные о медицинской истории
  formData.currentMedications = isCheckboxChecked('currentMedications');
  formData.currentMedicationsDetails = collectInputValue('currentMedicationsDetails');
  
  formData.adverseReaction = isCheckboxChecked('adverseReaction');
  formData.adverseReactionDetails = collectInputValue('adverseReactionDetails');
  
  // Болезни
  const diseases = [
    'hepatitis', 'tuberculosis', 'std', 'rheumaticFever', 'heartDisease',
    'kidneyDisease', 'highBloodPressure', 'respiratoryDisease', 'diabetes',
    'thyroidDisease', 'epilepsy', 'bloodDisorders', 'psychiatricDisorders',
    'congenitalDefects', 'hereditaryDiseases', 'osteoporosis'
  ];
  
  diseases.forEach(disease => {
    formData[disease] = isCheckboxChecked(disease);
    formData[`${disease}Details`] = collectInputValue(`${disease}Details`);
  });
  
  // Другие болезни
  formData.otherDiseases = collectInputValue('otherDiseasesDetails');
  
  // Аллергии и дополнительные вопросы
  formData.allergiesMedications = isCheckboxChecked('medications');
  formData.allergiesMedicationsDetails = collectInputValue('medicationsDetails');
  formData.otherAllergies = isCheckboxChecked('otherAllergies');
  formData.otherAllergiesDetails = collectInputValue('otherAllergiesDetails');
  formData.bleeding = isCheckboxChecked('bleeding');
  formData.bleedingDetails = collectInputValue('bleedingDetails');
  formData.cancer = isCheckboxChecked('cancer');
  formData.cancerDetails = collectInputValue('cancerDetails');
  formData.smoking = isCheckboxChecked('smoking');
  formData.smokingDetails = collectInputValue('smokingDetails');
  formData.hiv = isCheckboxChecked('hiv');
  formData.hivDetails = collectInputValue('hivDetails');
  formData.pregnancy = isCheckboxChecked('pregnancy');
  formData.pregnancyDetails = collectInputValue('pregnancyDetails');
  formData.contraception = isCheckboxChecked('contraception');
  formData.contraceptionDetails = collectInputValue('contraceptionDetails');
  
  // Соглашение на уведомления
  formData.agreementSmsAndEmail = isCheckboxChecked('agreementSmsAndEmail');
  formData.agreementNotify = isCheckboxChecked('agreementNotify');
  
  // Подпись
  if (signatureRef && signatureRef.current) {
    formData.signature = signatureRef.current.toDataURL();
  }
  
  return formData;
}; 