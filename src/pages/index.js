import React, { useMemo, useState } from "react";

import { Formik, Form, Field } from "formik";
import { TextField, MenuItem, Button, Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import Layout from "@/components/Layout";
import { Stack, InputAdornment } from "@mui/material";

const commonFontSize = {
  fontSize: {
    xs: "16px",
    sm: "16px",
    md: "16px",
  },
};

const validationSchema = Yup.object({
  carModel: Yup.string().required("เลือกรุ่นรถยนต์"),
  carVariant: Yup.string().required("เลือกโมเดล"),
  price: Yup.string().required("แสดงราคา"),
  discount: Yup.string(),
  finalPrice: Yup.string().required("ราคารถ"),
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
  const parsePrice = (value) => {
    // Remove all commas and return the numeric value
    return value.replace(/,/g, "");
  };

  const formatPrice = (price) =>
    price ? new Intl.NumberFormat().format(price) : "0";

  const calculateDownPayment = (price, downPayment) => {
    const parsedPrice = parseFloat(price) || 0;
    const parsedDownPayment = parseFloat(downPayment) || 0;
    const downPaymentValue = (parsedPrice * parsedDownPayment) / 100;
    return formatPrice(downPaymentValue);
  };

  const calculateMonthlyPayment = (price, downPayment, installmentMonths) => {
    const parsedPrice = parseFloat(price) || 0;
    const parsedDownPayment = parseFloat(downPayment) || 0;
    const parsedInstallments = parseInt(installmentMonths, 10) || 1;

    const loanAmount = parsedPrice - (parsedPrice * parsedDownPayment) / 100;
    const monthlyPayment = loanAmount / parsedInstallments;

    return formatPrice(monthlyPayment);
  };

  const [discount, setDiscount] = useState("");
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
                {/** Car Model Field **/}
                <Grid item xs={12} sm={6}>
                  <FieldWrapper
                    label="เลือกรุ่นรถยนต์"
                    name="carModel"
                    select
                    error={touched.carModel && Boolean(errors.carModel)}
                    helperText={touched.carModel && errors.carModel}
                  >
                    {carModels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </FieldWrapper>
                </Grid>

                {/** Car Variant Field **/}
                <Grid item xs={12} sm={6}>
                  <FieldWrapper
                    label="เลือกโมเดล"
                    name="carVariant"
                    error={touched.carVariant && Boolean(errors.carVariant)}
                    helperText={touched.carVariant && errors.carVariant}
                  />
                </Grid>

                {/** Price Field **/}
                <Grid item xs={12} sm={6}>
                  <FieldWrapper
                    label="ราคารถ"
                    name="price"
                    disabled
                    value={formatPrice(values.price)}
                    endAdornment="THB"
                  />
                </Grid>

                {/** Discount Field **/}
                <Grid item xs={12} sm={6}>
                  <Stack direction={"column"}>
                    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>
                      ส่วนลดราคารถ(ถ้ามี)
                    </Typography>
                    <TextField
                      value={discount}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">THB</InputAdornment>
                      }
                      fullWidth
                    />
                  </Stack>
                </Grid>

                {/** Down Payment Fields **/}
                <Grid item xs={4} sm={6}>
                  <FieldWrapper
                    label="เงินดาวน์ (%)"
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
                <Grid item xs={8} sm={6}>
                  <FieldWrapper
                    label="ยอดจัดไฟแนนซ์ (THB)"
                    name="downPaymentValue"
                    disabled
                    value={calculateDownPayment(
                      values.price,
                      values.downPayment
                    )}
                    endAdornment="THB"
                  />
                </Grid>

                {/** Installment Months Field **/}
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
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        style={{ minHeight: "48px" }}
                      >
                        {option.display}
                      </MenuItem>
                    ))}
                  </FieldWrapper>
                </Grid>

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

                <Grid item xs={12} sm={6}>
                  <FieldWrapper label="เพิ่มเติม" name="discount" />
                </Grid>

                {/** Submit Button **/}
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

const FieldWrapper = ({
  label,
  name,
  select,
  children,
  error,
  helperText,
  value,
  disabled,
  endAdornment,
}) => (
  <Stack direction="column">
    <Typography sx={{ color: "#455A64", fontSize: "16px" }}>{label}</Typography>
    <Field
      as={TextField}
      name={name}
      select={select}
      value={value}
      disabled={disabled}
      size="small"
      sx={{ "& .MuiInputBase-input": commonFontSize }}
      InputProps={{
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
      error={error}
      helperText={helperText}
    >
      {children}
    </Field>
  </Stack>
);

export default QuotationForm;
