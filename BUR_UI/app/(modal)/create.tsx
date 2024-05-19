import { Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'expo-router';

const Page = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const startGroup = useMutation(api.groups.create);
  const router = useRouter();

  // Create a new group with Convex mutation
  const onCreateGroup = async () => {
    await startGroup({
      name,
      age,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.textInput} value={name} onChangeText={setName} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.textInput} value={age} onChangeText={setAge} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5EA',
    padding: 10,
  },
  label: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#EEA217',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Page;
