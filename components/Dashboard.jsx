// DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';

const DashboardScreen = ({navigation}) => {
  const chatsData = [
    {
      id: 1,
      name: 'John (Owner)',
      message: "Sure, I'll check on that.",
      time: '10:42 AM',
      avatar: '👤',
      unreadCount: 1,
      online: true,
    },
    {
      id: 2,
      name: 'Gym Squad',
      message: "Let's hit the gym at 5 PM!",
      time: 'Yesterday',
      avatar: '👥',
      unreadCount: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Sarah',
      message: 'Great workout today!',
      time: 'Mon',
      avatar: '👤',
      unreadCount: 0,
      online: false,
    },
  ];

  const handleStartWorkout = () => {
    console.log('Start Workout pressed');
  };

  const handleViewFullPlan = () => {
    console.log('View Full Plan pressed');
  };

  const handleChatPress = chatId => {
    console.log('Chat pressed:', chatId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2332" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Alex!</Text>
            <Text style={styles.subtitle}>Ready to crush your goals?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Workout Card */}
        <View style={styles.workoutCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Workout</Text>
            <TouchableOpacity>
              <Text style={styles.iconButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.workoutTitle}>Full Body Blast</Text>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercentage}>60%</Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, {width: '60%'}]} />
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartWorkout}
            activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Diet Plan Card */}
        <View style={styles.dietCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitleGreen}>Today's Diet Plan</Text>
            <TouchableOpacity>
              <Text style={styles.iconButtonGreen}>🍴</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dietTitle}>High-Protein Day</Text>

          <Text style={styles.dietInfo}>
            Next Meal:{' '}
            <Text style={styles.dietBold}>Lunch - Grilled Chicken Salad</Text>
          </Text>
          <Text style={styles.dietInfo}>
            Calories Today: <Text style={styles.dietBold}>850 / 1800 kcal</Text>
          </Text>

          <TouchableOpacity
            style={styles.viewPlanButton}
            onPress={handleViewFullPlan}
            activeOpacity={0.8}>
            <Text style={styles.viewPlanButtonText}>View Full Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Chats Section */}
        <View style={styles.chatsSection}>
          <Text style={styles.chatsTitle}>Chats</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats..."
              placeholderTextColor="#6b7280"
            />
          </View>

          {/* Chat List */}
          {chatsData.map(chat => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => handleChatPress(chat.id)}
              activeOpacity={0.7}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{chat.avatar}</Text>
                </View>
                {chat.online && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.chatMessage}>{chat.message}</Text>
              </View>

              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Membership Info */}
        <View style={styles.membershipContainer}>
          <Text style={styles.membershipText}>
            Membership Active until{' '}
            <Text style={styles.membershipDate}>Dec 24, 2024</Text>
          </Text>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📈</Text>
          <Text style={styles.navLabel}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2332',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b95a5',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 24,
  },
  workoutCard: {
    backgroundColor: '#1e3a5f',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2d4d73',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#5a9fd4',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  iconButton: {
    fontSize: 18,
    color: '#5a9fd4',
    fontWeight: '300',
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#8b95a5',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#2d4d73',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#2196F3',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  dietCard: {
    backgroundColor: '#1e4038',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2d5a4f',
  },
  cardTitleGreen: {
    fontSize: 14,
    color: '#5fd4a8',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  iconButtonGreen: {
    fontSize: 18,
  },
  dietTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  dietInfo: {
    fontSize: 14,
    color: '#8b95a5',
    marginBottom: 8,
  },
  dietBold: {
    color: '#ffffff',
    fontWeight: '600',
  },
  viewPlanButton: {
    backgroundColor: '#4ade80',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  viewPlanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e4038',
  },
  chatsSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  chatsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#243447',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d4d73',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    padding: 0,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2d4d73',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#243447',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ade80',
    borderWidth: 2,
    borderColor: '#1a2332',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  chatTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  chatMessage: {
    fontSize: 14,
    color: '#8b95a5',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  membershipContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  membershipText: {
    fontSize: 14,
    color: '#6b7280',
  },
  membershipDate: {
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1a2332',
    borderTopWidth: 1,
    borderTopColor: '#2d4d73',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  navLabelActive: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default DashboardScreen;
