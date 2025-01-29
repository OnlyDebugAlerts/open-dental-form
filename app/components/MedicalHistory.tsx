"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CheckboxGroup = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export default function MedicalHistory({ t }: { t: (path: string) => string }) {
  return (
    <Grid container spacing={3} id="medical-history-form">
      <h1 style={{ fontSize: "28px", margin: "0 auto" }}>
        {t("medicalHistoryHeader")}{" "}
      </h1>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.currentMedications")}</FormLabel>
        <FormControlLabel label={t("yes")} control={<Checkbox />} />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.adverseReaction")}</FormLabel>
        <FormControlLabel control={<Checkbox />} label={t("yes")} />
        <OutlinedInput
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
            control={<Checkbox />}
            label={t("medicalHistory.hepatitis")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.tuberculosis")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.std")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.rheumaticFever")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.heartDisease")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.kidneyDisease")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.highBloodPressure")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.respiratoryDisease")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.diabetes")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.thyroidDisease")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.epilepsy")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.bloodDisorders")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.psychiatricDisorders")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.congenitalDefects")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.hereditaryDiseases")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label={t("medicalHistory.osteoporosis")}
          />
          <OutlinedInput
            size="small"
            placeholder={t("medicalHistory.details")}
            sx={{ mt: 1, mb: 2 }}
          />
        </CheckboxGroup>
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel>{t("medicalHistory.otherDiseases")}</FormLabel>
        <OutlinedInput size="small" />
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
          control={<Checkbox />}
          label={t("medicalHistory.medications")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.otherAllergies")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.ifYesSpecify")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.bleeding")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.cancer")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.smoking")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.hiv")}
        />
        <OutlinedInput
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
          control={<Checkbox />}
          label={t("medicalHistory.pregnancy")}
        />
        <OutlinedInput
          size="small"
          placeholder={t("medicalHistory.details")}
          sx={{ mt: 1, mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={t("medicalHistory.contraception")}
        />
        <OutlinedInput
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
