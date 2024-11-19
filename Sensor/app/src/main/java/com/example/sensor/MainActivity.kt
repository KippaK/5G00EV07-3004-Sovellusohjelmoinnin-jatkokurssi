package com.example.sensor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import com.example.sensor.ui.SensorScreen
import com.example.sensor.viewmodel.SensorViewModel

class MainActivity : ComponentActivity() {
    private val sensorViewModel: SensorViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SensorScreen(sensorViewModel)
        }
    }
}
