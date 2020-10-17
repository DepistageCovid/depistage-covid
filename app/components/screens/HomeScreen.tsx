import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GrandPublicContext} from '../../Contexts';
import MapView, {Marker} from 'react-native-maps';

function HomeScreen() {
  return (
    <GrandPublicContext.Consumer>
      {(sitesGrandPublic: any) => (
        <View style={styles.container}>
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {sitesGrandPublic
              ? sitesGrandPublic.map((site, index) =>
                  parseFloat(site.latitude) && parseFloat(site.longitude) ? (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: parseFloat(site.latitude),
                        longitude: parseFloat(site.longitude),
                      }}
                      title={site.rs}
                      description={site.adresse}
                    />
                  ) : null,
                )
              : null}
          </MapView>
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
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
