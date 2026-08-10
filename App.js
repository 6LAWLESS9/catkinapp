import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import { BottomNavigation } from './src/components/BottomNavigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { OTPScreen } from './src/screens/OTPScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SubmitComplaintScreen } from './src/screens/SubmitComplaintScreen';
import { SubmittedSuccessScreen } from './src/screens/SubmittedSuccessScreen';
import { MyComplaintsScreen } from './src/screens/MyComplaintsScreen';
import { ComplaintDetailScreen } from './src/screens/ComplaintDetailScreen';
import { LiveTrackingScreen } from './src/screens/LiveTrackingScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { HelpSupportScreen } from './src/screens/HelpSupportScreen';
import { colors } from './src/theme/colors';

const MainContent = () => {
  const { activeScreen } = useApp();

  // Full screen auth / splash / onboarding flows without bottom navigation
  if (activeScreen === 'SPLASH') return <SplashScreen />;
  if (activeScreen === 'ONBOARDING') return <OnboardingScreen />;
  if (activeScreen === 'LOGIN') return <LoginScreen />;
  if (activeScreen === 'OTP') return <OTPScreen />;
  if (activeScreen === 'SUBMITTED') return <SubmittedSuccessScreen />;

  // Main app screens with bottom navigation
  const showBottomNav = [
    'HOME',
    'MY_COMPLAINTS',
    'NOTIFICATIONS',
    'PROFILE',
    'SUBMIT',
    'DETAILS',
    'LIVE_TRACKING',
    'EDIT_PROFILE',
    'HELP_SUPPORT',
  ].includes(activeScreen);

  return (
    <View style={styles.body}>
      <View style={styles.screenContainer}>
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'SUBMIT' && <SubmitComplaintScreen />}
        {activeScreen === 'MY_COMPLAINTS' && <MyComplaintsScreen />}
        {activeScreen === 'DETAILS' && <ComplaintDetailScreen />}
        {activeScreen === 'LIVE_TRACKING' && <LiveTrackingScreen />}
        {activeScreen === 'NOTIFICATIONS' && <NotificationsScreen />}
        {activeScreen === 'PROFILE' && <ProfileScreen />}
        {activeScreen === 'EDIT_PROFILE' && <EditProfileScreen />}
        {activeScreen === 'HELP_SUPPORT' && <HelpSupportScreen />}
      </View>
      {showBottomNav && <BottomNavigation />}
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <MainContent />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  body: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});
