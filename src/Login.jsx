import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useUserStore } from "./store/UserStore"; 
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const { phone, setPhone, isDark } = useUserStore();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("https://faxriddin.bobur-dev.uz/auth/login", {
        phone,
        password,
      });

      if (res.data?.AccessToken) {
        setToken(res.data.AccessToken);
        window.location.href = "/my/profile";
      } else {
        alert("Token topilmadi!");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          alert("Notog'ri kiritdingiz");
        } else if (err.response.status === 500) {
          alert("Server xatoligi");
        } else {
          alert(err.response.data?.message || "Xatolik yuz berdi");
        }
      } else {
        alert(err.message);
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDark ? "#121212" : "#f3f4f6",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: 350, sm: 450 },
          bgcolor: isDark ? "#1e1e1e" : "#fff",
          color: isDark ? "#fff" : "#000",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={1}
          textAlign="center"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Kirish
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="textSecondary"
          mb={3}
        >
          Akkountingizga kiring
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="tel"
            placeholder="+998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          <TextField
            label="Parol"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showPass ? "text" : "password"}
            placeholder="12345678"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass(!showPass)}
                    edge="end"
                    sx={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: isDark ? "#fff" : "#000" },
              label: { color: isDark ? "#bbb" : "#555" },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Kirish
          </Button>
        </form>

        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
          fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
        >
       <Link
  to="/reset_password"
  style={{ color: "#1976d2", textDecoration: "underline" }}
>
  Parolni unutdingizmi?
</Link>
          <a
            href="/register"
            style={{ color: isDark ? "#bbb" : "#555", textDecoration: "underline" }}
          >
            Ro‘yxatdan o‘tish
          </a>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
