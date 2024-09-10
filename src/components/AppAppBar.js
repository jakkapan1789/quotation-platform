import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Stack, Typography } from "@mui/material";
// import Sitemark from "./SitemarkIcon";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <DirectionsCarIcon sx={{ color: "black", fontSize: 24 }} />
              <Typography variant="h6" sx={{ color: "gray", ml: 1 }}>
                Quotation Platform
              </Typography>
            </Stack>
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 1 }}>
              <Button
                sx={{ fontSize: 14 }}
                variant="text"
                color="info"
                size="small"
              >
                หน้าหลัก
              </Button>
              <Button
                sx={{ fontSize: 14 }}
                variant="text"
                color="info"
                size="small"
              >
                สร้างใบเสนอราคา
              </Button>
              <Button
                sx={{ fontSize: 14 }}
                variant="text"
                color="info"
                size="small"
              >
                ตั้งค่า
              </Button>
              <Button
                sx={{ fontSize: 14 }}
                variant="text"
                color="info"
                size="small"
              >
                เกี่ยวกับเรา
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              sx={{ fontSize: 14 }}
              color="primary"
              variant="text"
              size="small"
            >
              เข้าสู่ระบบ
            </Button>
            <Button
              sx={{ fontSize: 14 }}
              color="primary"
              variant="contained"
              size="small"
            >
              สมัครสมาชิก
            </Button>
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
                <MenuItem sx={{ fontSize: 14 }}>หน้าหลัก</MenuItem>
                <MenuItem sx={{ fontSize: 14 }}>สร้างใบเสนอราคา</MenuItem>
                <MenuItem sx={{ fontSize: 14 }}>ตั้งค่า</MenuItem>
                <MenuItem sx={{ fontSize: 14 }}>เกี่ยวกับเรา</MenuItem>

                <MenuItem>
                  <Button
                    sx={{ fontSize: 14 }}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    สมัครสมาชิก
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    sx={{ fontSize: 14 }}
                    color="primary"
                    variant="outlined"
                    fullWidth
                  >
                    เข้าสู่ระบบ
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
