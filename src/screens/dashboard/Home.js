import React, {useState} from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {Colors} from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, Modal, Select} from 'native-base';

import ImageSlider from '../../components/ImageSlider';
import {sampleData} from '../../constants/dummy';

const Home = ({navigation}) => {
  const [images, setImages] = useState(sampleData);
  const [modalVisbility, setModalVisbility] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [myFavorites, setMyFavorites] = useState([]);
  const [newData, setNewData] = useState({
    id: '',
    category: '',
    data: [],
  });

  let categories = [];
  for (var item of images) {
    categories.push(item.category);
  }

  const handleCameraImageSelect = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        const uri = image.path;
        let data = [];
        data.push({
          uri: uri,
        });
        setNewData({
          ...newData,
          id: image.modificationDate.slice(0, 5),
          data: data,
        });
      })
      .catch(err => console.log(err));
  };
  const handleGalleryImageSelect = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        const uri = image.path;
        let data = [];
        data.push({
          uri: uri,
        });
        setNewData({
          ...newData,
          id: image.modificationDate.slice(0, 5),
          data: data,
        });
      })
      .catch(err => console.log(err));
  };

  const handleDeleteImg = () => {
    setNewData({...newData, data: []});
  };

  const handleNewImageSubmit = () => {
    if (newData.category === '' || newData.data.length === 0) {
      Platform.OS === 'ios'
        ? Alert.alert('Please choose a category or enter a new one')
        : ToastAndroid.show(
            'Please choose a category or enter a new one',
            ToastAndroid.LONG,
          );
      return;
    } else {
      if (categories.indexOf(newData.category) !== -1) {
        var foundIndex = images.findIndex(i => i.category === newData.category);
        images[foundIndex].data.push(newData.data[0]);
      } else {
        setImages(images => [...images, newData]);
      }
    }
    setModalVisbility(false);
    setNewData({
      category: '',
      data: [],
    });
  };

  const handleMyFavorites = image => {
    setMyFavorites(myFavorites => [...myFavorites, image]);
  };

  const handleMyFavoritesRemove = image => {
    let temp = [];
    temp = myFavorites.filter(mf => mf.uri !== image.uri);
    console.log(temp);
    setMyFavorites(temp);
  };

  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 20}}
        keyExtractor={(item, index) => index.toString()}
        sections={images}
        renderItem={({item}) => {
          return null;
        }}
        renderSectionHeader={({section}) => (
          <>
            <View style={styles.header}>
              <Text style={styles.sectionHeader}>{section.category}</Text>
              <TouchableOpacity
                style={styles.seeAllBtn}
                onPress={() => navigation.navigate('Gallery', {data: section})}>
                <Text style={styles.seeAllBtnText}>
                  See {section.category} gallery
                </Text>
              </TouchableOpacity>
            </View>
            <ImageSlider
              data={section.data}
              images={images}
              handleMyFavorites={handleMyFavorites}
              myFavorites={myFavorites}
              handleMyFavoritesRemove={handleMyFavoritesRemove}
            />
          </>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() =>
            myFavorites.length === 0
              ? Alert.alert('Please add some images to my favorites first')
              : navigation.navigate('Favourite', {
                  data: myFavorites,
                })
          }
          style={[
            styles.myFavBtn,
            {
              backgroundColor: 'red',
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
            },
          ]}>
          <Text style={styles.myFavBtnText}>My Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisbility(true)}
          style={[
            styles.myFavBtn,
            {
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: '#DCFAEF',
            },
          ]}>
          <Text style={styles.addImageBtnText}>Add an image</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isOpen={modalVisbility}
        onClose={() => setModalVisbility(false)}
        size="full">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add new Image</Modal.Header>
          <Modal.Body>
            <View style={styles.inputWrap}>
              {newData.data.length === 0 ? (
                <>
                  <Text style={styles.label}>Upload image from</Text>
                  <TouchableOpacity onPress={handleCameraImageSelect}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 10,
                      }}>
                      Open Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleGalleryImageSelect}>
                    <Text
                      style={{
                        color: 'red',
                        marginTop: 10,
                      }}>
                      Open Gallery
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View>
                  <Text style={styles.label}>Select an image</Text>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={handleDeleteImg}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 18,
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={{uri: newData.data[0].uri}}
                    style={{width: 225, height: 160}}
                  />
                </View>
              )}
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Select a Category</Text>
              <Select
                placeholder="Choose a category"
                onValueChange={itemValue => {
                  setNewData({...newData, category: itemValue});
                  setAddNewCategory(false);
                }}
                selectedValue={newData.category}
                borderRadius={12}
                borderWidth={0}
                color="#4F585E">
                {categories.map((c, index) => (
                  <Select.Item label={c} value={c} key={index.toString()} />
                ))}
              </Select>
            </View>
            <View style={{alignSelf: 'center', marginVertical: 10}}>
              <Text style={{fontWeight: '800', fontSize: 16}}>
                ------OR------
              </Text>
            </View>
            {addNewCategory ? (
              <View style={styles.inputWrap}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.label}>Add a new category</Text>
                  <TouchableOpacity onPress={() => setAddNewCategory(false)}>
                    <Text style={{color: '#E73828'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  placeholder="Type a category"
                  placeholderTextColor="#dadae0"
                  value={newData.category}
                  onChangeText={itemValue =>
                    setNewData({...newData, category: itemValue})
                  }
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setAddNewCategory(true);
                  setNewData({...newData, category: ''});
                }}
                style={{alignSelf: 'center', marginVertical: 10}}>
                <Text
                  style={{fontWeight: '800', fontSize: 16, color: '#E73828'}}>
                  Add new category
                </Text>
              </TouchableOpacity>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisbility(false);
                }}>
                Cancel
              </Button>
              <Button onPress={handleNewImageSubmit}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 226,
    height: 162,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seeAllBtnText: {
    fontSize: 14,
    color: 'tomato',
    textTransform: 'capitalize',
  },
  addImageBtn: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  myFavBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  myFavBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  addImageBtnText: {
    color: '#00BFF9',
    fontSize: 16,
    fontWeight: '800',
  },
  inputWrap: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  label: {
    color: '#575757',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    color: '#777777',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 3,
    backgroundColor: 'white',
  },
  saveBtn: {
    backgroundColor: 'white',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  saveBtnText: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 22,
    color: '#ffffff',
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  deleteBtn: {
    position: 'absolute',
    top: 35,
    right: 125,
    zIndex: 2,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: '100%',
    height: '40%',
  },
  modalTextTitle: {
    // fontFamily: FontConfig.primary.bold,
    color: Colors.textOnInput,
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 14,
    // fontFamily: FontConfig.primary.bold,
    color: Colors.textDark,
    marginTop: 10,
  },
});
