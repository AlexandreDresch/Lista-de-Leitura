import React, { useState, useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage, Modal } from "react-native";
import Constants from 'expo-constants';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Photo from '../components/Photo';
import Camera from '../components/Camera';

const Book = ({navigation}) => {
    const book = navigation.getParam("book", {
        title: '',
        description: '',
        read: false,
        photo: ''
    });
    const isEdit = navigation.getParam("isEdit", false);

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const [read, setRead] = useState(book.read);
    const [photo, setPhoto] = useState(book.photo);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
          const book = JSON.parse(data);
          setBooks(book);
        })
      }, []);

    const isValid = () => {
        if(title !== undefined && title !== '') {
            return true;
        }

        return false;
    }

    const onSave = async () => {
       if(isValid()) {

            if(isEdit) {
                let newBooks = books;

                newBooks.map(item => {
                    if(item.id === book.id) {
                        item.title = title;
                        item.description = description;
                        item.read = read; 
                        item.photo = photo;
                    }
                    return item;
                });

                await AsyncStorage.setItem("books", JSON.stringify(books));

            } else {
                const id = Math.random(5000).toString();
                    const data = {
                    id,
                    title,
                    description,
                    photo,
                    };
            };

            books.push(data);
            await AsyncStorage.setItem("books", JSON.stringify(books));
            navigation.goBack();
        } else {
            console.log('Invalid!');
        }
    };

    const onCloseModal = () => setModalVisible(false);

    const onChangePhoto = (newPhoto) => setPhoto(newPhoto);

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>
                Include a new book...
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => {
                    setTitle(text)
                }}
            />
           <TextInput
                style={styles.input}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => {
                    setDescription(text)
                }}
            />
            <TouchableOpacity 
            style={styles.cameraButton}
            onPress={() => {
                setIsModalVisible(true)
            }}
            >
                <Icon name="photo-camera" size={18} color={#fff}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={onSave}
            style={[styles.saveButton, ((!isValid)) ? styles.saveButtonInvalid : '']}>
                <Text style={styles.saveButtonText}>
                    {isEdit ? "Update" : "Register"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => {
                navigation.goBack();
            }}
            >
                <Text style={styles.cancelButtonText}>
                    Cancel
                </Text>
            </TouchableOpacity>

            <Modal 
            animationType="slide"
            visible={isModalVisible()}
            >
                {
                    photo ? (
                        <Photo 
                            photo={photo}
                            onDeletePhoto={onChangePhoto}
                            onClosePicture={onCloseModal}
                        />
                    ) : (
                        <Camera onCloseCamera={onCloseModal} onTakePicture={onChangePhoto}/>
                    )
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight,
    },
    pageTitle: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        fontSize: 16,
        borderBottomColor: "#f39c12",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    cameraButton: {
        backgroundColor: "#f39c12",
        borderRadius: 50,
         width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: "#f39c12",
        alignSelf: "center",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    saveButtonInvalid: {
        opacity: 0.5
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    cancelButton: {
        alignSelf: "center",
    },
    cancelButtonText: {
        color: "#95a5a6",
    },
});

export default Book;