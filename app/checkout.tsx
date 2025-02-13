"use client";

import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import generatePDF from "react-to-pdf";
import AddressForm from "./components/AddressForm";
import MedicalHistory, { FormGrid } from "./components/MedicalHistory";
import ValidatedInput from "./components/ValidatedInput";
import { useTranslation } from "./useTranslation";

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formContainer = document.getElementById("form-container");
      if (!formContainer) {
        throw new Error("Form container not found");
      }

      const inputElements = formContainer.querySelectorAll("input");
      const placeholdersBackup: {
        element: HTMLInputElement;
        placeholder: string | null;
      }[] = [];

      inputElements.forEach((input) => {
        if (input.hasAttribute("placeholder")) {
          placeholdersBackup.push({
            element: input,
            placeholder: input.getAttribute("placeholder"),
          });
          input.removeAttribute("placeholder");
        }
      });
      let result;
      try {
        result = await generatePDF(() => formContainer, {
          page: {
            margin: 2,
          },
          resolution: 2,
          overrides: {
            pdf: {
              compress: true,
            },
            canvas: {
              useCORS: true,
            },
          },
          method: "build",
          // resolution: 2,
          // overrides: {
          //   pdf: { compress: true },
          //   canvas: {
          //     scale: 2,
          //     useCORS: true,
          //     allowTaint: true,
          //     scrollY: -window.scrollY,
          //   },
          // },
        });
      } finally {
        placeholdersBackup.forEach(({ element, placeholder }) => {
          if (placeholder !== null) {
            element.setAttribute("placeholder", placeholder);
          }
        });
      }
      const blob = result.output("blob");
      const firstName =
        (document.getElementById("first-name") as HTMLInputElement)?.value ||
        "";
      const lastName =
        (document.getElementById("last-name") as HTMLInputElement)?.value || "";
      const fullName = `${firstName} ${lastName}`.trim();
      console.log(fullName);
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
            }}
          >
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              size="small"
              sx={{
                minWidth: 120,
                mr: 2,
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
            <AddressForm t={t} />
            <MedicalHistory t={t} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              {t("medicalHistory.date")}
            </Typography>
            <ValidatedInput
              size="small"
              placeholder="12.01.2025"
              sx={{ mt: 1, mb: 2 }}
              validationType="date"
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
                control={<Checkbox />}
                label={t("medicalHistory.agreementSmsAndEmail")}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t("medicalHistory.agreementNotify")}
              />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                {t("medicalHistory.signatureApprove")}
              </Typography>

              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{
                  className: "signature-canvas",
                  style: {
                    touchAction: "none",
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ opacity: 0.5, textAlign: "center" }}
              >
                {t("medicalHistory.signatureType")}
              </Typography>
            </Box>
          </Box>

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
