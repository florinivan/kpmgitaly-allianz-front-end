import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { brandColors } from '../theme-config';
import { isDevelopment } from '../config';

const LoginPage: React.FC = () => {
  const { login, isLoading, error: authError, skipLoginInDev } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Auto-login in development mode if skipLoginInDev is enabled
  useEffect(() => {
    const performAutoLogin = async () => {
      if (skipLoginInDev) {
        try {
          // Use any values here as they'll be ignored in favor of mock data
          await login('dev@example.com', 'dev-password');
          navigate('/');
        } catch (err) {
          console.error('Auto-login failed:', err);
        }
      }
    };

    performAutoLogin();
  }, [skipLoginInDev, login, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login failed:', err);
    }
  };

  return (
    <Container 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e6f0ff', // Light blue background as shown in Figma
        padding: { xs: '24px', md: '281px 444px' },
        maxWidth: '100%'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: '552px',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              textAlign: 'left',
              fontSize: '24px'
            }}
          >
            Log In
          </Typography>
          
          {isDevelopment && (
            <Chip 
              label="Development" 
              color="primary" 
              size="small"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
        
        {(error || authError) && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error || authError}
          </Alert>
        )}
        
        {isDevelopment && skipLoginInDev && (
          <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
            Auto-login enabled in development mode. Redirecting...
          </Alert>
        )}
        
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || skipLoginInDev}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || skipLoginInDev}
            variant="outlined"
            sx={{ mb: 1 }}
          />
          
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Link 
              href="#" 
              variant="body2" 
              sx={{ 
                color: brandColors.primary, 
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Forgot password?
            </Link>
          </Box>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ 
              mt: 1, 
              mb: 2, 
              py: 1.5,
              backgroundColor: brandColors.primary,
              textTransform: 'uppercase',
              borderRadius: '4px',
              fontWeight: 500
            }}
            disabled={isLoading || skipLoginInDev}
          >
            {isLoading ? <CircularProgress size={24} /> : 'LOGIN'}
          </Button>
          
          {isDevelopment && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Development mode: {skipLoginInDev ? 'Auto-login enabled' : 'Login required'}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;