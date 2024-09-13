import React, { useMemo, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, MenuItem, Button, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { Stack, InputAdornment } from "@mui/material";
import { CarsBMW } from "@/data/bmw";
import Layout from "@/components/Layout";

const commonFontSize = {
  fontSize: {
    xs: "16px",
    sm: "16px",
    md: "16px",
  },
};

// Validation schema
const validationSchema = Yup.object({
  carModel: Yup.string().required("เลือกรุ่นรถยนต์"),
  carVariant: Yup.string().required("เลือกโมเดล"),
  price: Yup.string().required("แสดงราคา"),
  discount: Yup.string(),
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

// Helper functions
const parsePrice = (value) => value.replace(/,/g, "");
const formatPrice = (price) =>
  price ? new Intl.NumberFormat().format(price) : "0";

const calculateDownPayment = (price, downPayment) => {
  const parsedPrice = parseFloat(price) || 0;
  const parsedDownPayment = parseFloat(downPayment) || 0;
  const downPaymentValue = (parsedPrice * parsedDownPayment) / 100;
  return formatPrice(downPaymentValue);
};

const calculateDiscountedPrice = (price, discount) => {
  const parsedPrice = parseFloat(price) || 0;
  const parsedDiscount = parseFloat(discount.replace(/,/g, "")) || 0;
  const discountedPrice = parsedPrice - parsedDiscount;
  return formatPrice(discountedPrice);
};

const calculateLoanAmount = (price, downPayment, discount) => {
  const parsedPrice = parseFloat(String(price).replace(/,/g, "")) || 0;
  const parsedDownPayment =
    parseFloat(String(downPayment).replace(/,/g, "")) || 0;
  const parsedDiscount = parseFloat(String(discount).replace(/,/g, "")) || 0;

  const discountedPrice = parsedPrice - parsedDiscount; // Subtract discount from price
  const loanAmount = discountedPrice - parsedDownPayment; // Then subtract down payment

  return formatPrice(loanAmount);
};

const calculateMonthlyPayment = (price, downPayment, installmentMonths) => {
  const loanAmount = price - downPayment;
  const monthlyPayment = loanAmount / parseInt(installmentMonths, 10);
  return formatPrice(monthlyPayment);
};

const QuotationForm = () => {
  const [discount, setDiscount] = useState("");

  const carModels = useMemo(
    () => [
      { value: "BMW_X1", label: "BMW X1" },
      { value: "BMW_X3", label: "BMW X3" },
      { value: "BMW_X5", label: "BMW X5" },
    ],
    []
  );

  const months = useMemo(
    () => [
      { value: 12, display: "12 เดือน" },
      { value: 36, display: "36 เดือน" },
      { value: 48, display: "48 เดือน" },
      { value: 60, display: "60 เดือน" },
    ],
    []
  );

  const handleChange = (e) => {
    const input = e.target.value;
    const parsedValue = parsePrice(input); // Remove commas
    const formattedValue = formatPrice(parsedValue); // Format with commas
    setDiscount(formattedValue); // Set the formatted value in state
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          carModel: "",
          carVariant: "",
          price: "",
          discount: "",
          downPayment: "",
          interestRate: "",
          installmentMonths: "",
          monthlyPayment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          useEffect(() => {
            const selectedCar = CarsBMW.BMW.find(
              (car) => car.series === values.carModel
            );
            const selectedModel = selectedCar?.models.find(
              (model) => model.name === values.carVariant
            );

            if (selectedModel) {
              setFieldValue("price", selectedModel.price_thb);
            }
          }, [values.carModel, values.carVariant, setFieldValue]);

          return (
            <Form>
              <Card sx={{ p: 4 }}>
                <Grid container spacing={2}>
                  {/* Car Model Field */}
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      label="เลือกรุ่นรถยนต์"
                      name="carModel"
                      select
                      error={touched.carModel && Boolean(errors.carModel)}
                      helperText={touched.carModel && errors.carModel}
                    >
                      {CarsBMW.BMW.map((option) => (
                        <MenuItem key={option.series} value={option.series}>
                          {option.series}
                        </MenuItem>
                      ))}
                    </FieldWrapper>
                  </Grid>
                  {/* Car Variant Field */}
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      select
                      label="เลือกโมเดล"
                      name="carVariant"
                      error={touched.carVariant && Boolean(errors.carVariant)}
                      helperText={touched.carVariant && errors.carVariant}
                    >
                      {CarsBMW.BMW.filter(
                        (w) => w.series === values.carModel
                      )[0]?.models.map((model) => (
                        <MenuItem key={model.name} value={model.name}>
                          {model.name}
                        </MenuItem>
                      ))}
                    </FieldWrapper>
                  </Grid>
                  {/* Price Field */}
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      label="ราคารถ"
                      name="price"
                      disabled
                      value={formatPrice(values.price)}
                      endAdornment="THB"
                    />
                  </Grid>
                  {/* Discount Field */}
                  <Grid item xs={12} sm={6}>
                    <Stack direction={"column"}>
                      <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                        ส่วนลดราคารถ(ถ้ามี)
                      </Typography>
                      <TextField
                        value={discount}
                        type="tel"
                        onChange={handleChange}
                        sx={{ "& .MuiInputBase-input": commonFontSize }}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">THB</InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Grid>
                  {/* Down Payment Fields */}
                  <Grid item xs={4} sm={6}>
                    <FieldWrapper
                      label="เงินดาวน์ (%)"
                      type="tel"
                      name="downPayment"
                      endAdornment="%"
                      error={touched.downPayment && Boolean(errors.downPayment)}
                      helperText={touched.downPayment && errors.downPayment}
                    />
                  </Grid>
                  <Grid item xs={8} sm={6}>
                    <FieldWrapper
                      label="ยอดเงินดาวน์ (THB)"
                      name="downPaymentValue"
                      disabled
                      value={calculateDownPayment(
                        values.price,
                        values.downPayment
                      )}
                      endAdornment="THB"
                    />
                  </Grid>
                  {/* New Field: ยอดจัดไฟแนนซ์ (Loan Amount) */}

                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      label="ยอดจัดไฟแนนซ์ (THB)"
                      name="loanAmount"
                      disabled
                      value={calculateLoanAmount(
                        values.price,
                        calculateDownPayment(values.price, values.downPayment),
                        discount
                      )}
                      endAdornment="THB"
                    />
                  </Grid>
                  {/* Installment Months Field */}
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      label="จำนวนงวด"
                      name="installmentMonths"
                      select
                      error={
                        touched.installmentMonths &&
                        Boolean(errors.installmentMonths)
                      }
                      helperText={
                        touched.installmentMonths && errors.installmentMonths
                      }
                    >
                      {months.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.display}
                        </MenuItem>
                      ))}
                    </FieldWrapper>
                  </Grid>
                  {/* Monthly Payment Field */}
                  <Grid item xs={12} sm={6}>
                    <FieldWrapper
                      label="ค่างวดต่อเดือน (THB)"
                      name="monthlyPayment"
                      disabled
                      value={
                        values.price &&
                        values.downPayment &&
                        values.installmentMonths
                          ? calculateMonthlyPayment(
                              values.price,
                              values.downPayment,
                              values.installmentMonths
                            )
                          : ""
                      }
                      endAdornment="THB"
                    />
                  </Grid>
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Generate Quotation
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

// Custom Field Wrapper Component
const FieldWrapper = ({ label, children, endAdornment, ...props }) => (
  <Stack direction="column">
    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>{label}</Typography>
    <Field
      as={TextField}
      sx={{ "& .MuiInputBase-input": commonFontSize }}
      fullWidth
      InputProps={{
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      }}
      {...props}
    >
      {children}
    </Field>
  </Stack>
);

export default QuotationForm;
