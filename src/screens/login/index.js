import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useForm from "../../hocks/useForm";

export const LoginScreen = () => {
  const [activeRegister, setRegister] = useState(false);

  const { email, name, handleChange, handleSubmit } = useForm(activeRegister);

  return (
    <View>
      <View style={styles.containerTitle}>
        {activeRegister ? (
          <Text style={styles.title}>Registrate</Text>
        ) : (
          <Text style={styles.title}>Logueate</Text>
        )}
      </View>
      {activeRegister && (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => handleChange(e, "name")}
            value={name}
            name="name"
            placeholder="nombre"
          />
        </View>
      )}
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(e) => handleChange(e, "email")}
          value={email}
          name="email"
          placeholder="email"
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={(e) => handleSubmit(e)}
        >
          <Text style={styles.text}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonRedirect}
        onPress={(e) => setRegister(!activeRegister)}
      >
        <Text style={styles.textRedirect}>{ activeRegister ? 'Registrate' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    padding: 10,
  },
  title: {
    padding: 10,
    color: "#003893",
    fontWeight: "bold",
    fontSize: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  containerButton: {
    padding: 10,
  },
  button: {
    backgroundColor: "#003893",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  buttonRedirect:{
    marginHorizontal: 10,
  },
  textRedirect: {
    color: 'red',
    fontSize: 16,
  }
});
