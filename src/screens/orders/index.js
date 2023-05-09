
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginContext from '../../context/loginContext/loginContext';
import { useContext } from 'react';


export const OrderScreen = ({navigation}) => {
    const loginContext = useContext(LoginContext);
    const {logout} = loginContext;

    const handlerLogout = () => {
        logout()
        navigation.navigate("Home")
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Cart</Text>
          <TouchableOpacity style={styles.button} onPress={(e) => handlerLogout()}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 5,
    },
    button: {
      padding: 10,
      backgroundColor: 'gray',
      height: 40,
      borderRadius: 10,
      textAlign: 'center'
    },
    textButton:{
        fontSize: 14,
        color: 'white',
        flex: 1,
        alignItems: 'center'
    }
  
  });