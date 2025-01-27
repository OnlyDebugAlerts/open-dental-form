"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import SignatureCanvas from "react-signature-canvas";
import generatePDF from "react-to-pdf";
import AddressForm from "./components/AddressForm";
import MedicalHistory from "./components/MedicalHistory";
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
  const signatureRef = React.useRef<SignatureCanvas>(null);

  const handleSubmit = async () => {
    try {
      const formContainer = document.getElementById("form-container");

      const result = await generatePDF(() => formContainer, {
        filename: "medical-form.pdf",
        page: {
          margin: 5,
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
      });
      const blob = result.output("blob");
      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfBlob: cleanBase64(await blobToBase64(blob)),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Clear signature after successful submission
      signatureRef.current?.clear();

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert(t("checkout.errorSendingEmail"));
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
              width: "100%",
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
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ textAlign: "center" }}
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
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {t("checkout.submit")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
