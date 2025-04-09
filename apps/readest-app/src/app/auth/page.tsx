'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';
import { useEnv } from '@/context/EnvContext';
import { useThemeStore } from '@/store/themeStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useTrafficLightStore } from '@/store/trafficLightStore';

import { handleAuthCallback } from '@/helpers/auth';
import { getAppleIdAuth, Scope } from './utils/appleIdAuth';
import { authWithCustomTab, authWithSafari } from './utils/nativeAuth';
import { READEST_WEB_BASE_URL } from '@/services/constants';
import WindowButtons from '@/components/WindowButtons';

type OAuthProvider = 'google' | 'apple' | 'azure' | 'github';

interface ProviderLoginProp {
  provider: OAuthProvider;
  handleSignIn: (provider: OAuthProvider) => void;
  Icon: React.ElementType;
  label: string;
}

const WEB_AUTH_CALLBACK = `${READEST_WEB_BASE_URL}/auth/callback`;

const ProviderLogin: React.FC<ProviderLoginProp> = ({ provider, handleSignIn, Icon, label }) => {
  return (
    <button
      onClick={() => handleSignIn(provider)}
      className={clsx(
        'mb-2 flex w-64 items-center justify-center rounded border p-2.5',
        'bg-base-100 border-base-300 hover:bg-base-200 shadow-sm transition',
      )}
    >
      <Icon />
      <span className='text-base-content/75 px-2 text-sm'>{label}</span>
    </button>
  );
};

export default function AuthPage() {
  const _ = useTranslation();
  const router = useRouter();
  const { login } = useAuth();
  const { envConfig, appService } = useEnv();
  const { isDarkMode } = useThemeStore();
  const { isTrafficLightVisible } = useTrafficLightStore();
  const { settings, setSettings, saveSettings } = useSettingsStore();
  const [isMounted, setIsMounted] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const getRedirectTo = () => {
    return process.env.NODE_ENV === 'production'
      ? WEB_AUTH_CALLBACK
      : `${window.location.origin}/auth/callback`;
  };

  const handleAppleSignIn = async () => {
    if (!supabase) {
      throw new Error('No backend connected');
    }
    
    // In web mode, we use the standard Supabase OAuth flow with redirects
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: getRedirectTo(),
      },
    });
  };

  const handleOAuthSignIn = async (provider: OAuthProvider) => {
    if (!supabase) {
      throw new Error('No backend connected');
    }
    
    // In web mode, use standard OAuth redirect flow
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getRedirectTo(),
      },
    });
  };

  const handleOAuthUrl = async (url: string) => {
    console.log('Handle OAuth URL:', url);
    const hashMatch = url.match(/#(.*)/);
    if (hashMatch) {
      const hash = hashMatch[1];
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');
      const next = params.get('next') ?? '/';
      if (accessToken) {
        handleAuthCallback({ accessToken, refreshToken, type, next, login, navigate: router.push });
      }
    }
  };

  useEffect(() => {
    // Check for OAuth response in URL hash (for web-based authentication)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        handleOAuthUrl(hash);
      }
    }
    
    // Set up Supabase auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Handle successful sign-in
        login(session);
        router.push('/');
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = (provider: OAuthProvider) => {
    if (provider === 'apple') {
      handleAppleSignIn();
    } else {
      handleOAuthSignIn(provider);
    }
  };

  const handleGoBack = () => {
    // Keep login false to avoid infinite loop to redirect to the login page
    settings.keepLogin = false;
    setSettings(settings);
    saveSettings(envConfig, settings);
    router.back();
  };

  const getAuthLocalization = () => {
    return {
      variables: {
        sign_in: {
          email_label: _('Email address'),
          password_label: _('Your Password'),
          email_input_placeholder: _('Your email address'),
          password_input_placeholder: _('Your password'),
          button_label: _('Sign in'),
          loading_button_label: _('Signing in...'),
          social_provider_text: _('Sign in with {{provider}}'),
          link_text: _('Already have an account? Sign in'),
        },
        sign_up: {
          email_label: _('Email'),
          password_label: _('Password'),
          email_input_placeholder: _('Your email address'),
          password_input_placeholder: _('Your password'),
          button_label: _('Sign up'),
          loading_button_label: _('Signing up...'),
          social_provider_text: _('Sign in with {{provider}}'),
          link_text: _("Don't have an account? Sign up"),
          confirmation_text: _('Check your email for the confirmation link'),
        },
        magic_link: {
          email_input_label: _('Email address'),
          email_input_placeholder: _('Your email address'),
          button_label: _('Sign in'),
          loading_button_label: _('Signing in ...'),
          link_text: _('Send a magic link email'),
          confirmation_text: _('Check your email for the magic link'),
        },
        forgotten_password: {
          email_label: _('Email address'),
          password_label: _('Your Password'),
          email_input_placeholder: _('Your email address'),
          button_label: _('Send reset password instructions'),
          loading_button_label: _('Sending reset instructions ...'),
          link_text: _('Forgot your password?'),
          confirmation_text: _('Check your email for the password reset link'),
        },
        verify_otp: {
          email_input_label: _('Email address'),
          email_input_placeholder: _('Your email address'),
          phone_input_label: _('Phone number'),
          phone_input_placeholder: _('Your phone number'),
          token_input_label: _('Token'),
          token_input_placeholder: _('Your OTP token'),
          button_label: _('Verify token'),
          loading_button_label: _('Signing in ...'),
        },
      },
    };
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // For web app, use the built-in OAuth callback page /auth/callback
  return (
    <div style={{ maxWidth: '420px', margin: 'auto', padding: '2rem', paddingTop: '4rem' }}>
      <button
        onClick={handleGoBack}
        className='btn btn-ghost fixed left-6 top-6 h-8 min-h-8 w-8 p-0'
      >
        <IoArrowBack className='text-base-content' />
      </button>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme={isDarkMode ? 'dark' : 'light'}
        magicLink={true}
        providers={['google', 'apple', 'github']}
        redirectTo={getRedirectTo()}
        localization={getAuthLocalization()}
      />
    </div>
  );
}
