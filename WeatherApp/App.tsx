import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	StatusBar,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { OPEN_WEATHER_API_KEY } from '@dotnev';

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 
	const [weatherData, setWeatherData] = useState<any | null>(null); 
	const [error, setError] = useState<string | null>(null); 

	const fetchWeatherData = async (): Promise<void> => {
		if (!city) {
			setError('Syötä kaupungin nimi');
			return;
		}
		
		try {
			const response = await fetch(
				`https:
			);
			const data = await response.json();

			if (response.ok) {
				setWeatherData(data); 
				setError(null); 
			} else {
				setWeatherData(null);
				setError(data.message || 'Säätietojen hakeminen epäonnistui');
			}
		} catch (error) {
			setWeatherData(null);
			setError('Säätietojen hakeminen epäonnistui');
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />
			<KeyboardAvoidingView
				style={styles.keyboardAvoidingView}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView contentContainerStyle={styles.scrollViewContent}>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.title}>Sääsovellus</Text>
						</View>

						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Syötä kaupungin nimi"
								value={city}
								onChangeText={setCity}
								placeholderTextColor="#888"
							/>
						</View>

						<TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
							<Text style={styles.buttonText}>Hae sää</Text>
						</TouchableOpacity>

						{error && <Text style={styles.errorText}>{error}</Text>}

						{/* Weather box */}
						{weatherData && (
							<View style={styles.weatherBox}>
								<Text style={styles.weatherText}>Lämpötila: {weatherData.main.temp} °C</Text>
								<Text style={styles.weatherText}>Säätila: {weatherData.weather[0].description}</Text>
								<Text style={styles.weatherText}>Kosteus: {weatherData.main.humidity}%</Text>
								<Text style={styles.weatherText}>Tuulen nopeus: {weatherData.wind.speed} m/s</Text>
							</View>
						)}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		width: '90%',
		padding: 20,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	header: {
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		color: '#333',
	},
	button: {
		backgroundColor: '#007BFF',
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	weatherBox: {
		marginTop: 20,
		padding: 15,
		backgroundColor: '#e0f7fa',
		borderRadius: 5,
		alignItems: 'center',
	},
	weatherText: {
		fontSize: 16,
		color: '#333',
		marginBottom: 5,
	},
	errorText: {
		color: 'red',
		marginTop: 10,
	},
});

export default App;
