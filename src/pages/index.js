// import * as React from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";

// import AppAppBar from "@/components/AppAppBar";
// import getMPTheme from "@/theme/getMPTheme";

// export default function MarketingPage() {
//   const [mode, setMode] = React.useState("light");
//   const [showCustomTheme, setShowCustomTheme] = React.useState(true);
//   const MPTheme = createTheme(getMPTheme("light"));
//   const defaultTheme = createTheme({ palette: { mode } });

//   // This code only runs on the client side, to determine the system color preference
//   React.useEffect(() => {
//     // Check if there is a preferred mode in localStorage
//     const savedMode = localStorage.getItem("themeMode");
//     if (savedMode) {
//       setMode(savedMode);
//     } else {
//       // If no preference is found, it uses system preference
//       const systemPrefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       setMode(systemPrefersDark ? "dark" : "light");
//     }
//   }, []);

//   const toggleColorMode = () => {
//     const newMode = mode === "dark" ? "light" : "dark";
//     setMode(newMode);
//     // localStorage.setItem("themeMode", newMode);
//   };

//   const toggleCustomTheme = () => {
//     setShowCustomTheme((prev) => !prev);
//   };

//   return (
//     <ThemeProvider theme={showCustomTheme ? MPTheme : defaultTheme}>
//       <CssBaseline enableColorScheme />
//       <AppAppBar />
//       {/* <Hero /> */}
//     </ThemeProvider>
//   );
// }

import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, MenuItem, Button, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import Layout from "@/components/Layout";
import { Stack, InputAdornment } from "@mui/material";

const carModels = [
  { value: "BMW_X1", label: "BMW X1" },
  { value: "BMW_X3", label: "BMW X3" },
  { value: "BMW_X5", label: "BMW X5" },
  // Add more models as needed
];

const installmentMonths = [
  {
    value: 12,
    display: "12 เดือน",
  },
  {
    value: 36,
    display: "36 เดือน",
  },
  {
    value: 48,
    display: "48 เดือน",
  },
  {
    value: 60,
    display: "60 เดือน",
  },
];

const validationSchema = Yup.object({
  carModel: Yup.string().required("เลือกรุ่นรถยนต์"),
  carVariant: Yup.string().required("เลือกโมเดล"),
  price: Yup.string().required("แสดงราคา"),
  discount: Yup.string(),
  finalPrice: Yup.string().required("ราคารถ"),
  // .positive("ราคารถต้องเป็นจำนวนบวก"),
  downPayment: Yup.number()
    .required("เงินดาวน์")
    .positive("เงินดาวน์ต้องเป็นจำนวนบวก"),
  interestRate: Yup.number()
    .required("ดอกเบี้ย")
    .positive("ดอกเบี้ยต้องเป็นจำนวนบวก"),
  installmentMonths: Yup.string().required("จำนวนงวด"),
  monthlyPayment: Yup.number()
    .required("ค่างวดต่อเดือน")
    .positive("ค่างวดต่อเดือนต้องเป็นจำนวนบวก"),
});

const QuotationForm = () => {
  console.log(process.env.XTEST);

  return (
    <Layout>
      <Formik
        initialValues={{
          carModel: "",
          carVariant: "",
          price: "5200100",
          discount: "",
          finalPrice: "",
          downPayment: "",
          interestRate: "",
          installmentMonths: "",
          monthlyPayment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // Handle form submission
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      เลือกรุ่นรถยนต์
                    </Typography>
                    <Field
                      as={TextField}
                      select
                      size="small"
                      name="carModel"
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      error={touched.carModel && Boolean(errors.carModel)}
                      helperText={touched.carModel && errors.carModel}
                    >
                      {carModels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      เลือกโมเดล
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      name="carVariant"
                      error={touched.carVariant && Boolean(errors.carVariant)}
                      helperText={touched.carVariant && errors.carVariant}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      ราคารถ
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      name="price"
                      value={parseFloat(values.price).toLocaleString()}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      disabled
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        },
                      }}
                      // error={touched.price && Boolean(errors.price)}
                      // helperText={touched.price && errors.price}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      ส่วนลดราคารถ(ถ้ามี)
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      value={values.discount || ""}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      type="tel"
                      name="discount"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        },
                      }}
                      error={touched.discount && Boolean(errors.discount)}
                      helperText={touched.discount && errors.discount}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      เงินดาวน์
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      type="tel"
                      name="downPayment"
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        },
                      }}
                      error={touched.downPayment && Boolean(errors.downPayment)}
                      helperText={touched.downPayment && errors.downPayment}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={8} sm={4} md={4}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      เงินดาวน์
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      type="tel"
                      disabled
                      value={
                        values.downPayment &&
                        parseFloat(
                          (parseInt(values.price) *
                            parseInt(values.downPayment, 10)) /
                            100
                        ).toLocaleString()
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px",
                            sm: "16px",
                            md: "16px",
                          },
                        },
                      }}
                      name="downPayment"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      ยอดจัดไฟแนนซ์
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      type="tel"
                      disabled
                      value={
                        values.downPayment &&
                        parseFloat(
                          values.price -
                            (parseInt(values.price) *
                              parseInt(values.downPayment, 10)) /
                              100
                        ).toLocaleString()
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px",
                            sm: "16px",
                            md: "16px",
                          },
                        },
                      }}
                      name="downPayment"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      จำนวนงวด
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      select
                      name="installmentMonths"
                      error={
                        touched.installmentMonths &&
                        Boolean(errors.installmentMonths)
                      }
                      helperText={
                        touched.installmentMonths && errors.installmentMonths
                      }
                    >
                      {installmentMonths.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.display}
                        </MenuItem>
                      ))}
                    </Field>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <Stack direction="column">
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      ค่างวดต่อเดือน
                    </Typography>
                    <Field
                      as={TextField}
                      size="small"
                      name="monthlyPayment"
                      value={
                        values.downPayment &&
                        parseFloat(
                          (values.price -
                            (parseInt(values.price) *
                              parseInt(values.downPayment, 10)) /
                              100) /
                            values.installmentMonths
                        ).toLocaleString()
                      }
                      disabled
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: {
                            xs: "16px", // 16px on extra-small screens (mobile)
                            sm: "16px", // 18px on small screens (tablet)
                            md: "16px", // 20px on medium screens (desktop)
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        },
                      }}
                      error={
                        touched.monthlyPayment && Boolean(errors.monthlyPayment)
                      }
                      helperText={
                        touched.monthlyPayment && errors.monthlyPayment
                      }
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    พิมพ์ใบเสนอราคา
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default QuotationForm;
