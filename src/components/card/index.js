import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export const Card = ({data}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: "https://cdn.shopify.com/s/files/1/2481/2502/files/unnamed.webp?v=1673870695",
        }}
        style={{ flex: 0.7 }}
      />
      <View  style={styles.container}>
        <Text style={styles.name}>{data.name}</Text>
        <Text>{data.category}</Text>
        <Text>{data.description}</Text>
      </View>
      <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.text}>Añadir al carrito</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    width: 150,
    height: 250,
    backgroundColor: "white",
    marginBottom: 25,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  container: {
    padding: 10,
  },
  name: {
    fontSize: 18,
  },
  button:{
    backgroundColor: '#003893',
    width: 80,
    borderRadius: 5,
    marginLeft: 5,
    padding: 10
  },
  text: {
    color: 'white'
  }
});
