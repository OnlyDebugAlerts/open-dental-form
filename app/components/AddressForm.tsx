"use client";

import { Typography } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import ValidatedInput from "./ValidatedInput";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ t }: { t: (path: string) => string }) {
  return (
    <div id="address-form">
      <div style={{}}>
        <p>
          <b>Open Dental Clinic Open Dental</b>
          <br />
          Clinic, s. r. o. , Sliačska 13902/1A 831 02
        </p>
        <h1 style={{ margin: "20px 0", fontSize: "28px", textAlign: "center" }}>
          Zdravotný záznam osoby v špecializovanej ambulancii zubného lekárstva
        </h1>
      </div>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required>
            {t("firstName")}
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="last-name" required>
            {t("lastName")}
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="legalRepresentative" required>
            {t("legalRepresentative")}
          </FormLabel>
          <OutlinedInput
            id="legalRepresentative"
            name="legalRepresentative"
            type="text"
            placeholder="John Snow"
            autoComplete="name"
            required
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="email" required>
            {t("email")}
          </FormLabel>
          <ValidatedInput
            id="email"
            name="email"
            validationType="email"
            placeholder="john.snow@example.com"
            autoComplete="email"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="identificationNumber" required>
            {t("identificationNumber")}
          </FormLabel>
          <ValidatedInput
            id="identificationNumber"
            name="identificationNumber"
            validationType="identificationNumber"
            placeholder="123456/7890"
            autoComplete="off"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="dateOfBirth" required>
            {t("dateOfBirth")}
          </FormLabel>
          <ValidatedInput
            id="dateOfBirth"
            name="dateOfBirth"
            validationType="date"
            placeholder="12.12.1990"
            autoComplete="bday"
            required
            size="small"
          />
        </FormGrid>
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "18px" }}
        >
          {t("medicalHistory.addressInfo")}
        </Typography>
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address1" required>
            {t("address")}
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="text"
            placeholder="Street Address"
            autoComplete="address"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="city" required>
            {t("city")}
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="text"
            placeholder="New York"
            autoComplete="city"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="zip" required>
            {t("zipCode")}
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="text"
            placeholder="12345"
            autoComplete="postal-code"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="country" required>
            {t("country")}
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="text"
            placeholder="United States"
            autoComplete="country"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="phone" required>
            {t("phone")}
          </FormLabel>
          <ValidatedInput
            id="phone"
            name="phone"
            validationType="phone"
            placeholder="+421 900 123 456"
            autoComplete="phone"
            required
            size="small"
          />
        </FormGrid>
      </Grid>
    </div>
  );
}
