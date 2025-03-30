"use client";

import { Typography, FormHelperText } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import ValidatedInput from "./ValidatedInput";

interface AddressFormProps {
  t: (path: string) => string;
  validationErrors?: Record<string, string>;
}

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  pageBreakInside: "avoid",
  breakInside: "avoid",
}));

export default function AddressForm({ t, validationErrors = {} }: AddressFormProps) {
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
            error={!!validationErrors.firstName}
          />
          {validationErrors.firstName && (
            <FormHelperText error>{validationErrors.firstName}</FormHelperText>
          )}
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
            error={!!validationErrors.lastName}
          />
          {validationErrors.lastName && (
            <FormHelperText error>{validationErrors.lastName}</FormHelperText>
          )}
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
            error={!!validationErrors.legalRepresentative}
          />
          {validationErrors.legalRepresentative && (
            <FormHelperText error>{validationErrors.legalRepresentative}</FormHelperText>
          )}
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
            errorMessage={validationErrors.email}
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
            errorMessage={validationErrors.identificationNumber}
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
            errorMessage={validationErrors.dateOfBirth}
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
          <FormLabel htmlFor="address" required>
            {t("address")}
          </FormLabel>
          <OutlinedInput
            id="address"
            name="address1"
            type="text"
            placeholder="Street Address"
            autoComplete="address"
            required
            size="small"
            error={!!validationErrors.address}
          />
          {validationErrors.address && (
            <FormHelperText error>{validationErrors.address}</FormHelperText>
          )}
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
            error={!!validationErrors.city}
          />
          {validationErrors.city && (
            <FormHelperText error>{validationErrors.city}</FormHelperText>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel htmlFor="zip" required>
            {t("zipCode")}
          </FormLabel>
          <OutlinedInput
            id="zipCode"
            name="zip"
            type="text"
            placeholder="12345"
            autoComplete="postal-code"
            required
            size="small"
            error={!!validationErrors.zipCode}
          />
          {validationErrors.zipCode && (
            <FormHelperText error>{validationErrors.zipCode}</FormHelperText>
          )}
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
            error={!!validationErrors.country}
          />
          {validationErrors.country && (
            <FormHelperText error>{validationErrors.country}</FormHelperText>
          )}
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
            errorMessage={validationErrors.phone}
          />
        </FormGrid>
      </Grid>
    </div>
  );
}
