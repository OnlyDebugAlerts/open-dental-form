"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";

interface MedicalHistoryProps {
  t: (path: string) => string;
  validationErrors?: Record<string, string>;
}

export const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  pageBreakInside: "avoid",
  breakInside: "avoid",
}));

const CheckboxGroup = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  pageBreakInside: "avoid",
  breakInside: "avoid",
}));

export default function MedicalHistory({ t, validationErrors = {} }: MedicalHistoryProps) {
  return (
    <Grid container spacing={3} id="medical-history-form">
      <h1 style={{ fontSize: "28px", margin: "0 auto" }}>
        {t("medicalHistoryHeader")}{" "}
      </h1>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.currentMedications")}</FormLabel>
        <FormControlLabel label={t("yes")} control={<Checkbox id="currentMedications" />} />
        <OutlinedInput
          id="currentMedicationsDetails"
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.adverseReaction")}</FormLabel>
        <FormControlLabel control={<Checkbox id="adverseReaction" />} label={t("yes")} />
        <OutlinedInput
          id="adverseReactionDetails"
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          {t("medicalHistory.diseases")}
        </Typography>
        <CheckboxGroup container>
          <FormControlLabel
            control={<Checkbox id="hepatitis" />}
            label={t("medicalHistory.hepatitis")}
          />
          <OutlinedInput
            id="hepatitisDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="tuberculosis" />}
            label={t("medicalHistory.tuberculosis")}
          />
          <OutlinedInput
            id="tuberculosisDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="std" />}
            label={t("medicalHistory.std")}
          />
          <OutlinedInput
            id="stdDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="rheumaticFever" />}
            label={t("medicalHistory.rheumaticFever")}
          />
          <OutlinedInput
            id="rheumaticFeverDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="heartDisease" />}
            label={t("medicalHistory.heartDisease")}
          />
          <OutlinedInput
            id="heartDiseaseDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="kidneyDisease" />}
            label={t("medicalHistory.kidneyDisease")}
          />
          <OutlinedInput
            id="kidneyDiseaseDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="highBloodPressure" />}
            label={t("medicalHistory.highBloodPressure")}
          />
          <OutlinedInput
            id="highBloodPressureDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="respiratoryDisease" />}
            label={t("medicalHistory.respiratoryDisease")}
          />
          <OutlinedInput
            id="respiratoryDiseaseDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="diabetes" />}
            label={t("medicalHistory.diabetes")}
          />
          <OutlinedInput
            id="diabetesDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="thyroidDisease" />}
            label={t("medicalHistory.thyroidDisease")}
          />
          <OutlinedInput
            id="thyroidDiseaseDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="epilepsy" />}
            label={t("medicalHistory.epilepsy")}
          />
          <OutlinedInput
            id="epilepsyDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="bloodDisorders" />}
            label={t("medicalHistory.bloodDisorders")}
          />
          <OutlinedInput
            id="bloodDisordersDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="psychiatricDisorders" />}
            label={t("medicalHistory.psychiatricDisorders")}
          />
          <OutlinedInput
            id="psychiatricDisordersDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="congenitalDefects" />}
            label={t("medicalHistory.congenitalDefects")}
          />
          <OutlinedInput
            id="congenitalDefectsDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="hereditaryDiseases" />}
            label={t("medicalHistory.hereditaryDiseases")}
          />
          <OutlinedInput
            id="hereditaryDiseasesDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox id="osteoporosis" />}
            label={t("medicalHistory.osteoporosis")}
          />
          <OutlinedInput
            id="osteoporosisDetails"
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />
        </CheckboxGroup>
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.otherDiseases")}</FormLabel>
        <OutlinedInput id="otherDiseasesDetails" size="small" />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          {t("medicalHistory.allergies")}
        </Typography>
      </FormGrid>

      <CheckboxGroup size={{ xs: 12 }} container spacing={2}>
        <FormControlLabel
          control={<Checkbox id="medications" />}
          label={t("medicalHistory.medications")}
        />
        <OutlinedInput
          id="medicationsDetails"
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
        <FormControlLabel
          control={<Checkbox id="otherAllergies" />}
          label={t("medicalHistory.otherAllergies")}
        />
        <OutlinedInput
          id="otherAllergiesDetails"
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
        <FormControlLabel
          control={<Checkbox id="bleeding" />}
          label={t("medicalHistory.bleeding")}
        />
        <OutlinedInput
          id="bleedingDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox id="cancer" />}
          label={t("medicalHistory.cancer")}
        />
        <OutlinedInput
          id="cancerDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox id="smoking" />}
          label={t("medicalHistory.smoking")}
        />
        <OutlinedInput
          id="smokingDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox id="hiv" />}
          label={t("medicalHistory.hiv")}
        />
        <OutlinedInput
          id="hivDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          {t("medicalHistory.questionForWomen")}
        </Typography>
        <FormControlLabel
          control={<Checkbox id="pregnancy" />}
          label={t("medicalHistory.pregnancy")}
        />
        <OutlinedInput
          id="pregnancyDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox id="contraception" />}
          label={t("medicalHistory.contraception")}
        />
        <OutlinedInput
          id="contraceptionDetails"
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />
      </CheckboxGroup>

      <FormGrid size={{ xs: 12 }}>
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          style={{ fontWeight: "bold" }}
        >
          {t("medicalHistory.confirmation")}
        </Typography>
      </FormGrid>
    </Grid>
  );
}
