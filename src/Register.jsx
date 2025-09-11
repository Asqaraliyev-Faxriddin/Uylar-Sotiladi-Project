import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Paper,
  MenuItem,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("BUY");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!submit) return;

    setLoading(true);
    const userData = { firstName, lastName, email, role, password };

    axios
      .post("https://faxriddin.bobur-dev.uz/auth/register", userData)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 403) {
          setError("Bu email allaqachon mavjud!");
        } else {
          setError(err.response?.data?.message || "Xatolik yuz berdi");
        }
      });
  }, [submit, firstName, lastName, email, role, password, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== repeatPass) {
      setError("Parollar bir xil emas!");
      return;
    }
    setSubmit(true);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f4f6",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          width: "100%",
          maxWidth: { xs: 400, sm: 600 }, // kenglikni oshirdim
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Ro'yxatdan o'tish
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Firstname */}
          <TextField
            label="Ism"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5, // input balandroq
              },
            }}
          />

          {/* Lastname */}
          <TextField
            label="Familiya"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          />

          {/* Role */}
          <TextField
            select
            label="Rol"
            variant="outlined"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          >
            <MenuItem value="BUY">Oluvchi</MenuItem>
            <MenuItem value="SELL">Sotuvchi</MenuItem>
          </TextField>

          {/* Password */}
          <TextField
            label="Parol"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          />

          {/* Repeat Password */}
          <TextField
            label="Parolni takrorlang"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type={showRepeatPass ? "text" : "password"}
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    onClick={() => setShowRepeatPass(!showRepeatPass)}
                    edge="end"
                  >
                    {showRepeatPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                py: 1.5,
              },
            }}
          />

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Submit button */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              py: 2, // kattaroq balandlik
              fontSize: "1rem",
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
          </Button>
        </form>

        {/* Kirish link */}
        <Typography
          mt={2}
          textAlign="center"
          fontSize={{ xs: "0.8rem", sm: "0.9rem" }}
          color="textSecondary"
        >
          Allaqachon akkount bormi?{" "}
          <a
            href="/login"
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              marginLeft: 4,
            }}
          >
            Kirish
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
