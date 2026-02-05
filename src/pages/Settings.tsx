 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useForm } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import { z } from 'zod';
 import { Layout } from '@/components/layout';
 import SEO from '@/components/SEO';
 import { useAuth } from '@/hooks/useAuth';
 import { supabase } from '@/integrations/supabase/client';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Separator } from '@/components/ui/separator';
 import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
 import { useToast } from '@/hooks/use-toast';
 import { User, Lock, Mail, Shield } from 'lucide-react';
 import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from '@/components/ui/form';
 
 const profileSchema = z.object({
   displayName: z.string().min(2, 'השם חייב להכיל לפחות 2 תווים'),
 });
 
 const passwordSchema = z.object({
   currentPassword: z.string().min(6, 'הסיסמה חייבת להכיל לפחות 6 תווים'),
   newPassword: z.string().min(6, 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים'),
   confirmPassword: z.string().min(6, 'אימות הסיסמה חייב להכיל לפחות 6 תווים'),
 }).refine((data) => data.newPassword === data.confirmPassword, {
   message: 'הסיסמאות אינן תואמות',
   path: ['confirmPassword'],
 });
 
 type ProfileFormData = z.infer<typeof profileSchema>;
 type PasswordFormData = z.infer<typeof passwordSchema>;
 
 const Settings = () => {
   const { user, loading } = useAuth();
   const navigate = useNavigate();
   const { toast } = useToast();
   const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
   const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
 
   const profileForm = useForm<ProfileFormData>({
     resolver: zodResolver(profileSchema),
     defaultValues: {
       displayName: user?.user_metadata?.full_name || user?.user_metadata?.name || '',
     },
   });
 
   const passwordForm = useForm<PasswordFormData>({
     resolver: zodResolver(passwordSchema),
     defaultValues: {
       currentPassword: '',
       newPassword: '',
       confirmPassword: '',
     },
   });
 
   // Redirect to auth if not logged in
   if (!loading && !user) {
     navigate('/auth');
     return null;
   }
 
   const getUserInitials = () => {
     if (user?.user_metadata?.full_name) {
       return user.user_metadata.full_name
         .split(' ')
         .map((n: string) => n[0])
         .join('')
         .toUpperCase()
         .slice(0, 2);
     }
     return user?.email?.slice(0, 2).toUpperCase() || 'U';
   };
 
   const isGoogleUser = user?.app_metadata?.provider === 'google';
 
   const handleProfileUpdate = async (data: ProfileFormData) => {
     setIsUpdatingProfile(true);
     try {
       // Update auth user metadata
       const { error: authError } = await supabase.auth.updateUser({
         data: { full_name: data.displayName },
       });
 
       if (authError) throw authError;
 
       // Update profiles table
       const { error: profileError } = await supabase
         .from('profiles')
         .update({ display_name: data.displayName })
         .eq('user_id', user!.id);
 
       if (profileError) throw profileError;
 
       toast({
         title: 'הפרופיל עודכן בהצלחה',
         description: 'הפרטים האישיים שלך נשמרו',
       });
     } catch (error: any) {
       toast({
         title: 'שגיאה בעדכון הפרופיל',
         description: error.message || 'אנא נסה שנית',
         variant: 'destructive',
       });
     } finally {
       setIsUpdatingProfile(false);
     }
   };
 
   const handlePasswordUpdate = async (data: PasswordFormData) => {
     setIsUpdatingPassword(true);
     try {
       const { error } = await supabase.auth.updateUser({
         password: data.newPassword,
       });
 
       if (error) throw error;
 
       toast({
         title: 'הסיסמה עודכנה בהצלחה',
         description: 'הסיסמה החדשה נשמרה',
       });
 
       passwordForm.reset();
     } catch (error: any) {
       toast({
         title: 'שגיאה בעדכון הסיסמה',
         description: error.message || 'אנא נסה שנית',
         variant: 'destructive',
       });
     } finally {
       setIsUpdatingPassword(false);
     }
   };
 
   if (loading) {
     return (
       <Layout>
         <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
           <div className="animate-pulse text-muted-foreground">טוען...</div>
         </div>
       </Layout>
     );
   }
 
   return (
     <Layout>
       <SEO 
         title="הגדרות חשבון" 
         description="נהל את פרטי החשבון שלך, עדכן סיסמה ופרטים אישיים ב-SignaturePro" 
       />
       
       <div className="container mx-auto px-4 py-12 max-w-3xl">
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-foreground mb-2">הגדרות חשבון</h1>
           <p className="text-muted-foreground">נהל את פרטי החשבון והעדפות האבטחה שלך</p>
         </div>
 
         <div className="space-y-6">
           {/* Profile Section */}
           <Card>
             <CardHeader>
               <div className="flex items-center gap-3">
                 <User className="w-5 h-5 text-primary" />
                 <div>
                   <CardTitle>פרטים אישיים</CardTitle>
                   <CardDescription>עדכן את פרטי הפרופיל שלך</CardDescription>
                 </div>
               </div>
             </CardHeader>
             <CardContent>
               <div className="flex items-center gap-4 mb-6">
                 <Avatar className="h-16 w-16">
                   <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                   <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                     {getUserInitials()}
                   </AvatarFallback>
                 </Avatar>
                 <div>
                   <p className="font-medium text-foreground">{user?.user_metadata?.full_name || 'משתמש'}</p>
                   <p className="text-sm text-muted-foreground">{user?.email}</p>
                   {isGoogleUser && (
                     <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                       <Shield className="w-3 h-3" />
                       מחובר עם Google
                     </span>
                   )}
                 </div>
               </div>
 
               <Form {...profileForm}>
                 <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                   <FormField
                     control={profileForm.control}
                     name="displayName"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>שם תצוגה</FormLabel>
                         <FormControl>
                           <Input placeholder="הכנס שם תצוגה" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
 
                   <div className="space-y-2">
                     <Label className="text-muted-foreground">כתובת אימייל</Label>
                     <div className="flex items-center gap-2">
                       <Mail className="w-4 h-4 text-muted-foreground" />
                       <span className="text-sm">{user?.email}</span>
                     </div>
                     <p className="text-xs text-muted-foreground">כתובת האימייל לא ניתנת לשינוי</p>
                   </div>
 
                   <Button type="submit" disabled={isUpdatingProfile}>
                     {isUpdatingProfile ? 'שומר...' : 'שמור שינויים'}
                   </Button>
                 </form>
               </Form>
             </CardContent>
           </Card>
 
           {/* Password Section - Only for email users */}
           {!isGoogleUser && (
             <Card>
               <CardHeader>
                 <div className="flex items-center gap-3">
                   <Lock className="w-5 h-5 text-primary" />
                   <div>
                     <CardTitle>שינוי סיסמה</CardTitle>
                     <CardDescription>עדכן את סיסמת החשבון שלך</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <Form {...passwordForm}>
                   <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                     <FormField
                       control={passwordForm.control}
                       name="currentPassword"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>סיסמה נוכחית</FormLabel>
                           <FormControl>
                             <Input type="password" placeholder="הכנס סיסמה נוכחית" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={passwordForm.control}
                       name="newPassword"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>סיסמה חדשה</FormLabel>
                           <FormControl>
                             <Input type="password" placeholder="הכנס סיסמה חדשה" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={passwordForm.control}
                       name="confirmPassword"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>אימות סיסמה חדשה</FormLabel>
                           <FormControl>
                             <Input type="password" placeholder="הכנס שוב את הסיסמה החדשה" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <Button type="submit" disabled={isUpdatingPassword}>
                       {isUpdatingPassword ? 'מעדכן...' : 'עדכן סיסמה'}
                     </Button>
                   </form>
                 </Form>
               </CardContent>
             </Card>
           )}
 
           {/* Google User Password Notice */}
           {isGoogleUser && (
             <Card className="bg-secondary/30">
               <CardContent className="pt-6">
                 <div className="flex items-center gap-3 text-muted-foreground">
                   <Shield className="w-5 h-5" />
                   <div>
                     <p className="font-medium text-foreground">התחברות באמצעות Google</p>
                     <p className="text-sm">הסיסמה שלך מנוהלת על ידי Google. לשינוי סיסמה, היכנס לחשבון Google שלך.</p>
                   </div>
                 </div>
               </CardContent>
             </Card>
           )}
         </div>
       </div>
     </Layout>
   );
 };
 
 export default Settings;