"use client";

import { CircularProgress, Typography, Alert, FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import generatePDF from "react-to-pdf";
import AddressForm from "./components/AddressForm";
import MedicalHistory, { FormGrid } from "./components/MedicalHistory";
import ValidatedInput from "./components/ValidatedInput";
import { useTranslation } from "./useTranslation";
import { collectFormData } from "./utils/collectFormData";
import { generatePdf } from "./utils/generatePdf";

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    //@ts-ignore
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function cleanBase64(base64String: string): string {
  return base64String.replace(/^data:application\/\w+;base64,/, "");
}

export default function Checkout() {
  const { t, language, setLanguage } = useTranslation();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [showSignatureImage, setShowSignatureImage] = useState(false);
  const signatureBoxRef = useRef<HTMLDivElement>(null);

  // Обязательные поля для проверки
  const requiredFields = [
    { id: 'first-name', name: 'firstName' },
    { id: 'last-name', name: 'lastName' },
    { id: 'phone', name: 'phone' },
    { id: 'dateOfBirth', name: 'dateOfBirth' },
    { id: 'date', name: 'date' }
  ];

  // Функция для валидации формы
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Проверка обязательных полей
    requiredFields.forEach(field => {
      const element = document.getElementById(field.id) as HTMLInputElement;
      if (!element || !element.value.trim()) {
        errors[field.name] = t("validation.required");
        console.log(`Field ${field.id} failed validation`);
      }
    });
    
    // Проверка подписи - учитываем как canvas, так и сохраненные данные
    const hasSignature = signatureData !== null || 
                        (signatureRef.current && !signatureRef.current.isEmpty());
    
    if (!hasSignature) {
      errors.signature = t("validation.signatureRequired");
      console.log('Signature failed validation');
    }

    // Проверка соглашений убрана, они теперь необязательны
    
    console.log('Validation errors:', errors);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Обработка изменения подписи
  const handleSignatureBegin = () => {
    // Удаляем ошибку валидации при начале рисования подписи
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.signature;
      return newErrors as Record<string, string>;
    });
  };

  const handleSignatureEnd = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      // Сохраняем данные подписи
      setSignatureData(signatureRef.current.toDataURL());
    }
  };

  // Функция активации области подписи
  const activateSignatureArea = () => {
    if (signatureBoxRef.current) {
      signatureBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Фокусируемся на canvas
      setTimeout(() => {
        const canvas = signatureRef.current?.getCanvas();
        if (canvas) {
          canvas.focus();
        }
      }, 100);
    }
  };

  // При потере видимости canvas, показываем image
  useEffect(() => {
    if (!signatureData) return;
    
    // Функция проверки видимости элемента
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    
    const checkVisibility = () => {
      const canvas = signatureRef.current?.getCanvas();
      if (canvas) {
        if (!isInViewport(canvas)) {
          // Canvas не виден - показываем изображение
          setShowSignatureImage(true);
        } else {
          // Canvas в поле зрения - скрываем изображение и активируем canvas
          setShowSignatureImage(false);
        }
      }
    };
    
    // Проверяем при скролле, изменении размера окна и изначально
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    // Для поддержки мобильных устройств
    window.addEventListener('touchmove', checkVisibility);
    window.addEventListener('touchend', checkVisibility);
    
    // Проверяем при первом рендере
    checkVisibility();
    
    // Создаем интервал для периодической проверки (для iPad Safari)
    const interval = setInterval(checkVisibility, 1000);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      window.removeEventListener('touchmove', checkVisibility);
      window.removeEventListener('touchend', checkVisibility);
      clearInterval(interval);
    };
  }, [signatureData]);

  // При нажатии на canvas или начале рисования - скрываем изображение
  const handleCanvasActive = () => {
    setShowSignatureImage(false);
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureData(null);
      setShowSignatureImage(false);
    }
  };

  const handleSubmit = async () => {
    // Проверяем валидность формы перед отправкой
    if (!validateForm()) {
      // Если есть ошибки валидации, показываем сообщение и останавливаем отправку
      
      // Прокручиваем страницу к первому элементу с ошибкой
      for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (validationErrors[field.name] && element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
      
      // Проверяем другие элементы с ошибками, если не нашли среди обязательных полей
      if (validationErrors.signature) {
        const signatureCanvas = document.querySelector('.signature-canvas');
        if (signatureCanvas) {
          signatureCanvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      return;
    }

    setIsSubmitting(true);
    try {
      // Собираем данные формы
      const formData = collectFormData(language, signatureRef);
      
      // Если подпись в canvas пуста, но у нас есть сохраненная подпись, используем её
      if (signatureRef.current && signatureRef.current.isEmpty() && signatureData) {
        formData.signature = signatureData;
      }
      
      console.log('Form data collected:', formData);
      
      // Генерируем PDF с полями вместо скриншота
      const pdfBuffer = await generatePdf(formData);
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      
      const firstName =
        (document.getElementById("first-name") as HTMLInputElement)?.value ||
        "";
      const lastName =
        (document.getElementById("last-name") as HTMLInputElement)?.value || "";
      const fullName = `${firstName} ${lastName}`.trim();
      console.log(fullName);
      
      // Отправляем PDF на сервер
      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfBlob: cleanBase64(await blobToBase64(blob)),
          fullName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(t("checkout.errorSendingEmail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillTestData = () => {
    // Заполняем основные поля
    const testData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'legalRepresentative': 'John Doe',
      'email': 'john.doe@example.com',
      'phone': '+421 900 123 456',
      'address': 'Test Street 123',
      'city': 'Bratislava',
      'zipCode': '831 02',
      'country': 'Slovakia',
      'identificationNumber': '123456/7890',
      'dateOfBirth': '01.01.1990',
      'date': new Date().toLocaleDateString('sk-SK'),
      'currentMedicationsDetails': 'Test medications',
      'adverseReactionDetails': 'Test reaction',
      'otherDiseasesDetails': 'Test other diseases',
      'medicationsDetails': 'Test allergies',
      'otherAllergiesDetails': 'Test other allergies',
      'bleedingDetails': 'Test bleeding',
      'cancerDetails': 'Test cancer',
      'smokingDetails': 'Test smoking',
      'hivDetails': 'Test HIV',
      'pregnancyDetails': 'Test pregnancy',
      'contraceptionDetails': 'Test contraception'
    };

    // Заполняем все текстовые поля
    Object.entries(testData).forEach(([id, value]) => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.value = value;
        // Триггерим событие изменения для валидации
        element.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Отмечаем все чекбоксы
    const checkboxes = [
      'currentMedications', 'adverseReaction', 'hepatitis', 'tuberculosis', 'std',
      'rheumaticFever', 'heartDisease', 'kidneyDisease', 'highBloodPressure',
      'respiratoryDisease', 'diabetes', 'thyroidDisease', 'epilepsy',
      'bloodDisorders', 'psychiatricDisorders', 'congenitalDefects',
      'hereditaryDiseases', 'osteoporosis', 'medications', 'otherAllergies',
      'bleeding', 'cancer', 'smoking', 'hiv', 'pregnancy', 'contraception',
      'agreementSmsAndEmail', 'agreementNotify'
    ];

    checkboxes.forEach(id => {
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
        // Создаем и диспатчим событие change
        const event = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(event);
        // Также диспатчим событие click для Material-UI
        const clickEvent = new MouseEvent('click', { bubbles: true });
        checkbox.dispatchEvent(clickEvent);
      }
    });
  };

  const handleAgreementChange = (field: string) => {
    // Удаляем ошибку валидации при изменении состояния чекбокса
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Проверяет, есть ли реальные ошибки в объекте validationErrors
  const hasValidationErrors = () => {
    const errors = Object.values(validationErrors);
    return errors.length > 0 && errors.some(error => error !== undefined && error !== '');
  };

  return (
    <>
      <CssBaseline enableColorScheme />

      <Grid
        container
        sx={{
          height: "100%",
          mt: {
            xs: 4,
            sm: 0,
          },
          justifyContent: "center",
          alignItems: "flex-start",
          pb: 8,
        }}
      >
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "center",
            pt: { xs: 0, sm: 8 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={fillTestData}
              size="small"
              sx={{ minWidth: 120 }}
            >
              Fill Test Data
            </Button>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              size="small"
              sx={{
                minWidth: 120,
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="sk">Slovenský</MenuItem>
            </Select>
          </Box>

          <Box
            id="form-container"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "1000px",
              maxWidth: { sm: "100%", md: 600 },
              gap: 4,
            }}
          >
            <AddressForm t={t} validationErrors={validationErrors} />
            <MedicalHistory t={t} validationErrors={validationErrors} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              {t("medicalHistory.date")}
            </Typography>
            <ValidatedInput
              id="date"
              size="small"
              placeholder="12.01.2025"
              sx={{ mt: 1, mb: 2 }}
              validationType="date"
              errorMessage={validationErrors.date}
            />
            <Box
              sx={{
                width: "100%",
                "& canvas": {
                  width: "100% !important",
                  height: "200px !important",
                  border: "1px solid #ccc",
                },
              }}
            >
              <FormGrid size={{ xs: 12 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  {t("medicalHistory.agreementOnNotify")}
                </Typography>
              </FormGrid>
              <FormControlLabel
                control={
                  <Checkbox 
                    id="agreementSmsAndEmail" 
                    onChange={() => handleAgreementChange('agreementSmsAndEmail')}
                  />
                }
                label={t("medicalHistory.agreementSmsAndEmail")}
              />
              {validationErrors.agreementSmsAndEmail && (
                <FormHelperText error>{validationErrors.agreementSmsAndEmail}</FormHelperText>
              )}
              <FormControlLabel
                control={
                  <Checkbox 
                    id="agreementNotify" 
                    onChange={() => handleAgreementChange('agreementNotify')} 
                  />
                }
                label={t("medicalHistory.agreementNotify")}
              />
              {validationErrors.agreementNotify && (
                <FormHelperText error>{validationErrors.agreementNotify}</FormHelperText>
              )}
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                {t("medicalHistory.signatureApprove")}
              </Typography>

              <Box 
                position="relative" 
                ref={signatureBoxRef}
                sx={{
                  width: "100%",
                  height: "200px",
                  border: validationErrors.signature ? "1px solid red" : "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                onClick={activateSignatureArea}
                onTouchStart={activateSignatureArea}
              >
                {/* Области для подписи */}
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  canvasProps={{
                    className: "signature-canvas",
                    style: {
                      touchAction: "none",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 2,
                    },
                    onClick: handleCanvasActive,
                  }}
                  onBegin={handleSignatureBegin}
                  onEnd={handleSignatureEnd}
                />
                
                {/* Отображаем изображение подписи, когда canvas не в фокусе */}
                {signatureData && showSignatureImage && (
                  <img 
                    src={signatureData} 
                    alt="Signature"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
              
              {validationErrors.signature && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {validationErrors.signature}
                </Alert>
              )}
                
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ opacity: 0.5, textAlign: "center", cursor: "pointer" }}
                onClick={activateSignatureArea}
              >
                {t("medicalHistory.signatureType")}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={clearSignature}
                sx={{ mt: 1 }}
              >
                {t("medicalHistory.clearSignature")}
              </Button>
            </Box>
          </Box>

          {hasValidationErrors() && (
            <Alert severity="error" sx={{ width: '100%', maxWidth: { sm: "100%", md: 600 }, mb: 2 }}>
              {t("validation.formErrors")}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{ width: { xs: "100%", sm: "auto" }, position: "relative" }}
            >
              {t("checkout.submit")}
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
