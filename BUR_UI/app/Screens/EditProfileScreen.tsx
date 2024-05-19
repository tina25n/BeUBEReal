import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // Adjust the path according to your project structure

const EditProfileScreen = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [orientation, setOrientation] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [height, setHeight] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSave = async () => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          userName: userName,
          age: age,
          orientation: orientation,
          genderPreference: genderPreference,
          height: height,
        },
        { merge: true }
      );
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#888"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor="#888"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Height"
          placeholderTextColor="#888"
          value={height}
          onChangeText={(text) => setHeight(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Orientation"
          placeholderTextColor="#888"
          value={orientation}
          onChangeText={(text) => setOrientation(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender Preference"
          placeholderTextColor="#888"
          value={genderPreference}
          onChangeText={(text) => setGenderPreference(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default EditProfileScreen;
