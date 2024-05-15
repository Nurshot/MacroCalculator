import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';




const RecipeApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredRecipes = recipesData.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecipe = (recipeId) => {
    const recipe = recipesData.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tarif ara..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView>
        {selectedRecipe ? (
          <View style={styles.recipeDetail}>
            <Text style={styles.title}>{selectedRecipe.title}</Text>
            {selectedRecipe.imageUrl && (
              <Image
                source={{ uri: selectedRecipe.imageUrl }}
                style={styles.image}
              />
            )}
            <Text style={styles.header}>Malzemeler:</Text>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>{ingredient}</Text>
            ))}
            <Text style={styles.header}>Yapılışı:</Text>
            <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedRecipe(null)}
            >
              <Text style={styles.buttonText}>Geri Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => handleSelectRecipe(recipe.id)}
            >
              <Text style={styles.title}>{recipe.title}</Text>
              {recipe.imageUrl && (
                <Image
                  source={{ uri: recipe.imageUrl }}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const recipesData = [
  {
    id: 1,
    title: 'Domates Çorbası',
    imageUrl: 'https://www.karaca.com/blog/wp-content/uploads/2024/01/domatescorbasi2-500x500.webp', // Replace with actual URL
    ingredients: ['4 adet domates', '1 yemek kaşığı tereyağı', '2 su bardağı su', 'Tuz', 'Karabiber'],
    instructions: 'Domatesleri soyun ve küp küp doğrayın. Tereyağını bir tencerede eritin ve domatesleri ekleyin. Su, tuz ve karabiber ekleyip kaynatın.'
  },
  {
    id: 2,
    title: 'Mercimek Çorbası',
    imageUrl: 'https://example.com/images/mercimek_corbasi.png', // Replace with actual URL
    ingredients: ['1 su bardağı yeşil mercimek', '1 adet soğan', '1 yemek kaşığı zeytinyağı', '1 litre su', 'Tuz', 'Pul biber'],
    instructions: 'Mercimeği yıkayıp süzün. Soğanı yemeklik doğrayın ve zeytinyağında kavurun. Mercimek ve suyu ekleyip mercimekler yumuşayana kadar pişirin. Tuz ve pul biber ile tatlandırın.'
  },
  {
    id: 3,
    title: 'Kıymalı Biber Dolması',
    imageUrl: 'https://example.com/images/kiymali_biber_dolmasi.png', // Replace with actual URL
    ingredients: ['8 adet dolmalık biber', '250 gr kıyma', '1 su bardağı pirinç', '2 adet soğan', '1 yemek kaşığı salça', 'Tuz', 'Karabiber', 'Nane'],
    instructions: 'Soğanları yemeklik doğrayın ve kıymayla birlikte kavurun. Yıkanmış pirinç, salça, tuz, karabiber ve nane ekleyip karıştırın. Biberlerin içini bu karışımla doldurun ve tencereye dizin. Üzerine sıcak su ekleyiniz.'
  },
  {
    id: 4,
    title: 'Ezogelin Çorbası',
    imageUrl: 'https://example.com/images/ezogelin_corbasi.png', // Replace with actual URL
    ingredients: ['1 su bardağı kırmızı mercimek', '1/2 su bardağı bulgur', '1 adet soğan', '2 diş sarımsak', '2 yemek kaşığı sıvı yağ', '1 yemek kaşığı salça', 'Tuz', 'Karabiber', 'Nane'],
    instructions: 'Soğanı doğrayın ve sıvı yağda kavurun. Sarımsak, salça, kırmızı mercimek ve bulguru ekleyin. Su ekleyip pişirin. Tuz, karabiber ve nane ile tatlandırın.'
  },
  {
    id: 5,
    title: 'Tavuklu Pilav',
    imageUrl: 'https://example.com/images/tavuklu_pilav.png', // Replace with actual URL
    ingredients: ['2 su bardağı pirinç', '200 gr tavuk göğsü', '1 adet soğan', '2 yemek kaşığı tereyağı', '4 su bardağı su', 'Tuz', 'Karabiber'],
    instructions: 'Pirinçleri yıkayıp süzün. Tavuk göğsünü küçük parçalar halinde doğrayın ve tereyağında kavurun. Soğanı ekleyip kavurmaya devam edin. Pirinçleri ekleyin ve birkaç dakika kavurun. Su, tuz ve karabiber ekleyip pişirin.'
  },
];




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light grey background for better contrast
    paddingTop: 19, // More top space for better layout
  },
  searchInput: {
    height: 50, // Increased height for better touch area
    borderColor: '#dcdcdc', // Softer border color
    borderWidth: 1,
    borderRadius: 25, // Rounded corners
    padding: 15,
    marginHorizontal: 20, // Horizontal margin for better side spacing
    fontSize: 18, // Larger font size for better readability
    backgroundColor: '#ffffff', // White background for the input
    elevation: 3, // Subtle shadow for depth
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15, // More pronounced rounded corners
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4, // Slightly more shadow for depth
    },
    shadowOpacity: 0.1, // Less opacity for a softer shadow
    shadowRadius: 5,
    elevation: 6, // Higher elevation for a more pronounced shadow
  },
  recipeDetail: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredient: {
    fontSize: 14,
    marginLeft: 10,
  },
  instructions: {
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default RecipeApp;