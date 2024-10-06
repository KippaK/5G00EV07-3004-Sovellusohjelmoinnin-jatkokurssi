import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
	ScrollView,
	StatusBar,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { OPEN_WEATHER_API_KEY } from '@env'; 

const App: React.FC = () => {
	const [city, setCity] = useState<string>(''); 

	const fetchWeatherData = async (): Promise<void> => {
		if (!city) {
			Alert.alert('Virhe', 'Syötä kaupungin nimi');
			return;
		}
		
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
			);
			const data = await response.json();

			if (response.ok) {
				Alert.alert('Sää', `Lämpötila: ${data.main.temp} °C`);
			} else {
				Alert.alert('Virhe', data.message || 'Säätietojen hakeminen epäonnistui');
			}
		} catch (error) {
			Alert.alert('Virhe', 'Säätietojen hakeminen epäonnistui');
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
});

export default App;
