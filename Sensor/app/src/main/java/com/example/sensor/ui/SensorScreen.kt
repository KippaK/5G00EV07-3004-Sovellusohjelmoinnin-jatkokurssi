package com.example.sensor.ui

import com.example.sensor.viewmodel.SensorViewModel
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.sensor.R


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SensorScreen(viewModel: SensorViewModel) {
    val sensorData by viewModel.sensorData.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text(stringResource(R.string.accelerometerStr)) }) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = "X: ${sensorData.first}")
            Text(text = "Y: ${sensorData.second}")
            Text(text = "Z: ${sensorData.third}")

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = { viewModel.startListening() }) {
                Text(stringResource(R.string.startStr))
            }

            Spacer(modifier = Modifier.height(8.dp))

            Button(onClick = { viewModel.stopListening() }) {
                Text(stringResource(R.string.stopStr))
            }
        }
    }
}
