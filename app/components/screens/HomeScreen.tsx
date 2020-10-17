import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GrandPublicContext} from '../../Contexts';

function HomeScreen() {
  return (
    <GrandPublicContext.Consumer>
      {(sitesGrandPublic) => (
        <View style={styles.container}>
          <Text>{JSON.stringify(sitesGrandPublic)}</Text>
        </View>
      )}
    </GrandPublicContext.Consumer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
