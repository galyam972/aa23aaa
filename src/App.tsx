import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Settings from "./pages/Settings";

// Guide pages
import HowToCreateSignature from "./pages/guides/HowToCreateSignature";
import AddSignatureToGmail from "./pages/guides/AddSignatureToGmail";
import AddSignatureToOutlook from "./pages/guides/AddSignatureToOutlook";
import ManageSignatures from "./pages/guides/ManageSignatures";
import FAQ from "./pages/guides/FAQ";

// Template pages
import BusinessSignature from "./pages/templates/BusinessSignature";
import EnglishSignature from "./pages/templates/EnglishSignature";
import HebrewSignature from "./pages/templates/HebrewSignature";
import SignatureWithLogo from "./pages/templates/SignatureWithLogo";
import SignatureWithSocial from "./pages/templates/SignatureWithSocial";

// About pages
import HowItWorks from "./pages/about/HowItWorks";
import WhoIsItFor from "./pages/about/WhoIsItFor";
import Benefits from "./pages/about/Benefits";
import Privacy from "./pages/about/Privacy";
import Contact from "./pages/about/Contact";

// Legal pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/editor" element={<Index />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Guide pages */}
              <Route path="/guides/how-to-create-signature" element={<HowToCreateSignature />} />
              <Route path="/guides/add-signature-gmail" element={<AddSignatureToGmail />} />
              <Route path="/guides/add-signature-outlook" element={<AddSignatureToOutlook />} />
              <Route path="/guides/manage-signatures" element={<ManageSignatures />} />
              <Route path="/guides/faq" element={<FAQ />} />
              
              {/* Template pages */}
              <Route path="/templates/business-signature" element={<BusinessSignature />} />
              <Route path="/templates/english-signature" element={<EnglishSignature />} />
              <Route path="/templates/hebrew-signature" element={<HebrewSignature />} />
              <Route path="/templates/signature-with-logo" element={<SignatureWithLogo />} />
              <Route path="/templates/signature-with-social" element={<SignatureWithSocial />} />
              
              {/* About pages */}
              <Route path="/about/how-it-works" element={<HowItWorks />} />
              <Route path="/about/who-is-it-for" element={<WhoIsItFor />} />
              <Route path="/about/benefits" element={<Benefits />} />
              <Route path="/about/privacy" element={<Privacy />} />
              <Route path="/about/contact" element={<Contact />} />
              
              {/* Legal pages */}
              <Route path="/legal/terms" element={<TermsOfService />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
