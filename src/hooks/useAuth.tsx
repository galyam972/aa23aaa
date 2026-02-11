import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Send welcome email for new users (first sign in - including Google OAuth)
        if (event === 'SIGNED_IN' && session?.user) {
          const userEmail = session.user.email;
          const welcomeSentKey = `welcome_sent_${userEmail}`;
          const alreadySentWelcome = localStorage.getItem(welcomeSentKey);
          
          // Check if user was created recently (within 2 minutes) AND we haven't sent welcome email yet
          const isNewUser = session.user.created_at && 
            new Date(session.user.created_at).getTime() > Date.now() - 120000; // 2 minutes window
          
        if (isNewUser && !alreadySentWelcome) {
            try {
              await supabase.functions.invoke('send-welcome-email', {
                body: {
                  displayName: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
                },
              });
              localStorage.setItem(welcomeSentKey, 'true');
            } catch (emailError) {
              // Silent fail - welcome email is non-critical
            }
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: `${window.location.origin}/auth`,
    });
    return { error: result.error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    // Send welcome email immediately for email signup (since user needs to verify email first)
    // For Google OAuth, the email is sent in onAuthStateChange
    if (!error && data.user) {
      const welcomeSentKey = `welcome_sent_${email}`;
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            displayName: undefined,
          },
        });
        localStorage.setItem(welcomeSentKey, 'true');
      } catch (emailError) {
        // Silent fail - welcome email is non-critical
      }
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
