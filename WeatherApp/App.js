import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from 'react-native';
import {OPEN_WEATHER_API_KEY} from "@env";

const App = () => {
	const [city, setCity] = useState('');

const fetchWeatherData = async () => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
		);
		const data = await response.json();
		Alert.alert('Sää', `Lämpötila ${data.main.temp} °C`);
	} catch (error) {
		Alert.alert('Virhe', 'Säätietojen hakeminen epäonnistui');
	}
};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Sääsovellus</Text>
				
				<TextInput
					style={styles.input}
					placeholder="Syötä kaupungin nimi"
					value={city}
					onChangeText={setCity}
				/>

				<TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
					<Text style={styles.buttonText}>Hae sää</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
	},
	innerContainer: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
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
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	button: {
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
});

export default App;
