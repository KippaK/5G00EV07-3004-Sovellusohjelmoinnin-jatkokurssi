package com.example.gps.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.gps.R
import com.example.gps.viewmodel.LocationViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LocationScreen(
    locationViewModel: LocationViewModel,
    onRequestPermission: () -> Unit
) {
    val location by locationViewModel.location.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text(stringResource(R.string.app_title)) }) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            if (location == null) {
                Text(text = stringResource(R.string.null_location))
            } else {
                Text(text = "${stringResource(R.string.location)}:")
                Text(text = "${stringResource(R.string.latitude)}: ${location!!.latitude}")
                Text(text = "${stringResource(R.string.longitude)}: ${location!!.longitude}")
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = { onRequestPermission() }) {
                Text(stringResource(R.string.getLocation))
            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(onClick = { locationViewModel.startLocationUpdates() }) {
                Text(stringResource(R.string.startTracking))
            }

            Spacer(modifier = Modifier.height(16.dp))
            Button(onClick = { locationViewModel.stopLocationUpdates() }) {
                Text(stringResource(R.string.stopTracking))
            }
        }
    }
}
