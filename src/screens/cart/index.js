import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const CartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Cart</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Hacer el pedido</Text>
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
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#fcd116',
    height: 40,
    borderRadius: 10,
    textAlign: 'center'
  }

});
