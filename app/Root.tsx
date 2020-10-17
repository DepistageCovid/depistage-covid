import React from 'react';
import StackNavigator from './navigators/StackNavigator';
import {RootSiblingParent} from 'react-native-root-siblings';

function Root() {
  return (
    <RootSiblingParent>
      <StackNavigator />
    </RootSiblingParent>
  );
}

export default Root;
