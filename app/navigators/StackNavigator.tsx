import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AppRoutes, AppSettings} from '../Constants';
import I18n from 'react-native-i18n';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import HomeScreen from '../components/screens/HomeScreen';
import ActivityScreen from '../components/screens/ActivityScreen';

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  public user: FirebaseAuthTypes.User | null = null;

  private animationConfig: TransitionSpec = {
    animation: 'timing',
    config: {
      duration: 200,
    },
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={AppRoutes.STACK_HOME}
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name={AppRoutes.STACK_HOME}
            component={HomeScreen}
            options={({navigation}) => ({
              title: AppSettings.APP_NAME,
              transitionSpec: {
                open: this.animationConfig,
                close: this.animationConfig,
              },
              /*
              headerRight: () =>
                this.user?.isAnonymous ? null : (
                  <TouchableOpacity
                    style={styles.headerRight}
                    onPress={() => navigation.push(AppRoutes.STACK_PROFILE)}>
                    <Ionicons
                      name={AppIcons.PREFERENCES}
                      size={25}
                      color={AppColors.INACTIVE}
                    />
                  </TouchableOpacity>
                ),*/
            })}
          />
          <Stack.Screen
            name={AppRoutes.STACK_ACTIVITY}
            component={ActivityScreen}
            options={{
              title: I18n.t('ACTIVITY_SCREEN.TITLE'),
              transitionSpec: {
                open: this.animationConfig,
                close: this.animationConfig,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {paddingRight: 20},
});

export default StackNavigator;
