import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

const ImageSlider = props => {
  return (
    <View>
      <FlatList
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.itemStyle}>
              {props.myFavorites.find(fav => fav.uri === item.uri) !==
              undefined ? (
                <TouchableOpacity
                  style={[
                    styles.heartBtn,
                    {
                      backgroundColor: 'red',
                    },
                  ]}
                  onPress={() => props.handleMyFavoritesRemove(item)}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.heartBtn,
                    {
                      backgroundColor: 'white',
                    },
                  ]}
                  onPress={() => props.handleMyFavorites(item)}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'red',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              )}
              <Image
                source={{uri: item.uri}}
                style={{width: 225, height: 165}}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    marginRight: 20,
  },
  heartBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
    width: 25,
    height: 25,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageSlider;
