import React from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BeautifulForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <Box mt={4} mx="auto" maxWidth={600}>
      <Typography variant="h4" align="center" gutterBottom>
        Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <FormContainer>
              <FormField
                required
                label="First Name"
                variant="outlined"
                fullWidth
              />
              <FormField
                required
                label="Last Name"
                variant="outlined"
                fullWidth
              />
              <FormField
                required
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
              />
              <FormField
                required
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
              />
              <SubmitButton type="submit" variant="contained" color="primary">
                Submit
              </SubmitButton>
            </FormContainer>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BeautifulForm;
