import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CatalogueContext from "../../context/catalogueContext/catalogueContext";
import { Card } from "../../components/card";
import { useContext, useEffect, useState } from "react";

export const HomeScreen = () => {
  const catalogueContext = useContext(CatalogueContext);
  const { data, getCatalogue, getFilter, filter } = catalogueContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatalogue();
    setLoading(false);
  }, []);

  const handlerFilter = (filter) => {
    getFilter(data, filter);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlerFilter("todo")}
        >
          <Text style={styles.text}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlerFilter("hogar")}
        >
          <Text style={styles.text}>Hogar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlerFilter("jardin")}
        >
          <Text style={styles.text}>Jardin</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", flex: 4 }}>
        {data !== null && filter === null && (
          <FlatList
            data={data}
            keyExtractor={(da) => da.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => <Card data={item} />}
          />
        )}
        {filter !== null && data !== null && (
          <FlatList
            data={filter}
            keyExtractor={(da) => da.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => <Card data={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  viewContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "#003893",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
